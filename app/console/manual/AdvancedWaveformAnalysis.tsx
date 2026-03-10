"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Waves, Activity } from "lucide-react";

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

    // Pre-calculate scalars to avoid doing it inside the loop
    const SQRT2 = Math.SQRT2;
    const shiftB = -(2 * Math.PI) / 3;
    const shiftC = (2 * Math.PI) / 3;

    const apparentPower = Math.sqrt(
      data.activePower ** 2 + data.reactivePower ** 2,
    );
    const pf = apparentPower === 0 ? 1 : data.activePower / apparentPower;
    const pfAngleRad = Math.acos(Math.min(1, Math.max(-1, pf)));

    // Memory pre-allocation using Typed Arrays for maximum speed
    const t = new Float32Array(samples);
    const vA = new Float32Array(samples);
    const vB = new Float32Array(samples);
    const vC = new Float32Array(samples);
    const iA = new Float32Array(samples);
    const iB = new Float32Array(samples);
    const iC = new Float32Array(samples);
    const pTotal = new Float32Array(samples); // Instantaneous Power

    // Single-pass O(N) loop for all calculations
    for (let i = 0; i < samples; i++) {
      const time = i * timeDelta;
      const wt = omega * time;

      t[i] = time;

      // Voltages
      vA[i] = data.voltageA * SQRT2 * Math.sin(wt);
      vB[i] = data.voltageB * SQRT2 * Math.sin(wt + shiftB);
      vC[i] = data.voltageC * SQRT2 * Math.sin(wt + shiftC);

      // Currents
      iA[i] = data.currentA * SQRT2 * Math.sin(wt - pfAngleRad);
      iB[i] = data.currentB * SQRT2 * Math.sin(wt + shiftB - pfAngleRad);
      iC[i] = data.currentC * SQRT2 * Math.sin(wt + shiftC - pfAngleRad);

      // Instantaneous Power P(t) = vA*iA + vB*iB + vC*iC
      pTotal[i] = vA[i] * iA[i] + vB[i] * iB[i] + vC[i] * iC[i];
    }

    const avgV = (data.voltageA + data.voltageB + data.voltageC) / 3 || 1;
    const avgI = (data.currentA + data.currentB + data.currentC) / 3 || 1;

    // Calculate max deviations for the Health Radar
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

    const seqTotal = data.seqPositive + data.seqNegative + data.seqZero || 1;

    return {
      // Convert typed arrays to standard arrays for Plotly compatibility
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
        pfScore: pf * 100, // 100% is ideal
        vBalance: Math.max(0, 100 - maxVDev),
        iBalance: Math.max(0, 100 - maxIDev),
        posSequence: (data.seqPositive / seqTotal) * 100,
        negSequence: (data.seqNegative / seqTotal) * 100,
      },
      imbalance: {
        vDev: [
          ((data.voltageA - avgV) / avgV) * 100,
          ((data.voltageB - avgV) / avgV) * 100,
          ((data.voltageC - avgV) / avgV) * 100,
        ],
      },
      sequences: [data.seqPositive, data.seqNegative, data.seqZero],
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

  return (
    <div className="w-full space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 rounded-lg text-white shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              M-SCADA Diagnostics Engine
            </h2>
            <p className="text-slate-500 font-medium">
              Real-time Fault Detection & Quality Analysis
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
            <span className="text-xs text-slate-400 block uppercase font-bold">
              System PF
            </span>
            <span
              className={`text-lg font-mono font-bold ${analysis.power.pf < 0.85 ? "text-red-500" : "text-emerald-600"}`}
            >
              {analysis.power.pf.toFixed(3)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Oscilloscope - Main Waveforms */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[400px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Waves className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              High-Speed Transient Capture (V & I)
            </span>
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
              }}
              useResizeHandler
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* 2. Power Quality Health Radar (Replaces Power Triangle) */}
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
                  100 - analysis.healthMetrics.negSequence, // Inverted so 100% is good
                  analysis.healthMetrics.pfScore, // Close the loop
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
                fillcolor: colors.radarArea,
                line: { color: colors.radarLine, width: 2 },
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

        {/* 3. Instantaneous Power (Replaces Phasors) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm h-[300px] flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Total Instantaneous Power P(t)
            </span>
            <span className="text-xs text-slate-500 block">
              Ripples indicate unbalance or fault conditions.
            </span>
          </div>
          <Plot
            data={[
              {
                x: analysis.waveforms.t,
                y: analysis.waveforms.pTotal,
                fill: "tozeroy",
                type: "scatter",
                line: { color: colors.power, width: 2 },
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

        {/* 4. Deviation Analysis */}
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
                marker: { color: [colors.vA, colors.vB, colors.vC] },
              },
            ]}
            layout={{
              ...layoutBase,
              yaxis: { title: { text: "Deviation %" } },
            }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
