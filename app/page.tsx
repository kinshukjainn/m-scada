"use client";

import React from "react";
import Image from "next/image";

export default function AIIndustrialHome() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0] selection:bg-[#8cb4ff]/30 selection:text-white ">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-20 border-b border-[#2d2d2d]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#2d2d2d] border border-[#444] text-gray-200 text-[11px] font-mono uppercase tracking-widest mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-[#8cb4ff] opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-[#8cb4ff]"></span>
              </span>
              System Status: Operational
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              A <span className="text-red-500 font-mono">better</span> version
              of scada
              <span className="text-[#8cb4ff]">_</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Mscada is an open-source, intelligent monitoring layer for
              industrial control systems. It augments traditional SCADA with
              real-time telemetry processing, machine learning fault detection,
              and millisecond event analysis.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="w-full flex justify-center items-center">
            <Image
              src="/powersys.png"
              alt="Predictive Intelligence Dashboard"
              width={800}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── METRICS SECTION ── */}
      <section className="bg-[#1a1a1a] border-b border-[#2d2d2d]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[#333]">
            {[
              { label: "Operating Efficiency", val: "+34%" },
              { label: "Grid Availability", val: "99.99%" },
              { label: "Detection Latency", val: "< 10ms" },
              { label: "False Positives", val: "0.02%" },
            ].map((stat, i) => (
              <div key={i} className="md:pl-8 first:pl-0 flex flex-col gap-1">
                <span className="text-3xl font-bold text-white tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUALS & ARCHITECTURE SECTION ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 space-y-24">
          {/* Console Preview */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">
              Console Preview <span className="text-[#8cb4ff]">_</span>
            </h2>
            <div className="p-1">
              <Image
                src="/console.png"
                alt="Console Dashboard Preview"
                width={1200}
                height={675}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">
              Core Framework Architecture{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg mb-8">
              A distributed, edge-first architecture designed for
              high-availability environments including steel manufacturing, rail
              networks, and heavy power distribution.
            </p>
            <div className=" p-1">
              <Image
                src="/archieflow.png"
                alt="Framework Architecture"
                width={1200}
                height={675}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
