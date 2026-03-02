"use client";

import React from "react";

export default function ScadaVsModernAppDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0] selection:bg-[#818cf8]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              SCADA vs. Modern Cloud Architecture{" "}
              <span className="text-[#818cf8]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              Understanding the traditional working of SCADA (Supervisory
              Control and Data Acquisition), how it detects faults, and why
              modern Serverless + AI architectures are redefining industrial
              software.
            </p>
          </div>

          {/* Section 1: How SCADA Works */}
          <section className="mb-16 min-w-0" id="how-scada-works">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. What is SCADA & How Does It Work?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              SCADA is a control system architecture heavily used in industries
              like water treatment, oil and gas, and manufacturing. It is
              designed to gather real-time data from remote physical locations
              to control equipment and conditions.
            </p>

            <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm mt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-sm bg-[#818cf8]"></span>
                The 4 Core Components of SCADA:
              </h3>
              <ul className="space-y-4 text-[15px] text-gray-200 m-0 list-none p-0 font-normal">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-semibold">
                      1. Sensors & Actuators:
                    </strong>{" "}
                    The physical devices. Sensors measure things (temperature,
                    pressure, flow), and actuators do things (open valves, start
                    motors).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-semibold">
                      2. RTUs / PLCs:
                    </strong>{" "}
                    Remote Terminal Units or Programmable Logic Controllers.
                    These act as local micro-computers. They read the sensor
                    data, convert it to digital signals, and can execute basic
                    local logic (e.g., &quot;stop the motor if it gets too
                    hot&quot;).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-semibold">
                      3. Communication Network:
                    </strong>{" "}
                    The wiring that connects everything. Historically, this used
                    radio, serial cables, or proprietary industrial protocols
                    like Modbus or DNP3.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-semibold">
                      4. Master Terminal Unit (MTU) / HMI:
                    </strong>{" "}
                    The central software system and Human-Machine Interface.
                    This is the computer screen where human operators sit to
                    monitor the entire plant visually.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Fault Detection */}
          <section className="mb-16 min-w-0" id="fault-detection">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. How SCADA Detects Faults Internally
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              SCADA systems are incredibly reliable, but their fault detection
              is strictly{" "}
              <strong className="text-white font-semibold">
                rule-based and reactive
              </strong>
              . They generally rely on a continuous &quot;polling&quot; loop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1b1b1b] border-l-4 border-l-[#818cf8] border border-[#333] rounded-md p-6 sm:p-8">
                <h4 className="font-semibold text-white mb-3 text-lg">
                  Threshold Alarming
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  The SCADA MTU constantly asks the PLCs for current values
                  (e.g., every 1 second). If a value breaches a hard-coded limit
                  (e.g., Pressure &gt; 500 PSI), the system triggers an
                  immediate visual and auditory alarm on the HMI.
                </p>
              </div>
              <div className="bg-[#1b1b1b] border-l-4 border-l-[#818cf8] border border-[#333] rounded-md p-6 sm:p-8">
                <h4 className="font-semibold text-white mb-3 text-lg">
                  State Mismatches
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  If the SCADA software sends a command to &quot;Open Valve
                  A&quot;, it waits for a confirmation signal from the sensor.
                  If it doesn&apos;t receive the &quot;Valve is Open&quot;
                  signal within a strict timeout period, it logs a mechanical
                  fault.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Why it is Not Modern */}
          <section className="mb-16 min-w-0" id="not-modern">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. Why is SCADA Considered &quot;Not Modern&quot;?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              While SCADA is essential for critical infrastructure, its
              fundamental software architecture was designed decades before the
              cloud existed.
            </p>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Monolithic & On-Premise:
                  </strong>{" "}
                  SCADA software is usually installed on massive, expensive
                  servers sitting in a physical control room. You can&apos;t
                  just access it securely from an iPhone halfway across the
                  world.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Lack of Predictive Intelligence:
                  </strong>{" "}
                  SCADA tells you a machine <em>has</em> broken. It cannot look
                  at historical trends using Machine Learning to tell you a
                  machine <em>will</em> break next week.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Proprietary Silos:
                  </strong>{" "}
                  Different vendors use different, closed-source protocols.
                  Getting a Siemens PLC to talk to an Allen-Bradley PLC often
                  requires expensive middleware. It lacks the universal standard
                  of RESTful HTTP APIs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#818cf8] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Security through Isolation:
                  </strong>{" "}
                  SCADA systems are notoriously vulnerable to cyberattacks (like
                  Stuxnet). Their primary defense is &quot;air-gapping&quot;
                  (literally unplugging them from the internet), which prevents
                  modern remote management.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Modern App vs SCADA */}
          <section className="mb-16 min-w-0" id="modern-app">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              4. Your Modern App vs. Traditional SCADA
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              If we compare standard SCADA to the modern AWS architecture we
              discussed (Amplify → API Gateway → Lambda → Bedrock), the
              differences in system design are staggering.
            </p>

            <div className="mt-8 overflow-x-auto border border-[#333] rounded-md shadow-sm bg-[#1b1b1b] mb-3">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Feature
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444] w-2/5">
                      Traditional SCADA
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444] w-2/5">
                      Your Modern AI Architecture
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Infrastructure
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed">
                      Physical, on-premise servers. Fixed compute limits.
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed text-[#818cf8]">
                      100% Serverless. Infinite auto-scaling via AWS Lambda.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Communication
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed">
                      Polling loops over heavy, proprietary protocols (Modbus).
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed text-[#818cf8]">
                      Event-driven triggers over standard HTTP/WebSockets via
                      API Gateway.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Fault Detection
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed">
                      Reactive. Hard-coded &quot;If X &amp; Y&quot; thresholds.
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed text-[#818cf8]">
                      Predictive. AWS Bedrock/AI can analyze patterns and
                      predict anomalies before they happen.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Updates & UI
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed">
                      Clunky HMIs. Requires shutting down systems to patch
                      software.
                    </td>
                    <td className="px-5 py-4 whitespace-normal leading-relaxed text-[#818cf8]">
                      Sleek Next.js interfaces deployed instantly via Amplify
                      CI/CD with zero downtime.
                    </td>
                  </tr>
                </tbody>
              </table>
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
              href="#how-scada-works"
              className="hover:text-[#818cf8] transition-colors truncate"
            >
              1. What is SCADA?
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#how-scada-works"
                className="text-gray-100 hover:text-[#818cf8] transition-colors truncate"
              >
                The 4 Core Components
              </a>
            </div>

            <a
              href="#fault-detection"
              className="hover:text-[#818cf8] transition-colors mt-2 truncate"
            >
              2. Fault Detection
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#fault-detection"
                className="text-gray-100 hover:text-[#818cf8] transition-colors truncate"
              >
                Threshold Alarming
              </a>
              <a
                href="#fault-detection"
                className="text-gray-100 hover:text-[#818cf8] transition-colors truncate"
              >
                State Mismatches
              </a>
            </div>

            <a
              href="#not-modern"
              className="hover:text-[#818cf8] transition-colors mt-2 truncate"
            >
              3. Why it is Not Modern
            </a>

            <a
              href="#modern-app"
              className="hover:text-[#818cf8] transition-colors mt-2 truncate"
            >
              4. Your App vs SCADA
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#modern-app"
                className="text-gray-100 hover:text-[#818cf8] transition-colors truncate"
              >
                Architecture Comparison
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
