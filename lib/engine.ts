"use client";

/**
 * ============================================================================
 *  Power System Math Engine  —  /lib/engine.ts
 * ============================================================================
 *  Physically accurate symmetrical-components / Fortescue engine that powers
 *  the Advanced Graphs and Waveform Analysis components.
 *
 *  Inputs  : phase RMS magnitudes (V, A), sequence-component magnitudes
 *            (|V0|, |V1|, |V2|), P (kW), Q (kVAR), system config.
 *  Outputs : reconstructed phase phasors, time-domain waveforms, instantaneous
 *            power, fault classification (per IEEE C37.104 / IEC 60909),
 *            NEMA voltage unbalance, per-unit bases, and health metrics.
 *
 *  UI contract (shape of the returned object) is preserved verbatim:
 *    fault.{faultType, faultColor, faultSeverity}
 *    power.{pf, pfAngleDeg, pfAngleRad, apparentPower, activePower, reactivePower}
 *    ratios.{v2Ratio, v0Ratio, nemaUnbalance}
 *    vDev  : [%A, %B, %C]
 *    phasors.{Va, Vb, Vc, V0, V1, V2}.{mag, ang}      // ang in RADIANS
 *    waveforms.{t, waveVa, waveVb, waveVc, waveIa, waveIb, waveIc, pTotal}
 *    puBases.{vBase, iBase, zBase}
 *    health.{pfScore, vBalance, negSequenceScore}
 * ============================================================================
 */

import { useMemo } from "react";

// ----------------------------------------------------------------------------
//  Public data type — matches the FormData used in the UI layer
// ----------------------------------------------------------------------------
export interface PowerData {
  voltageA: number; // RMS, Volts (line-to-neutral)
  voltageB: number;
  voltageC: number;
  currentA: number; // RMS, Amps
  currentB: number;
  currentC: number;
  seqPositive: number; // |V1|, Volts
  seqNegative: number; // |V2|, Volts
  seqZero: number; // |V0|, Volts
  activePower: number; // P, kW
  reactivePower: number; // Q, kVAR  (+ = inductive/lagging)
  sysVoltageLevel: number; // Line-to-line nominal, kV
  xrRatio: number; // X/R at the bus (for transient decay modelling)
  nominalFreq: number; // Hz
  faultMVA: number; // Short-circuit capacity at the bus, MVA
}

// ----------------------------------------------------------------------------
//  Minimal complex-number helpers (hot path, inlined rather than a dep)
// ----------------------------------------------------------------------------
interface Complex {
  re: number;
  im: number;
}

const cAdd = (a: Complex, b: Complex): Complex => ({
  re: a.re + b.re,
  im: a.im + b.im,
});
const cMul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const cPolar = (mag: number, angRad: number): Complex => ({
  re: mag * Math.cos(angRad),
  im: mag * Math.sin(angRad),
});
const cMag = (z: Complex) => Math.hypot(z.re, z.im);
const cAng = (z: Complex) => Math.atan2(z.im, z.re);

// Fortescue rotational operators: a = 1∠120°, a² = 1∠-120°
const A = cPolar(1, (2 * Math.PI) / 3);
const A2 = cPolar(1, -(2 * Math.PI) / 3);

const DEG = 180 / Math.PI;
const RAD = Math.PI / 180;
const SQRT2 = Math.SQRT2;
const SQRT3 = Math.sqrt(3);
const EPS = 1e-9;

// ----------------------------------------------------------------------------
//  Voltage-tier thresholds (IEEE C37.113 / IEC 60255)
//  Matches lambda.mjs::getThresholds — both must agree so border colours and
//  AI verdict line up.
// ----------------------------------------------------------------------------
interface ThresholdSet {
  vUnbalanceLow: number;
  vUnbalanceSevere: number;
  iUnbalanceMed: number;
  iUnbalanceHigh: number;
  iUnbalanceCrit: number;
  seqFault: number;
  seqMild: number;
}

function getThresholds(sysVoltageLevel_kV: number): ThresholdSet {
  if (sysVoltageLevel_kV >= 33)
    return {
      vUnbalanceLow: 1.0,
      vUnbalanceSevere: 2.0,
      iUnbalanceMed: 3.0,
      iUnbalanceHigh: 8.0,
      iUnbalanceCrit: 20.0,
      seqFault: 8.0,
      seqMild: 2.5,
    };
  if (sysVoltageLevel_kV >= 11)
    return {
      vUnbalanceLow: 1.5,
      vUnbalanceSevere: 2.5,
      iUnbalanceMed: 5.0,
      iUnbalanceHigh: 10.0,
      iUnbalanceCrit: 25.0,
      seqFault: 12.0,
      seqMild: 4.0,
    };
  if (sysVoltageLevel_kV >= 1)
    return {
      vUnbalanceLow: 2.0,
      vUnbalanceSevere: 3.0,
      iUnbalanceMed: 5.0,
      iUnbalanceHigh: 10.0,
      iUnbalanceCrit: 30.0,
      seqFault: 15.0,
      seqMild: 5.0,
    };
  return {
    vUnbalanceLow: 2.5,
    vUnbalanceSevere: 4.0,
    iUnbalanceMed: 7.0,
    iUnbalanceHigh: 15.0,
    iUnbalanceCrit: 35.0,
    seqFault: 20.0,
    seqMild: 7.0,
  };
}

// ----------------------------------------------------------------------------
//  Core hook
// ----------------------------------------------------------------------------
export function usePowerSystemMath(data: PowerData) {
  return useMemo(() => compute(data), [data]);
}

// ----------------------------------------------------------------------------
//  Actual computation (pure function — easy to unit-test outside React)
// ----------------------------------------------------------------------------
function compute(d: PowerData) {
  const {
    voltageA,
    voltageB,
    voltageC,
    currentA,
    currentB,
    currentC,
    seqPositive: V1m,
    seqNegative: V2m,
    seqZero: V0m,
    activePower,
    reactivePower,
    sysVoltageLevel,
    nominalFreq,
    faultMVA,
  } = d;

  // ==========================================================================
  // 1.  Per-Unit bases
  //     Voltage base   : line-to-neutral nominal  =  (kV_LL * 1000) / √3
  //     Current base   : derived from operational apparent power so the PU
  //                      polar plot renders readably (fault-MVA base would
  //                      drive currents to microscopic PU values).
  //     Impedance base : classical V_LN² / (S_base per phase)
  // ==========================================================================
  const vBase = (sysVoltageLevel * 1000) / SQRT3; // V
  const apparentPowerKVA = Math.hypot(activePower, reactivePower); // kVA
  const iBase = Math.max(
    (apparentPowerKVA * 1000) / (SQRT3 * sysVoltageLevel * 1000 + EPS),
    1e-6,
  ); // A
  const zBase = (vBase * vBase) / Math.max((apparentPowerKVA * 1000) / 3, EPS);

  // Short-circuit impedance at the bus (used for transient DC decay τ = X/(ωR))
  const zFault = (sysVoltageLevel * 1000) ** 2 / Math.max(faultMVA * 1e6, EPS); // Ω

  // ==========================================================================
  // 2.  Phasor reconstruction (inverse Fortescue from magnitudes only)
  //
  //     Unknowns : θ₂  (angle of V2),  θ₀  (angle of V0)
  //     Knowns   : |V0|, |V1|, |V2|, |Va|, |Vb|, |Vc|   (V1 fixed at 0°)
  //
  //     Minimise ε(θ₀,θ₂) = Σ (|V̂_k| − |V_k|)²   over phases k ∈ {a,b,c}
  //     with V̂_a = V0 + V1 + V2,
  //          V̂_b = V0 + a²V1 + aV2,
  //          V̂_c = V0 + aV1 + a²V2.
  //
  //     Grid search (5° coarse → 0.5° fine) is O(5.5k) ops — faster than
  //     spinning up a proper solver and fully robust.
  // ==========================================================================
  const { theta0, theta2 } = solveSequenceAngles(
    V0m,
    V1m,
    V2m,
    voltageA,
    voltageB,
    voltageC,
  );

  const V1c = cPolar(V1m, 0);
  const V2c = cPolar(V2m, theta2);
  const V0c = cPolar(V0m, theta0);

  // Reconstructed phasors
  const VaRec = cAdd(cAdd(V0c, V1c), V2c);
  const VbRec = cAdd(cAdd(V0c, cMul(A2, V1c)), cMul(A, V2c));
  const VcRec = cAdd(cAdd(V0c, cMul(A, V1c)), cMul(A2, V2c));

  // Keep user-provided magnitudes (guarantees chart consistency with inputs),
  // take angles from the reconstruction.
  const phasors = {
    Va: { mag: voltageA, ang: cAng(VaRec) },
    Vb: { mag: voltageB, ang: cAng(VbRec) },
    Vc: { mag: voltageC, ang: cAng(VcRec) },
    V0: { mag: V0m, ang: theta0 },
    V1: { mag: V1m, ang: 0 },
    V2: { mag: V2m, ang: theta2 },
  };

  // ==========================================================================
  // 3.  Unbalance factors & deviations
  // ==========================================================================
  const safeV1 = Math.max(V1m, EPS);
  const v2Ratio = V2m / safeV1; // Negative-sequence unbalance factor (V2/V1)
  const v0Ratio = V0m / safeV1; // Zero-sequence ratio (V0/V1)

  // NEMA MG1 definition of voltage unbalance (max deviation from mean / mean)
  const vAvg = (voltageA + voltageB + voltageC) / 3;
  const vMaxDev = Math.max(
    Math.abs(voltageA - vAvg),
    Math.abs(voltageB - vAvg),
    Math.abs(voltageC - vAvg),
  );
  const nemaUnbalance = (vMaxDev / Math.max(vAvg, EPS)) * 100; // %

  // Per-phase deviation from nominal (line-to-neutral)
  const vDev = [
    ((voltageA - vBase) / vBase) * 100,
    ((voltageB - vBase) / vBase) * 100,
    ((voltageC - vBase) / vBase) * 100,
  ];

  // Current unbalance
  const iAvg = (currentA + currentB + currentC) / 3;
  const iMaxDev = Math.max(
    Math.abs(currentA - iAvg),
    Math.abs(currentB - iAvg),
    Math.abs(currentC - iAvg),
  );
  const iUnbalance = iAvg > EPS ? (iMaxDev / iAvg) * 100 : 0; // %

  // Elevated-phase count (used to discriminate SLG from LLG)
  const phaseCurrents = [currentA, currentB, currentC];
  const iMin = Math.max(Math.min(...phaseCurrents), EPS);
  const elevatedPhaseCount = phaseCurrents.filter(
    (i) => i > 2 * iMin && i > iAvg * 1.3,
  ).length;

  // ==========================================================================
  // 4.  Power & power factor
  // ==========================================================================
  const apparentPower = Math.hypot(activePower, reactivePower); // kVA
  const pf = activePower / Math.max(apparentPower, EPS); // -1..1
  const pfAngleRad = Math.atan2(reactivePower, activePower); // rad
  const pfAngleDeg = pfAngleRad * DEG; // deg

  // ==========================================================================
  // 5.  Fault classification (sequence-component based, voltage-tier thresholds)
  //
  //     Matches lambda.mjs::classifyFaultDeterministic — both must agree.
  //     Decision tree priority:
  //        1. 3Φ symmetrical : deep symmetric V dip, V2 & V0 both negligible
  //        2. LLG            : V0 & V2 both > seqFault
  //        3. SLG            : V0 > seqFault
  //        4. LL             : V2 > seqFault, V0 negligible
  //        5. V unbalance    : sequence > seqMild OR NEMA > vUnbalanceSevere
  //        6. I unbalance    : current_imbalance > tier band
  //        7. Low PF         : pf < 0.85
  //        8. Mild V unbal.  : NEMA > vUnbalanceLow
  //        9. Normal
  // ==========================================================================
  const v2Pct = v2Ratio * 100;
  const v0Pct = v0Ratio * 100;
  const vDipAvg = (vDev[0] + vDev[1] + vDev[2]) / 3; // signed %

  const thr = getThresholds(sysVoltageLevel);

  type Severity = "none" | "low" | "medium" | "high" | "critical";
  let faultType = "Normal";
  let faultColor = "#10b981";
  let faultSeverity: Severity = "none";

  if (vDipAvg < -20 && v2Pct < thr.seqMild && v0Pct < thr.seqMild) {
    faultType = "Three-Phase Fault (3Φ)";
    faultColor = "#dc2626";
    faultSeverity = "critical";
  } else if (v0Pct > thr.seqFault && v2Pct > thr.seqFault) {
    // Textbook SLG has V0 ≈ V2 ≈ V1/2, so we cannot separate from LLG by
    // voltage alone — use phase-current pattern as the tiebreaker.
    if (elevatedPhaseCount >= 2) {
      faultType = "Double Line-to-Ground (LLG)";
      faultColor = "#dc2626";
      faultSeverity = "critical";
    } else {
      faultType = "Single Line-to-Ground (SLG)";
      faultColor = "#f97316";
      faultSeverity = "high";
    }
  } else if (v0Pct > thr.seqFault) {
    faultType = "Single Line-to-Ground (SLG)";
    faultColor = "#f97316";
    faultSeverity = "high";
  } else if (v2Pct > thr.seqFault && v0Pct < thr.seqMild) {
    faultType = "Line-to-Line (LL)";
    faultColor = "#eab308";
    faultSeverity = "high";
  } else if (
    v2Pct > thr.seqMild ||
    v0Pct > thr.seqMild ||
    nemaUnbalance > thr.vUnbalanceSevere
  ) {
    faultType = "Voltage Unbalance";
    faultColor = "#f59e0b";
    faultSeverity = "medium";
  } else if (iUnbalance > thr.iUnbalanceCrit) {
    faultType = "Severe Current Unbalance";
    faultColor = "#f97316";
    faultSeverity = "high";
  } else if (iUnbalance > thr.iUnbalanceHigh) {
    faultType = "Current Unbalance (Load)";
    faultColor = "#f59e0b";
    faultSeverity = "medium";
  } else if (pf < 0.85 && pf > 0) {
    faultType = "Low Power Factor";
    faultColor = "#8b5cf6";
    faultSeverity = "low";
  } else if (nemaUnbalance > thr.vUnbalanceLow) {
    faultType = "Mild Voltage Unbalance";
    faultColor = "#facc15";
    faultSeverity = "low";
  }

  const fault = { faultType, faultColor, faultSeverity };

  // ==========================================================================
  // 6.  Time-domain waveform reconstruction
  //
  //     v_k(t) = √2 · |V_k| · cos(ωt + φ_k)
  //     i_k(t) = √2 · |I_k| · cos(ωt + φ_k − ψ)   where ψ = pfAngleRad
  //     p(t)   = Σ v_k(t)·i_k(t)                  ← correct instantaneous power,
  //                                                  shows 2ω ripple under unbalance
  // ==========================================================================
  const f = nominalFreq;
  const omega = 2 * Math.PI * f;
  const T = 1 / f;
  const nCycles = 3;
  const samplesPerCycle = 128;
  const N = nCycles * samplesPerCycle;

  const t = new Array<number>(N);
  const waveVa = new Array<number>(N);
  const waveVb = new Array<number>(N);
  const waveVc = new Array<number>(N);
  const waveIa = new Array<number>(N);
  const waveIb = new Array<number>(N);
  const waveIc = new Array<number>(N);
  const pTotal = new Array<number>(N);

  const phiVa = phasors.Va.ang;
  const phiVb = phasors.Vb.ang;
  const phiVc = phasors.Vc.ang;
  const phiIa = phiVa - pfAngleRad;
  const phiIb = phiVb - pfAngleRad;
  const phiIc = phiVc - pfAngleRad;

  const VaPk = SQRT2 * voltageA;
  const VbPk = SQRT2 * voltageB;
  const VcPk = SQRT2 * voltageC;
  const IaPk = SQRT2 * currentA;
  const IbPk = SQRT2 * currentB;
  const IcPk = SQRT2 * currentC;

  for (let k = 0; k < N; k++) {
    const tk = (k / samplesPerCycle) * T;
    const w = omega * tk;
    t[k] = tk;

    const va = VaPk * Math.cos(w + phiVa);
    const vb = VbPk * Math.cos(w + phiVb);
    const vc = VcPk * Math.cos(w + phiVc);
    waveVa[k] = va;
    waveVb[k] = vb;
    waveVc[k] = vc;

    const ia = IaPk * Math.cos(w + phiIa);
    const ib = IbPk * Math.cos(w + phiIb);
    const ic = IcPk * Math.cos(w + phiIc);
    waveIa[k] = ia;
    waveIb[k] = ib;
    waveIc[k] = ic;

    // Instantaneous three-phase power in kW
    pTotal[k] = (va * ia + vb * ib + vc * ic) / 1000;
  }

  const waveforms = {
    t,
    waveVa,
    waveVb,
    waveVc,
    waveIa,
    waveIb,
    waveIc,
    pTotal,
  };

  // ==========================================================================
  // 7.  Health scores  (0..100, used by radar chart)
  //
  //     pfScore         : linear in |pf|   (pf 1.0 → 100, pf 0.0 → 0)
  //     vBalance        : penalise NEMA unbalance   (≈ -15 pts / %)
  //     negSequenceScore: penalise V2/V1             (≈ -8 pts / %)
  // ==========================================================================
  const pfScore = clamp(Math.abs(pf) * 100, 0, 100);
  const vBalance = clamp(100 - nemaUnbalance * 15, 0, 100);
  const negSequenceScore = clamp(100 - v2Pct * 8, 0, 100);
  const health = { pfScore, vBalance, negSequenceScore };

  // ==========================================================================
  // 8.  Return the contract shape expected by the UI
  // ==========================================================================
  return {
    phasors,
    ratios: { v2Ratio, v0Ratio, nemaUnbalance, iUnbalance },
    vDev,
    power: {
      pf,
      pfAngleRad,
      pfAngleDeg,
      apparentPower,
      activePower,
      reactivePower,
    },
    fault,
    waveforms,
    health,
    puBases: { vBase, iBase, zBase, zFault },
  };
}

// ----------------------------------------------------------------------------
//  Sub-solver: find (θ₀, θ₂) minimising the phase-magnitude residual
// ----------------------------------------------------------------------------
function solveSequenceAngles(
  V0m: number,
  V1m: number,
  V2m: number,
  Vam: number,
  Vbm: number,
  Vcm: number,
): { theta0: number; theta2: number } {
  // Fast exit: pure positive sequence → return trivial angles
  if (V0m < EPS && V2m < EPS) {
    return { theta0: 0, theta2: 0 };
  }

  const residual = (t0: number, t2: number) => {
    const V1c = cPolar(V1m, 0);
    const V2c = cPolar(V2m, t2);
    const V0c = cPolar(V0m, t0);
    const Va = cAdd(cAdd(V0c, V1c), V2c);
    const Vb = cAdd(cAdd(V0c, cMul(A2, V1c)), cMul(A, V2c));
    const Vc = cAdd(cAdd(V0c, cMul(A, V1c)), cMul(A2, V2c));
    return (
      (cMag(Va) - Vam) ** 2 + (cMag(Vb) - Vbm) ** 2 + (cMag(Vc) - Vcm) ** 2
    );
  };

  // --- Coarse sweep, 5° resolution ------------------------------------------
  let bestT0 = 0,
    bestT2 = 0,
    bestErr = Infinity;
  const coarse = 5; // degrees
  for (let t2d = -180; t2d <= 180; t2d += coarse) {
    const t2 = t2d * RAD;
    for (let t0d = -180; t0d <= 180; t0d += coarse) {
      const t0 = t0d * RAD;
      const err = residual(t0, t2);
      if (err < bestErr) {
        bestErr = err;
        bestT0 = t0;
        bestT2 = t2;
      }
    }
  }

  // --- Fine refinement, 0.5° over ±5° around the coarse minimum -------------
  const fine = 0.5;
  for (let dt2 = -coarse; dt2 <= coarse; dt2 += fine) {
    for (let dt0 = -coarse; dt0 <= coarse; dt0 += fine) {
      const t0 = bestT0 + dt0 * RAD;
      const t2 = bestT2 + dt2 * RAD;
      const err = residual(t0, t2);
      if (err < bestErr) {
        bestErr = err;
        bestT0 = t0;
        bestT2 = t2;
      }
    }
  }

  return { theta0: bestT0, theta2: bestT2 };
}

// ----------------------------------------------------------------------------
function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}
