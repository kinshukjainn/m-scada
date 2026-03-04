"use client";

import {
  AlertCircle,
  Brain,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Activity,
  Clock,
  IndianRupee,
  BarChart3,
} from "lucide-react";

export default function FaultDetectionDocs() {
  const faultData = [
    {
      type: "3-phase (LLL)",
      phases: "3",
      ground: "No",
      common: "Rare",
      severity: "Very High",
    },
    {
      type: "3-phase + G",
      phases: "3",
      ground: "Yes",
      common: "Very Rare",
      severity: "Very High",
    },
    {
      type: "L-G",
      phases: "1",
      ground: "Yes",
      common: "Most common",
      severity: "High",
    },
    {
      type: "L-L",
      phases: "2",
      ground: "No",
      common: "Medium",
      severity: "Medium",
    },
    {
      type: "L-L-G",
      phases: "2",
      ground: "Yes",
      common: "Common",
      severity: "High",
    },
    {
      type: "Open Circuit",
      phases: "1–3",
      ground: "No",
      common: "Occasional",
      severity: "Low",
    },
    {
      type: "Transient",
      phases: "varies",
      ground: "varies",
      common: "Very Common",
      severity: "Low–Medium",
    },
  ];

  const severityData = [
    { type: "3-phase fault", severity: "Very high", notes: "Highest current" },
    {
      type: "L–L fault",
      severity: "Medium-high",
      notes: "No ground; 2 phases affected",
    },
    { type: "L–G fault", severity: "Medium", notes: "Most common" },
    { type: "L-L-G fault", severity: "High", notes: "Two phases + ground" },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white pb-16">
      {/* ─── Header ─── */}
      <header className="border-b border-[#333] bg-[#1e1e1e]/95 backdrop-blur z-50  top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-sm bg-[#2d2d2d] border border-[#444]">
              <Brain className="w-8 h-8 text-[#8cb4ff]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-2">
                AI-Powered Fault Detection{" "}
                <span className="text-[#8cb4ff]">_</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 font-normal tracking-wide">
                A comprehensive guide for the Indian industrial context
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-6 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <Brain className="w-6 h-6 text-[#8cb4ff]" />
            What is AI-Powered Fault Detection?
          </h2>

          <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
            AI-powered fault detection is an advanced technology that uses
            artificial intelligence and machine learning algorithms to
            automatically identify, diagnose, and predict equipment failures,
            system anomalies, and operational issues before they cause
            significant damage or downtime.
          </p>
          <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
            In the Indian industrial landscape, where manufacturing, power
            generation, and infrastructure development are rapidly growing,
            fault detection systems play a crucial role in maintaining
            operational efficiency and reducing costly breakdowns.
          </p>

          <h3 className="text-lg font-normal text-white mb-4 mt-8">
            Key Components
          </h3>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#8cb4ff] mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 font-normal">
                <strong className="text-white font-normal">
                  Sensors & IoT Devices:
                </strong>{" "}
                Collect real-time data from equipment and systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#8cb4ff] mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 font-normal">
                <strong className="text-white font-normal">
                  Machine Learning Models:
                </strong>{" "}
                Analyze patterns and detect anomalies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#8cb4ff] mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 font-normal">
                <strong className="text-white font-normal">
                  Predictive Analytics:
                </strong>{" "}
                Forecast potential failures before they occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#8cb4ff] mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 font-normal">
                <strong className="text-white font-normal">
                  Alert Systems:
                </strong>{" "}
                Notify operators immediately when issues are detected.
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-sm border border-[#333] bg-[#1e1e1e] flex flex-col gap-3 hover:border-[#444] transition-colors">
              <Zap className="w-6 h-6 text-amber-400" />
              <h4 className="font-normal text-white">Real-Time Monitoring</h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed">
                Continuous surveillance of equipment health with instant alerts
                for any deviations from normal operating conditions.
              </p>
            </div>
            <div className="p-6 rounded-sm border border-[#333] bg-[#1e1e1e] flex flex-col gap-3 hover:border-[#444] transition-colors">
              <Shield className="w-6 h-6 text-[#8cb4ff]" />
              <h4 className="font-normal text-white">Preventive Maintenance</h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed">
                Schedule maintenance based on actual equipment condition rather
                than fixed time intervals, reducing unnecessary downtime.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-[#333]" />

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-6 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <Activity className="w-6 h-6 text-[#8cb4ff]" />
            How Fault Detection Works
          </h2>

          <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
            The fault detection process involves multiple stages, from data
            collection to actionable insights. Here is a detailed breakdown of
            the workflow:
          </p>

          <div className="space-y-6 mt-10">
            {[
              {
                num: 1,
                title: "Data Collection",
                desc: "Sensors continuously collect parameters (temperature, vibration, pressure).",
                example:
                  "A textile mill in Surat uses vibration sensors on spinning machines.",
              },
              {
                num: 2,
                title: "Data Preprocessing",
                desc: "Raw data is cleaned, normalized, and structured for AI analysis.",
              },
              {
                num: 3,
                title: "Feature Engineering",
                desc: "Statistical measures and patterns help identify normal vs. abnormal behavior.",
              },
              {
                num: 4,
                title: "AI Model Training",
                desc: "ML models learn patterns of normal operation and fault signatures.",
              },
              {
                num: 5,
                title: "Real-Time Monitoring",
                desc: "Trained models continuously compare current incoming data against baselines.",
              },
              {
                num: 6,
                title: "Alert Generation",
                desc: "Alerts are sent to maintenance teams via SMS, email, or dashboards.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex flex-col items-center mt-0.5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2d2d2d] text-[#8cb4ff] font-mono text-sm border border-[#444]">
                    {step.num}
                  </span>
                  {step.num !== 6 && (
                    <div className="w-px h-full bg-[#444] my-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-normal text-white text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 font-normal leading-relaxed text-sm mb-3">
                    {step.desc}
                  </p>
                  {step.example && (
                    <div className="bg-[#1e1e1e] border border-[#333] rounded-sm p-3 text-sm text-gray-300 font-normal border-l-2 border-l-[#8cb4ff]">
                      <strong className="text-white font-normal">
                        Example:
                      </strong>{" "}
                      {step.example}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 border border-[#333] rounded-sm bg-[#1e1e1e]">
            <h3 className="font-normal text-white mb-5 text-lg border-b border-[#333] pb-3">
              Detection Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-normal text-[#8cb4ff] mb-2">
                  Supervised Learning
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Uses labeled historical data where faults are already
                  identified. Best when you have a good dataset of past
                  failures.
                </p>
              </div>
              <div>
                <h4 className="font-normal text-[#8cb4ff] mb-2">
                  Unsupervised Learning
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Detects anomalies without prior fault labels. Ideal for
                  identifying unknown or rare fault patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-12 border-[#333]" />

        {/* Types of Faults Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-6 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <AlertCircle className="w-6 h-6 text-[#8cb4ff]" />
            Types of Faults Detected
          </h2>
          <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
            AI-powered systems can detect various types of faults across
            different industrial applications:
          </p>

          <h3 className="text-lg font-normal text-white mb-4 mt-8">
            Fault Summary Table
          </h3>
          <div className="mb-12 overflow-x-auto border border-[#333] rounded-sm shadow-sm bg-[#1e1e1e]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Fault Type
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Phases
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Ground?
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Common?
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {faultData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal"
                  >
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      {row.type}
                    </td>
                    <td className="px-5 py-4">{row.phases}</td>
                    <td className="px-5 py-4">{row.ground}</td>
                    <td className="px-5 py-4">{row.common}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-sm text-xs font-mono 
                        ${
                          row.severity.includes("High")
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : row.severity.includes("Medium")
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-[#8cb4ff]/20 text-[#8cb4ff] border border-[#8cb4ff]/30"
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-normal text-white mb-4">
            Fault Severity Comparison
          </h3>
          <div className="mb-10 overflow-x-auto border border-[#333] rounded-sm shadow-sm bg-[#1e1e1e]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Fault Type
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Severity
                  </th>
                  <th className="px-5 py-4 font-normal border-b border-[#444]">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {severityData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal"
                  >
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      {row.type}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-sm text-xs font-mono 
                        ${
                          row.severity.includes("high") ||
                          row.severity.includes("High")
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-5 py-4">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="my-12 border-[#333]" />

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <TrendingUp className="w-6 h-6 text-[#8cb4ff]" />
            Benefits & ROI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {[
              {
                icon: IndianRupee,
                title: "Cost Reduction",
                desc: "Reduce maintenance costs by up to 30-40% through predictive maintenance.",
                example: "A steel plant saved ₹2.5 crore annually.",
              },
              {
                icon: Clock,
                title: "Reduced Downtime",
                desc: "Minimize unplanned production stops by 50-70%.",
                example: "Increased production uptime from 82% to 96%.",
              },
              {
                icon: Shield,
                title: "Enhanced Safety",
                desc: "Prevent catastrophic failures that could endanger workers.",
                example: "Critical for mining and petrochemicals.",
              },
              {
                icon: BarChart3,
                title: "Improved Productivity",
                desc: "Optimize production schedules and reduce waste.",
                example: "OEE improvements of 10-15% in year one.",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 border border-[#333] rounded-sm bg-[#1e1e1e] flex items-start gap-4 transition-colors hover:border-[#444]"
                >
                  <div className="p-2.5 rounded-sm bg-[#2d2d2d] text-[#8cb4ff] border border-[#444]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-normal text-white mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-200 font-normal leading-relaxed mb-2">
                      {benefit.desc}
                    </p>
                    <p className="text-xs text-[#8cb4ff] font-mono opacity-80">
                      {benefit.example}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-8 bg-[#1e1e1e] border border-[#333] rounded-sm">
            <h3 className="text-xs font-mono font-normal uppercase tracking-widest text-gray-200 mb-6">
              ROI Example (Medium Manufacturing Facility)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Implementation Cost", value: "₹40-60 L" },
                { label: "Annual Savings", value: "₹80-120 L" },
                { label: "Payback Period", value: "6-9 Mos" },
                { label: "3-Year ROI", value: "300-400%" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[11px] font-mono text-gray-100 mb-1.5 uppercase">
                    {item.label}
                  </p>
                  <p className="text-2xl font-normal text-white tracking-tight">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="my-12 border-[#333]" />

        {/* Applications Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-6 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <Activity className="w-6 h-6 text-[#8cb4ff]" />
            Applications in India
          </h2>
          <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
            Industry-specific implementations and use cases:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Manufacturing & Heavy Industries",
                desc: "Automotive plants, steel mills, and machinery manufacturers.",
                uses: [
                  "CNC machine tool wear prediction",
                  "Assembly line robotics health",
                  "Furnace optimization",
                  "Hydraulic press monitoring",
                ],
              },
              {
                title: "Power & Energy Sector",
                desc: "Power plants and transmission networks leverage AI for stability.",
                uses: [
                  "Turbine vibration analysis",
                  "Transformer health",
                  "Solar efficiency tracking",
                  "Wind turbine monitoring",
                ],
              },
              {
                title: "Railways & Transportation",
                desc: "Metro systems implement AI for track monitoring and safety.",
                uses: [
                  "Wheel and axle defect detection",
                  "Track crack prediction",
                  "Signal system monitoring",
                  "Pantograph health tracking",
                ],
              },
              {
                title: "Oil & Gas Industry",
                desc: "Refineries and drilling operations use AI to prevent leaks.",
                uses: [
                  "Pipeline corrosion detection",
                  "Compressor monitoring",
                  "Drilling failure prediction",
                  "Storage tank integrity",
                ],
              },
            ].map((app, index) => (
              <div
                key={index}
                className="p-6 border border-[#333] rounded-sm bg-[#1e1e1e]"
              >
                <h3 className="font-normal text-white text-lg mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-gray-200 font-normal mb-5">
                  {app.desc}
                </p>
                <ul className="space-y-2.5">
                  {app.uses.map((use, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-300 font-normal flex items-start gap-3"
                    >
                      <span className="text-[#8cb4ff] mt-0.5 opacity-70">
                        ▹
                      </span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-12 border-[#333]" />

        {/* Implementation Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-normal mb-8 flex items-center gap-3 text-white border-b border-[#333] pb-2">
            <Shield className="w-6 h-6 text-[#8cb4ff]" />
            Implementation Guide
          </h2>

          <div className="space-y-12">
            {[
              {
                phase: "Phase 1: Assessment",
                items: [
                  {
                    title: "Equipment ID",
                    desc: "Identify critical equipment where failures cause impact.",
                  },
                  {
                    title: "Data Check",
                    desc: "Evaluate existing sensor infrastructure.",
                  },
                ],
              },
              {
                phase: "Phase 2: Setup",
                items: [
                  {
                    title: "Sensors",
                    desc: "Deploy IoT sensors appropriate for each fault type.",
                  },
                  {
                    title: "Network",
                    desc: "Establish reliable data transmission.",
                  },
                ],
              },
              {
                phase: "Phase 3: AI Models",
                items: [
                  {
                    title: "Collection",
                    desc: "Collect baseline data for 2-3 months.",
                  },
                  {
                    title: "Training",
                    desc: "Train ML models with high accuracy targets.",
                  },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-1.5 h-auto bg-[#444] rounded-sm flex-shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 w-full h-8 bg-[#8cb4ff]"></div>
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-normal text-white mb-4">
                    {section.phase}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-5 border border-[#333] rounded-sm bg-[#1e1e1e]"
                      >
                        <h4 className="font-normal text-white mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-200 font-normal leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-sm p-6 sm:p-8 bg-[#1e1e1e] border-l-4 border-l-amber-500 border border-[#333]">
            <h3 className="font-normal text-white mb-5 flex items-center gap-3 text-lg">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Common Challenges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Power Supply",
                  desc: "Use UPS systems and voltage stabilizers.",
                },
                {
                  title: "Extreme Environments",
                  desc: "Use ruggedized sensors with IP65+.",
                },
                {
                  title: "Legacy Equipment",
                  desc: "Retrofit solutions and wireless sensors.",
                },
                {
                  title: "Skill Gap",
                  desc: "Partner with solution providers for upskilling.",
                },
              ].map((challenge, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-0.5 opacity-70">▹</span>
                  <div>
                    <h4 className="font-normal text-gray-200 text-sm mb-1">
                      {challenge.title}
                    </h4>
                    <p className="text-sm text-gray-200 font-normal">
                      {challenge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#333] mt-16 bg-[#1e1e1e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm font-normal text-gray-200">
          <p className="font-normal text-gray-200 mb-2">
            AI-Powered Fault Detection Systems Documentation
          </p>
          <p>
            For industrial applications in India • Last updated:{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
