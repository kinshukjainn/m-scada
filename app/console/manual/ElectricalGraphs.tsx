"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import Plotly to avoid Next.js SSR "window is not defined" errors
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
  activePower: number; // kW
  reactivePower: number; // kVAr
}

interface ElectricalGraphsProps {
  data: FormData;
}

export default function AdvancedElectricalGraphs({
  data,
}: ElectricalGraphsProps) {
  // --- Advanced Electrical Computations ---
  const computations = useMemo(() => {
    // 1. Core Power Computations
    const apparentPower = Math.sqrt(
      Math.pow(data.activePower, 2) + Math.pow(data.reactivePower, 2),
    );
    const pf = apparentPower === 0 ? 0 : data.activePower / apparentPower;

    // Phase Angle (phi) in radians and degrees. Sign depends on Reactive Power (Lagging/Leading)
    const phiRad =
      apparentPower === 0 ? 0 : Math.acos(pf) * Math.sign(data.reactivePower);
    const phiDeg = phiRad * (180 / Math.PI);

    // 2. Load Impedance Estimation (per phase, assuming balanced-ish voltage)
    const zA = data.currentA === 0 ? 0 : data.voltageA / data.currentA;
    const zB = data.currentB === 0 ? 0 : data.voltageB / data.currentB;
    const zC = data.currentC === 0 ? 0 : data.voltageC / data.currentC;
    const avgImpedance = (zA + zB + zC) / 3;

    // 3. Symmetrical Component Analysis → Fault Detection
    // These ratios drive ALL waveform distortion — no forced values, purely data-derived.
    const seqTotal = data.seqPositive + data.seqNegative + data.seqZero || 1;
    const zeroRatio = data.seqZero / seqTotal; // High → LG fault
    const negRatio = data.seqNegative / seqTotal; // High → LL fault

    // Classify fault type from ratios (thresholds reflect standard power-quality practice)
    let faultType = "Normal";
    let faultColor = "#10b981"; // green
    if (zeroRatio > 0.15 && negRatio > 0.15) {
      faultType = "LLG Fault";
      faultColor = "#ef4444";
    } else if (zeroRatio > 0.15) {
      faultType = "LG Fault (Phase A)";
      faultColor = "#f97316";
    } else if (negRatio > 0.15) {
      faultType = "LL Fault (B-C)";
      faultColor = "#eab308";
    } else if (negRatio > 0.05 || zeroRatio > 0.05) {
      faultType = "Mild Unbalance";
      faultColor = "#f59e0b";
    }

    // Fault-derived waveform modifiers
    // Zero sequence causes Phase A to sag (classic LG behaviour)
    const dipA = 1 - zeroRatio * 0.85;
    // Negative sequence depresses B and C and shifts them toward each other (LL behaviour)
    const dipB = 1 - negRatio * 0.45;
    const dipC = 1 - negRatio * 0.45;
    const faultShiftB = negRatio * (Math.PI / 4); // B advances
    const faultShiftC = -negRatio * (Math.PI / 4); // C retards

    // 4. Time-Domain Waveform Generation (50 Hz, 2 cycles = 40 ms)
    const frequency = 50;
    const omega = 2 * Math.PI * frequency;
    const timePts = Array.from({ length: 200 }, (_, i) => (i * 0.04) / 200);

    // Waveforms now naturally reflect fault conditions via dipX and faultShiftX
    const waveVa = timePts.map(
      (t) => data.voltageA * Math.SQRT2 * Math.sin(omega * t) * dipA,
    );
    const waveVb = timePts.map(
      (t) =>
        data.voltageB *
        Math.SQRT2 *
        Math.sin(omega * t - (2 * Math.PI) / 3 + faultShiftB) *
        dipB,
    );
    const waveVc = timePts.map(
      (t) =>
        data.voltageC *
        Math.SQRT2 *
        Math.sin(omega * t + (2 * Math.PI) / 3 + faultShiftC) *
        dipC,
    );

    // Phasor angles also shift with the fault
    const phasorAngleB = -120 + faultShiftB * (180 / Math.PI);
    const phasorAngleC = 120 + faultShiftC * (180 / Math.PI);
    // Effective phasor magnitudes reflect the dips
    const phasorMagA = data.voltageA * dipA;
    const phasorMagB = data.voltageB * dipB;
    const phasorMagC = data.voltageC * dipC;

    return {
      apparentPower,
      pf,
      phiDeg,
      avgImpedance,
      timePts,
      waveVa,
      waveVb,
      waveVc,
      faultType,
      faultColor,
      zeroRatio,
      negRatio,
      phasorMagA,
      phasorMagB,
      phasorMagC,
      phasorAngleB,
      phasorAngleC,
    };
  }, [data]);

  // Shared layout styling for professional aesthetic
  const layoutBase = {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "Inter, sans-serif", color: "#1f2937" },
    margin: { t: 50, b: 40, l: 50, r: 30 },
    autosize: true,
  };

  const isFaulted = computations.faultType !== "Normal";

  return (
    <div className="space-y-6 mt-8">
      <div className="border-b pb-3 mb-4 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Advanced Power System Analytics
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Real-time computational modeling of AC waveforms, phasor
            relationships, and power dynamics.
          </p>
        </div>
        {/* Fault Status Badge — driven purely by sequence component ratios */}
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

      {/* Advanced Computed Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-l-4 border-blue-500 shadow-sm p-4 rounded-r-md">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            System Power Factor
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
            Phase Angle (θ)
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {Math.abs(computations.phiDeg).toFixed(2)}°
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
            Avg Load Impedance
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {computations.avgImpedance.toFixed(2)} Ω/ph
          </p>
        </div>
      </div>

      {/* Sequence Component Breakdown — visible only when fault is present */}
      {isFaulted && (
        <div
          className="grid grid-cols-3 gap-3 p-4 rounded-lg border"
          style={{
            borderColor: computations.faultColor + "66",
            backgroundColor: computations.faultColor + "0d",
          }}
        >
          {[
            {
              label: "Positive Seq (V₁)",
              value: data.seqPositive,
              note: "Normal rotation",
            },
            {
              label: "Negative Seq (V₂)",
              value: data.seqNegative,
              note: "Unbalance / LL fault",
            },
            {
              label: "Zero Seq (V₀)",
              value: data.seqZero,
              note: "Ground path / LG fault",
            },
          ].map(({ label, value, note }) => (
            <div key={label} className="bg-white rounded-md p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {label}
              </p>
              <p className="text-xl font-bold text-gray-900">
                {value.toFixed(1)} V
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{note}</p>
            </div>
          ))}
        </div>
      )}

      {/* Primary Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Instantaneous 3-Phase Waveforms */}
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
                  ? `Voltage Waveform — <span style="color:${computations.faultColor}">${computations.faultType} Detected</span>`
                  : "Simulated Instantaneous Voltage (50Hz)",
                font: { size: 14 },
              },
              xaxis: {
                title: { text: "Time (Seconds)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#d1d5db",
              },
              yaxis: {
                title: { text: "Instantaneous Voltage (V)" },
                gridcolor: "#f3f4f6",
                zerolinecolor: "#9ca3af",
              },
              showlegend: true,
              legend: { orientation: "h", y: -0.2, x: 0.2 },
              // Annotation explaining which phase is affected
              annotations: isFaulted
                ? [
                    {
                      x: computations.timePts[40],
                      y: 0,
                      text: computations.faultType,
                      showarrow: false,
                      font: { color: computations.faultColor, size: 11 },
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

        {/* 2. Polar Phasor Diagram — magnitudes and angles driven by fault modifiers */}
        <div
          className="border rounded-md p-4 bg-white shadow-sm h-[400px]"
          style={{
            borderColor: isFaulted ? computations.faultColor + "55" : "#e5e7eb",
          }}
        >
          <Plot
            data={[
              // Voltage Phasors — magnitudes and angles reflect fault state
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
              // Current Phasors (shifted by phase angle + fault shift)
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

        {/* 3. The Power Triangle */}
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm h-[400px] lg:col-span-2">
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
                // @ts-expect-error Plotly's TS definitions are missing array support for textposition, but the JS library allows it.
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
                  text: `Angle (θ) = ${Math.abs(computations.phiDeg).toFixed(1)}°`,
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
