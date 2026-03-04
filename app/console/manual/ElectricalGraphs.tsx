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
  activePower: number;
  reactivePower: number;
}

interface ElectricalGraphsProps {
  data: FormData;
}

export default function ElectricalGraphs({ data }: ElectricalGraphsProps) {
  // --- Electrical Calculations ---
  const calculations = useMemo(() => {
    // Voltage Imbalance Calculation
    const vAvg = (data.voltageA + data.voltageB + data.voltageC) / 3;
    const vMaxDev = Math.max(
      Math.abs(data.voltageA - vAvg),
      Math.abs(data.voltageB - vAvg),
      Math.abs(data.voltageC - vAvg),
    );
    const vImbalance = vAvg === 0 ? 0 : (vMaxDev / vAvg) * 100;

    // Current Imbalance Calculation
    const iAvg = (data.currentA + data.currentB + data.currentC) / 3;
    const iMaxDev = Math.max(
      Math.abs(data.currentA - iAvg),
      Math.abs(data.currentB - iAvg),
      Math.abs(data.currentC - iAvg),
    );
    const iImbalance = iAvg === 0 ? 0 : (iMaxDev / iAvg) * 100;

    // Power Factor & Apparent Power Calculation
    const apparentPower = Math.sqrt(
      Math.pow(data.activePower, 2) + Math.pow(data.reactivePower, 2),
    );
    const pf = apparentPower === 0 ? 0 : data.activePower / apparentPower;

    return { vImbalance, iImbalance, apparentPower, pf };
  }, [data]);

  // Shared layout styling for a clean, professional white theme
  const layoutBase = {
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { family: "Inter, sans-serif", color: "#374151" },
    margin: { t: 40, b: 40, l: 40, r: 20 },
    showlegend: false,
    autosize: true,
  };

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">
        Telemetry Data Visualization & Metrics
      </h3>

      {/* Calculated Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            Voltage Imbalance
          </p>
          <p
            className={`text-xl font-bold ${calculations.vImbalance > 3 ? "text-red-600" : "text-gray-900"}`}
          >
            {calculations.vImbalance.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            Current Imbalance
          </p>
          <p
            className={`text-xl font-bold ${calculations.iImbalance > 10 ? "text-red-600" : "text-gray-900"}`}
          >
            {calculations.iImbalance.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            Power Factor
          </p>
          <p
            className={`text-xl font-bold ${calculations.pf < 0.85 ? "text-orange-600" : "text-gray-900"}`}
          >
            {calculations.pf.toFixed(3)}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            Apparent Power
          </p>
          <p className="text-xl font-bold text-gray-900">
            {calculations.apparentPower.toFixed(2)} kVA
          </p>
        </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phase Voltages & Currents */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white shadow-sm h-[350px]">
          <Plot
            data={[
              {
                x: ["Phase A", "Phase B", "Phase C"],
                y: [data.voltageA, data.voltageB, data.voltageC],
                type: "bar",
                name: "Voltage (V)",
                marker: { color: "#3b82f6" }, // Blue
                yaxis: "y1",
              },
              {
                x: ["Phase A", "Phase B", "Phase C"],
                y: [data.currentA, data.currentB, data.currentC],
                type: "scatter",
                mode: "lines+markers",
                name: "Current (A)",
                marker: { color: "#f97316", size: 10 }, // Orange
                line: { width: 3 },
                yaxis: "y2",
              },
            ]}
            layout={{
              ...layoutBase,
              title: {
                text: "Phase Voltages vs. Currents",
                font: { size: 14 },
              },
              // Fix: Changed title strings to objects with 'text' properties
              yaxis: { title: { text: "Voltage (V)" }, gridcolor: "#e5e7eb" },
              yaxis2: {
                title: { text: "Current (A)" },
                overlaying: "y",
                side: "right",
                showgrid: false,
              },
              showlegend: true,
              legend: { orientation: "h", y: -0.2 },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Sequence Components */}
        <div className="border border-gray-200 rounded-sm p-4 bg-white shadow-sm h-[350px]">
          <Plot
            data={[
              {
                x: ["Positive (I1)", "Negative (I2)", "Zero (I0)"],
                y: [data.seqPositive, data.seqNegative, data.seqZero],
                type: "bar",
                marker: {
                  color: ["#10b981", "#ef4444", "#f59e0b"], // Green, Red, Yellow
                },
              },
            ]}
            layout={{
              ...layoutBase,
              title: { text: "Sequence Components (Amps)", font: { size: 14 } },
              // Fix: Changed title string to an object with a 'text' property
              yaxis: { title: { text: "Current (A)" }, gridcolor: "#e5e7eb" },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
