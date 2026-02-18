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
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100  pb-16">
      {/* ─── Header ─── */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2">
                AI-Powered Fault Detection Systems
              </h1>
              <p className="text-base text-gray-800">
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
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Brain className="w-6 h-6 text-gray-400" />
            What is AI-Powered Fault Detection?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            AI-powered fault detection is an advanced technology that uses
            artificial intelligence and machine learning algorithms to
            automatically identify, diagnose, and predict equipment failures,
            system anomalies, and operational issues before they cause
            significant damage or downtime.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            In the Indian industrial landscape, where manufacturing, power
            generation, and infrastructure development are rapidly growing,
            fault detection systems play a crucial role in maintaining
            operational efficiency and reducing costly breakdowns.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Key Components
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Sensors & IoT Devices:</strong> Collect real-time data
                from equipment and systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Machine Learning Models:</strong> Analyze patterns and
                detect anomalies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Predictive Analytics:</strong> Forecast potential
                failures before they occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Alert Systems:</strong> Notify operators immediately
                when issues are detected.
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              <h4 className="font-semibold text-gray-900">
                Real-Time Monitoring
              </h4>
              <p className="text-sm text-gray-800 leading-relaxed">
                Continuous surveillance of equipment health with instant alerts
                for any deviations from normal operating conditions.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-2">
              <Shield className="w-6 h-6 text-blue-500" />
              <h4 className="font-semibold text-gray-900">
                Preventive Maintenance
              </h4>
              <p className="text-sm text-gray-800 leading-relaxed">
                Schedule maintenance based on actual equipment condition rather
                than fixed time intervals, reducing unnecessary downtime.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Activity className="w-6 h-6 text-gray-400" />
            How Fault Detection Works
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            The fault detection process involves multiple stages, from data
            collection to actionable insights. Here is a detailed breakdown of
            the workflow:
          </p>

          <div className="space-y-6 mt-8">
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
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center mt-1">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm border border-blue-200">
                    {step.num}
                  </span>
                  {step.num !== 6 && (
                    <div className="w-px h-full bg-gray-200 my-2"></div>
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm mb-2">
                    {step.desc}
                  </p>
                  {step.example && (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-800">
                      <strong>Example:</strong> {step.example}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">
              Detection Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Supervised Learning
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Uses labeled historical data where faults are already
                  identified. Best when you have a good dataset of past
                  failures.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Unsupervised Learning
                </h4>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Detects anomalies without prior fault labels. Ideal for
                  identifying unknown or rare fault patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Types of Faults Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <AlertCircle className="w-6 h-6 text-gray-400" />
            Types of Faults Detected
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AI-powered systems can detect various types of faults across
            different industrial applications:
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Fault Summary Table
          </h3>
          <div className="mb-10 overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Fault Type
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Phases
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Ground?
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Common?
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {faultData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{row.phases}</td>
                    <td className="px-4 py-3 text-gray-800">{row.ground}</td>
                    <td className="px-4 py-3 text-gray-800">{row.common}</td>
                    <td className="px-4 py-3 text-gray-800">
                      <span
                        className={`inline-flex px-2 py-1 rounded-md text-xs font-medium 
                        ${
                          row.severity.includes("High")
                            ? "bg-red-100 text-red-700"
                            : row.severity.includes("Medium")
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
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

          <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-12">
            Fault Severity Comparison
          </h3>
          <div className="mb-10 overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Fault Type
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Severity
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-gray-200">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {severityData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      <span
                        className={`inline-flex px-2 py-1 rounded-md text-xs font-medium 
                        ${
                          row.severity.includes("high") ||
                          row.severity.includes("High")
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <TrendingUp className="w-6 h-6 text-gray-400" />
            Benefits & ROI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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
                  className="p-5 border border-gray-200 rounded-xl bg-white flex items-start gap-4 transition-shadow hover:shadow-md"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-800 leading-relaxed mb-1">
                      {benefit.desc}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      {benefit.example}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              ROI Example (Medium Manufacturing Facility)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Implementation Cost", value: "₹40-60 L" },
                { label: "Annual Savings", value: "₹80-120 L" },
                { label: "Payback Period", value: "6-9 Mos" },
                { label: "3-Year ROI", value: "300-400%" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Applications Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Activity className="w-6 h-6 text-gray-400" />
            Applications in India
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
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
                className="p-6 border border-gray-200 rounded-xl bg-gray-50"
              >
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-gray-800 mb-4">{app.desc}</p>
                <ul className="space-y-2">
                  {app.uses.map((use, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-12 border-gray-200" />

        {/* Implementation Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Shield className="w-6 h-6 text-gray-400" />
            Implementation Guide
          </h2>

          <div className="space-y-10">
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
              <div key={index} className="flex gap-4">
                <div className="w-1.5 h-auto bg-blue-100 rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {section.phase}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-4 border border-gray-200 rounded-lg bg-white"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-800">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl p-6 bg-amber-50 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Common Challenges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <div>
                    <h4 className="font-medium text-amber-900 text-sm">
                      {challenge.title}
                    </h4>
                    <p className="text-sm text-amber-700/80">
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
      <footer className="border-t border-gray-200 mt-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-900 mb-1">
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
