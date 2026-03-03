"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Users, TerminalSquare } from "lucide-react";

export default function AboutPage() {
  // Easy to edit: Just modify these arrays
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
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="mb-16 border-b border-[#333] pb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-normal text-gray-100 uppercase tracking-widest mb-4">
            <TerminalSquare size={14} className="text-[#8cb4ff]" />
            <span>System Overview / About</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Project Genesis <span className="text-[#8cb4ff]">_</span>
          </h1>
        </div>

        {/* Project Info Section - Split Layout */}
        <section className="mb-24 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column: Description */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2d2d2d] border border-[#444] text-gray-200 text-xs font-mono mb-6">
              <ShieldAlert size={14} className="text-[#8cb4ff]" />
              Core Mission
            </div>
            <h2 className="text-2xl md:text-3xl font-normal text-white mb-6 tracking-tight">
              {projectInfo.title}
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed font-normal tracking-wide">
              {projectInfo.description}
            </p>
          </div>

          {/* Right Column: Highlights Card */}
          <div className="lg:col-span-2 bg-[#1b1b1b] border border-[#333] rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-[#333] bg-[#2d2d2d] px-6 py-4">
              <h3 className="text-xs font-mono font-normal text-gray-300 uppercase tracking-widest">
                Key Capabilities
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-5">
                {projectInfo.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#8cb4ff] mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-normal text-gray-300 leading-snug">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-normal tracking-tight text-white mb-2">
                Core Team <span className="text-[#8cb4ff]">_</span>
              </h2>
              <p className="text-sm text-gray-200 font-normal">
                The engineering team driving the infrastructure.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs  text-gray-100  tracking-widest">
              <div className="bg-blue-700 p-2 rounded-full text-white ">
                <Users size={14} />
              </div>
              Active Members: 0{teamMembers.length}
            </div>
          </div>

          {/* MDN-style Grid (Subtle borders, dark mode hover states) */}
          <div className="bg-[#1b1b1b] border border-[#333] rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#333]">
              {teamMembers.map((member, index) => {
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <div
                    key={index}
                    className="p-8 hover:bg-[#2d2d2d] transition-colors group cursor-default flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    {/* Square Avatar */}
                    <div className="w-14 h-14 bg-blue-800  rounded-full flex items-center justify-center mb-5 group-hover:border-[#8cb4ff] transition-colors">
                      <span className="text-lg  font-bold text-gray-100 group-hover:text-[#8cb4ff] transition-colors">
                        {initials}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-normal text-white text-base mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-mono font-semibold text-[#ff9100] uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
