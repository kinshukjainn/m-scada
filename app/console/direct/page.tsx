"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { RiGeminiFill } from "react-icons/ri";
import { motion } from "framer-motion";
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
  Play,
  Square,
  Radio,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  runDiagnosticAnalysis,
  DiagnosticResponse,
  TelemetryPayload,
} from "@/lib/auto_api_call";
import ElectricalGraphs from "./Auto-electricalwaves";
import AdvancedWaveformAnalysis from "./Auto-advancedwaves";

// =========================
// Extended FormData with system parameters
// =========================

export interface FormData {
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
  // ── New system-level parameters ──
  systemVoltageLevel: number; // kV (nominal line voltage — drives threshold selection)
  xrRatio: number; // X/R ratio of source impedance (drives DC offset decay)
  faultInceptionAngle: number; // degrees (0–360, point-on-wave where fault initiates)
  nominalFrequency: number; // Hz (50 or 60)
  ctAccuracyClass: number; // CT accuracy class (e.g. 0.5, 1.0, 3.0) — drives measurement noise
  faultMVABase: number; // System fault level in MVA (for per-unit calculations)
}

const BASE_VALUES: FormData = {
  voltageA: 230,
  voltageB: 228,
  voltageC: 205,
  currentA: 50,
  currentB: 52,
  currentC: 85,
  seqVoltagePositive: 220,
  seqVoltageNegative: 12,
  seqVoltageZero: 8,
  seqPositive: 60,
  seqNegative: 12,
  seqZero: 8,
  activePower: 35.5,
  reactivePower: 15.2,
  // System defaults (415V distribution board)
  systemVoltageLevel: 0.415,
  xrRatio: 5.0,
  faultInceptionAngle: 0,
  nominalFrequency: 50,
  ctAccuracyClass: 1.0,
  faultMVABase: 25,
};

// =========================
// Gaussian noise (Box-Muller transform)
// =========================
// Real instrument transformers produce Gaussian-distributed measurement
// error (IEC 61869). Quantization noise from ADCs is uniform but small
// relative to CT/PT error, so the dominant contribution is Gaussian.

function gaussianRandom(mean: number = 0, std: number = 1): number {
  let u1 = Math.random();
  const u2 = Math.random();
  // Avoid log(0)
  while (u1 === 0) u1 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + std * z;
}

// =========================
// Fluctuation Config
// =========================
// `sigma` = 1-σ standard deviation for Gaussian noise (fast tick, every 5s)
// `drift` = slow random-walk component (applied infrequently)
// `quantStep` = ADC quantization step (adds uniform ±0.5 LSB after Gaussian)

interface FieldConfig {
  sigma: number; // Gaussian σ for fast-tick measurement noise
  drift: number; // slow random-walk magnitude
  quantStep: number; // ADC quantization step size
  decimals: number;
}

// Noise magnitudes are derived from CT/PT accuracy class:
//   CT class 1.0 → ±1% composite error at rated current (IEC 61869-2)
//   PT class 0.5 → ±0.5% voltage error
// σ ≈ (accuracy% / 3) × nominal (covers 99.7% within rated accuracy)
// ADC quantization for a typical 16-bit IED measuring 0–300V: step ≈ 0.0046V

const FIELD_CONFIG: Record<keyof FormData, FieldConfig> = {
  voltageA: { sigma: 0.38, drift: 0.3, quantStep: 0.005, decimals: 1 },
  voltageB: { sigma: 0.38, drift: 0.3, quantStep: 0.005, decimals: 1 },
  voltageC: { sigma: 0.38, drift: 0.5, quantStep: 0.005, decimals: 1 },
  currentA: { sigma: 0.17, drift: 0.2, quantStep: 0.01, decimals: 1 },
  currentB: { sigma: 0.17, drift: 0.2, quantStep: 0.01, decimals: 1 },
  currentC: { sigma: 0.25, drift: 0.3, quantStep: 0.01, decimals: 1 },
  seqVoltagePositive: {
    sigma: 0.37,
    drift: 0.2,
    quantStep: 0.005,
    decimals: 1,
  },
  seqVoltageNegative: {
    sigma: 0.08,
    drift: 0.1,
    quantStep: 0.005,
    decimals: 2,
  },
  seqVoltageZero: { sigma: 0.05, drift: 0.05, quantStep: 0.005, decimals: 2 },
  seqPositive: { sigma: 0.2, drift: 0.15, quantStep: 0.01, decimals: 1 },
  seqNegative: { sigma: 0.06, drift: 0.05, quantStep: 0.01, decimals: 2 },
  seqZero: { sigma: 0.04, drift: 0.04, quantStep: 0.01, decimals: 2 },
  activePower: { sigma: 0.0, drift: 0.08, quantStep: 0.01, decimals: 2 },
  reactivePower: { sigma: 0.0, drift: 0.04, quantStep: 0.01, decimals: 2 },
  // System parameters — no noise, they're configuration
  systemVoltageLevel: { sigma: 0, drift: 0, quantStep: 0, decimals: 3 },
  xrRatio: { sigma: 0, drift: 0, quantStep: 0, decimals: 1 },
  faultInceptionAngle: { sigma: 0, drift: 0, quantStep: 0, decimals: 0 },
  nominalFrequency: { sigma: 0, drift: 0, quantStep: 0, decimals: 1 },
  ctAccuracyClass: { sigma: 0, drift: 0, quantStep: 0, decimals: 1 },
  faultMVABase: { sigma: 0, drift: 0, quantStep: 0, decimals: 1 },
};

const FAST_INTERVAL_MS = 5000;
const SLOW_TICK_EVERY = 720; // every 720 fast ticks ≈ 1 hour of simulated time

function applyNoise(
  value: number,
  cfg: FieldConfig,
  ctClass: number,
  isSlowTick: boolean,
): number {
  let result = value;

  // Scale sigma by CT accuracy class ratio (class 0.5 → half the noise of class 1.0)
  const classScale = ctClass / 1.0;

  if (cfg.sigma > 0) {
    // Gaussian measurement noise (dominant in real CTs/PTs)
    const gaussNoise = gaussianRandom(0, cfg.sigma * classScale);
    result += gaussNoise;

    // ADC quantization noise (uniform ±0.5 LSB)
    if (cfg.quantStep > 0) {
      result = Math.round(result / cfg.quantStep) * cfg.quantStep;
    }
  }

  // Slow drift (random walk — models temperature drift, load changes)
  if (isSlowTick && cfg.drift > 0) {
    result += gaussianRandom(0, cfg.drift * 0.5);
  }

  return parseFloat(result.toFixed(cfg.decimals));
}

// Fields that are "measurement" vs "configuration" (only measurements get noise)
const MEASUREMENT_FIELDS: (keyof FormData)[] = [
  "voltageA",
  "voltageB",
  "voltageC",
  "currentA",
  "currentB",
  "currentC",
  "seqVoltagePositive",
  "seqVoltageNegative",
  "seqVoltageZero",
  "seqPositive",
  "seqNegative",
  "seqZero",
  "activePower",
  "reactivePower",
];

// =========================
// Component
// =========================

export default function ElectricalDiagnosticConsole() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [tickCount, setTickCount] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState<FormData>({ ...BASE_VALUES });
  const [prevData, setPrevData] = useState<FormData>({ ...BASE_VALUES });
  const [blinkOn, setBlinkOn] = useState(true);

  const tickRef = useRef(0);

  // ---- Live fluctuation loop (Gaussian noise model) ----
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      tickRef.current += 1;
      const isSlowTick = tickRef.current % SLOW_TICK_EVERY === 0;

      setFormData((prev) => {
        setPrevData({ ...prev });
        const next = { ...prev };
        const ctClass = prev.ctAccuracyClass;

        MEASUREMENT_FIELDS.forEach((key) => {
          const cfg = FIELD_CONFIG[key];
          if (cfg.sigma > 0 || (isSlowTick && cfg.drift > 0)) {
            next[key] = applyNoise(prev[key], cfg, ctClass, isSlowTick);
          }
        });
        return next;
      });

      setTickCount((t) => t + 1);
    }, FAST_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isLive]);

  // ---- Blink indicator ----
  useEffect(() => {
    if (!isLive) {
      setBlinkOn(true);
      return;
    }
    const b = setInterval(() => setBlinkOn((v) => !v), 600);
    return () => clearInterval(b);
  }, [isLive]);

  // ---- Manual input (only when stopped) ----
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLive) return;
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || 0,
    });
  };

  // ---- Submit ----
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLive) return;
      setLoading(true);
      setError(null);
      setResult(null);

      const payload: TelemetryPayload = {
        // Measurement fields
        "Phase A Voltage (Volts)": formData.voltageA,
        "Phase B Voltage (Volts)": formData.voltageB,
        "Phase C Voltage (Volts)": formData.voltageC,
        "Phase A Current (Amps)": formData.currentA,
        "Phase B Current (Amps)": formData.currentB,
        "Phase C Current (Amps)": formData.currentC,
        "Positive Sequence Voltage (Volts)": formData.seqVoltagePositive,
        "Negative Sequence Voltage (Volts)": formData.seqVoltageNegative,
        "Zero Sequence Voltage (Volts)": formData.seqVoltageZero,
        "Positive Sequence Current (Amps)": formData.seqPositive,
        "Negative Sequence Current (Amps)": formData.seqNegative,
        "Zero Sequence Current (Amps)": formData.seqZero,
        "Total Active Power (kW)": formData.activePower,
        "Total Reactive Power (kVAR)": formData.reactivePower,
        // System configuration parameters
        "System Voltage Level (kV)": formData.systemVoltageLevel,
        "X/R Ratio": formData.xrRatio,
        "Fault Inception Angle (degrees)": formData.faultInceptionAngle,
        "Nominal Frequency (Hz)": formData.nominalFrequency,
        "CT Accuracy Class": formData.ctAccuracyClass,
        "Fault MVA Base (MVA)": formData.faultMVABase,
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
    },
    [formData, isLive],
  );

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

  const deltaClass = (key: keyof FormData) => {
    const diff = formData[key] - prevData[key];
    if (Math.abs(diff) < 0.001) return "text-gray-900";
    return diff > 0 ? "text-emerald-600" : "text-red-500";
  };

  // ---- Field renderer ----
  const renderField = (label: string, name: keyof FormData, unit: string) => (
    <div key={name} className="relative">
      <label className="block text-[11px] font-semibold text-gray-500 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          step="any"
          required
          name={name}
          value={formData[name]}
          onChange={handleChange}
          readOnly={isLive}
          className={`w-full px-3 py-2 border rounded-sm text-sm transition-all duration-300  font-semibold
            ${
              isLive
                ? "border-gray-200 bg-gray-50 cursor-default select-none focus:outline-none"
                : "border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            }
            ${isLive ? deltaClass(name) : "text-gray-900"}
          `}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-medium pointer-events-none">
          {unit}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
        {/* ---- Header ---- */}
        <div className="p-6 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className=" p-2">
            <h1 className="text-xl sm:text-xl font-bold tracking-tight text-gray-900">
              Disclaimer :
            </h1>
            <p className="text-md text-black mt-1 font-medium">
              This analysis is generated using machine learning models trained
              on a combination of proprietary and publicly available data
              sources. While efforts have been made to ensure reliability, the
              results are provided for informational purposes only and may not
              be fully accurate, complete, or suitable for critical
              decision-making.
            </p>
          </div>
        </div>

        {/* ---- SCADA Status Bar ---- */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 px-5 py-3 w-max rounded-4xl 
          ${isLive ? "bg-white" : "white "}`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full transition-opacity duration-300
              ${
                isLive
                  ? `bg-blue-500 ${blinkOn ? "opacity-100" : "opacity-20"}`
                  : "bg-green-700 opacity-100"
              }`}
            />
            <Radio
              className={`w-4 h-4 ${isLive ? "text-white" : "text-black"}`}
            />
            <span
              className={`text-sm font-bold ${isLive ? "text-black" : "text-black"}`}
            >
              {isLive
                ? `Live ${formData.ctAccuracyClass} · Tick #${tickCount}`
                : "Simulation paused"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLive((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-md font-semibold  transition-all
                ${
                  isLive
                    ? "bg-blue-800  border-blue-900 text-white hover:bg-blue-900"
                    : "bg-green-600 border-green-700 text-white hover:bg-green-700"
                }`}
            >
              {isLive ? (
                <>
                  <Square className="w-3.5 h-3.5" /> Stop Simulation
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Resume Live
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ---- Form Sidebar ---- */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-5 sm:p-6 rounded-sm"
            >
              {/* Phase Voltages */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2 pb-2">
                  <Zap className="w-3.5 h-3.5" /> Phase Voltages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {renderField("PHASE A", "voltageA", "V")}
                  {renderField("PHASE B", "voltageB", "V")}
                  {renderField("PHASE C", "voltageC", "V")}
                </div>
              </div>

              {/* Phase Currents */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2 pb-2">
                  <Activity className="w-3.5 h-3.5" /> Phase Currents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {renderField("PHASE A", "currentA", "A")}
                  {renderField("PHASE B", "currentB", "A")}
                  {renderField("PHASE C", "currentC", "A")}
                </div>
              </div>

              {/* Sequence Voltages */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2 pb-2">
                  <Zap className="w-3.5 h-3.5 text-violet-500" /> Sequence
                  Voltages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {renderField("POS (V1)", "seqVoltagePositive", "V")}
                  {renderField("NEG (V2)", "seqVoltageNegative", "V")}
                  {renderField("ZERO (V0)", "seqVoltageZero", "V")}
                </div>
              </div>

              {/* Sequence Currents */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2 pb-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> Sequence Currents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  {renderField("POS (I1)", "seqPositive", "A")}
                  {renderField("NEG (I2)", "seqNegative", "A")}
                  {renderField("ZERO (I0)", "seqZero", "A")}
                </div>
              </div>

              {/* System Power */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2 pb-2">
                  <Info className="w-3.5 h-3.5" /> System Power
                  <span className="ml-auto text-[9px] bg-blue-100 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-bold">
                    SLOW DRIFT
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  {renderField("ACTIVE", "activePower", "kW")}
                  {renderField("REACTIVE", "reactivePower", "kVAR")}
                </div>
              </div>

              {/* ── Advanced System Parameters (collapsible) ── */}
              <div className=" p-2 bg-gray-200 rounded-md pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdvanced((v) => !v)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase text-black0 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Settings2 className="w-3.5 h-3.5" /> System Configuration
                  </span>
                  {showAdvanced ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showAdvanced && (
                  <div className="mt-3 space-y-3 p-3 rounded-xl ">
                    <p className="text-[15px] font-medium text-gray-900 leading-snug">
                      These parameters control fault classification thresholds
                      (IEEE C37.113 / IEC 60255), DC offset decay, and
                      measurement noise scaling.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {renderField("SYSTEM V", "systemVoltageLevel", "kV")}
                      {renderField("X/R RATIO", "xrRatio", "")}
                      {renderField("INCEPTION ∠", "faultInceptionAngle", "°")}
                      {renderField("FREQUENCY", "nominalFrequency", "Hz")}
                      {renderField("CT CLASS", "ctAccuracyClass", "")}
                      {renderField("FAULT MVA", "faultMVABase", "MVA")}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={loading || isLive}
                  title={isLive ? "Stop simulation first to run analysis" : ""}
                  className={`w-max text-white font-semibold py-2 px-6 rounded-md transition-all flex items-center cursor-pointer justify-center gap-3
                    ${
                      isLive
                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                        : "bg-blue-800 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    }`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <RiGeminiFill className="w-5 h-5" />
                  )}
                  {loading ? "Computing ... Please wait" : "Generate"}
                </button>

                {isLive && (
                  <p className="text-[14px] text-center text-black font-semibold">
                    ⚠ Stop simulation to enable AI analysis
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* ---- Results Section ---- */}
          <div className="lg:col-span-8 xl:col-span-9">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 flex gap-3 items-start mb-6 shadow-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="h-full min-h-[500px]  rounded-md flex flex-col items-center justify-center text-gray-900 p-3 text-center">
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
                    style={{ objectFit: "contain" }}
                    sizes="100vw"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Awaiting response from the AI diagnostic engine...
                </h3>
                <p className="text-sm max-w-sm">
                  {isLive
                    ? "Stop the live simulation, then click Generate AI Analysis to run diagnostics."
                    : "Enter the system parameters in the console and run the analysis to view the AI diagnostic report and generated waveforms."}
                </p>
              </div>
            )}

            {loading && (
              <div className="relative h-full min-h-[500px] flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-72 h-72 bg-blue-400 rounded-full blur-[80px] -z-10 pointer-events-none"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-6 z-10"
                >
                  <div className="relative flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-blue-100 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <RiGeminiFill className="w-10 h-10 text-blue-600 relative z-10" />
                    </motion.div>
                  </div>
                  <div className="text-center space-y-2 flex flex-col items-center">
                    <motion.h3
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-lg font-medium text-gray-800 tracking-tight"
                    >
                      Tokenizing parameters
                    </motion.h3>
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-blue-600/80">
                        Encrypting tokens and hashing graphs
                      </p>
                      <div className="flex space-x-[2px] mt-[2px]">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            className="w-1 h-1 bg-blue-600/80 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
                      <p className="text-xs font-bold uppercase opacity-80 mb-1">
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
                      <div className="text-[10px] font-bold uppercase opacity-80">
                        AI Confidence
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-2">
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
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3">
                        Technical Analysis
                      </h4>
                      <div className="text-sm text-gray-700 leading-relaxed bg-slate-50 p-5 rounded-sm border border-slate-100 shadow-inner">
                        {result.analysis}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-4">
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
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
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

                {/* Plotly Components — now receive full FormData with system params */}
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
