"use client";

import {
  Activity,
  Code2,
  Cpu,
  TerminalSquare,
  CloudCog,
  ArrowRight,
  BookOpen,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function DocsLandingPage() {
  return (
    /* Added full-screen dark wrapper to guarantee the theme doesn't break */
    <div className="min-h-screen bg-[#121212] flex justify-center selection:bg-[#8cb4ff]/30 selection:text-white">
      <article className="max-w-[1000px] w-full px-6 py-16  text-[#e0e0e0]">
        {/* ─── Page Header ─── */}
        <header className="mb-12 block">
          <h1 className="text-4xl sm:text-5xl font-normal text-white tracking-tight mb-6">
            Welcome to FDS Documentation{" "}
            <span className="text-[#8cb4ff]">_</span>
          </h1>
          <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide">
            Explore our comprehensive guides, API references, and architecture
            breakdowns to understand, integrate, and contribute to the
            AI-Powered Fault Detection System (FDS.AI).
          </p>
        </header>

        <hr className="my-10 border-[#333]" />

        {/* ─── Quick Navigation Grid ─── */}
        <section className="mb-12">
          <h2 className="text-2xl font-normal text-white mb-6">
            Explore the Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <Link
              href="/docs/project-info"
              className="group p-6 rounded-md border border-[#333] bg-[#1b1b1b] hover:border-[#8cb4ff] transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-5 text-gray-200 group-hover:text-[#8cb4ff] group-hover:border-[#8cb4ff]/50 transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-normal text-white mb-2 flex items-center justify-between">
                Project Information
                <ArrowRight className="w-4 h-4 text-gray-100 group-hover:text-[#8cb4ff] transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                Understand the core mechanics of FDS.AI, types of faults
                detected, and the benefits of predictive maintenance in
                industrial landscapes.
              </p>
            </Link>

            {/* Card 2 */}
            <Link
              href="/docs/rar"
              className="group p-6 rounded-md border border-[#333] bg-[#1b1b1b] hover:border-[#8cb4ff] transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-5 text-gray-200 group-hover:text-[#8cb4ff] group-hover:border-[#8cb4ff]/50 transition-colors">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-normal text-white mb-2 flex items-center justify-between">
                API Routes
                <ArrowRight className="w-4 h-4 text-gray-100 group-hover:text-[#8cb4ff] transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                Complete technical reference for our backend endpoints,
                request/response structures, and integration guidelines.
              </p>
            </Link>

            {/* Card 3 */}
            <Link
              href="/docs/about-model"
              className="group p-6 rounded-md border border-[#333] bg-[#1b1b1b] hover:border-[#8cb4ff] transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-5 text-gray-200 group-hover:text-[#8cb4ff] group-hover:border-[#8cb4ff]/50 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-normal text-white mb-2 flex items-center justify-between">
                Meta AI Model
                <ArrowRight className="w-4 h-4 text-gray-100 group-hover:text-[#8cb4ff] transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                Deep dive into the machine learning architecture, threshold
                configurations, and anomaly detection algorithms.
              </p>
            </Link>

            {/* Card 4 */}
            <Link
              href="/docs/aws-services"
              className="group p-6 rounded-md border border-[#333] bg-[#1b1b1b] hover:border-[#8cb4ff] transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-5 text-gray-200 group-hover:text-[#8cb4ff] group-hover:border-[#8cb4ff]/50 transition-colors">
                <CloudCog className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-normal text-white mb-2 flex items-center justify-between">
                Amazon Services (AWS)
                <ArrowRight className="w-4 h-4 text-gray-100 group-hover:text-[#8cb4ff] transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-normal">
                Learn how FDS utilizes Amazon Bedrock, Lambda, and serverless
                deployments to maintain high availability.
              </p>
            </Link>
          </div>
        </section>

        <hr className="my-10 border-[#333]" />

        {/* ─── Tech Stack Summary ─── */}
        <section className="mb-12">
          <h2 className="text-2xl font-normal text-white mb-6">
            Architecture & Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 bg-[#1b1b1b] border border-[#333] rounded-md shadow-sm">
            {/* Stack Column 1 */}
            <div>
              <h3 className="text-xs font-mono font-normal uppercase tracking-widest text-gray-100 mb-5 flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-[#8cb4ff]" /> Core
                Frameworks
              </h3>
              <ul className="space-y-4 text-sm text-gray-300 font-normal">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Next.js 16
                  </strong>{" "}
                  <span className="text-gray-100">(App Router)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Node.js
                  </strong>{" "}
                  <span className="text-gray-100">(v22)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Tailwind CSS
                  </strong>{" "}
                  <span className="text-gray-100">(v4)</span>
                </li>
              </ul>
            </div>

            {/* Stack Column 2 */}
            <div className="sm:col-span-2">
              <h3 className="text-xs font-mono font-normal uppercase tracking-widest text-gray-100 mb-5 flex items-center gap-2">
                <CloudCog className="w-4 h-4 text-[#8cb4ff]" /> Infrastructure
                (AWS)
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-300 font-normal">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Amplify:
                  </strong>{" "}
                  Serverless deployment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Bedrock:
                  </strong>{" "}
                  LLM integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Api Gateway
                  </strong>{" "}
                  Frontend API Calling and routing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Lambda:
                  </strong>{" "}
                  Serverless functions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    CloudWatch:
                  </strong>{" "}
                  Monitoring & logs
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-10 border-[#333]" />

        {/* ─── Footer / Next Steps ─── */}
        <section className="bg-[#1b1b1b] rounded-md p-8 border border-[#333] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-xl font-normal text-white mb-3">
                Ready to contribute?
              </h2>
              <p className="text-sm text-gray-200 font-normal leading-relaxed max-w-md">
                We welcome community contributions. Check out our repository
                setup guide, coding standards, and UI/UX guidelines to get
                started.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/docs/setup"
                className="inline-flex items-center justify-center gap-2 text-sm font-normal text-white bg-transparent border border-[#444] hover:bg-[#333] hover:border-white px-6 py-2.5 rounded-full transition-all"
              >
                <Github className="w-4 h-4" />
                Repository Setup
              </Link>
              <Link
                href="/docs/introduction"
                className="inline-flex items-center justify-center gap-2 text-sm font-normal text-[#121212] bg-white hover:bg-gray-200 border border-transparent px-6 py-2.5 rounded-full transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Start Reading
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
