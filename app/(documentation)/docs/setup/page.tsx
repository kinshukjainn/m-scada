"use client";

import React from "react";

export default function DevCycleDocs() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Project Setup & Development Cycle{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              Comprehensive guide to the{" "}
              <strong className="text-white font-semibold">FDS.ai_</strong>{" "}
              application architecture, dependencies, and local development
              workflow. This project leverages a modern, high-performance stack
              built around React 19 and Next.js 16.
            </p>
          </div>

          {/* Setup Instructions */}
          <section className="mb-16 min-w-0" id="local-setup">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. Local Setup Instructions
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              Follow these steps to initialize the project locally. Ensure you
              have Node.js (v20+) installed before proceeding.
            </p>

            <div className="bg-[#1e1e1e] rounded-sm overflow-hidden border border-[#333] shadow-sm mb-6">
              <div className="bg-[#2d2d2d] px-4 py-2.5 text-xs text-gray-200 font-mono border-b border-[#444] flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                </div>
                Terminal
              </div>
              <pre className="p-5 text-sm text-gray-300 font-mono overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-gray-100">
                    # 1. Clone the repository
                  </span>
                  {"\n"}
                  <span className="text-[#8cb4ff]">git clone</span>{" "}
                  https://github.com/your-org/collegefds.git{"\n"}
                  <span className="text-[#8cb4ff]">cd</span> collegefds{"\n\n"}
                  <span className="text-gray-100">
                    # 2. Install dependencies based on package.json
                  </span>
                  {"\n"}
                  <span className="text-[#8cb4ff]">npm</span> install{"\n\n"}
                  <span className="text-gray-100">
                    # 3. Start the Next.js development server
                  </span>
                  {"\n"}
                  <span className="text-[#8cb4ff]">npm</span> run dev
                </code>
              </pre>
            </div>

            <div className="rounded-sm p-5 bg-[#1e1e1e] border-l-4 border-l-[#8cb4ff] border border-[#333]">
              <p className="text-gray-300 text-sm font-normal leading-relaxed m-0">
                <strong className="text-white font-semibold">Note:</strong> The
                development server will start on{" "}
                <code className="bg-[#2d2d2d] text-[#8cb4ff] border border-[#444] px-1.5 py-0.5 font-mono rounded-sm text-xs">
                  http://localhost:3000
                </code>{" "}
                by default.
              </p>
            </div>
          </section>

          {/* Architecture & Dependencies */}
          <section className="mb-16 min-w-0" id="tech-stack">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. Technology Stack Breakdown
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              The{" "}
              <code className="bg-[#1e1e1e] text-[#8cb4ff] border border-[#333] px-1.5 py-0.5 font-mono rounded-sm text-sm">
                package.json
              </code>{" "}
              relies on carefully selected libraries to handle everything from
              3D rendering to automatic code memoization. Below is the technical
              breakdown of what was installed and why.
            </p>

            {/* Core Framework */}
            <h3 className="text-lg font-semibold text-white mb-4 mt-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Core Framework & Compiler
            </h3>
            <ul className="space-y-4 text-gray-200 font-normal text-[15px] mb-10 pl-1">
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    next (16.1.6)
                  </strong>{" "}
                  &{" "}
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    react (19.2.3)
                  </strong>
                  : The foundation of the app. Next.js 16 handles file-system
                  routing, Server Components, and API endpoints, while React 19
                  powers the client and server UI model.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    babel-plugin-react-compiler (1.0.0)
                  </strong>
                  : The new experimental React Compiler. This automatically
                  memoizes your React components, drastically reducing the need
                  for manual <code className="text-[#8cb4ff]">useMemo</code> or{" "}
                  <code className="text-[#8cb4ff]">useCallback</code> hooks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    typescript (^5)
                  </strong>
                  : Provides static type checking to catch bugs at compile-time
                  rather than runtime.
                </span>
              </li>
            </ul>

            {/* 3D Graphics */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              3D Rendering & Graphics
            </h3>
            <ul className="space-y-4 text-gray-200 font-normal text-[15px] mb-10 pl-1">
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    three (^0.182.0)
                  </strong>
                  : The industry-standard underlying WebGL library used to
                  create 3D scenes in the browser.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    @react-three/fiber (^9.5.0)
                  </strong>
                  : A powerful React renderer for Three.js. It allows you to
                  build 3D scenes declaratively using React components instead
                  of imperative vanilla JavaScript.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    @react-three/drei (^10.7.7)
                  </strong>
                  : A heavily utilized ecosystem of useful helpers,
                  abstractions, and pre-built components (like cameras,
                  controls, and lighting) specifically for React Three Fiber.
                </span>
              </li>
            </ul>

            {/* Animations */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Animations & Motion
            </h3>
            <ul className="space-y-4 text-gray-200 font-normal text-[15px] mb-10 pl-1">
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    framer-motion (^12.34.0)
                  </strong>
                  : Used for declarative, physics-based UI animations, page
                  transitions, and complex DOM gesture interactions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    @lottiefiles/dotlottie-react (^0.17.15)
                  </strong>
                  : Allows the application to render highly efficient, scalable
                  vector animations (Lottie{" "}
                  <code className="text-[#8cb4ff]">.lottie</code> format)
                  exported directly from Adobe After Effects without significant
                  performance overhead.
                </span>
              </li>
            </ul>

            {/* UI & Networking */}
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Styling, UI & Networking
            </h3>
            <ul className="space-y-4 text-gray-200 font-normal text-[15px] mb-10 pl-1">
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    tailwindcss (^4)
                  </strong>
                  : The newest version of the utility-first CSS framework. V4
                  brings a massive performance boost and a CSS-first
                  configuration model.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    lucide-react & react-icons
                  </strong>
                  : Two comprehensive icon libraries ensuring crisp, scalable
                  SVG iconography across the interface.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-mono font-semibold text-sm bg-[#1e1e1e] border border-[#333] px-1.5 py-0.5 rounded-sm">
                    axios (^1.13.4)
                  </strong>
                  : A robust, promise-based HTTP client used for fetching
                  external data and communicating with backend REST APIs.
                </span>
              </li>
            </ul>
          </section>

          {/* Scripts Summary Table */}
          <section className="mb-16 min-w-0" id="scripts">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. Available Scripts
            </h2>
            <div className="overflow-x-auto border border-[#333] rounded-sm shadow-sm bg-[#1e1e1e]">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Command
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-[#8cb4ff]">
                      npm run dev
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Spins up the Next.js development server with Turbopack and
                      Hot Module Replacement.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-[#8cb4ff]">
                      npm run build
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Creates an optimized production build, compiling 3D
                      assets, Server Components, and static pages.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-[#8cb4ff]">
                      npm run start
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Starts the Node.js production server using the compiled{" "}
                      <code className="bg-[#1e1e1e] px-1.5 py-0.5 rounded-sm border border-[#333]">
                        .next
                      </code>{" "}
                      directory.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-[#8cb4ff]">
                      npm run lint
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Runs ESLint to catch syntax errors, unused variables, and
                      enforce project coding standards.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents Simulation) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#local-setup"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. Local Setup Instructions
            </a>
            <a
              href="#tech-stack"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Technology Stack Breakdown
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#tech-stack"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Core Framework
              </a>
              <a
                href="#tech-stack"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                3D Rendering
              </a>
              <a
                href="#tech-stack"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Animations
              </a>
              <a
                href="#tech-stack"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Styling & UI
              </a>
            </div>
            <a
              href="#scripts"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              3. Available Scripts
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
