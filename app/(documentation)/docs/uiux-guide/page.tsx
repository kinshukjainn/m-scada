"use client";

import React from "react";

export default function GlobalUIUXDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0] selection:bg-[#f38020]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Global UI/UX Architecture{" "}
              <span className="text-[#f38020]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              This document outlines the concrete psychological and technical
              rationales driving the user interface across our entire
              platform—from the static documentation to the highly interactive
              developer console.
            </p>
          </div>

          {/* Section 1: Global Philosophy */}
          <section className="mb-16 min-w-0" id="global-philosophy">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. The &quot;Jakob&apos;s Law&quot; Mandate
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Our entire platform adopts a hyper-minimalist, utilitarian
              aesthetic inspired by enterprise infrastructure dashboards (like
              Cloudflare and AWS). This is not a lack of creativity; it is a
              strict adherence to{" "}
              <strong className="text-white font-semibold">
                Jakob&apos;s Law of Internet User Experience
              </strong>
              .
            </p>

            <div className="bg-[#1b1b1b] border-l-4 border-l-[#f38020] border border-[#333] rounded-md p-6 sm:p-8">
              <h4 className="font-semibold text-white mb-3 text-lg">
                Familiarity over Novelty
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                Jakob&apos;s Law states that users spend most of their time on{" "}
                <em className="text-gray-400">other</em> sites. This means they
                prefer your site to work the same way as all the other sites
                they already know. When a developer logs into our console, they
                immediately understand the layout because it maps directly to
                the mental models they&apos;ve built using industry-standard
                cloud providers. We eliminate the learning curve by leveraging
                established UX patterns.
              </p>
            </div>
          </section>

          {/* Section 2: The Console Experience */}
          <section className="mb-16 min-w-0" id="console-experience">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. The Console: Managing High Data Density
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              While the documentation prioritizes reading flow, the{" "}
              <strong className="text-white font-semibold">
                Console/Dashboard
              </strong>{" "}
              prioritizes rapid data scanning and execution. We achieve this
              through two core principles.
            </p>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#f38020]"></span>
              Maximizing the Data-to-Ink Ratio
            </h3>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              Coined by Edward Tufte, the Data-to-Ink ratio dictates that a
              large share of &quot;ink&quot; (pixels) should present data,
              rather than structural borders or decorations. In our data tables
              and metric cards, you will notice:
            </p>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>Absence of heavy vertical borders in tables.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>
                  Use of subtle background fills (
                  <code className="bg-[#2d2d2d] text-[#e0e0e0] px-1.5 py-0.5 rounded font-mono text-xs">
                    bg-gray-50
                  </code>{" "}
                  equivalent) instead of hard lines to group related data
                  points.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>
                  Monospaced fonts (
                  <code className="bg-[#2d2d2d] text-[#e0e0e0] px-1.5 py-0.5 rounded font-mono text-xs">
                    font-mono
                  </code>
                  ) for IDs, IP addresses, and numerical data to ensure perfect
                  vertical alignment when users scan down a column.
                </span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#f38020]"></span>
              Fitts&apos;s Law for Actionable States
            </h3>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              Fitts&apos;s Law predicts that the time required to rapidly move
              to a target area is a function of the ratio between the distance
              to the target and the width of the target.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed text-[16px]">
              In our console, destructive actions (like &quot;Delete
              Project&quot;) are placed far from primary navigation paths and
              require a multi-step confirmation. Conversely, primary actions
              (like &quot;Deploy&quot; or &quot;Save&quot;) are oversized,
              persistently visible in sticky footers, and utilize high-contrast
              primary colors to make them mathematically faster for the mouse to
              hit.
            </p>
          </section>

          {/* Section 3: Semantic Color System */}
          <section className="mb-16 min-w-0" id="color-system">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. The Semantic Color Matrix
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Color in this application is never used for decoration; it is
              exclusively a vehicle for{" "}
              <strong className="text-white font-semibold">
                system state communication
              </strong>
              . We employ a strict 60-30-10 distribution ratio (60% whitespace,
              30% structural grays, 10% semantic color).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Action */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 flex items-start gap-4 shadow-sm hover:border-[#444] transition-colors">
                <div className="w-8 h-8 rounded bg-[#f38020] flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-white text-[15px] mb-1.5">
                    Primary Action (Orange)
                  </h4>
                  <p className="text-sm text-gray-400 m-0 leading-relaxed">
                    Used exclusively for primary progression elements (Deploy,
                    Submit, Next). Creates an instant visual anchor.
                  </p>
                </div>
              </div>

              {/* Success State */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 flex items-start gap-4 shadow-sm hover:border-[#444] transition-colors">
                <div className="w-8 h-8 rounded bg-green-500/90 flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-white text-[15px] mb-1.5">
                    Success State (Green)
                  </h4>
                  <p className="text-sm text-gray-400 m-0 leading-relaxed">
                    Reserved for completed deployments, healthy API responses,
                    and &quot;System Operational&quot; indicators.
                  </p>
                </div>
              </div>

              {/* Warning State */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 flex items-start gap-4 shadow-sm hover:border-[#444] transition-colors">
                <div className="w-8 h-8 rounded bg-yellow-500/90 flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-white text-[15px] mb-1.5">
                    Warning State (Yellow)
                  </h4>
                  <p className="text-sm text-gray-400 m-0 leading-relaxed">
                    Signals rate limits approaching, billing thresholds, or
                    non-fatal configuration errors.
                  </p>
                </div>
              </div>

              {/* Destructive State */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 flex items-start gap-4 shadow-sm hover:border-[#444] transition-colors">
                <div className="w-8 h-8 rounded bg-red-600/90 flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-white text-[15px] mb-1.5">
                    Destructive (Red)
                  </h4>
                  <p className="text-sm text-gray-400 m-0 leading-relaxed">
                    Requires conscious cognitive friction. Used for data
                    deletion, cache purging, or overriding defaults.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Motion & Interactions */}
          <section className="mb-16 min-w-0" id="motion">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              4. Motion: Preventing Change Blindness
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              &quot;Change Blindness&quot; is a psychological phenomenon where
              users fail to notice structural changes in a complex UI if the
              change happens instantly.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed text-[16px]">
              When working in the console (e.g., adding a new row to a DNS table
              or opening a settings modal), elements do not simply appear. We
              use Framer Motion and CSS transitions (
              <code className="bg-[#2d2d2d] text-[#e0e0e0] px-1.5 py-0.5 rounded font-mono text-sm mx-1">
                duration-200 ease-out
              </code>
              ) to smoothly slide and fade elements into the DOM. This
              micro-animation maps the spatial change into the user&apos;s
              short-term memory, instantly explaining where the new data came
              from without requiring them to re-scan the entire screen.
            </p>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#global-philosophy"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. Global Philosophy
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#global-philosophy"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                Jakob&apos;s Law
              </a>
            </div>

            <a
              href="#console-experience"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. The Console Experience
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#console-experience"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                Data-to-Ink Ratio
              </a>
              <a
                href="#console-experience"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                Fitts&apos;s Law (Actions)
              </a>
            </div>

            <a
              href="#color-system"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              3. Semantic Color System
            </a>

            <a
              href="#motion"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              4. Motion & Interactions
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
