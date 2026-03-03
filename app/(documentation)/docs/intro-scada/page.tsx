"use client";

import React from "react";

export default function ScadaIntroDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Introduction to SCADA Systems{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl m-0 tracking-wide">
              A foundational guide to Supervisory Control and Data Acquisition
              (SCADA) software. Learn how these critical systems act as the
              nervous system for modern electrical grids, and why we are
              bridging them with our cloud infrastructure.
            </p>
          </div>

          {/* Section 1: What is SCADA? */}
          <section className="mb-16 min-w-0" id="what-is-scada">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. What is SCADA?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              <strong className="text-white font-semibold">
                SCADA (Supervisory Control and Data Acquisition)
              </strong>{" "}
              is a category of software application programs used for high-level
              process supervisory management. In the realm of electrical
              engineering, SCADA is the software that allows operators to
              monitor, control, and analyze the physical power grid from a
              centralized control room.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Instead of manually sending an engineer miles away to check a
              transformer&apos;s temperature or flip a high-voltage breaker,
              SCADA securely retrieves that data in milliseconds and allows
              remote, programmatic control.
            </p>

            <div className="bg-[#1b1b1b] border border-[#333] rounded-2xl p-6 sm:p-8 mt-10 mb-6 shadow-sm">
              <h4 className="font-semibold text-white mb-3 text-lg">
                The Scale of Operations
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                SCADA is not just for single buildings. It operates on a
                geographic scale. It manages substations, hydroelectric dams,
                wind farms, and thousands of miles of transmission lines, acting
                as the critical bridge between physical hardware and digital
                monitoring.
              </p>
            </div>
          </section>

          {/* Section 2: Why are we introducing it? */}
          <section className="mb-16 min-w-0" id="the-why">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. Why Are We Introducing SCADA Here?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              You might wonder why a modern cloud and AI platform is focusing on
              industrial control software created decades ago. The answer lies
              in the convergence of{" "}
              <strong className="text-white font-semibold">
                IT (Information Technology)
              </strong>{" "}
              and{" "}
              <strong className="text-white font-semibold">
                OT (Operational Technology)
              </strong>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1b1b1b] border border-[#333] hover:border-[#444] transition-colors rounded-2xl p-6 sm:p-8">
                <h4 className="font-semibold text-[#8cb4ff] mb-3 text-lg">
                  The Legacy Silo Problem
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  Historically, SCADA systems were isolated,
                  &quot;air-gapped&quot; networks. While highly secure, this
                  means mountains of valuable physical data (like real-time
                  voltage fluctuations or grid stress) are trapped inside local
                  servers, inaccessible to modern analytics.
                </p>
              </div>
              <div className="bg-[#1b1b1b] border border-[#333] hover:border-[#444] transition-colors rounded-2xl p-6 sm:p-8">
                <h4 className="font-semibold text-[#8cb4ff] mb-3 text-lg">
                  Our Cloud Integration
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  We are introducing SCADA concepts because our automated
                  console is designed to ingest this legacy telemetry. By
                  securely funneling SCADA data into our cloud infrastructure,
                  we can apply advanced machine learning models (like Llama 3)
                  to predict equipment failures before they happen.
                </p>
              </div>
            </div>

            <p className="text-gray-200 font-normal leading-relaxed text-[16px]">
              <strong className="text-white font-semibold">In short:</strong> To
              build AI that optimizes the physical electrical grid, we must
              first understand the language of the software that currently
              controls it. SCADA is the ultimate source of truth for grid
              telemetry.
            </p>
          </section>

          {/* Section 3: Core Components */}
          <section className="mb-16 min-w-0" id="core-components">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. The Core Architecture
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              A standard SCADA system in electrical engineering relies on four
              foundational pillars to move data from a physical wire to a
              digital screen.
            </p>

            <div className="space-y-10 mt-10">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#2d2d2d] border border-[#444] text-[#8cb4ff] flex items-center justify-center font-mono font-semibold text-md mt-0.5">
                  1
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-white text-lg m-0 mb-2">
                    Field Devices & Sensors
                  </h4>
                  <p className="text-gray-200 font-normal text-sm leading-relaxed m-0">
                    The physical edge. These are the actual sensors attached to
                    power lines measuring current (Amps), voltage (Volts), and
                    the mechanical actuators capable of opening or closing
                    circuit breakers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#2d2d2d] border border-[#444] text-[#8cb4ff] flex items-center justify-center font-mono font-semibold text-md mt-0.5">
                  2
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-white text-lg m-0 mb-2">
                    RTUs and PLCs
                  </h4>
                  <p className="text-gray-200 font-normal text-sm leading-relaxed m-0">
                    <strong className="text-gray-200 font-semibold">
                      Remote Terminal Units (RTUs)
                    </strong>{" "}
                    and{" "}
                    <strong className="text-gray-200 font-semibold">
                      Programmable Logic Controllers (PLCs)
                    </strong>{" "}
                    are ruggedized micro-computers placed at the substation.
                    They read the analog signals from the sensors, convert them
                    to digital data, and send them upstream.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#2d2d2d] border border-[#444] text-[#8cb4ff] flex items-center justify-center font-mono font-semibold text-md mt-0.5">
                  3
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-white text-lg m-0 mb-2">
                    Communication Network
                  </h4>
                  <p className="text-gray-200 font-normal text-sm leading-relaxed m-0">
                    The transmission layer. Because power grids span vast
                    geographies, data is transmitted over radio, microwave,
                    satellite, or dedicated fiber-optic lines using specialized
                    industrial protocols (like DNP3 or Modbus).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#2d2d2d] border border-[#444] text-[#8cb4ff] flex items-center justify-center font-mono font-semibold text-md mt-0.5">
                  4
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-white text-lg m-0 mb-2">
                    Human-Machine Interface (HMI)
                  </h4>
                  <p className="text-gray-200 font-normal text-sm leading-relaxed m-0">
                    The master software suite. The HMI translates the raw data
                    streams into human-readable visual schematics (like one-line
                    diagrams of a substation), allowing operators to actively
                    monitor alarms and issue commands.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#what-is-scada"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. What is SCADA?
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#what-is-scada"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Scale of Operations
              </a>
            </div>

            <a
              href="#the-why"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. The &quot;Why&quot;
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#the-why"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                IT/OT Convergence
              </a>
            </div>

            <a
              href="#core-components"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              3. Core Architecture
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#core-components"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Sensors & RTUs
              </a>
              <a
                href="#core-components"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                The HMI
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
