"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AIIndustrialHome() {
  const words = [
    "High-performance",
    "Production-grade",
    "Low-latency",
    "Extensible",
    "Real-time",
    "Modular",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Changes the word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="min-h-screen bg-[#faf9f8] text-gray-900 font-sans selection:bg-[#cce3f5] selection:text-black">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="max-w-2xl">
            {/* Azure-style Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#f3fcf3] border border-[#cce8cc] text-[#107c10] font-semibold text-[13px] tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#107c10] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#107c10]"></span>
              </span>
              System Status: Operational
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight flex flex-wrap items-center gap-x-2 sm:gap-x-3">
              <span>A</span>

              <div className="relative flex items-center justify-center min-w-[200px] sm:min-w-[280px] h-[1.2em]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-[#0078D4] absolute left-0 inline-block whitespace-nowrap"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span>version of SCADA</span>
            </h1>

            <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed max-w-xl">
              MScada is a next-generation, also known as{" "}
              <span className="text-gray-800 font-semibold px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded-sm text-[14px]">
                Modern Scada
              </span>
              , an{" "}
              <span className="font-semibold text-gray-800 border-b border-gray-300">
                open source
              </span>{" "}
              monitoring layer that elevates traditional SCADA systems with
              intelligent capabilities. By combining real-time telemetry
              processing, machine learning based fault detection, and
              millisecond level event analysis, it delivers deeper operational
              insight, faster anomaly detection, and smarter automation making
              it a compelling upgrade for any modern industrial control
              environment seeking reliability, scalability, and proactive
              monitoring.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="w-full flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-[600px] bg-white border border-gray-200 shadow-sm rounded-sm p-2">
              {/* Fallback structural div in case the image fails to load, prevents layout shift */}
              <div className="aspect-[4/3] relative w-full overflow-hidden bg-[#f3f2f1]">
                <Image
                  src="/housepower.png"
                  alt="Predictive Intelligence Dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS SECTION ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-gray-200">
            {[
              { label: "Operating Efficiency", val: "+34%" },
              { label: "Grid Availability", val: "99.99%" },
              { label: "Detection Latency", val: "< 10ms" },
              { label: "False Positives", val: "0.02%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 sm:px-6 lg:px-8 first:pl-0 lg:first:pl-4 last:pr-0"
              >
                <span className="text-3xl lg:text-4xl font-semibold text-[#0078D4] tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUALS & ARCHITECTURE SECTION ── */}
      <section className="py-16 md:py-24 bg-[#faf9f8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Console Preview */}
          <div>
            <div className="mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
                Console Preview
              </h2>
            </div>
            <div className="bg-white border border-gray-200 p-2 shadow-sm rounded-sm">
              <div className="aspect-[16/9] relative w-full bg-[#f3f2f1]">
                <Image
                  src="/nwcon.png"
                  alt="Console Dashboard Preview"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Architecture */}
          <div>
            <div className="mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                Core Framework Architecture
              </h2>
              <p className="text-[14px] text-gray-600 max-w-3xl leading-relaxed">
                A distributed, edge-first architecture designed for
                high-availability environments including steel manufacturing,
                rail networks, and heavy power distribution.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-2 shadow-sm rounded-sm">
              <div className="aspect-[16/9] relative w-full bg-[#f3f2f1]">
                <Image
                  src="/flowdia.png"
                  alt="Framework Architecture"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
