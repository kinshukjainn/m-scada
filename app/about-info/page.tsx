"use client";

import React from "react";
import {
  ChevronRight,
  Info,
  Users,
  CheckCircle2,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const projectInfo = {
    title: "AI-Powered Fault Detection",
    description:
      "An advanced technology platform that uses artificial intelligence and machine learning algorithms to automatically identify, diagnose, and predict equipment failures, system anomalies, and operational issues before they cause significant damage or downtime.",
    highlights: [
      "Real-time monitoring with instant alerts",
      "Predictive maintenance to reduce downtime by 50-70%",
      "Cost reduction of up to 30-40% through smart analytics",
      "Applications across manufacturing, power, railways, and oil & gas sectors",
    ],
  };

  const teamMembers = [
    { name: "Smita Kumari", role: "Team Leader/Presentation/Designer" },
    { name: "Tarun Tripathi", role: "Research/Documentation" },
    { name: "Samarth Vishwakarma", role: "Presentations/Report" },
    { name: "Kinshuk Jain", role: "Technical Lead" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f8] text-gray-900 font-sans pb-12">
      {/* ── PAGE HEADER (Azure Style) ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-[1400px] mx-auto">
          {/* Breadcrumbs */}
          <div className="text-[13px] font-medium text-[#0078D4] flex items-center gap-1.5 mb-4 w-fit">
            <Link href="/" className="hover:underline cursor-pointer">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-500" />
            <span className="text-gray-600">Project Genesis</span>
          </div>

          {/* Title Area */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0078D4] rounded-sm flex items-center justify-center shrink-0">
              <Info size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight leading-tight">
                Project Genesis
              </h1>
              <p className="text-[13px] text-gray-600 mt-0.5">
                System architecture, core mission, and organizational team
                structure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT COLUMN: Project Overview */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 shadow-sm rounded-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Activity size={16} className="text-[#0078D4]" />
              <h2 className="text-[15px] font-semibold text-gray-900">
                Core Mission
              </h2>
            </div>

            <div className="p-5">
              <p className="text-[14px] text-gray-700 leading-relaxed mb-6">
                <strong className="text-gray-900 font-semibold">
                  {projectInfo.title}
                </strong>{" "}
                is{" "}
                {projectInfo.description.replace(
                  "An advanced technology platform",
                  "an advanced technology platform",
                )}
              </p>

              <div className="bg-[#f8f8f8] border border-gray-200 p-4 rounded-sm">
                <h3 className="text-[13px] font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Key Capabilities & Directives
                </h3>
                <ul className="space-y-2.5">
                  {projectInfo.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-[13px] text-gray-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[#107c10] shrink-0 mt-0.5"
                      />
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Core Team */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col h-full">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#0078D4]" />
                <h2 className="text-[15px] font-semibold text-gray-900">
                  Core Team
                </h2>
              </div>
              <span className="bg-[#e1dfdd] text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                Active: {teamMembers.length}
              </span>
            </div>

            <div className="p-5 flex-grow">
              <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
                The engineering and research team driving the infrastructure.
                Direct technical inquiries to the Technical Lead. Make sure you
                are subscribed to the project repository to receive comments and
                reviews on your patches.
              </p>

              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-sm hover:border-gray-300 hover:bg-[#fcfcfc] transition-colors"
                  >
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#0078D4] uppercase tracking-wide mb-2.5">
                      {member.role}
                    </p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      {/* Note: Logic strictly maintained from original prompt */}
                      {member.role === "Team Leader/Presentation/Designer"
                        ? "Responsible for overall coordination between us and presentation design."
                        : member.role === "Research/Documentation"
                          ? "For discussions involving algorithms, theoretical research, and updating the Developer Documentation."
                          : member.role === "Presentations/Report"
                            ? "Handles project demonstrations, reporting pipelines, and metric aggregation."
                            : "Responsible for complete technical questions, API guidelines, architecture, and code review."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
