import React from "react";

export default function GlobalUIUXDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* Top Navigation Bar Simulation */}

      {/* Main Grid Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Global UI/UX Architecture
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              This document outlines the concrete psychological and technical
              rationales driving the user interface across our entire
              platform—from the static documentation to the highly interactive
              developer console.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: Global Philosophy */}
          <section className="mb-12 sm:mb-14 min-w-0" id="global-philosophy">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. The &quot;Jakob&apos;s Law&quot; Mandate
            </h2>
            <p className="text-gray-800 mb-4">
              Our entire platform adopts a hyper-minimalist, utilitarian
              aesthetic inspired by enterprise infrastructure dashboards (like
              Cloudflare and AWS). This is not a lack of creativity; it is a
              strict adherence to{" "}
              <strong>Jakob&apos;s Law of Internet User Experience</strong>.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Familiarity over Novelty
              </h4>
              <p className="text-sm text-gray-800 leading-relaxed">
                Jakob&apos;s Law states that users spend most of their time on{" "}
                <em>other</em> sites. This means they prefer your site to work
                the same way as all the other sites they already know. When a
                developer logs into our console, they immediately understand the
                layout because it maps directly to the mental models
                they&apos;ve built using industry-standard cloud providers. We
                eliminate the learning curve by leveraging established UX
                patterns.
              </p>
            </div>
          </section>

          {/* Section 2: The Console Experience */}
          <section className="mb-12 sm:mb-14 min-w-0" id="console-experience">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. The Console: Managing High Data Density
            </h2>
            <p className="text-gray-800 mb-6">
              While the documentation prioritizes reading flow, the{" "}
              <strong>Console/Dashboard</strong> prioritizes rapid data scanning
              and execution. We achieve this through two core principles.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Maximizing the Data-to-Ink Ratio
            </h3>
            <p className="text-gray-800 mb-4">
              Coined by Edward Tufte, the Data-to-Ink ratio dictates that a
              large share of &quot;ink&quot; (pixels) should present data,
              rather than structural borders or decorations. In our data tables
              and metric cards, you will notice:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-1 sm:ml-2 mb-6">
              <li className="pl-2">
                Absence of heavy vertical borders in tables.
              </li>
              <li className="pl-2">
                Use of subtle background fills (<code>bg-gray-50</code>) instead
                of hard lines to group related data points.
              </li>
              <li className="pl-2">
                Monospaced fonts (<code>font-mono</code>) for IDs, IP addresses,
                and numerical data to ensure perfect vertical alignment when
                users scan down a column.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Fitts&apos;s Law for Actionable States
            </h3>
            <p className="text-gray-800 mb-4">
              Fitts&apos;s Law predicts that the time required to rapidly move
              to a target area is a function of the ratio between the distance
              to the target and the width of the target.
            </p>
            <p className="text-gray-800">
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
          <section className="mb-12 sm:mb-14 min-w-0" id="color-system">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. The Semantic Color Matrix
            </h2>
            <p className="text-gray-800 mb-6">
              Color in this application is never used for decoration; it is
              exclusively a vehicle for{" "}
              <strong>system state communication</strong>. We employ a strict
              60-30-10 distribution ratio (60% whitespace, 30% structural grays,
              10% semantic color).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Action */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-[#f38020] flex-shrink-0 shadow-sm"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Primary Action (Orange)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Used exclusively for primary progression elements (Deploy,
                    Submit, Next). Creates an instant visual anchor.
                  </p>
                </div>
              </div>

              {/* Success State */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-green-500 flex-shrink-0 shadow-sm"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Success State (Green)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Reserved for completed deployments, healthy API responses,
                    and &quot;System Operational&quot; indicators.
                  </p>
                </div>
              </div>

              {/* Warning State */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-yellow-500 flex-shrink-0 shadow-sm"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Warning State (Yellow)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Signals rate limits approaching, billing thresholds, or
                    non-fatal configuration errors.
                  </p>
                </div>
              </div>

              {/* Destructive State */}
              <div className="border border-gray-200 rounded-lg p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-red-600 flex-shrink-0 shadow-sm"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Destructive (Red)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Requires conscious cognitive friction. Used for data
                    deletion, cache purging, or overriding defaults.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Motion & Interactions */}
          <section className="mb-12 sm:mb-14 min-w-0" id="motion">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              4. Motion: Preventing Change Blindness
            </h2>
            <p className="text-gray-800 mb-4">
              &quot;Change Blindness&quot; is a psychological phenomenon where
              users fail to notice structural changes in a complex UI if the
              change happens instantly.
            </p>
            <p className="text-gray-800">
              When working in the console (e.g., adding a new row to a DNS table
              or opening a settings modal), elements do not simply appear. We
              use Framer Motion and CSS transitions (
              <code>duration-200 ease-out</code>) to smoothly slide and fade
              elements into the DOM. This micro-animation maps the spatial
              change into the user&apos;s short-term memory, instantly
              explaining where the new data came from without requiring them to
              re-scan the entire screen.
            </p>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#global-philosophy"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. Global Philosophy
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#global-philosophy"
                className="hover:text-[#f38020] transition-colors truncate"
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
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#console-experience"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Data-to-Ink Ratio
              </a>
              <a
                href="#console-experience"
                className="hover:text-[#f38020] transition-colors truncate"
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
