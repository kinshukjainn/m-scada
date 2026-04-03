"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Waves, Activity, AlertTriangle, CheckCircle } from "lucide-react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// ── Extended FormData matching parent ──
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

interface AdvancedWaveformAnalysisProps {
  data: FormData;
}

// ══════════════════════════════════════════════════
// Parameterized Fault Thresholds (IEEE C37.113 / IEC 60255)
// ══════════════════════════════════════════════════

interface FaultThresholds {
  zeroHigh: number;
  negHigh: number;
  mildThreshold: number;
  label: string;
}

function getThresholds(kV: number): FaultThresholds {
  if (kV >= 33)
    return {
      zeroHigh: 0.08,
      negHigh: 0.08,
      mildThreshold: 0.025,
      label: "EHV/HV",
    };
  if (kV >= 11)
    return { zeroHigh: 0.12, negHigh: 0.12, mildThreshold: 0.04, label: "MV" };
  if (kV >= 1)
    return {
      zeroHigh: 0.15,
      negHigh: 0.15,
      mildThreshold: 0.05,
      label: "LV-Ind",
    };
  return { zeroHigh: 0.2, negHigh: 0.2, mildThreshold: 0.07, label: "LV-Dist" };
}

// ══════════════════════════════════════════════════
// Goertzel Algorithm — O(N) per frequency bin
// ══════════════════════════════════════════════════

function goertzelMag(
  signal: Float32Array,
  targetFreq: number,
  sampleRate: number,
): number {
  const N = signal.length;
  const k = Math.round((targetFreq * N) / sampleRate);
  const w = (2 * Math.PI * k) / N;
  const coeff = 2 * Math.cos(w);
  let s1 = 0,
    s2 = 0;
  for (let i = 0; i < N; i++) {
    const s0 = signal[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  return (2 * Math.sqrt(Math.abs(s1 * s1 + s2 * s2 - coeff * s1 * s2))) / N;
}

export default function AdvancedWaveformAnalysis({
  data,
}: AdvancedWaveformAnalysisProps) {
  const analysis = useMemo(() => {
    const frequency = data.nominalFrequency || 50;
    const omega = 2 * Math.PI * frequency;
    const samples = 300;
    const duration = 2 / frequency; // 2 cycles
    const timeDelta = duration / samples;
    const sampleRate = samples / duration;

    const SQRT2 = Math.SQRT2;
    const shiftB = -(2 * Math.PI) / 3;
    const shiftC = (2 * Math.PI) / 3;

    const apparentPower = Math.sqrt(
      data.activePower ** 2 + data.reactivePower ** 2,
    );
    const pf = apparentPower === 0 ? 1 : data.activePower / apparentPower;
    const pfAngleRad = Math.acos(Math.min(1, Math.max(-1, pf)));

    const thresholds = getThresholds(data.systemVoltageLevel);

    // ── Dual-Sequence Fault Detection ──
    // Uses BOTH voltage AND current sequence ratios (as in SEL-421, ABB REL670)
    const vSeqTotal = data.seqVoltagePositive || 1;
    const iSeqTotal = data.seqPositive || 1;

    const v2v1 = data.seqVoltageNegative / vSeqTotal;
    const v0v1 = data.seqVoltageZero / vSeqTotal;
    const i2i1 = data.seqNegative / iSeqTotal;
    const i0i1 = data.seqZero / iSeqTotal;

    // Combined ratios
    const zeroRatio = (v0v1 + i0i1) / 2;
    const negRatio = (v2v1 + i2i1) / 2;
    const posRatio = 1 - zeroRatio - negRatio;

    let faultType = "Normal";
    let faultSeverity: "none" | "low" | "medium" | "high" = "none";
    let faultColor = "#10b981";
    let faultDesc =
      "All sequence component ratios within thresholds for this voltage level.";

    if (zeroRatio > thresholds.zeroHigh && negRatio > thresholds.negHigh) {
      faultType = "LLG Fault";
      faultSeverity = "high";
      faultColor = "#ef4444";
      faultDesc = `Double line-to-ground fault. V₀/V₁=${(v0v1 * 100).toFixed(1)}%, I₀/I₁=${(i0i1 * 100).toFixed(1)}% both exceed ${thresholds.label} threshold of ${(thresholds.zeroHigh * 100).toFixed(0)}%. DC offset τ=${((data.xrRatio / omega) * 1000).toFixed(1)}ms.`;
    } else if (zeroRatio > thresholds.zeroHigh) {
      faultType = "LG Fault (Phase A)";
      faultSeverity = "high";
      faultColor = "#f97316";
      faultDesc = `Single line-to-ground fault. Combined zero-sequence ratio ${(zeroRatio * 100).toFixed(1)}% exceeds ${thresholds.label} threshold of ${(thresholds.zeroHigh * 100).toFixed(0)}%. Phase A voltage sag with DC offset and transient spike.`;
    } else if (negRatio > thresholds.negHigh) {
      faultType = "LL Fault (B–C)";
      faultSeverity = "medium";
      faultColor = "#eab308";
      faultDesc = `Line-to-line fault. Combined negative-sequence ratio ${(negRatio * 100).toFixed(1)}% exceeds ${thresholds.label} threshold of ${(thresholds.negHigh * 100).toFixed(0)}%. Angular compression and harmonic injection visible.`;
    } else if (
      negRatio > thresholds.mildThreshold ||
      zeroRatio > thresholds.mildThreshold
    ) {
      faultType = "Mild Unbalance";
      faultSeverity = "low";
      faultColor = "#f59e0b";
      faultDesc = `Minor unbalance. Ratios above ${thresholds.label} mild threshold (${(thresholds.mildThreshold * 100).toFixed(0)}%) but below fault confirmation level.`;
    }

    const isFaulted = faultSeverity !== "none";

    // ── System Parameters ──
    const xrRatio = data.xrRatio || 5.0;
    const tau = xrRatio / omega; // DC offset time constant L/R = (X/R)/ω
    const inceptionAngleRad = (data.faultInceptionAngle || 0) * (Math.PI / 180);

    // Fault-derived waveform modifiers
    const dipA = 1 - zeroRatio * 0.85;
    const dipB = 1 - negRatio * 0.45;
    const dipC = 1 - negRatio * 0.45;
    const faultShiftB = negRatio * (Math.PI / 4);
    const faultShiftC = -negRatio * (Math.PI / 4);

    // ── Harmonics: fault-dependent injection levels ──
    // IEEE Std 519-2022 typical levels. Faults cause transformer core saturation
    // injecting odd harmonics; arcing faults have broader spectrum.
    const h3 = isFaulted ? 0.04 + zeroRatio * 0.12 : 0.015;
    const h5 = isFaulted ? 0.025 + negRatio * 0.08 : 0.008;
    const h7 = isFaulted ? 0.015 + negRatio * 0.05 : 0.004;

    // ── Complex Impedance ──
    const zMagA = data.currentA === 0 ? 0 : data.voltageA / data.currentA;
    const zMagB = data.currentB === 0 ? 0 : data.voltageB / data.currentB;
    const zMagC = data.currentC === 0 ? 0 : data.voltageC / data.currentC;
    const avgZMag = (zMagA + zMagB + zMagC) / 3;
    const avgR = avgZMag * Math.cos(Math.abs(pfAngleRad));
    const avgX = avgZMag * Math.sin(Math.abs(pfAngleRad));
    const impedanceAngleDeg =
      avgZMag === 0 ? 0 : Math.atan2(avgX, avgR) * (180 / Math.PI);
    const faultCharacter =
      impedanceAngleDeg > 60
        ? "Bolted (inductive)"
        : impedanceAngleDeg < 30
          ? "Arcing (resistive)"
          : "Mixed";

    // ── Fault MVA & Current ──
    const systemVoltageV = data.systemVoltageLevel * 1000;
    const faultMVA = data.faultMVABase || 25;
    const faultCurrentMag =
      systemVoltageV > 0
        ? (faultMVA * 1e6) / (Math.sqrt(3) * systemVoltageV)
        : 0;

    // ── Frequency Deviation ──
    const freqDeviation = isFaulted ? -(zeroRatio + negRatio) * 0.8 : 0;
    const actualFreq = frequency + freqDeviation;
    const actualOmega = 2 * Math.PI * actualFreq;

    // ── Waveform Generation (Float32Array for performance) ──
    const t = new Float32Array(samples);
    const vA = new Float32Array(samples);
    const vB = new Float32Array(samples);
    const vC = new Float32Array(samples);
    const iA = new Float32Array(samples);
    const iB = new Float32Array(samples);
    const iC = new Float32Array(samples);
    const pTotal = new Float32Array(samples);

    for (let i = 0; i < samples; i++) {
      const time = i * timeDelta;
      const wt = actualOmega * time;
      t[i] = time;

      // ── Voltage waveforms: fundamental + harmonics + DC offset + transient envelope ──

      // DC offset: proportional to sin(inception angle), decays with τ = X/(Rω)
      // At inception angle = 0° (voltage zero crossing): maximum DC offset
      // At inception angle = 90° (voltage peak): zero DC offset
      const dcA = isFaulted
        ? data.voltageA *
          SQRT2 *
          zeroRatio *
          0.6 *
          Math.sin(inceptionAngleRad) *
          Math.exp(-time / tau)
        : 0;
      const dcB = isFaulted
        ? data.voltageB *
          SQRT2 *
          negRatio *
          0.3 *
          Math.sin(inceptionAngleRad + shiftB) *
          Math.exp(-time / tau)
        : 0;
      const dcC = isFaulted
        ? data.voltageC *
          SQRT2 *
          negRatio *
          0.3 *
          Math.sin(inceptionAngleRad + shiftC) *
          Math.exp(-time / tau)
        : 0;

      // Transient spike envelope (initial overshoot, exponential decay at τ/2)
      const envA = isFaulted
        ? 1 + zeroRatio * 0.3 * Math.exp(-time / (tau * 0.5))
        : 1;

      vA[i] =
        data.voltageA *
          SQRT2 *
          dipA *
          envA *
          (Math.sin(wt) +
            h3 * Math.sin(3 * wt) +
            h5 * Math.sin(5 * wt) +
            h7 * Math.sin(7 * wt)) +
        dcA;

      vB[i] =
        data.voltageB *
          SQRT2 *
          dipB *
          (Math.sin(wt + shiftB + faultShiftB) +
            h3 * Math.sin(3 * (wt + shiftB + faultShiftB)) +
            h5 * Math.sin(5 * (wt + shiftB + faultShiftB)) +
            h7 * Math.sin(7 * (wt + shiftB + faultShiftB))) +
        dcB;

      vC[i] =
        data.voltageC *
          SQRT2 *
          dipC *
          (Math.sin(wt + shiftC + faultShiftC) +
            h3 * Math.sin(3 * (wt + shiftC + faultShiftC)) +
            h5 * Math.sin(5 * (wt + shiftC + faultShiftC)) +
            h7 * Math.sin(7 * (wt + shiftC + faultShiftC))) +
        dcC;

      // ── Current waveforms: include DC offset from fault inception ──
      // DC component in fault current: I_dc = I_peak × sin(α - φ) × e^(-t/τ)
      // where α = inception angle, φ = impedance angle
      const iDcA = isFaulted
        ? data.currentA *
          SQRT2 *
          zeroRatio *
          0.8 *
          Math.sin(inceptionAngleRad - pfAngleRad) *
          Math.exp(-time / tau)
        : 0;
      const iDcB = isFaulted
        ? data.currentB *
          SQRT2 *
          negRatio *
          0.4 *
          Math.sin(inceptionAngleRad + shiftB - pfAngleRad) *
          Math.exp(-time / tau)
        : 0;
      const iDcC = isFaulted
        ? data.currentC *
          SQRT2 *
          negRatio *
          0.4 *
          Math.sin(inceptionAngleRad + shiftC - pfAngleRad) *
          Math.exp(-time / tau)
        : 0;

      iA[i] =
        data.currentA *
          SQRT2 *
          (Math.sin(wt - pfAngleRad) +
            h3 * 0.7 * Math.sin(3 * wt - pfAngleRad) + // Current harmonics are lower than voltage
            h5 * 0.5 * Math.sin(5 * wt - pfAngleRad)) +
        iDcA;

      iB[i] =
        data.currentB *
          SQRT2 *
          (Math.sin(wt + shiftB - pfAngleRad + faultShiftB) +
            h3 * 0.7 * Math.sin(3 * (wt + shiftB + faultShiftB) - pfAngleRad) +
            h5 * 0.5 * Math.sin(5 * (wt + shiftB + faultShiftB) - pfAngleRad)) +
        iDcB;

      iC[i] =
        data.currentC *
          SQRT2 *
          (Math.sin(wt + shiftC - pfAngleRad + faultShiftC) +
            h3 * 0.7 * Math.sin(3 * (wt + shiftC + faultShiftC) - pfAngleRad) +
            h5 * 0.5 * Math.sin(5 * (wt + shiftC + faultShiftC) - pfAngleRad)) +
        iDcC;

      pTotal[i] = vA[i] * iA[i] + vB[i] * iB[i] + vC[i] * iC[i];
    }

    // ── Harmonic Analysis (Goertzel on Phase A voltage) ──
    const harmonicOrders = [1, 3, 5, 7, 9, 11];
    const harmonicsVA = harmonicOrders.map((h) => ({
      order: h,
      mag: goertzelMag(vA, h * frequency, sampleRate),
    }));
    const fundMag = harmonicsVA[0].mag || 1;
    const harmonicsPct = harmonicsVA.map((h) => ({
      order: h.order,
      pct: (h.mag / fundMag) * 100,
    }));
    const thdV =
      (Math.sqrt(harmonicsVA.slice(1).reduce((s, h) => s + h.mag ** 2, 0)) /
        fundMag) *
      100;

    // Current harmonics
    const harmonicsIA = harmonicOrders.map((h) => ({
      order: h,
      mag: goertzelMag(iA, h * frequency, sampleRate),
    }));
    const iFundMag = harmonicsIA[0].mag || 1;
    const thdI =
      (Math.sqrt(harmonicsIA.slice(1).reduce((s, h) => s + h.mag ** 2, 0)) /
        iFundMag) *
      100;

    // ── Balance Metrics ──
    const avgV = (data.voltageA + data.voltageB + data.voltageC) / 3 || 1;
    const avgI = (data.currentA + data.currentB + data.currentC) / 3 || 1;

    const maxVDev =
      Math.max(
        Math.abs((data.voltageA - avgV) / avgV),
        Math.abs((data.voltageB - avgV) / avgV),
        Math.abs((data.voltageC - avgV) / avgV),
      ) * 100;

    const maxIDev =
      Math.max(
        Math.abs((data.currentA - avgI) / avgI),
        Math.abs((data.currentB - avgI) / avgI),
        Math.abs((data.currentC - avgI) / avgI),
      ) * 100;

    // Oscilloscope annotations
    const annotTime = t[Math.floor(samples * 0.25)];
    const oscAnnotations =
      faultSeverity !== "none"
        ? [
            {
              x: annotTime,
              y: 0,
              xref: "x" as const,
              yref: "y" as const,
              text: `${faultType} · ∠${data.faultInceptionAngle}°`,
              showarrow: true,
              arrowhead: 2,
              ax: 40,
              ay: -40,
              font: {
                color: faultColor,
                size: 11,
                family: "Inter, sans-serif",
              },
              bgcolor: faultColor + "22",
              bordercolor: faultColor,
              borderwidth: 1,
            },
          ]
        : [];

    return {
      waveforms: {
        t: Array.from(t),
        vA: Array.from(vA),
        vB: Array.from(vB),
        vC: Array.from(vC),
        iA: Array.from(iA),
        iB: Array.from(iB),
        iC: Array.from(iC),
        pTotal: Array.from(pTotal),
      },
      power: { P: data.activePower, pf },
      healthMetrics: {
        pfScore: pf * 100,
        vBalance: Math.max(0, 100 - maxVDev),
        iBalance: Math.max(0, 100 - maxIDev),
        posSequence: Math.max(0, posRatio) * 100,
        negSequence: negRatio * 100,
      },
      imbalance: {
        vDev: [
          ((data.voltageA - avgV) / avgV) * 100,
          ((data.voltageB - avgV) / avgV) * 100,
          ((data.voltageC - avgV) / avgV) * 100,
        ],
      },
      sequences: {
        v: [
          data.seqVoltagePositive,
          data.seqVoltageNegative,
          data.seqVoltageZero,
        ],
        i: [data.seqPositive, data.seqNegative, data.seqZero],
      },
      ratios: { v2v1, v0v1, i2i1, i0i1, zeroRatio, negRatio },
      fault: { faultType, faultSeverity, faultColor, faultDesc },
      thresholds,
      impedance: { avgR, avgX, avgZMag, impedanceAngleDeg, faultCharacter },
      faultCurrent: { faultCurrentMag, faultMVA },
      freq: { actual: actualFreq, deviation: freqDeviation },
      dcOffset: { tau, tauMs: tau * 1000 },
      harmonics: { vPct: harmonicsPct, thdV, thdI },
      oscAnnotations,
    };
  }, [data]);

  const colors = {
    vA: "#ef4444",
    vB: "#eab308",
    vC: "#2563eb",
    iA: "#f87171",
    iB: "#facc15",
    iC: "#60a5fa",
    power: "#10b981",
    radarArea: "rgba(99, 102, 241, 0.2)",
    radarLine: "#6366f1",
  };

  const layoutBase = {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: {
      family: "JetBrains Mono, Inter, monospace",
      color: "#64748b",
      size: 10,
    },
    margin: { t: 30, b: 30, l: 40, r: 40 },
  };

  const { fault } = analysis;
  const isFaulted = fault.faultSeverity !== "none";

  return (
    <div
      className="w-full space-y-6 bg-slate-50 p-6 rounded-xl border shadow-inner"
      style={{ borderColor: isFaulted ? fault.faultColor + "55" : "#e2e8f0" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div
            className="p-3 rounded-lg text-white shadow-md"
            style={{
              backgroundColor: isFaulted ? fault.faultColor : "#0f172a",
            }}
          >
            {isFaulted ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <Activity className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              M-SCADA Diagnostics Engine
            </h2>
            <p className="text-slate-500 font-medium">
              Dual-Sequence Fault Detection · Harmonic Analysis · Transient
              Modeling
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span className="text-xs text-slate-400 block uppercase font-bold">
              System PF
            </span>
            <span
              className={`text-lg font-bold ${analysis.power.pf < 0.85 ? "text-red-500" : "text-emerald-600"}`}
            >
              {analysis.power.pf.toFixed(3)}
            </span>
          </div>

          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span className="text-xs text-slate-400 block uppercase font-bold">
              Impedance
            </span>
            <span className="text-sm font-bold text-slate-800">
              {analysis.impedance.avgR.toFixed(1)}+j
              {analysis.impedance.avgX.toFixed(1)}Ω
            </span>
            <span className="text-xs text-slate-400 block">
              {analysis.impedance.faultCharacter}
            </span>
          </div>

          <div
            className="px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2"
            style={{
              backgroundColor: fault.faultColor + "15",
              borderColor: fault.faultColor + "66",
            }}
          >
            {isFaulted ? (
              <AlertTriangle
                className="w-4 h-4"
                style={{ color: fault.faultColor }}
              />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            )}
            <div>
              <span className="text-xs text-slate-400 block uppercase font-bold">
                Fault Status
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: fault.faultColor }}
              >
                {fault.faultType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fault Explanation Banner ── */}
      {isFaulted && (
        <div
          className="flex items-start gap-3 p-4 rounded-lg border text-sm"
          style={{
            backgroundColor: fault.faultColor + "10",
            borderColor: fault.faultColor + "55",
            color: "#1e293b",
          }}
        >
          <AlertTriangle
            className="w-4 h-4 mt-0.5 shrink-0"
            style={{ color: fault.faultColor }}
          />
          <div>
            <strong style={{ color: fault.faultColor }}>
              {fault.faultType}:
            </strong>{" "}
            {fault.faultDesc}
          </div>
        </div>
      )}

      {/* ── Dual Sequence Component Breakdown (V + I) ── */}
      {isFaulted && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Sequence Component Analysis (V & I)
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: "V₁ (pos)", value: data.seqVoltagePositive, unit: "V" },
              {
                label: "V₂ (neg)",
                value: data.seqVoltageNegative,
                unit: "V",
                ratio: analysis.ratios.v2v1,
                thresh: analysis.thresholds.negHigh,
              },
              {
                label: "V₀ (zero)",
                value: data.seqVoltageZero,
                unit: "V",
                ratio: analysis.ratios.v0v1,
                thresh: analysis.thresholds.zeroHigh,
              },
              { label: "I₁ (pos)", value: data.seqPositive, unit: "A" },
              {
                label: "I₂ (neg)",
                value: data.seqNegative,
                unit: "A",
                ratio: analysis.ratios.i2i1,
                thresh: analysis.thresholds.negHigh,
              },
              {
                label: "I₀ (zero)",
                value: data.seqZero,
                unit: "A",
                ratio: analysis.ratios.i0i1,
                thresh: analysis.thresholds.zeroHigh,
              },
            ].map(({ label, value, unit, ratio, thresh }) => {
              const isOver =
                ratio !== undefined && thresh !== undefined && ratio > thresh;
              return (
                <div
                  key={label}
                  className="bg-white rounded-lg p-3 border shadow-sm"
                  style={{
                    borderColor: isOver ? fault.faultColor + "88" : "#e2e8f0",
                  }}
                >
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {label}
                  </p>
                  <p
                    className="text-lg font-bold mt-0.5"
                    style={{ color: isOver ? fault.faultColor : "#1e293b" }}
                  >
                    {value.toFixed(1)} {unit}
                  </p>
                  {ratio !== undefined && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Ratio: {(ratio * 100).toFixed(1)}%{" "}
                      {thresh !== undefined &&
                        `(lim ${(thresh * 100).toFixed(0)}%)`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Extended Metrics Row ── */}
      {isFaulted && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Fault Level
            </p>
            <p className="text-lg font-bold text-slate-900">
              {analysis.faultCurrent.faultMVA.toFixed(1)} MVA
            </p>
            <p className="text-xs text-slate-400">
              I<sub>f</sub> = {analysis.faultCurrent.faultCurrentMag.toFixed(0)}{" "}
              A
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              DC Offset τ
            </p>
            <p className="text-lg font-bold text-slate-900">
              {analysis.dcOffset.tauMs.toFixed(1)} ms
            </p>
            <p className="text-xs text-slate-400">
              5τ = {(analysis.dcOffset.tauMs * 5).toFixed(0)} ms
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              THD (V)
            </p>
            <p
              className={`text-lg font-bold ${analysis.harmonics.thdV > 5 ? "text-red-600" : "text-slate-900"}`}
            >
              {analysis.harmonics.thdV.toFixed(2)}%
            </p>
            <p className="text-xs text-slate-400">IEEE 519: 5%</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              THD (I)
            </p>
            <p
              className={`text-lg font-bold ${analysis.harmonics.thdI > 8 ? "text-red-600" : "text-slate-900"}`}
            >
              {analysis.harmonics.thdI.toFixed(2)}%
            </p>
            <p className="text-xs text-slate-400">IEEE 519: 8%</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Frequency
            </p>
            <p
              className={`text-lg font-bold ${Math.abs(analysis.freq.deviation) > 0.3 ? "text-red-600" : "text-slate-900"}`}
            >
              {analysis.freq.actual.toFixed(2)} Hz
            </p>
            <p className="text-xs text-slate-400">
              Δf = {analysis.freq.deviation >= 0 ? "+" : ""}
              {analysis.freq.deviation.toFixed(3)} Hz
            </p>
          </div>
        </div>
      )}

      {/* ── Graphs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Oscilloscope — Voltage with DC offset + harmonics + transient */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[400px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Waves className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Transient Capture (Voltage) · DC offset + Harmonics
            </span>
            {isFaulted && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: fault.faultColor + "22",
                  color: fault.faultColor,
                }}
              >
                ⚠ {fault.faultType} · τ={analysis.dcOffset.tauMs.toFixed(1)}ms
              </span>
            )}
          </div>
          <div className="flex-1 min-h-0">
            <Plot
              data={[
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.vA,
                  name: "Va",
                  line: { color: colors.vA, width: 2 },
                  type: "scatter",
                },
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.vB,
                  name: "Vb",
                  line: { color: colors.vB, width: 2 },
                  type: "scatter",
                },
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.vC,
                  name: "Vc",
                  line: { color: colors.vC, width: 2 },
                  type: "scatter",
                },
              ]}
              layout={{
                ...layoutBase,
                autosize: true,
                showlegend: true,
                legend: { orientation: "h", y: -0.15 },
                xaxis: { gridcolor: "#f1f5f9", title: { text: "Time (s)" } },
                yaxis: { gridcolor: "#f1f5f9", title: { text: "Voltage (V)" } },
                annotations: analysis.oscAnnotations,
              }}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* 2. Power Quality Health Radar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm h-[400px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              System Health Profile
            </span>
          </div>
          <Plot
            data={[
              {
                type: "scatterpolar",
                r: [
                  analysis.healthMetrics.pfScore,
                  analysis.healthMetrics.vBalance,
                  analysis.healthMetrics.iBalance,
                  analysis.healthMetrics.posSequence,
                  100 - analysis.healthMetrics.negSequence,
                  analysis.healthMetrics.pfScore,
                ],
                theta: [
                  "Power Factor",
                  "V-Balance",
                  "I-Balance",
                  "Pos Sequence",
                  "Neg Seq (Low=Good)",
                  "Power Factor",
                ],
                fill: "toself",
                fillcolor: isFaulted
                  ? fault.faultColor + "22"
                  : colors.radarArea,
                line: {
                  color: isFaulted ? fault.faultColor : colors.radarLine,
                  width: 2,
                },
              },
            ]}
            layout={{
              ...layoutBase,
              polar: { radialaxis: { visible: true, range: [0, 100] } },
              showlegend: false,
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 3. Current Waveforms — NEW: shows DC offset in fault current */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[350px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Current Waveforms · DC Offset Visible
            </span>
            {isFaulted && (
              <span className="ml-auto text-xs text-slate-500">
                Inception ∠ = {data.faultInceptionAngle}° · X/R = {data.xrRatio}
              </span>
            )}
          </div>
          <div className="flex-1 min-h-0">
            <Plot
              data={[
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.iA,
                  name: "Ia",
                  line: { color: colors.iA, width: 2 },
                  type: "scatter",
                },
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.iB,
                  name: "Ib",
                  line: { color: colors.iB, width: 2 },
                  type: "scatter",
                },
                {
                  x: analysis.waveforms.t,
                  y: analysis.waveforms.iC,
                  name: "Ic",
                  line: { color: colors.iC, width: 2 },
                  type: "scatter",
                },
              ]}
              layout={{
                ...layoutBase,
                autosize: true,
                showlegend: true,
                legend: { orientation: "h", y: -0.15 },
                xaxis: { gridcolor: "#f1f5f9", title: { text: "Time (s)" } },
                yaxis: { gridcolor: "#f1f5f9", title: { text: "Current (A)" } },
              }}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* 4. Harmonic Spectrum — NEW: Goertzel DFT */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm h-[350px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Harmonic Spectrum (Va)
            </span>
            <span className="text-xs text-slate-500 block">
              THD<sub>V</sub> = {analysis.harmonics.thdV.toFixed(2)}% · THD
              <sub>I</sub> = {analysis.harmonics.thdI.toFixed(2)}%
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <Plot
              data={[
                {
                  x: analysis.harmonics.vPct.map((h) => `H${h.order}`),
                  y: analysis.harmonics.vPct.map((h) => h.pct),
                  type: "bar",
                  marker: {
                    color: analysis.harmonics.vPct.map((h) =>
                      h.order === 1
                        ? "#3b82f6"
                        : h.pct > 5
                          ? "#ef4444"
                          : h.pct > 3
                            ? "#f59e0b"
                            : "#10b981",
                    ),
                  },
                  text: analysis.harmonics.vPct.map((h) =>
                    h.order === 1 ? "Fund." : `${h.pct.toFixed(1)}%`,
                  ),
                  textposition: "outside" as const,
                },
              ]}
              layout={{
                ...layoutBase,
                xaxis: { title: { text: "Harmonic" } },
                yaxis: { title: { text: "% Fund." }, gridcolor: "#f1f5f9" },
                shapes: [
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
                    text: "5% limit",
                    showarrow: false,
                    font: { size: 9, color: "#ef4444" },
                    yshift: 10,
                  },
                ],
              }}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* 5. Instantaneous Power */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[300px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Total Instantaneous Power P(t)
            </span>
            <span className="text-xs text-slate-500 block">
              {isFaulted
                ? `2× frequency ripple visible — unbalance from ${fault.faultType}. DC component from offset.`
                : "Smooth — balanced three-phase system, minimal ripple."}
            </span>
          </div>
          <Plot
            data={[
              {
                x: analysis.waveforms.t,
                y: analysis.waveforms.pTotal,
                fill: "tozeroy",
                type: "scatter",
                line: {
                  color: isFaulted ? fault.faultColor : colors.power,
                  width: 2,
                },
                fillcolor: isFaulted
                  ? fault.faultColor + "22"
                  : "rgba(16,185,129,0.15)",
              },
            ]}
            layout={{
              ...layoutBase,
              xaxis: { gridcolor: "#f1f5f9", title: { text: "Time (s)" } },
              yaxis: { gridcolor: "#f1f5f9", title: { text: "Power (W)" } },
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 6. Voltage Deviation Bar Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm h-[300px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Voltage Deviation (%)
            </span>
          </div>
          <Plot
            data={[
              {
                x: ["Phase A", "Phase B", "Phase C"],
                y: analysis.imbalance.vDev,
                type: "bar",
                marker: {
                  color: [colors.vA, colors.vB, colors.vC],
                  line: {
                    color: analysis.imbalance.vDev.map((d) =>
                      Math.abs(d) > 5 ? fault.faultColor : "transparent",
                    ),
                    width: 2,
                  },
                },
              },
            ]}
            layout={{
              ...layoutBase,
              yaxis: { title: { text: "Deviation %" } },
              shapes: [
                {
                  type: "line",
                  y0: 5,
                  y1: 5,
                  x0: -0.5,
                  x1: 2.5,
                  line: { color: "#94a3b8", dash: "dot", width: 1 },
                },
                {
                  type: "line",
                  y0: -5,
                  y1: -5,
                  x0: -0.5,
                  x1: 2.5,
                  line: { color: "#94a3b8", dash: "dot", width: 1 },
                },
              ],
              annotations: [
                {
                  x: 2.4,
                  y: 5,
                  text: "+5% limit",
                  showarrow: false,
                  font: { size: 9, color: "#94a3b8" },
                  xanchor: "right" as const,
                },
                {
                  x: 2.4,
                  y: -5,
                  text: "−5% limit",
                  showarrow: false,
                  font: { size: 9, color: "#94a3b8" },
                  xanchor: "right" as const,
                },
              ],
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
