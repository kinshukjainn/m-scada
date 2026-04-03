"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Waves, Activity, AlertTriangle, CheckCircle } from "lucide-react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface FormData {
  voltageA: number;
  voltageB: number;
  voltageC: number;
  currentA: number;
  currentB: number;
  currentC: number;
  seqPositive: number;
  seqNegative: number;
  seqZero: number;
  activePower: number;
  reactivePower: number;
}

interface AdvancedWaveformAnalysisProps {
  data: FormData;
}

export default function AdvancedWaveformAnalysis({
  data,
}: AdvancedWaveformAnalysisProps) {
  // 🚀 HIGH-PERFORMANCE CALCULATION ENGINE
  const analysis = useMemo(() => {
    const frequency = 50;
    const omega = 2 * Math.PI * frequency;
    const samples = 300;
    const timeDelta = 0.04 / samples; // 2 cycles at 50Hz

    const SQRT2 = Math.SQRT2;
    const shiftB = -(2 * Math.PI) / 3;
    const shiftC = (2 * Math.PI) / 3;

    const apparentPower = Math.sqrt(
      data.activePower ** 2 + data.reactivePower ** 2,
    );
    const pf = apparentPower === 0 ? 1 : data.activePower / apparentPower;
    const pfAngleRad = Math.acos(Math.min(1, Math.max(-1, pf)));

    // --- 🚨 FAULT DYNAMICS SIMULATION ---
    // All distortion is derived from the actual sequence component values.
    const seqTotal = data.seqPositive + data.seqNegative + data.seqZero || 1;
    const zeroRatio = data.seqZero / seqTotal;
    const negRatio = data.seqNegative / seqTotal;
    const posRatio = data.seqPositive / seqTotal;

    // Fault type classification (thresholds reflect standard power-quality limits)
    let faultType = "Normal";
    let faultSeverity: "none" | "low" | "medium" | "high" = "none";
    let faultColor = "#10b981";
    let faultDesc = "All sequence components within normal range.";

    if (zeroRatio > 0.15 && negRatio > 0.15) {
      faultType = "LLG Fault";
      faultSeverity = "high";
      faultColor = "#ef4444";
      faultDesc =
        "Double line-to-ground fault. High zero & negative sequence detected. Phases B/C depressed and angularly shifted.";
    } else if (zeroRatio > 0.15) {
      faultType = "LG Fault (Phase A)";
      faultSeverity = "high";
      faultColor = "#f97316";
      faultDesc =
        "Single line-to-ground fault. Dominant zero-sequence component causes Phase A voltage sag.";
    } else if (negRatio > 0.15) {
      faultType = "LL Fault (B–C)";
      faultSeverity = "medium";
      faultColor = "#eab308";
      faultDesc =
        "Line-to-line fault between B and C. Negative sequence causes angular compression and amplitude depression.";
    } else if (negRatio > 0.05 || zeroRatio > 0.05) {
      faultType = "Mild Unbalance";
      faultSeverity = "low";
      faultColor = "#f59e0b";
      faultDesc =
        "Minor unbalance detected. Sequence component ratios above threshold but fault not yet confirmed.";
    }

    // Fault-derived waveform modifiers (all derived from ratios, nothing hardcoded)
    const dipA = 1 - zeroRatio * 0.85;
    const dipB = 1 - negRatio * 0.45;
    const dipC = 1 - negRatio * 0.45;
    const faultShiftB = negRatio * (Math.PI / 4);
    const faultShiftC = -negRatio * (Math.PI / 4);

    // Memory pre-allocation using Typed Arrays
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
      const wt = omega * time;

      t[i] = time;

      vA[i] = data.voltageA * SQRT2 * Math.sin(wt) * dipA;
      vB[i] =
        data.voltageB * SQRT2 * Math.sin(wt + shiftB + faultShiftB) * dipB;
      vC[i] =
        data.voltageC * SQRT2 * Math.sin(wt + shiftC + faultShiftC) * dipC;

      iA[i] = data.currentA * SQRT2 * Math.sin(wt - pfAngleRad);
      iB[i] =
        data.currentB *
        SQRT2 *
        Math.sin(wt + shiftB - pfAngleRad + faultShiftB);
      iC[i] =
        data.currentC *
        SQRT2 *
        Math.sin(wt + shiftC - pfAngleRad + faultShiftC);

      pTotal[i] = vA[i] * iA[i] + vB[i] * iB[i] + vC[i] * iC[i];
    }

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

    // Oscilloscope annotations — placed at ¼-cycle mark when a fault is active
    const annotTime = t[Math.floor(samples * 0.25)];
    const oscAnnotations =
      faultSeverity !== "none"
        ? [
            {
              x: annotTime,
              y: 0,
              xref: "x" as const,
              yref: "y" as const,
              text: faultType,
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
        posSequence: posRatio * 100,
        negSequence: negRatio * 100,
      },
      imbalance: {
        vDev: [
          ((data.voltageA - avgV) / avgV) * 100,
          ((data.voltageB - avgV) / avgV) * 100,
          ((data.voltageC - avgV) / avgV) * 100,
        ],
      },
      sequences: [data.seqPositive, data.seqNegative, data.seqZero],
      fault: { faultType, faultSeverity, faultColor, faultDesc },
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
              Real-time Fault Detection &amp; Quality Analysis
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          {/* Power Factor */}
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

          {/* Fault Status */}
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

      {/* ── Fault Explanation Banner (shown only when fault present) ── */}
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

      {/* ── Sequence Component Breakdown ── */}
      {isFaulted && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Positive Seq (V₁)",
              value: data.seqPositive,
              sub: "Balanced rotation",
            },
            {
              label: "Negative Seq (V₂)",
              value: data.seqNegative,
              sub: "Unbalance / LL fault",
              highlight: analysis.sequences[1] > analysis.sequences[0] * 0.15,
            },
            {
              label: "Zero Seq (V₀)",
              value: data.seqZero,
              sub: "Ground path / LG fault",
              highlight: analysis.sequences[2] > analysis.sequences[0] * 0.15,
            },
          ].map(({ label, value, sub, highlight }) => (
            <div
              key={label}
              className="bg-white rounded-lg p-3 border shadow-sm"
              style={{
                borderColor: highlight ? fault.faultColor + "88" : "#e2e8f0",
              }}
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {label}
              </p>
              <p
                className="text-xl font-bold mt-0.5"
                style={{ color: highlight ? fault.faultColor : "#1e293b" }}
              >
                {value.toFixed(1)} V
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Graphs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Oscilloscope — Voltage Waveforms with fault annotation */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[400px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Waves className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              High-Speed Transient Capture (Voltage)
            </span>
            {isFaulted && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: fault.faultColor + "22",
                  color: fault.faultColor,
                }}
              >
                ⚠ {fault.faultType}
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

        {/* 3. Instantaneous Power — ripple visible under fault */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[300px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Total Instantaneous Power P(t)
            </span>
            <span className="text-xs text-slate-500 block">
              {isFaulted
                ? `Ripples visible — unbalance caused by ${fault.faultType}.`
                : "Smooth — no fault condition detected."}
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

        {/* 4. Voltage Deviation Bar Chart */}
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
                  // Highlight bars that are abnormally deviated
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
                // ±5% threshold lines — standard limit for voltage unbalance
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
