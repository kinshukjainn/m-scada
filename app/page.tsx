"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Cpu,
  BarChart3,
  Settings,
  CheckCircle2,
  ChevronRight,
  TerminalSquare,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// --- 3D Background Component (Three.js) ---
function ParticleGrid() {
  const points = useRef<THREE.Points>(null);

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        // Spread the grid wider for a more subtle, expansive enterprise feel
        temp.push(i * 1.5 - 30, j * 1.5 - 30, 0);
      }
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.z = time * 0.015; // Slowed down for a calmer UI
      points.current.position.y = Math.sin(time * 0.1) * 0.5;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#cbd5e1" // Lighter, sharper slate color
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function AIIndustrialHome() {
  return (
    <div className="min-h-screen bg-white text-slate-900  selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mask-image:linear-gradient(to_bottom,white,transparent)">
          <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
            <ParticleGrid />
          </Canvas>
        </div>

        {/* Added grid layout here for side-by-side alignment */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: Operational
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              Predictive Intelligence <br className="hidden md:block" />
              for{" "}
              <span className="text-[#ff9100] font-mono font-bold">
                Power Grids.
              </span>
            </h1>
            <p className="text-lg text-gray-800 max-w-2xl leading-relaxed mb-0 font-medium">
              High-fidelity fault detection utilizing machine learning to secure
              critical infrastructure across the industrial sector. Eliminate
              unplanned downtime with millisecond precision.
            </p>
          </motion.div>

          {/* Right Column: WebM Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative   overflow-hidden "
          >
            {" "}
            <DotLottieReact
              src="https://lottie.host/9b77713f-3189-4954-819e-7bdbd5e2c0ba/y5YQD6b3qw.lottie"
              loop
              autoplay
            />
          </motion.div>
        </div>
      </section>
      {/* Metrics Section - Cloudflare Boxed Style */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200 border-x border-slate-200 bg-white">
            {[
              { label: "Operating Efficiency", val: "+34%" },
              { label: "Grid Availability", val: "99.99%" },
              { label: "Detection Latency", val: "< 10ms" },
              { label: "False Positives", val: "0.02%" },
            ].map((stat, i) => (
              <div key={i} className="p-8 flex flex-col gap-2">
                <span className="text-3xl font-bold text-slate-900 font-mono tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Core Framework Architecture
            </h2>
            <p className="text-gray-800 max-w-2xl text-lg">
              A distributed, edge-first architecture designed for
              high-availability environments including steel manufacturing, rail
              networks, and heavy power distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Cpu size={22} className="text-blue-700" />,
                title: "Edge Integration",
                desc: "Low-latency data ingestion from vibration and thermal telemetry streams directly at the operational edge.",
              },
              {
                icon: <Activity size={22} className="text-blue-700" />,
                title: "Anomalous Analysis",
                desc: "Unsupervised learning models continuously trained on baseline industrial signatures to detect micro-deviations.",
              },
              {
                icon: <ShieldCheck size={22} className="text-blue-700" />,
                title: "Protocol Security",
                desc: "End-to-end encryption-at-rest and in-transit strictly adhering to IEC 62443 compliance standards.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {React.cloneElement(
                    feature.icon as React.ReactElement<{ className?: string }>,
                    {
                      className: "group-hover:text-white transition-colors",
                    },
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Data Table */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                Diagnostic Matrix
              </h2>
              <p className="text-sm text-slate-500">
                Real-time fault classification and automated response protocols.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              UPDATED: REAL-TIME
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Anomaly Class</th>
                  <th className="px-6 py-4">Phase Load</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-6 py-4 text-right">Action Protocol</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-800">
                {[
                  {
                    type: "SYMMETRICAL_LLL",
                    load: "Tri-Phase",
                    risk: "CRITICAL",
                    riskColor: "bg-red-500",
                    action: "Immediate Decouple",
                  },
                  {
                    type: "GROUND_FAULT_LG",
                    load: "Single-Phase",
                    risk: "HIGH",
                    riskColor: "bg-orange-500",
                    action: "Reroute / Isolate",
                  },
                  {
                    type: "LINE_TO_LINE_LL",
                    load: "Dual-Phase",
                    risk: "ELEVATED",
                    riskColor: "bg-amber-400",
                    action: "Load Shedding",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      {row.type}
                    </td>
                    <td className="px-6 py-4">{row.load}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-gray-800">
                        <span
                          className={`w-1.5 h-1.5 rounded ${row.riskColor}`}
                        />
                        {row.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-blue-700 font-medium hover:text-blue-800 cursor-pointer transition-colors group">
                        {row.action}
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
                Deployment Architecture
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent hidden sm:block"></div>

              <div className="space-y-8">
                {[
                  {
                    step: "Sensor Audit & Ingestion",
                    desc: "Establishing baseline telemetry from existing SCADA systems.",
                    icon: <BarChart3 size={16} />,
                  },
                  {
                    step: "Parameter Calibration",
                    desc: "Setting strict operational thresholds based on historical load.",
                    icon: <Settings size={16} />,
                  },
                  {
                    step: "Neural Network Training",
                    desc: "Applying unsupervised models to map operational norms.",
                    icon: <Cpu size={16} />,
                  },
                  {
                    step: "Full Operational Relay",
                    desc: "Live monitoring with automated decoupling capabilities.",
                    icon: <CheckCircle2 size={16} />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start relative z-10">
                    <div className="flex-shrink-0 w-8 h-8 rounded border-2 border-slate-200 bg-white flex items-center justify-center text-slate-500 mt-1 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-blue-700 mb-1">
                        PHASE 0{i + 1}
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">
                        {item.step}
                      </h4>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#0A0A0B] rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[400px]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#111113]">
                <div className="flex items-center gap-2">
                  <TerminalSquare size={16} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-400">
                    system_monitor.sh
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded bg-slate-700"></div>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs md:text-sm flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)] pointer-events-none" />

                <div className="space-y-3 text-slate-300">
                  <div className="flex gap-3">
                    <span className="text-slate-500">[14:02:41]</span>
                    <span className="text-blue-400">INIT</span>
                    <span>
                      Establishing secure connection to Edge Node 4...
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-500">[14:02:42]</span>
                    <span className="text-emerald-400">OKAY</span>
                    <span>Handshake complete. TLS 1.3 secured.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-500">[14:02:45]</span>
                    <span className="text-blue-400">SYNC</span>
                    <span>Ingesting vibration telemetry stream...</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-2 uppercase tracking-widest">
                      <span>Stream Processing</span>
                      <span>84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "84%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <span className="text-emerald-500">➜</span>
                    <span className="text-slate-100 flex items-center gap-2">
                      Awaiting anomaly triggers
                      <span className="w-1.5 h-4 bg-slate-400 animate-pulse inline-block" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
