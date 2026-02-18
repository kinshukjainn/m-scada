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
    { name: "Tarun Tripathi", role: "Reaseach/Documentation" },
    { name: "Samarth Vishwakarma", role: "Presenations/Report" },
    { name: "Kinshuk Jain", role: "Technical Lead" },
  ];

  return (
    <div className="min-h-screen bg-slate-50  text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
            <TerminalSquare size={14} />
            <span>System Overview / About</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Project Genesis
          </h1>
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Project Info Section - Split Layout */}
        <section className="mb-24 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column: Description */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-widest mb-6">
              <ShieldAlert size={14} />
              Core Mission
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              {projectInfo.title}
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              {projectInfo.description}
            </p>
          </div>

          {/* Right Column: Highlights Card */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                Key Capabilities
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-5">
                {projectInfo.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm font-medium text-gray-800 leading-snug">
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                Core Contributors
              </h2>
              <p className="text-sm text-slate-500">
                The engineering team driving the infrastructure.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Users size={14} />
              ACTIVE_NODES: 0{teamMembers.length}
            </div>
          </div>

          {/* Cloudflare-style Grid (Dividers instead of individual borders) */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              {teamMembers.map((member, index) => {
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <div
                    key={index}
                    className="p-8 hover:bg-slate-50 transition-colors group cursor-default flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    {/* Square Avatar */}
                    <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-5 group-hover:border-blue-400 group-hover:text-blue-700 transition-colors">
                      <span className="text-lg font-mono font-bold text-slate-500 group-hover:text-blue-700 transition-colors">
                        {initials}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">
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
