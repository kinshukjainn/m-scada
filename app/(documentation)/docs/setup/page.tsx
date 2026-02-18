import React from "react";

export default function DevCycleDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900">
      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Project Setup & Development Cycle
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              Comprehensive guide to the <strong>FDS.ai_</strong> application
              architecture, dependencies, and local development workflow. This
              project leverages a modern, high-performance stack built around
              React 19 and Next.js 16.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Setup Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. Local Setup Instructions
            </h2>
            <p className="text-gray-800 mb-4">
              Follow these steps to initialize the project locally. Ensure you
              have Node.js (v20+) installed before proceeding.
            </p>

            <div className="bg-[#1c2128] rounded-lg overflow-hidden shadow-sm mb-6">
              <div className="bg-[#2d333b] px-4 py-2 text-xs text-gray-400 code-body border-b border-gray-700 flex items-center">
                Terminal
              </div>
              <pre className="p-4 text-sm text-gray-300 code-body overflow-x-auto">
                <code>
                  <span className="text-green-400">
                    # 1. Clone the repository
                  </span>
                  {"\n"}
                  git clone https://github.com/your-org/collegefds.git{"\n"}
                  cd collegefds{"\n\n"}
                  <span className="text-green-400">
                    # 2. Install dependencies based on package.json
                  </span>
                  {"\n"}
                  npm install{"\n\n"}
                  <span className="text-green-400">
                    # 3. Start the Next.js development server
                  </span>
                  {"\n"}
                  npm run dev
                </code>
              </pre>
            </div>

            <p className="text-gray-800 text-sm bg-blue-50 text-blue-800 p-4 rounded-md border border-blue-100">
              <strong>Note:</strong> The development server will start on{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 code-body rounded text-blue-900  text-xs">
                http://localhost:3000
              </code>{" "}
              by default.
            </p>
          </section>

          {/* Architecture & Dependencies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-[#f38020] pl-4">
              2. Technology Stack Breakdown
            </h2>
            <p className="text-gray-800 mb-8">
              The `package.json` relies on carefully selected libraries to
              handle everything from 3D rendering to automatic code memoization.
              Below is the technical breakdown of what was installed and why.
            </p>

            {/* Core Framework */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Core Framework & Compiler
            </h3>
            <ul className="list-disc list-inside text-gray-800 mb-8 space-y-2 ml-2">
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  next (16.1.6)
                </strong>{" "}
                &{" "}
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  react (19.2.3)
                </strong>
                : The foundation of the app. Next.js 16 handles file-system
                routing, Server Components, and API endpoints, while React 19
                powers the client and server UI model.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  babel-plugin-react-compiler (1.0.0)
                </strong>
                : The new experimental React Compiler. This automatically
                memoizes your React components, drastically reducing the need
                for manual `useMemo` or `useCallback` hooks.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  typescript (^5)
                </strong>
                : Provides static type checking to catch bugs at compile-time
                rather than runtime.
              </li>
            </ul>

            {/* 3D Graphics */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              3D Rendering & Graphics
            </h3>
            <ul className="list-disc list-inside text-gray-800 mb-8 space-y-2 ml-2">
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  three (^0.182.0)
                </strong>
                : The industry-standard underlying WebGL library used to create
                3D scenes in the browser.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  @react-three/fiber (^9.5.0)
                </strong>
                : A powerful React renderer for Three.js. It allows you to build
                3D scenes declaratively using React components instead of
                imperative vanilla JavaScript.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  @react-three/drei (^10.7.7)
                </strong>
                : A heavily utilized ecosystem of useful helpers, abstractions,
                and pre-built components (like cameras, controls, and lighting)
                specifically for React Three Fiber.
              </li>
            </ul>

            {/* Animations */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Animations & Motion
            </h3>
            <ul className="list-disc list-inside text-gray-800 mb-8 space-y-2 ml-2">
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  framer-motion (^12.34.0)
                </strong>
                : Used for declarative, physics-based UI animations, page
                transitions, and complex DOM gesture interactions.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  @lottiefiles/dotlottie-react (^0.17.15)
                </strong>
                : Allows the application to render highly efficient, scalable
                vector animations (Lottie `.lottie` format) exported directly
                from Adobe After Effects without significant performance
                overhead.
              </li>
            </ul>

            {/* UI & Networking */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Styling, UI & Networking
            </h3>
            <ul className="list-disc list-inside text-gray-800 mb-8 space-y-2 ml-2">
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  tailwindcss (^4)
                </strong>
                : The newest version of the utility-first CSS framework. V4
                brings a massive performance boost and a CSS-first configuration
                model.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  lucide-react & react-icons
                </strong>
                : Two comprehensive icon libraries ensuring crisp, scalable SVG
                iconography across the interface.
              </li>
              <li>
                <strong className="text-gray-900 code-body text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  axios (^1.13.4)
                </strong>
                : A robust, promise-based HTTP client used for fetching external
                data and communicating with backend REST APIs.
              </li>
            </ul>
          </section>

          {/* Scripts Summary Table */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. Available Scripts
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                  <tr>
                    <th className="px-4 py-3">Command</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 code-body text-xs text-gray-800">
                      npm run dev
                    </td>
                    <td className="px-4 py-3">
                      Spins up the Next.js development server with Turbopack and
                      Hot Module Replacement.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 code-body text-xs text-gray-800">
                      npm run build
                    </td>
                    <td className="px-4 py-3">
                      Creates an optimized production build, compiling 3D
                      assets, Server Components, and static pages.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 code-body text-xs text-gray-800">
                      npm run start
                    </td>
                    <td className="px-4 py-3">
                      Starts the Node.js production server using the compiled
                      `.next` directory.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 code-body text-xs text-gray-800">
                      npm run lint
                    </td>
                    <td className="px-4 py-3">
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
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a href="#" className="hover:text-[#f38020] transition-colors">
              1. Local Setup Instructions
            </a>
            <a href="#" className="hover:text-[#f38020] transition-colors">
              2. Technology Stack Breakdown
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Core Framework
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                3D Rendering
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Animations
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Styling & UI
              </a>
            </div>
            <a href="#" className="hover:text-[#f38020] transition-colors">
              3. Available Scripts
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
