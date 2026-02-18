"use client";

import React, { useState } from "react";
import { FiActivity, FiZap, FiTarget, FiClock, FiCpu } from "react-icons/fi";

export default function PowerAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Explicitly typing as Record<string, string> eliminates the 'never' index error completely
  const [formData, setFormData] = useState<Record<string, string>>({
    Va: "",
    Vb: "",
    Vc: "",
    Ia: "",
    Ib: "",
    Ic: "",
    neutralCurrent: "",
    activePower: "",
    reactivePower: "",
    powerFactor: "",
    frequency: "50",
    rocof: "",
    I1: "",
    I2: "",
    I0: "",
    di_dt: "",
    dv_dt: "",
    duration: "",
    thd: "",
    impedance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Attempt to nicely format the stringified JSON returned by the AI
        try {
          const parsedAiOutput = JSON.parse(data.data);
          setResult(JSON.stringify(parsedAiOutput, null, 2));
        } catch {
          // Fallback if the AI returns raw text instead of strictly JSON
          setResult(data.data);
        }
      } else {
        setResult(
          JSON.stringify(
            { error: data.error || "Failed to analyze data." },
            null,
            2,
          ),
        );
      }
    } catch (error: unknown) {
      console.error("Submission failed", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setResult(JSON.stringify({ error: errorMessage }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Fixed React.ElementType for the Icon prop
  const SectionHeader = ({
    title,
    icon: Icon,
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
      <Icon className="text-orange-600" />
      <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );

  // Simplified and fully type-safe Input component
  const Input = ({
    label,
    name,
    placeholder,
  }: {
    label: string;
    name: string;
    placeholder?: string;
  }) => (
    <div className="flex flex-col mb-3">
      <label className="text-xs font-medium text-gray-800 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-gray-50 font-mono"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 rounded">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          System Diagnostic Telemetry
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Llama 3 Bedrock Analysis Engine
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM SECTION */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Voltages */}
              <div>
                <SectionHeader title="Voltage (RMS)" icon={FiZap} />
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Va" name="Va" placeholder="230" />
                  <Input label="Vb" name="Vb" placeholder="230" />
                  <Input label="Vc" name="Vc" placeholder="230" />
                </div>
              </div>

              {/* Currents */}
              <div>
                <SectionHeader title="Current (RMS)" icon={FiActivity} />
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Ia" name="Ia" placeholder="10" />
                  <Input label="Ib" name="Ib" placeholder="10" />
                  <Input label="Ic" name="Ic" placeholder="10" />
                </div>
                <Input
                  label="Neutral Current (In)"
                  name="neutralCurrent"
                  placeholder="0.5"
                />
              </div>

              {/* Power & Frequency */}
              <div>
                <SectionHeader title="Power & Freq" icon={FiTarget} />
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Active (P)" name="activePower" />
                  <Input label="Reactive (Q)" name="reactivePower" />
                  <Input
                    label="Power Factor"
                    name="powerFactor"
                    placeholder="0.95"
                  />
                  <Input label="Freq (Hz)" name="frequency" />
                </div>
              </div>

              {/* Sequence Components */}
              <div>
                <SectionHeader title="Sequence Components" icon={FiCpu} />
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Pos (I1)" name="I1" />
                  <Input label="Neg (I2)" name="I2" />
                  <Input label="Zero (I0)" name="I0" />
                </div>
              </div>

              {/* Time Domain & Optional */}
              <div className="md:col-span-2">
                <SectionHeader
                  title="Transients & Optional Params"
                  icon={FiClock}
                />
                <div className="grid grid-cols-4 gap-2">
                  <Input label="di/dt" name="di_dt" />
                  <Input label="dv/dt" name="dv_dt" />
                  <Input label="THD (%)" name="thd" />
                  <Input label="Impedance (Z)" name="impedance" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-sm text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "Analyzing Telemetry..." : "Run Diagnostics"}
              </button>
            </div>
          </form>
        </div>

        {/* RESULTS SECTION */}
        <div className="lg:col-span-1 bg-gray-50 p-6 border border-gray-200 shadow-sm rounded-sm flex flex-col h-[600px]">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 flex-shrink-0">
            AI Diagnosis Output
          </h3>

          <div className="flex-1 overflow-auto rounded-sm border border-gray-200 bg-white p-4">
            {loading ? (
              <div className="animate-pulse flex flex-col gap-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-4"></div>
              </div>
            ) : result ? (
              <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-words">
                {result}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-gray-400 italic text-center">
                  Awaiting system telemetry...
                  <br />
                  Enter parameters and run diagnostics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
