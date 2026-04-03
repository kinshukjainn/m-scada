"use client";

import React from "react";

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
    <div className="min-h-screen bg-white text-gray-900  p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        {/* ── HEADER ── */}
        <header className="mb-8 border-b border-gray-300 pb-4">
          <h1 className="text-3xl text-gray-800 sm:text-4xl font-bold">
            Project Genesis
          </h1>
        </header>

        {/* ── PROJECT OVERVIEW ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Core Mission</h2>

          <p className="text-base sm:text-lg leading-relaxed mb-6">
            <strong>{projectInfo.title}</strong> is{" "}
            {projectInfo.description.replace(
              "An advanced technology platform",
              "an advanced technology platform",
            )}{" "}
          </p>

          <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-3">
              Key Capabilities & Directives:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
              {projectInfo.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CORE TEAM ── */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Core Team</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-2">
              The engineering and research team driving the infrastructure.
              Direct technical inquiries to the Technical Lead. Make sure you
              are subscribed to the project repository to receive comments and
              reviews on your patches.
            </p>
            <p className="text-sm font-semibold text-gray-600">
              Active Members: {teamMembers.length}
            </p>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-4xl hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-gray-600  tracking-wide mb-2">
                  <span className="font-bold text-black">Role:</span>{" "}
                  {member.role}
                </p>
                <div></div>
                <p className="text-base text-gray-800">
                  {member.role === "Team Leader/Designer/Presentation"
                    ? "Responsible for overall cordination between us and presentation design"
                    : member.role === "Research/Documentation"
                      ? "For discussions involving algorithms, theoretical research, and updating the Developer Documentation."
                      : member.role === "Presentations/Report"
                        ? "Handles project demonstrations, reporting pipelines, and metric aggregation."
                        : "Responsible for complete technical questions, API guidelines, architecture, and code review."}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
