"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Waves, Triangle, Orbit, Cpu } from "lucide-react";

// Dynamically import Plotly for Next.js SSR compatibility
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
  const { waveforms, powerTriangle, pfData } = useMemo(() => {
    // 1. Core System Parameters
    const frequency = 50; // Standard 50Hz system
    const omega = 2 * Math.PI * frequency;
    const samples = 200;
    const timeDelta = 0.04 / samples; // 40ms = exactly 2 cycles at 50Hz

    // Power Factor & Phase Angle Calculation
    const apparentPower = Math.sqrt(
      Math.pow(data.activePower, 2) + Math.pow(data.reactivePower, 2),
    );
    const pf = apparentPower === 0 ? 1 : data.activePower / apparentPower;
    // Angle in radians (lagging assumed for standard inductive loads)
    const pfAngleRad = Math.acos(Math.min(1, Math.max(-1, pf)));

    // Generate Time Vector
    const t = Array.from({ length: samples }, (_, i) => i * timeDelta);

    // 2. Sinusoidal Waveform Generation (Time Domain)
    // V_peak = V_rms * sqrt(2). Standard 120-degree (2*PI/3) phase shifts.
    const SQRT2 = Math.SQRT2;
    const PhaseShiftB = -(2 * Math.PI) / 3;
    const PhaseShiftC = (2 * Math.PI) / 3;

    const vA = t.map((time) => data.voltageA * SQRT2 * Math.sin(omega * time));
    const vB = t.map(
      (time) => data.voltageB * SQRT2 * Math.sin(omega * time + PhaseShiftB),
    );
    const vC = t.map(
      (time) => data.voltageC * SQRT2 * Math.sin(omega * time + PhaseShiftC),
    );

    // Current waveforms lag by the Power Factor angle
    const iA = t.map(
      (time) => data.currentA * SQRT2 * Math.sin(omega * time - pfAngleRad),
    );
    const iB = t.map(
      (time) =>
        data.currentB *
        SQRT2 *
        Math.sin(omega * time + PhaseShiftB - pfAngleRad),
    );
    const iC = t.map(
      (time) =>
        data.currentC *
        SQRT2 *
        Math.sin(omega * time + PhaseShiftC - pfAngleRad),
    );

    return {
      pfData: { pf, apparentPower, angleDeg: (pfAngleRad * 180) / Math.PI },
      waveforms: { t, vA, vB, vC, iA, iB, iC },
      powerTriangle: {
        P: data.activePower,
        Q: data.reactivePower,
        S: apparentPower,
      },
    };
  }, [data]);

  // Shared Plotly Layout Settings for a crisp, white professional theme
  const layoutBase = {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "Inter, sans-serif", color: "#374151", size: 11 },
    margin: { t: 50, b: 40, l: 50, r: 30 },
    showlegend: true,
    autosize: true,
  };

  return (
    <div className="space-y-6 mt-10 border-t border-gray-200 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Advanced Engineering Analysis
          </h3>
          <p className="text-sm text-gray-500">
            Time-domain waveform reconstruction and phasor visualizations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Oscilloscope View: 3-Phase Voltages */}
        <div className="lg:col-span-8 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Waves className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">
              Reconstructed Time-Domain Waveforms (Oscilloscope)
            </h4>
          </div>
          <div className="flex-1 p-2">
            <Plot
              data={[
                {
                  x: waveforms.t,
                  y: waveforms.vA,
                  type: "scatter",
                  mode: "lines",
                  name: "Va",
                  line: { color: "#ef4444", width: 2 },
                }, // Red
                {
                  x: waveforms.t,
                  y: waveforms.vB,
                  type: "scatter",
                  mode: "lines",
                  name: "Vb",
                  line: { color: "#eab308", width: 2 },
                }, // Yellow
                {
                  x: waveforms.t,
                  y: waveforms.vC,
                  type: "scatter",
                  mode: "lines",
                  name: "Vc",
                  line: { color: "#3b82f6", width: 2 },
                }, // Blue
                // Currents scaled down slightly for visual overlay (dotted)
                {
                  x: waveforms.t,
                  y: waveforms.iA,
                  type: "scatter",
                  mode: "lines",
                  name: "Ia",
                  line: { color: "#fca5a5", width: 2, dash: "dot" },
                  yaxis: "y2",
                },
                {
                  x: waveforms.t,
                  y: waveforms.iB,
                  type: "scatter",
                  mode: "lines",
                  name: "Ib",
                  line: { color: "#fde047", width: 2, dash: "dot" },
                  yaxis: "y2",
                },
                {
                  x: waveforms.t,
                  y: waveforms.iC,
                  type: "scatter",
                  mode: "lines",
                  name: "Ic",
                  line: { color: "#93c5fd", width: 2, dash: "dot" },
                  yaxis: "y2",
                },
              ]}
              layout={{
                ...layoutBase,
                legend: {
                  orientation: "h",
                  x: 0.5,
                  xanchor: "center",
                  y: -0.15,
                },
                xaxis: {
                  title: { text: "Time (seconds)" },
                  gridcolor: "#f3f4f6",
                  zerolinecolor: "#d1d5db",
                },
                yaxis: {
                  title: { text: "Voltage (V)" },
                  gridcolor: "#f3f4f6",
                  zerolinecolor: "#d1d5db",
                },
                yaxis2: {
                  title: { text: "Current (A)" },
                  overlaying: "y",
                  side: "right",
                  showgrid: false,
                },
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Right Column: Phasors & Power Triangle */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Power Triangle */}
          <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-[190px]">
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Triangle className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-700">
                Power Triangle
              </h4>
            </div>
            <div className="flex-1 px-2 relative">
              <Plot
                data={[
                  // Active Power (Horizontal)
                  {
                    x: [0, powerTriangle.P],
                    y: [0, 0],
                    type: "scatter",
                    mode: "text+lines",
                    name: "Active (kW)",
                    text: ["", `${powerTriangle.P} kW`],
                    textposition: "bottom center",
                    line: { color: "#10b981", width: 3 },
                  },
                  // Reactive Power (Vertical)
                  {
                    x: [powerTriangle.P, powerTriangle.P],
                    y: [0, powerTriangle.Q],
                    type: "scatter",
                    mode: "text+lines",
                    name: "Reactive (kVAR)",
                    text: ["", `${powerTriangle.Q} kVAR`],
                    textposition: "middle right",
                    line: { color: "#f59e0b", width: 3 },
                  },
                  // Apparent Power (Hypotenuse)
                  {
                    x: [0, powerTriangle.P],
                    y: [0, powerTriangle.Q],
                    type: "scatter",
                    mode: "text+lines",
                    name: "Apparent (kVA)",
                    text: ["", `${powerTriangle.S.toFixed(1)} kVA`],
                    textposition: "top left",
                    line: { color: "#3b82f6", width: 3, dash: "dash" },
                  },
                ]}
                layout={{
                  ...layoutBase,
                  margin: { t: 20, b: 20, l: 30, r: 40 },
                  showlegend: false,
                  xaxis: { visible: false },
                  yaxis: { visible: false },
                  annotations: [
                    {
                      x: powerTriangle.P / 4,
                      y: powerTriangle.Q / 6,
                      text: `θ = ${pfData.angleDeg.toFixed(1)}°`,
                      showarrow: false,
                      font: { color: "#6b7280", size: 12 },
                    },
                  ],
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          {/* Sequence Components Radar */}
          <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-[186px]">
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Orbit className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-700">
                Sequence Asymmetry (Radar)
              </h4>
            </div>
            <div className="flex-1 pb-2">
              <Plot
                data={[
                  {
                    type: "scatterpolar",
                    r: [
                      data.seqPositive,
                      data.seqNegative,
                      data.seqZero,
                      data.seqPositive,
                    ], // Close the loop
                    theta: [
                      "Positive (I1)",
                      "Negative (I2)",
                      "Zero (I0)",
                      "Positive (I1)",
                    ],
                    fill: "toself",
                    name: "Sequence Currents",
                    line: { color: "#8b5cf6" },
                    fillcolor: "rgba(139, 92, 246, 0.2)",
                  },
                ]}
                layout={{
                  ...layoutBase,
                  margin: { t: 30, b: 20, l: 40, r: 40 },
                  showlegend: false,
                  polar: {
                    radialaxis: {
                      visible: true,
                      range: [
                        0,
                        Math.max(
                          data.seqPositive,
                          data.seqNegative,
                          data.seqZero,
                        ) * 1.2,
                      ],
                      gridcolor: "#e5e7eb",
                    },
                    angularaxis: { gridcolor: "#e5e7eb" },
                  },
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
