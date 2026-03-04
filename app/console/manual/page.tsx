"use client";

import React, { useState } from "react";
import { RiGeminiFill } from "react-icons/ri";
import Image from "next/image";

import {
  Activity,
  Zap,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Loader2,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  runDiagnosticAnalysis,
  DiagnosticResponse,
  TelemetryPayload,
} from "@/lib/api_call";
import ElectricalGraphs from "./ElectricalGraphs";
import AdvancedWaveformAnalysis from "./AdvancedWaveformAnalysis";

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

export default function ElectricalDiagnosticConsole() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    voltageA: 230,
    voltageB: 228,
    voltageC: 205,
    currentA: 50,
    currentB: 52,
    currentC: 85,
    seqPositive: 60,
    seqNegative: 12,
    seqZero: 8,
    activePower: 35.5,
    reactivePower: 15.2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload: TelemetryPayload = {
      "Phase A Voltage (Volts)": formData.voltageA,
      "Phase B Voltage (Volts)": formData.voltageB,
      "Phase C Voltage (Volts)": formData.voltageC,
      "Phase A Current (Amps)": formData.currentA,
      "Phase B Current (Amps)": formData.currentB,
      "Phase C Current (Amps)": formData.currentC,
      "Positive Sequence Current (Amps)": formData.seqPositive,
      "Negative Sequence Current (Amps)": formData.seqNegative,
      "Zero Sequence Current (Amps)": formData.seqZero,
      "Total Active Power (kW)": formData.activePower,
      "Total Reactive Power (kVAR)": formData.reactivePower,
    };

    try {
      const diagnosticData = await runDiagnosticAnalysis(payload);
      setResult(diagnosticData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-700 bg-red-50 border-red-200";
      case "HIGH":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "MEDIUM":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "LOW":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "NORMAL":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900  p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
        {/* Header - Elevated Panel */}
        <div className=" p-6 rounded-sm  flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className=" bg-gray-200 border border-[#252525] p-2 rounded-sm">
            <h1 className="text-xl sm:text-xl font-bold tracking-tight text-gray-900">
              Disclaimer :
            </h1>
            <p className="text-sm text-gray-800 mt-1 font-medium ">
              This analysis is generated using machine learning models trained
              on a combination of proprietary and publicly available data
              sources. While efforts have been made to ensure reliability, the
              results are provided for informational purposes only and may not
              be fully accurate, complete, or suitable for critical
              decision-making.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Form Section - Sticky Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6  p-5 sm:p-6 rounded-sm "
            >
              {/* Voltages */}
              <div>
                <h3 className="text-xs font-bold uppercase  text-gray-900 mb-3 flex items-center gap-2  pb-2">
                  <Zap className="w-3.5 h-3.5" /> Phase Voltages (V)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {(["A", "B", "C"] as const).map((phase) => (
                    <div key={`v${phase}`}>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        PHASE {phase}
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        name={`voltage${phase}`}
                        value={formData[`voltage${phase}` as keyof FormData]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Currents */}
              <div>
                <h3 className="text-xs font-bold uppercase  text-gray-900  mb-3 flex items-center gap-2  pb-2">
                  <Activity className="w-3.5 h-3.5" /> Phase Currents (A)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {(["A", "B", "C"] as const).map((phase) => (
                    <div key={`i${phase}`}>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        PHASE {phase}
                      </label>
                      <input
                        type="number"
                        step="any"
                        required
                        name={`current${phase}`}
                        value={formData[`current${phase}` as keyof FormData]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sequence Components */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900  mb-3 flex items-center gap-2 pb-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> Sequence Currents (A)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      POS (I1)
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      name="seqPositive"
                      value={formData.seqPositive}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      NEG (I2)
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      name="seqNegative"
                      value={formData.seqNegative}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      ZERO (I0)
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      name="seqZero"
                      value={formData.seqZero}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Power */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900  mb-3 flex items-center gap-2 pb-2">
                  <Info className="w-3.5 h-3.5" /> System Power
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      ACTIVE (kW)
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      name="activePower"
                      value={formData.activePower}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      REACTIVE (kVAR)
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      name="reactivePower"
                      value={formData.reactivePower}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-400  text-black font-semibold py-1 px-2 rounded transition-all w-max  flex items-center cursor-pointer justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RiGeminiFill className="w-5 h-5 group-hover:animate-spin" />
                )}
                {loading ? "Computing ...Please wait " : "Generate"}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 xl:col-span-9">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 flex gap-3 items-start mb-6 shadow-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="h-full min-h-[500px] border-2 border-3 border-blue-200 shadow-lg shadow-blue-500 rounded-4xl flex flex-col items-center justify-center text-gray-900 p-4 text-center bg-white">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "150px",
                  }}
                >
                  <Image
                    className="animate-pulse"
                    src="/transformer.png"
                    alt="loader"
                    fill
                    style={{ objectFit: "contain" }} // or "cover"
                    sizes="100vw"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Awaiting Telemetry
                </h3>
                <p className="text-sm max-w-sm">
                  Enter the system parameters in the console and run the
                  analysis to view the AI diagnostic report and generated
                  waveforms.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[500px] border border-gray-100 rounded-sm flex flex-col items-center justify-center text-gray-500 space-y-5 shadow-sm bg-white">
                <RiGeminiFill className="w-10 h-10 animate-spin text-indigo-500" />
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-900">
                    Tokenizing parameters...feeding into model
                  </p>
                  <p className="text-sm text-blue-800 mt-1 animate-pulse">
                    Encrypting tokens and hashing graphs...
                  </p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="flex flex-col gap-6 lg:gap-8">
                {/* AI Result Card */}
                <div className="border border-gray-200 rounded-sm shadow-sm overflow-hidden bg-white">
                  <div
                    className={`p-6 sm:p-8 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${getSeverityColor(result.severity)}`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase  opacity-80 mb-1">
                        System Status: {result.severity}
                      </p>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {result.status}
                      </h2>
                    </div>
                    <div className="sm:text-right bg-white/50 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/20">
                      <div className="text-3xl font-black">
                        {result.confidence}%
                      </div>
                      <div className="text-[10px] font-bold uppercase  opacity-80">
                        AI Confidence
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase  mb-2">
                          Fault Localization
                        </h4>
                        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <p className="text-sm text-gray-900 font-semibold">
                            {result.fault_localization}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase  mb-3">
                        Technical Analysis
                      </h4>
                      <div className="text-sm text-gray-700 leading-relaxed bg-slate-50 p-5 rounded-sm border border-slate-100 shadow-inner">
                        {result.analysis}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase  mb-4">
                        Diagnostic Reasoning Steps
                      </h4>
                      <ul className="space-y-3 bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
                        {result.diagnostic_reasoning.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-gray-700 items-start"
                          >
                            <div className="mt-0.5 p-1 bg-indigo-50 text-indigo-600 rounded-sm">
                              <ChevronRight className="w-3 h-3 shrink-0" />
                            </div>
                            <span className="font-medium">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase  mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />{" "}
                        Recommended Corrective Actions
                      </h4>
                      <div className="grid gap-3">
                        {result.recommended_actions.map((act, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-sm hover:border-indigo-300 hover:shadow-md transition-all gap-3"
                          >
                            <span className="font-semibold text-gray-800 text-sm">
                              {act.action}
                            </span>
                            <span
                              className={`text-[10px] px-3 py-1.5 rounded-sm font-bold tracking-wider self-start sm:self-auto ${
                                act.urgency.toUpperCase() === "IMMEDIATE"
                                  ? "bg-red-50 text-red-700 border border-red-100"
                                  : act.urgency.toUpperCase() === "SCHEDULED"
                                    ? "bg-amber-50 text-amber-700 border border-amber-100"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {act.urgency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plotly Components */}
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 sm:p-8">
                  <ElectricalGraphs data={formData} />
                </div>

                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 sm:p-8">
                  <AdvancedWaveformAnalysis data={formData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
