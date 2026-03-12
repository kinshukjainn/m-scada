"use client";

import Link from "next/link";
import React from "react";

export default function SelectConsolePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900  p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* ── HEADER ── */}
        <header className="mb-10 border-b border-gray-300 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Select <span className="text-red-600">Console</span> Mode
          </h1>
          <p className="text-lg text-gray-700">
            Choose how you want to interact with your data and workflows.
          </p>
        </header>

        {/* ── CONSOLE OPTIONS ── */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-12">
          {/* Manual Console Card */}
          <div className="flex flex-col border border-gray-300 rounded p-6 bg-gray-50">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">Manual Console</h2>
              <p className="text-base text-gray-700 mb-6">
                Full control and flexibility. You dictate every aspect of data
                collection, analysis, and metric tracking.
              </p>

              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
                Features
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700 mb-8">
                <li>Customize metrics and visualizations</li>
                <li>Complete transparency in processes</li>
                <li>Integrate existing tools/workflows</li>
                <li>No external algorithm dependency</li>
              </ul>
            </div>

            <Link
              href="/console/manual"
              className="block w-full w-max text-center bg-green-600 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition-colors"
            >
              Go for manual
            </Link>
          </div>

          {/* Automated Console Card */}
          <div className="flex flex-col border border-gray-300 rounded p-6 bg-gray-50">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Automated Console</h2>
                <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold rounded uppercase tracking-wide">
                  Recommended
                </span>
              </div>
              <p className="text-base text-gray-700 mb-6">
                Let the system handle it. Automatically collects data,
                identifies patterns, and generates insights.
              </p>

              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">
                Features
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700 mb-8">
                <li>No manual configuration required</li>
                <li>Real-time processing and updates</li>
                <li>AI-powered predictions</li>
                <li>Saves time and reduces manual work</li>
              </ul>
            </div>

            <Link
              href="/console/direct"
              className="block w-full w-max text-center bg-green-600 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition-colors"
            >
              Go for auto
            </Link>
          </div>
        </div>

        {/* ── COMPARISON TABLE ── */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300 font-bold">
                    Feature
                  </th>
                  <th className="p-3 border border-gray-300 font-bold">
                    Automated
                  </th>
                  <th className="p-3 border border-gray-300 font-bold">
                    Manual
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">
                    Setup Time
                  </td>
                  <td className="p-3 border border-gray-300">Minutes</td>
                  <td className="p-3 border border-gray-300 text-gray-500">
                    Hours
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">
                    Customization
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-500">
                    Limited
                  </td>
                  <td className="p-3 border border-gray-300">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">
                    Maintenance
                  </td>
                  <td className="p-3 border border-gray-300">Minimal</td>
                  <td className="p-3 border border-gray-300 text-gray-500">
                    High
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">
                    AI Insights
                  </td>
                  <td className="p-3 border border-gray-300 text-blue-600 font-semibold">
                    Included
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-500">
                    Optional
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">
                    Learning Curve
                  </td>
                  <td className="p-3 border border-gray-300">None</td>
                  <td className="p-3 border border-gray-300 text-gray-500">
                    Moderate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
