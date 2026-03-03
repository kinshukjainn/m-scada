"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import Image from "next/image";
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

// --- 3D Background Component (Three.js) ---
function ParticleGrid() {
  const points = useRef<THREE.Points>(null);

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        temp.push(i * 1.5 - 30, j * 1.5 - 30, 0);
      }
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.z = time * 0.015;
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
        color="#8cb4ff" // Adapted to the MDN blue accent
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

export default function AIIndustrialHome() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-[#2d2d2d] bg-[#1b1b1b]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mask-image:linear-gradient(to_bottom,black,transparent)">
          <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
            <ParticleGrid />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#2d2d2d] border border-[#444] text-gray-200 text-[11px] font-mono uppercase tracking-widest mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-[#8cb4ff] opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-[#8cb4ff]"></span>
              </span>
              System Status: Operational
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              Predictive Intelligence <br className="hidden md:block" />
              for Power Grids <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mb-0 font-normal tracking-wide">
              High-fidelity fault detection utilizing machine learning to secure
              critical infrastructure across the industrial sector. Eliminate
              unplanned downtime with millisecond precision.
            </p>
          </motion.div>

          {/* Right Column: Next.js Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative w-full flex justify-center items-center"
          >
            <Image
              src="/powersys.png"
              alt="Predictive Intelligence Dashboard"
              width={1200}
              height={800}
              className="w-full h-auto max-w-full object-contain "
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Console Preview Section */}
      <section className="py-16 bg-[#121212] border-b border-[#2d2d2d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8 text-center">
              Console Preview <span className="text-[#8cb4ff]">_</span>
            </h2>
            <div className="w-full overflow-hidden   p-2">
              <Image
                src="/console.png"
                alt="Console Dashboard Preview"
                width={1920}
                height={1080}
                className="w-full h-auto block object-contain rounded-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-[#121212] border-b border-[#2d2d2d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#333] border border-[#333] bg-[#1b1b1b] rounded-3xl overflow-hidden">
            {[
              { label: "Operating Efficiency", val: "+34%" },
              { label: "Grid Availability", val: "99.99%" },
              { label: "Detection Latency", val: "< 10ms" },
              { label: "False Positives", val: "0.02%" },
            ].map((stat, i) => (
              <div key={i} className="p-8 flex flex-col gap-2">
                <span className="text-3xl font-normal text-white tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[11px] font-mono text-gray-100 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 ">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-normal text-white tracking-tight mb-4">
              Core Framework Architecture{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h2>
            <p className="text-gray-200 max-w-2xl text-lg font-normal tracking-wide">
              A distributed, edge-first architecture designed for
              high-availability environments including steel manufacturing, rail
              networks, and heavy power distribution.
            </p>
            <div className="w-full mt-10 overflow-hidden  p-2">
              <Image
                src="/flowdiagram.png"
                alt="Framework Architecture"
                width={1920}
                height={1080}
                className="w-full h-auto block object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[
              {
                icon: <Cpu size={22} />,
                title: "Edge Integration",
                desc: "Low-latency data ingestion from vibration and thermal telemetry streams directly at the operational edge.",
              },
              {
                icon: <Activity size={22} />,
                title: "Anomalous Analysis",
                desc: "Unsupervised learning models continuously trained on baseline industrial signatures to detect micro-deviations.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Protocol Security",
                desc: "End-to-end encryption-at-rest and in-transit strictly adhering to IEC 62443 compliance standards.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] p-8 border border-[#333] rounded-3xl hover:border-[#8cb4ff] transition-all duration-300 group cursor-default shadow-sm"
              >
                <div className="w-12 h-12 rounded-3xl bg-[#2d2d2d] border border-[#444] text-[#8cb4ff] flex items-center justify-center mb-6 group-hover:bg-[#8cb4ff] group-hover:text-[#121212] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-normal text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed font-normal">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Data Table */}
      <section className="py-24 bg-[#1b1b1b] border-b border-[#2d2d2d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                Diagnostic Matrix
              </h2>
              <p className="text-sm text-gray-200 font-normal">
                Real-time fault classification and automated response protocols.
              </p>
            </div>
            <div className="text-xs font-mono text-gray-100 tracking-widest uppercase">
              Updated: Real-Time
            </div>
          </div>

          <div className="overflow-x-auto border border-[#333] rounded-2xl bg-[#121212] shadow-sm">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#1b1b1b] border-b border-[#333] text-gray-200 text-[11px] font-mono uppercase tracking-widest">
                  <th className="px-6 py-4">Anomaly Class</th>
                  <th className="px-6 py-4">Phase Load</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-6 py-4 text-right">Action Protocol</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-gray-300 font-normal">
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
                    className="border-b border-[#2d2d2d] last:border-0 hover:bg-[#1b1b1b] transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-normal text-white">
                      {row.type}
                    </td>
                    <td className="px-6 py-4">{row.load}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#2d2d2d] border border-[#444] text-[11px] font-mono text-gray-200">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${row.riskColor}`}
                        />
                        {row.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-300 flex items-center justify-end gap-1">
                      {row.action}
                      <ChevronRight size={14} className="text-gray-100" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-10">
                Deployment Architecture{" "}
                <span className="text-[#8cb4ff]">_</span>
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#444] before:to-transparent hidden sm:block"></div>

              <div className="space-y-10">
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
                  <div key={i} className="flex gap-6 items-start relative z-10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-2xl border border-[#444] bg-[#1b1b1b] flex items-center justify-center text-[#8cb4ff] mt-1 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-normal text-[#8cb4ff] mb-1">
                        PHASE 0{i + 1}
                      </div>
                      <h4 className="font-normal text-white text-base mb-1">
                        {item.step}
                      </h4>
                      <p className="text-sm text-gray-200 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-[#121212] rounded-3xl border border-[#333] shadow-lg overflow-hidden flex flex-col h-[400px]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] bg-black">
                <div className="flex items-center gap-2">
                  <TerminalSquare size={16} className="text-gray-200" />
                  <span className="text-xs font-mono text-gray-200">
                    system_monitor.sh
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs md:text-sm flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,180,255,0.03)_0%,transparent_100%)] pointer-events-none" />

                <div className="space-y-3 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-gray-100">[14:02:41]</span>
                    <span className="text-[#8cb4ff]">INIT</span>
                    <span>
                      Establishing secure connection to Edge Node 4...
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-100">[14:02:42]</span>
                    <span className="text-green-400">OKAY</span>
                    <span>Handshake complete. TLS 1.3 secured.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-gray-100">[14:02:45]</span>
                    <span className="text-[#8cb4ff]">SYNC</span>
                    <span>Ingesting vibration telemetry stream...</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-[10px] text-gray-100 mb-2 uppercase tracking-widest">
                      <span>Stream Processing</span>
                      <span>84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#2d2d2d] rounded overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "84%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#8cb4ff]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <span className="text-green-400">➜</span>
                    <span className="text-gray-200 flex items-center gap-2">
                      Awaiting anomaly triggers
                      <span className="w-1.5 h-4 bg-gray-400 animate-pulse inline-block" />
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
