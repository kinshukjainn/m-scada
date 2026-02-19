import React from "react";

export default function ScadaIntroDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Introduction to SCADA Systems
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed max-w-3xl m-0">
              A foundational guide to Supervisory Control and Data Acquisition
              (SCADA) software. Learn how these critical systems act as the
              nervous system for modern electrical grids, and why we are
              bridging them with our cloud infrastructure.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: What is SCADA? */}
          <section className="mb-12 sm:mb-14 min-w-0" id="what-is-scada">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. What is SCADA?
            </h2>
            <p className="text-gray-800 mb-4">
              <strong>SCADA (Supervisory Control and Data Acquisition)</strong>{" "}
              is a category of software application programs used for high-level
              process supervisory management. In the realm of electrical
              engineering, SCADA is the software that allows operators to
              monitor, control, and analyze the physical power grid from a
              centralized control room.
            </p>
            <p className="text-gray-800 mb-6">
              Instead of manually sending an engineer miles away to check a
              transformer&apos;s temperature or flip a high-voltage breaker,
              SCADA securely retrieves that data in milliseconds and allows
              remote, programmatic control.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                The Scale of Operations
              </h4>
              <p className="text-sm text-gray-800 leading-relaxed">
                SCADA is not just for single buildings. It operates on a
                geographic scale. It manages substations, hydroelectric dams,
                wind farms, and thousands of miles of transmission lines, acting
                as the critical bridge between physical hardware and digital
                monitoring.
              </p>
            </div>
          </section>

          {/* Section 2: Why are we introducing it? */}
          <section className="mb-12 sm:mb-14 min-w-0" id="the-why">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. Why Are We Introducing SCADA Here?
            </h2>
            <p className="text-gray-800 mb-6">
              You might wonder why a modern cloud and AI platform is focusing on
              industrial control software created decades ago. The answer lies
              in the convergence of <strong>IT (Information Technology)</strong>{" "}
              and <strong>OT (Operational Technology)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                <h4 className="font-semibold text-blue-900 mb-2">
                  The Legacy Silo Problem
                </h4>
                <p className="text-sm text-blue-800">
                  Historically, SCADA systems were isolated,
                  &quot;air-gapped&quot; networks. While highly secure, this
                  means mountains of valuable physical data (like real-time
                  voltage fluctuations or grid stress) are trapped inside local
                  servers, inaccessible to modern analytics.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-5">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Our Cloud Integration
                </h4>
                <p className="text-sm text-orange-800">
                  We are introducing SCADA concepts because our automated
                  console is designed to ingest this legacy telemetry. By
                  securely funneling SCADA data into our cloud infrastructure,
                  we can apply advanced machine learning models (like Llama 3)
                  to predict equipment failures before they happen.
                </p>
              </div>
            </div>

            <p className="text-gray-800">
              In short: To build AI that optimizes the physical electrical grid,
              we must first understand the language of the software that
              currently controls it. SCADA is the ultimate source of truth for
              grid telemetry.
            </p>
          </section>

          {/* Section 3: Core Components */}
          <section className="mb-12 sm:mb-14 min-w-0" id="core-components">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. The Core Architecture
            </h2>
            <p className="text-gray-800 mb-6">
              A standard SCADA system in electrical engineering relies on four
              foundational pillars to move data from a physical wire to a
              digital screen.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 border border-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Field Devices & Sensors
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    The physical edge. These are the actual sensors attached to
                    power lines measuring current (Amps), voltage (Volts), and
                    the mechanical actuators capable of opening or closing
                    circuit breakers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 border border-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    RTUs and PLCs
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    <strong>Remote Terminal Units (RTUs)</strong> and{" "}
                    <strong>Programmable Logic Controllers (PLCs)</strong> are
                    ruggedized micro-computers placed at the substation. They
                    read the analog signals from the sensors, convert them to
                    digital data, and send them upstream.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 border border-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Communication Network
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    The transmission layer. Because power grids span vast
                    geographies, data is transmitted over radio, microwave,
                    satellite, or dedicated fiber-optic lines using specialized
                    industrial protocols (like DNP3 or Modbus).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Human-Machine Interface (HMI)
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
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
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#what-is-scada"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. What is SCADA?
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#what-is-scada"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Scale of Operations
              </a>
            </div>

            <a
              href="#the-why"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. The &quot;Why&quot;
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#the-why"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                IT/OT Convergence
              </a>
            </div>

            <a
              href="#core-components"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              3. Core Architecture
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#core-components"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Sensors & RTUs
              </a>
              <a
                href="#core-components"
                className="hover:text-[#f38020] transition-colors truncate"
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
