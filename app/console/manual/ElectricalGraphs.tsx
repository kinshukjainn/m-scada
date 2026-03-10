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

    // 3. Time-Domain Waveform Generation (Simulating 50Hz AC over 2 cycles = 40ms)
    const frequency = 50; // Hz
    const omega = 2 * Math.PI * frequency;
    const timePts = Array.from({ length: 200 }, (_, i) => (i * 0.04) / 200); // 0 to 40ms

    const waveVa = timePts.map(
      (t) => data.voltageA * Math.SQRT2 * Math.sin(omega * t),
    );
    const waveVb = timePts.map(
      (t) =>
        data.voltageB * Math.SQRT2 * Math.sin(omega * t - (2 * Math.PI) / 3),
    );
    const waveVc = timePts.map(
      (t) =>
        data.voltageC * Math.SQRT2 * Math.sin(omega * t + (2 * Math.PI) / 3),
    );

    return {
      apparentPower,
      pf,
      phiDeg,
      avgImpedance,
      timePts,
      waveVa,
      waveVb,
      waveVc,
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

  return (
    <div className="space-y-6 mt-8">
      <div className="border-b pb-3 mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Advanced Power System Analytics
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Real-time computational modeling of AC waveforms, phasor
          relationships, and power dynamics.
        </p>
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

      {/* Primary Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Instantaneous 3-Phase Waveforms */}
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm h-[400px]">
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
                text: "Simulated Instantaneous Voltage (50Hz)",
                font: { size: 15, weight: "bold" },
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
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 2. Polar Phasor Diagram */}
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm h-[400px]">
          <Plot
            data={[
              // Voltage Phasors (Assuming Va is reference at 0 deg)
              {
                type: "scatterpolar",
                r: [0, data.voltageA],
                theta: [0, 0],
                mode: "lines+markers",
                name: "Va",
                line: { color: "#ef4444", width: 3 },
                marker: { size: 8 },
              },
              {
                type: "scatterpolar",
                r: [0, data.voltageB],
                theta: [0, -120],
                mode: "lines+markers",
                name: "Vb",
                line: { color: "#eab308", width: 3 },
                marker: { size: 8 },
              },
              {
                type: "scatterpolar",
                r: [0, data.voltageC],
                theta: [0, 120],
                mode: "lines+markers",
                name: "Vc",
                line: { color: "#3b82f6", width: 3 },
                marker: { size: 8 },
              },
              // Current Phasors (Shifted by Phase Angle phiDeg)
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
                theta: [0, -120 - computations.phiDeg],
                mode: "lines+markers",
                name: "Ib",
                line: { color: "#fef08a", width: 2, dash: "dot" },
                marker: { symbol: "diamond", size: 6 },
              },
              {
                type: "scatterpolar",
                r: [0, data.currentC],
                theta: [0, 120 - computations.phiDeg],
                mode: "lines+markers",
                name: "Ic",
                line: { color: "#93c5fd", width: 2, dash: "dot" },
                marker: { symbol: "diamond", size: 6 },
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: "System Phasor Diagram (V & I)",
                font: { size: 15, weight: "bold" },
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
                font: { size: 15, weight: "bold" },
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
