"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// ── Extended FormData matching parent component ──
interface FormData {
  voltageA: number;
  voltageB: number;
  voltageC: number;
  currentA: number;
  currentB: number;
  currentC: number;
  seqVoltagePositive: number;
  seqVoltageNegative: number;
  seqVoltageZero: number;
  seqPositive: number;
  seqNegative: number;
  seqZero: number;
  activePower: number;
  reactivePower: number;
  systemVoltageLevel: number;
  xrRatio: number;
  faultInceptionAngle: number;
  nominalFrequency: number;
  ctAccuracyClass: number;
  faultMVABase: number;
}

interface ElectricalGraphsProps {
  data: FormData;
}

// ==========================================================================
// Fault Classification Thresholds — parameterized by system voltage level
// ==========================================================================
// Based on IEEE C37.113-2015 (Guide for Protective Relay Applications to
// Transmission Lines) and IEC 60255-121 (Measuring relays — Functional
// requirements for distance protection).
//
// Higher voltage systems (33kV+) use tighter thresholds because:
//   - CT/PT accuracy is better (class 0.2 vs 1.0)
//   - Sequence filters in numerical relays have lower noise floor
//   - False trips are more consequential (wider outage impact)
//
// Lower voltage systems (< 1kV) need looser thresholds because:
//   - CT saturation is more common at high fault currents
//   - Load unbalance is inherently higher (single-phase loads)
//   - Measurement noise floor is higher relative to signal

interface FaultThresholds {
  zeroHigh: number; // I0/I1 or V0/V1 ratio → LG fault confirmed
  negHigh: number; // I2/I1 or V2/V1 ratio → LL fault confirmed
  mildThreshold: number; // Below this → normal; above → mild unbalance
  label: string;
}

function getThresholds(systemVoltageKV: number): FaultThresholds {
  if (systemVoltageKV >= 33) {
    // EHV/HV: tight thresholds, high-accuracy CTs (IEC 61869-2 class 0.2S)
    return {
      zeroHigh: 0.08,
      negHigh: 0.08,
      mildThreshold: 0.025,
      label: "EHV/HV (≥33kV)",
    };
  } else if (systemVoltageKV >= 11) {
    // MV distribution: moderate thresholds
    return {
      zeroHigh: 0.12,
      negHigh: 0.12,
      mildThreshold: 0.04,
      label: "MV (11–33kV)",
    };
  } else if (systemVoltageKV >= 1) {
    // LV industrial: standard thresholds
    return {
      zeroHigh: 0.15,
      negHigh: 0.15,
      mildThreshold: 0.05,
      label: "LV Industrial (1–11kV)",
    };
  } else {
    // Sub-1kV distribution boards: loose thresholds due to inherent load unbalance
    return {
      zeroHigh: 0.2,
      negHigh: 0.2,
      mildThreshold: 0.07,
      label: "LV Distribution (<1kV)",
    };
  }
}

// ==========================================================================
// Goertzel DFT — efficient single-frequency magnitude extraction
// ==========================================================================
// Full FFT is O(N log N) but we only need magnitudes at specific harmonic
// frequencies. Goertzel algorithm is O(N) per frequency and numerically
// stable for our sample sizes (200–400 points).

function goertzelMagnitude(
  signal: number[],
  targetFreq: number,
  sampleRate: number,
): number {
  const N = signal.length;
  const k = Math.round((targetFreq * N) / sampleRate);
  const w = (2 * Math.PI * k) / N;
  const coeff = 2 * Math.cos(w);
  let s0 = 0,
    s1 = 0,
    s2 = 0;

  for (let i = 0; i < N; i++) {
    s0 = signal[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }

  const power = s1 * s1 + s2 * s2 - coeff * s1 * s2;
  return (2 * Math.sqrt(Math.abs(power))) / N;
}

export default function AdvancedElectricalGraphs({
  data,
}: ElectricalGraphsProps) {
  const computations = useMemo(() => {
    const freq = data.nominalFrequency || 50;
    const omega = 2 * Math.PI * freq;
    const thresholds = getThresholds(data.systemVoltageLevel);

    // ──────────────────────────────────────────────
    // 1. Core Power Computations
    // ──────────────────────────────────────────────
    const apparentPower = Math.sqrt(
      data.activePower ** 2 + data.reactivePower ** 2,
    );
    const pf = apparentPower === 0 ? 0 : data.activePower / apparentPower;
    const phiRad =
      apparentPower === 0
        ? 0
        : Math.acos(Math.min(1, pf)) * Math.sign(data.reactivePower);
    const phiDeg = phiRad * (180 / Math.PI);

    // ──────────────────────────────────────────────
    // 2. Complex Impedance per Phase (R + jX)
    // ──────────────────────────────────────────────
    // Z = V/I gives magnitude. Phase angle from power factor gives R and X.
    // This distinguishes arcing faults (high R, low X) from bolted faults
    // (low R, high X) — critical for fault classification.
    const zMagA = data.currentA === 0 ? 0 : data.voltageA / data.currentA;
    const zMagB = data.currentB === 0 ? 0 : data.voltageB / data.currentB;
    const zMagC = data.currentC === 0 ? 0 : data.voltageC / data.currentC;

    const rA = zMagA * Math.cos(Math.abs(phiRad));
    const xA = zMagA * Math.sin(Math.abs(phiRad));
    const rB = zMagB * Math.cos(Math.abs(phiRad));
    const xB = zMagB * Math.sin(Math.abs(phiRad));
    const rC = zMagC * Math.cos(Math.abs(phiRad));
    const xC = zMagC * Math.sin(Math.abs(phiRad));

    const avgR = (rA + rB + rC) / 3;
    const avgX = (xA + xB + xC) / 3;
    const avgZMag = (zMagA + zMagB + zMagC) / 3;
    const impedanceAngleDeg =
      avgZMag === 0 ? 0 : Math.atan2(avgX, avgR) * (180 / Math.PI);

    // ──────────────────────────────────────────────
    // 3. Dual-Sequence Fault Classification
    // ──────────────────────────────────────────────
    // Modern numerical relays (e.g. SEL-421, ABB REL670) use BOTH voltage
    // and current sequence ratios for discrimination.
    // V2/V1 is more sensitive to remote faults; I2/I1 is better for close-in.
    // Combined scoring gives robust classification.

    const vSeqTotal = data.seqVoltagePositive || 1;
    const iSeqTotal = data.seqPositive || 1;

    // Voltage sequence ratios
    const v2v1 = data.seqVoltageNegative / vSeqTotal;
    const v0v1 = data.seqVoltageZero / vSeqTotal;

    // Current sequence ratios
    const i2i1 = data.seqNegative / iSeqTotal;
    const i0i1 = data.seqZero / iSeqTotal;

    // Combined ratios (average of V and I sequence ratios for robust detection)
    const zeroRatio = (v0v1 + i0i1) / 2;
    const negRatio = (v2v1 + i2i1) / 2;

    let faultType = "Normal";
    let faultColor = "#10b981";
    if (zeroRatio > thresholds.zeroHigh && negRatio > thresholds.negHigh) {
      faultType = "LLG Fault";
      faultColor = "#ef4444";
    } else if (zeroRatio > thresholds.zeroHigh) {
      faultType = "LG Fault (Phase A)";
      faultColor = "#f97316";
    } else if (negRatio > thresholds.negHigh) {
      faultType = "LL Fault (B-C)";
      faultColor = "#eab308";
    } else if (
      negRatio > thresholds.mildThreshold ||
      zeroRatio > thresholds.mildThreshold
    ) {
      faultType = "Mild Unbalance";
      faultColor = "#f59e0b";
    }

    const isFaulted = faultType !== "Normal";

    // ──────────────────────────────────────────────
    // 4. Fault MVA & Fault Current Calculation
    // ──────────────────────────────────────────────
    const systemVoltageV = data.systemVoltageLevel * 1000; // kV → V
    const faultMVA = data.faultMVABase || 25;
    // I_fault = MVA_base / (√3 × V_line) × 1e6
    const faultCurrentMag =
      systemVoltageV > 0
        ? (faultMVA * 1e6) / (Math.sqrt(3) * systemVoltageV)
        : 0;

    // ──────────────────────────────────────────────
    // 5. Frequency Deviation (momentary dip under fault)
    // ──────────────────────────────────────────────
    // Under fault conditions, generators decelerate momentarily.
    // Δf ≈ (P_fault / P_system) × (f_nom / (2H)) × Δt
    // Simplified: proportional to fault severity
    const freqDeviation = isFaulted ? -(zeroRatio + negRatio) * 0.8 : 0; // Hz
    const actualFreq = freq + freqDeviation;

    // ──────────────────────────────────────────────
    // 6. Waveform Generation — with DC offset, harmonics, transient envelope
    // ──────────────────────────────────────────────
    const xrRatio = data.xrRatio || 5.0;
    const inceptionAngleRad = (data.faultInceptionAngle || 0) * (Math.PI / 180);

    // DC offset time constant: τ = X / (R × ω) = (X/R) / ω
    const tau = xrRatio / omega;

    // Fault-derived waveform modifiers
    const dipA = 1 - zeroRatio * 0.85;
    const dipB = 1 - negRatio * 0.45;
    const dipC = 1 - negRatio * 0.45;
    const faultShiftB = negRatio * (Math.PI / 4);
    const faultShiftC = -negRatio * (Math.PI / 4);

    // Harmonic injection levels (% of fundamental)
    // During faults, transformer saturation and arcing inject odd harmonics.
    // Typical values from IEEE Std 519-2022:
    const h3 = isFaulted ? 0.04 + zeroRatio * 0.12 : 0.015; // 3rd harmonic
    const h5 = isFaulted ? 0.025 + negRatio * 0.08 : 0.008; // 5th harmonic
    const h7 = isFaulted ? 0.015 + negRatio * 0.05 : 0.004; // 7th harmonic

    const numSamples = 300;
    const duration = 2 / freq; // 2 cycles
    const sampleRate = numSamples / duration;
    const timePts: number[] = new Array(numSamples);
    const waveVa: number[] = new Array(numSamples);
    const waveVb: number[] = new Array(numSamples);
    const waveVc: number[] = new Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
      const t = (i * duration) / numSamples;
      timePts[i] = t;
      const wt = omega * t;

      // Phase A — with LG fault transient (DC offset + exponential decay envelope)
      const dcOffsetA = isFaulted
        ? data.voltageA *
          Math.SQRT2 *
          zeroRatio *
          0.6 *
          Math.sin(inceptionAngleRad) *
          Math.exp(-t / tau)
        : 0;
      // Transient spike envelope: peaks at t=0 and decays (simulates initial fault transient)
      const transientEnvelopeA = isFaulted
        ? 1 + zeroRatio * 0.3 * Math.exp(-t / (tau * 0.5))
        : 1;

      waveVa[i] =
        data.voltageA *
          Math.SQRT2 *
          dipA *
          transientEnvelopeA *
          (Math.sin(wt) +
            h3 * Math.sin(3 * wt) +
            h5 * Math.sin(5 * wt) +
            h7 * Math.sin(7 * wt)) +
        dcOffsetA;

      // Phase B
      const dcOffsetB = isFaulted
        ? data.voltageB *
          Math.SQRT2 *
          negRatio *
          0.3 *
          Math.sin(inceptionAngleRad - (2 * Math.PI) / 3) *
          Math.exp(-t / tau)
        : 0;
      waveVb[i] =
        data.voltageB *
          Math.SQRT2 *
          dipB *
          (Math.sin(wt - (2 * Math.PI) / 3 + faultShiftB) +
            h3 * Math.sin(3 * (wt - (2 * Math.PI) / 3 + faultShiftB)) +
            h5 * Math.sin(5 * (wt - (2 * Math.PI) / 3 + faultShiftB)) +
            h7 * Math.sin(7 * (wt - (2 * Math.PI) / 3 + faultShiftB))) +
        dcOffsetB;

      // Phase C
      const dcOffsetC = isFaulted
        ? data.voltageC *
          Math.SQRT2 *
          negRatio *
          0.3 *
          Math.sin(inceptionAngleRad + (2 * Math.PI) / 3) *
          Math.exp(-t / tau)
        : 0;
      waveVc[i] =
        data.voltageC *
          Math.SQRT2 *
          dipC *
          (Math.sin(wt + (2 * Math.PI) / 3 + faultShiftC) +
            h3 * Math.sin(3 * (wt + (2 * Math.PI) / 3 + faultShiftC)) +
            h5 * Math.sin(5 * (wt + (2 * Math.PI) / 3 + faultShiftC)) +
            h7 * Math.sin(7 * (wt + (2 * Math.PI) / 3 + faultShiftC))) +
        dcOffsetC;
    }

    // ──────────────────────────────────────────────
    // 7. Harmonic Spectrum via Goertzel Algorithm
    // ──────────────────────────────────────────────
    const harmonicOrders = [1, 3, 5, 7, 9, 11];
    const harmonicsA = harmonicOrders.map((h) => ({
      order: h,
      magnitude: goertzelMagnitude(waveVa, h * freq, sampleRate),
    }));
    const fundamentalMagA = harmonicsA[0].magnitude || 1;
    const harmonicsAPct = harmonicsA.map((h) => ({
      order: h.order,
      pct: (h.magnitude / fundamentalMagA) * 100,
    }));

    // THD calculation: √(Σ V_h²) / V_1 × 100%
    const thdA =
      (Math.sqrt(
        harmonicsA.slice(1).reduce((sum, h) => sum + h.magnitude ** 2, 0),
      ) /
        fundamentalMagA) *
      100;

    // ──────────────────────────────────────────────
    // 8. Phasor values (fault-modified)
    // ──────────────────────────────────────────────
    const phasorMagA = data.voltageA * dipA;
    const phasorMagB = data.voltageB * dipB;
    const phasorMagC = data.voltageC * dipC;
    const phasorAngleB = -120 + faultShiftB * (180 / Math.PI);
    const phasorAngleC = 120 + faultShiftC * (180 / Math.PI);

    return {
      apparentPower,
      pf,
      phiDeg,
      avgR,
      avgX,
      avgZMag,
      impedanceAngleDeg,
      timePts,
      waveVa,
      waveVb,
      waveVc,
      faultType,
      faultColor,
      isFaulted,
      zeroRatio,
      negRatio,
      v2v1,
      v0v1,
      i2i1,
      i0i1,
      thresholds,
      phasorMagA,
      phasorMagB,
      phasorMagC,
      phasorAngleB,
      phasorAngleC,
      faultCurrentMag,
      faultMVA,
      freqDeviation,
      actualFreq,
      xrRatio,
      harmonicsAPct,
      thdA,
      tau,
    };
  }, [data]);

  const layoutBase = {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "Inter, sans-serif", color: "#1f2937" },
    margin: { t: 50, b: 40, l: 50, r: 30 },
    autosize: true,
  };

  const { isFaulted } = computations;

  return (
    <div className="space-y-6 mt-8">
      <div className="border-b pb-3 mb-4 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Advanced Power System Analytics
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Dual-sequence fault detection · Complex impedance · Harmonic
            decomposition · Thresholds: {computations.thresholds.label}
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border"
          style={{
            backgroundColor: computations.faultColor + "1a",
            borderColor: computations.faultColor,
            color: computations.faultColor,
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: computations.faultColor }}
          />
          {computations.faultType}
        </div>
      </div>

      {/* ── Metric Cards: extended with complex impedance, fault MVA, freq deviation ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-l-4 border-blue-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            System PF
          </p>
          <p
            className={`text-2xl font-bold ${computations.pf < 0.85 ? "text-red-600" : "text-gray-900"}`}
          >
            {computations.pf.toFixed(3)}{" "}
            {data.reactivePower > 0 ? "(Lag)" : "(Lead)"}
          </p>
        </div>
        <div className="bg-white border-l-4 border-purple-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Complex Impedance
          </p>
          <p className="text-lg font-bold text-gray-900">
            {computations.avgR.toFixed(2)} + j{computations.avgX.toFixed(2)} Ω
          </p>
          <p className="text-xs text-gray-400">
            |Z| = {computations.avgZMag.toFixed(2)} Ω ∠
            {computations.impedanceAngleDeg.toFixed(1)}°
          </p>
        </div>
        <div className="bg-white border-l-4 border-green-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Total Apparent Power
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {computations.apparentPower.toFixed(2)} kVA
          </p>
        </div>
        <div className="bg-white border-l-4 border-amber-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Fault Level
          </p>
          <p className="text-lg font-bold text-gray-900">
            {computations.faultMVA.toFixed(1)} MVA
          </p>
          <p className="text-xs text-gray-400">
            I<sub>fault</sub> = {computations.faultCurrentMag.toFixed(0)} A ·
            X/R = {computations.xrRatio}
          </p>
        </div>
      </div>

      {/* ── Second row: Freq deviation, DC offset τ, THD, Phase Angle ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-l-4 border-cyan-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            System Frequency
          </p>
          <p
            className={`text-2xl font-bold ${Math.abs(computations.freqDeviation) > 0.3 ? "text-red-600" : "text-gray-900"}`}
          >
            {computations.actualFreq.toFixed(2)} Hz
          </p>
          <p className="text-xs text-gray-400">
            Δf = {computations.freqDeviation >= 0 ? "+" : ""}
            {computations.freqDeviation.toFixed(3)} Hz
          </p>
        </div>
        <div className="bg-white border-l-4 border-rose-400 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            DC Offset τ
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {(computations.tau * 1000).toFixed(1)} ms
          </p>
          <p className="text-xs text-gray-400">
            5τ decay = {(computations.tau * 5 * 1000).toFixed(0)} ms
          </p>
        </div>
        <div className="bg-white border-l-4 border-violet-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            THD (Phase A)
          </p>
          <p
            className={`text-2xl font-bold ${computations.thdA > 5 ? "text-red-600" : computations.thdA > 3 ? "text-amber-600" : "text-gray-900"}`}
          >
            {computations.thdA.toFixed(2)}%
          </p>
          <p className="text-xs text-gray-400">
            IEEE 519 limit: 5% (V), 8% (I)
          </p>
        </div>
        <div className="bg-white border-l-4 border-indigo-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Phase Angle (θ)
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {Math.abs(computations.phiDeg).toFixed(2)}°
          </p>
          <p className="text-xs text-gray-400">
            {Math.abs(computations.impedanceAngleDeg) > 60
              ? "Inductive (bolted)"
              : Math.abs(computations.impedanceAngleDeg) < 30
                ? "Resistive (arcing)"
                : "Mixed"}
          </p>
        </div>
      </div>

      {/* ── Sequence Ratios — dual V+I analysis (only when faulted) ── */}
      {isFaulted && (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg border"
          style={{
            borderColor: computations.faultColor + "66",
            backgroundColor: computations.faultColor + "0d",
          }}
        >
          {[
            {
              label: "V₂/V₁",
              value: computations.v2v1,
              threshold: computations.thresholds.negHigh,
            },
            {
              label: "V₀/V₁",
              value: computations.v0v1,
              threshold: computations.thresholds.zeroHigh,
            },
            {
              label: "I₂/I₁",
              value: computations.i2i1,
              threshold: computations.thresholds.negHigh,
            },
            {
              label: "I₀/I₁",
              value: computations.i0i1,
              threshold: computations.thresholds.zeroHigh,
            },
          ].map(({ label, value, threshold }) => (
            <div key={label} className="bg-white rounded-md p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {label}
              </p>
              <p
                className="text-xl font-bold"
                style={{
                  color:
                    value > threshold ? computations.faultColor : "#1e293b",
                }}
              >
                {(value * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400">
                Threshold: {(threshold * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Primary Graphs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Voltage Waveforms with DC offset and harmonics */}
        <div
          className="border rounded-md p-4 bg-white shadow-sm h-[400px]"
          style={{
            borderColor: isFaulted ? computations.faultColor + "55" : "#e5e7eb",
          }}
        >
          <Plot
            data={[
              {
                x: computations.timePts,
                y: computations.waveVa,
                type: "scatter",
                mode: "lines",
                name: "Phase A",
                line: { color: "#ef4444", width: 2 },
              },
              {
                x: computations.timePts,
                y: computations.waveVb,
                type: "scatter",
                mode: "lines",
                name: "Phase B",
                line: { color: "#eab308", width: 2 },
              },
              {
                x: computations.timePts,
                y: computations.waveVc,
                type: "scatter",
                mode: "lines",
                name: "Phase C",
                line: { color: "#3b82f6", width: 2 },
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: isFaulted
                  ? `Voltage Waveform — <span style="color:${computations.faultColor}">${computations.faultType}</span> · DC τ=${(computations.tau * 1000).toFixed(1)}ms`
                  : `Simulated Instantaneous Voltage (${data.nominalFrequency}Hz)`,
                font: { size: 13 },
              },
              xaxis: {
                title: { text: "Time (s)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#d1d5db",
              },
              yaxis: {
                title: { text: "Voltage (V)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#9ca3af",
              },
              showlegend: true,
              legend: { orientation: "h", y: -0.2, x: 0.2 },
              annotations: isFaulted
                ? [
                    {
                      x: computations.timePts[40],
                      y: 0,
                      text: `${computations.faultType} · Inception ∠=${data.faultInceptionAngle}°`,
                      showarrow: false,
                      font: { color: computations.faultColor, size: 10 },
                      bgcolor: computations.faultColor + "22",
                      bordercolor: computations.faultColor,
                      borderwidth: 1,
                    },
                  ]
                : [],
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 2. Polar Phasor Diagram */}
        <div
          className="border rounded-md p-4 bg-white shadow-sm h-[400px]"
          style={{
            borderColor: isFaulted ? computations.faultColor + "55" : "#e5e7eb",
          }}
        >
          <Plot
            data={[
              {
                type: "scatterpolar",
                r: [0, computations.phasorMagA],
                theta: [0, 0],
                mode: "lines+markers",
                name: "Va",
                line: { color: "#ef4444", width: 3 },
                marker: { size: 8 },
              },
              {
                type: "scatterpolar",
                r: [0, computations.phasorMagB],
                theta: [0, computations.phasorAngleB],
                mode: "lines+markers",
                name: "Vb",
                line: { color: "#eab308", width: 3 },
                marker: { size: 8 },
              },
              {
                type: "scatterpolar",
                r: [0, computations.phasorMagC],
                theta: [0, computations.phasorAngleC],
                mode: "lines+markers",
                name: "Vc",
                line: { color: "#3b82f6", width: 3 },
                marker: { size: 8 },
              },
              {
                type: "scatterpolar",
                r: [0, data.currentA],
                theta: [0, -computations.phiDeg],
                mode: "lines+markers",
                name: "Ia",
                line: { color: "#fca5a5", width: 2, dash: "dot" },
                marker: { symbol: "diamond", size: 6 },
              },
              {
                type: "scatterpolar",
                r: [0, data.currentB],
                theta: [0, computations.phasorAngleB - computations.phiDeg],
                mode: "lines+markers",
                name: "Ib",
                line: { color: "#fef08a", width: 2, dash: "dot" },
                marker: { symbol: "diamond", size: 6 },
              },
              {
                type: "scatterpolar",
                r: [0, data.currentC],
                theta: [0, computations.phasorAngleC - computations.phiDeg],
                mode: "lines+markers",
                name: "Ic",
                line: { color: "#93c5fd", width: 2, dash: "dot" },
                marker: { symbol: "diamond", size: 6 },
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: isFaulted
                  ? `Phasor Diagram — <span style="color:${computations.faultColor}">Unbalanced</span>`
                  : "System Phasor Diagram (V & I)",
                font: { size: 14 },
              },
              polar: {
                angularaxis: {
                  direction: "counterclockwise",
                  rotation: 0,
                  gridcolor: "#e5e7eb",
                },
                radialaxis: { visible: true, gridcolor: "#e5e7eb" },
              },
              showlegend: true,
              legend: { orientation: "h", y: -0.2, x: 0.1 },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 3. Harmonic Spectrum (Goertzel DFT) — NEW */}
        <div className="border rounded-md p-4 bg-white shadow-sm h-[400px]">
          <Plot
            data={[
              {
                x: computations.harmonicsAPct.map((h) => `H${h.order}`),
                y: computations.harmonicsAPct.map((h) => h.pct),
                type: "bar",
                marker: {
                  color: computations.harmonicsAPct.map((h) =>
                    h.order === 1
                      ? "#3b82f6"
                      : h.pct > 5
                        ? "#ef4444"
                        : h.pct > 3
                          ? "#f59e0b"
                          : "#10b981",
                  ),
                },
                text: computations.harmonicsAPct.map(
                  (h) => `${h.pct.toFixed(1)}%`,
                ),
                textposition: "outside" as const,
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: `Harmonic Spectrum (Phase A) · THD = ${computations.thdA.toFixed(2)}%`,
                font: { size: 13 },
              },
              xaxis: { title: { text: "Harmonic Order" } },
              yaxis: {
                title: { text: "% of Fundamental" },
                gridcolor: "#f3f4f6",
              },
              shapes: [
                // IEEE 519 5% individual harmonic limit line
                {
                  type: "line",
                  y0: 5,
                  y1: 5,
                  x0: -0.5,
                  x1: 5.5,
                  line: { color: "#ef4444", dash: "dot", width: 1.5 },
                },
              ],
              annotations: [
                {
                  x: 5,
                  y: 5,
                  text: "IEEE 519 (5%)",
                  showarrow: false,
                  font: { size: 9, color: "#ef4444" },
                  yshift: 10,
                },
              ],
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 4. Power Triangle */}
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm h-[400px]">
          <Plot
            data={[
              {
                x: [0, data.activePower, data.activePower, 0],
                y: [0, 0, data.reactivePower, 0],
                fill: "toself",
                fillcolor: "rgba(16, 185, 129, 0.2)",
                type: "scatter",
                mode: "text+lines+markers",
                line: { color: "#10b981", width: 3 },
                text: [
                  "",
                  `P: ${data.activePower} kW`,
                  `S: ${computations.apparentPower.toFixed(1)} kVA\nQ: ${data.reactivePower} kVAr`,
                  "",
                ],
                // @ts-expect-error Plotly TS defs missing array support for textposition
                textposition: [
                  "bottom left",
                  "bottom right",
                  "top right",
                  "bottom left",
                ],
                hoverinfo: "none",
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: "Power Triangle (Active vs. Reactive vs. Apparent)",
                font: { size: 15 },
              },
              xaxis: {
                title: { text: "Active Power (kW)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#9ca3af",
              },
              yaxis: {
                title: { text: "Reactive Power (kVAr)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#9ca3af",
              },
              showlegend: false,
              annotations: [
                {
                  x: data.activePower / 2,
                  y: 0,
                  text: `θ = ${Math.abs(computations.phiDeg).toFixed(1)}°`,
                  showarrow: true,
                  arrowhead: 2,
                  ax: 0,
                  ay: -40,
                },
              ],
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
