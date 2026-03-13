"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIIndustrialHome() {
  const words = [
    "High-performance",
    "Production-grade",
    "Low-latency",
    "Extensible",
    "Real time",
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
    <div className="min-h-screen bg-white text-black selection:bg-blue-500 selection:text-black ">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-600 border border-gray-400 text-white font-semibold text-[11px]  tracking-widest mb-6 ">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-white opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-white"></span>
              </span>
              System Status: Operational
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1] inline-flex flex-wrap items-center gap-x-3">
              <span>A</span>

              {/* mode="popLayout" removes the old word from the document flow as the new one enters, preventing UI breakage */}
              <div className="relative flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-red-500 inline-block whitespace-nowrap"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span>version of SCADA</span>
            </h1>
            <p className="text-lg text-gray-900 max-w-xl leading-relaxed">
              MScada is a next-generation, also knows as{" "}
              <span className="text-red-600 font-bold px-2 bg-gray-200 border border-gray-800 rounded-sm">
                Modern Scada
              </span>{" "}
              , an{" "}
              <span className="font-bold text-red-500 border-b-3 border-red-600">
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
          <div className="w-full flex justify-center items-center">
            <Image
              src="/housepower.png"
              alt="Predictive Intelligence Dashboard"
              width={800}
              height={600}
              className="w-full h-auto object-contain "
              priority
            />
          </div>
        </div>
      </section>

      {/* ── METRICS SECTION ── */}
      <section className="bg-red-200/80 border border-red-800  mr-2 ml-2 rounded-xl ">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x-3 divide-red-600">
            {[
              { label: "Operating Efficiency", val: "+34%" },
              { label: "Grid Availability", val: "99.99%" },
              { label: "Detection Latency", val: "< 10ms" },
              { label: "False Positives", val: "0.02%" },
            ].map((stat, i) => (
              <div key={i} className="md:pl-8 first:pl-0 flex flex-col gap-1">
                <span className="text-3xl font-bold text-red-800 tracking-tight">
                  {stat.val}
                </span>
                <span className="text-[14px] font-bold  text-gray-900  tracking-widest">
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
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-8">
              Console Preview
            </h2>
            <div className="p-1">
              <Image
                src="/nwcon.png"
                alt="Console Dashboard Preview"
                width={1200}
                height={675}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-4">
              Core Framework Architecture
            </h2>
            <p className="text-gray-900 max-w-2xl text-lg mb-8">
              A distributed, edge-first architecture designed for
              high-availability environments including steel manufacturing, rail
              networks, and heavy power distribution.
            </p>
            <div className=" p-1">
              <Image
                src="/flowdia.png"
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
