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
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300  selection:bg-[#4a90e2]/30 selection:text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
            <TerminalSquare size={16} className="text-[#4a90e2]" />
            <span>System Overview / About</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Project Genesis_</h1>
        </div>

        {/* Project Info Section */}
        <section className="mb-16 grid gap-12 lg:grid-cols-5">
          {/* Left Column: Description */}
          <div className="lg:col-span-3">
            <div className="mb-4 inline-flex items-center gap-2 font-bold rounded-full  px-3 py-1 text-lg text-yellow-200 border border-gray-800">
              <ShieldAlert size={16} className="text-[#4a90e2]" />
              Core Mission
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white">
              {projectInfo.title}
            </h2>
            <p className="text-base leading-relaxed text-gray-400">
              {projectInfo.description}
            </p>
          </div>

          {/* Right Column: Highlights */}
          <div className="rounded-lg border border-gray-800 bg-[#111] p-6 lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Key Capabilities
            </h3>
            <ul className="space-y-4">
              {projectInfo.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#4a90e2]"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-gray-400">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="mb-8 flex items-end justify-between border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Core Team_</h2>
              <p className="text-sm text-gray-400">
                The engineering team driving the infrastructure.
              </p>
            </div>
            <div className="hidden items-center gap-2 text-sm text-gray-400 sm:flex">
              <Users size={16} className="text-[#4a90e2]" />
              <span>Active Members: {teamMembers.length}</span>
            </div>
          </div>

          {/* Minimal Team Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => {
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <div
                  key={index}
                  className="flex flex-col  p-2 text-left transition-colors "
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] text-lg font-bold text-white">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#4a90e2]">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
