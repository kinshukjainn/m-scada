"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Users, TerminalSquare } from "lucide-react";

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
    { name: "Smita Kumari", role: "Team Leader" },
    { name: "Tarun Tripathi", role: "Research/Documentation" },
    { name: "Samarth Vishwakarma", role: "Presentations/Report" },
    { name: "Kinshuk Jain", role: "Technical Lead" },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc]  selection:bg-[#5cb85c]/30 selection:text-white pb-12">
      {/* ── TOP HEADER ── */}
      <header className="bg-[#181818] border-b border-[#111111] py-5 px-6 md:px-12 shadow-md flex items-center gap-3">
        <TerminalSquare size={24} className="text-[#5cb85c]" />
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          Project Genesis
        </h1>
      </header>

      {/* ── MAIN WRAPPER ── */}
      <div className="max-w-[1400px] mx-auto p-4 md:p-8">
        <div className="bg-[#262626] border border-[#111111] p-5 md:p-8 flex flex-col gap-8 shadow-lg rounded-sm">
          {/* ── PROJECT OVERVIEW ── */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="mt-0.5" /> Core Mission
            </h2>

            <p className="text-[13px] md:text-[14px] leading-relaxed mb-6">
              <span className="font-bold text-white">{projectInfo.title}</span>{" "}
              is{" "}
              {projectInfo.description.replace(
                "An advanced technology platform",
                "an advanced technology platform",
              )}
              For additional technical guidelines and integration details, refer
              to the{" "}
              <span className="text-[#5cb85c] cursor-pointer hover:underline">
                Project Documentation
              </span>
              .
            </p>

            {/* Highlights Documentation Notice Box */}
            <div className="bg-[#2f2f2f] border-l-4 border-[#5cb85c] border-y border-r border-y-[#111] border-r-[#111] p-4 md:p-5">
              <div className="text-[17px] font-bold text-white mb-3 tracking-wide">
                Key Capabilities & Directives:
              </div>
              <ul className="space-y-2">
                {projectInfo.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-[15px] text-[#e0e0e0]"
                  >
                    <CheckCircle2
                      className="mt-[2px] h-4 w-4 shrink-0 text-[#5cb85c]"
                      strokeWidth={2.5}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── CORE TEAM (Styled like Mailing Lists) ── */}
          <section className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <Users size={20} className="mt-0.5" /> Core Team
              </h2>
              <div className="text-[12px] text-[#888]">
                Active Members:{" "}
                <span className="text-white font-bold">
                  {teamMembers.length}
                </span>
              </div>
            </div>

            <p className="text-[13px] md:text-[14px] leading-relaxed mb-4">
              The engineering and research team driving the infrastructure.
              Direct technical inquiries to the Technical Lead. Make sure you
              are subscribed to the project repository to receive comments and
              reviews on your patches.
            </p>

            {/* Team List Table-like Structure */}
            <div className="border border-[#111111] rounded-sm overflow-hidden bg-[#2b2b2b]">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="border-b border-[#111111] last:border-b-0 p-3 md:p-4 hover:bg-[#333333] transition-colors"
                >
                  <h3 className="font-bold text-white text-[14px] md:text-[15px] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[14px] md:text-[14px] text-[#5cb85c]">
                    {member.role === "Team Leader"
                      ? "Responsible for overall project orchestration, roadmaps, and stakeholder communication."
                      : member.role === "Research/Documentation"
                        ? "For discussions involving algorithms, theoretical research, and updating the Developer Documentation."
                        : member.role === "Presentations/Report"
                          ? "Handles project demonstrations, reporting pipelines, and metric aggregation."
                          : "For general technical questions, API guidelines, architecture, and code review."}
                  </p>

                  {/* Subtle Role Tag */}
                  <div className="mt-2 text-[#888] text-[13px] font-mono">
                    role:{" "}
                    <span className="text-[#ccc] font-semibold">
                      {member.role.replace("/", "_")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-[12px] text-[#5cb85c] cursor-pointer hover:underline">
              View full contributor network
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
