"use client";

import {
  Activity,
  BrainCircuit,
  Cpu,
  Factory,
  TerminalSquare,
  CloudCog,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    /* Full-screen dark wrapper to guarantee the theme applies properly */
    <div className="min-h-screen bg-[#121212] flex justify-center selection:bg-[#8cb4ff]/30 selection:text-white">
      <article className="max-w-[1000px] w-full px-6 py-16  text-[#e0e0e0]">
        {/* ─── Page Header ─── */}
        <header className="mb-12 block">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Introduction to FDS.AI <span className="text-[#8cb4ff]">_</span>
          </h1>
          <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide">
            Welcome to the Fault Detection System With AI (FDS.AI). FDS is an
            automated process that monitors systems and applications to identify
            abnormalities, errors, or potential failures before they impact
            operations.
          </p>
        </header>

        <hr className="my-10 border-[#333]" />

        {/* ─── Core Concepts Grid ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-8 rounded-sm border border-[#333] bg-[#1b1b1b] shadow-sm hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-6 text-[#8cb4ff]">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              How it Works
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed font-normal">
              The system continuously monitors your infrastructure, collecting
              metrics and logs. Using machine learning models and predefined
              rules, it analyzes this data in real-time to detect anomalies.
              When an issue is detected, notifications are sent to configured
              channels immediately.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-sm border border-[#333] bg-[#1b1b1b] shadow-sm hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center mb-6 text-[#8cb4ff]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              AI-Powered Detection
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed font-normal">
              Utilizes advanced artificial intelligence and ML algorithms to
              automatically identify, diagnose, and predict equipment failures
              and system anomalies before they cause significant damage or
              costly downtime.
            </p>
          </div>
        </section>

        {/* ─── Industry Context ─── */}
        <section className="mb-12 pt-4">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Factory className="w-6 h-6 text-[#8cb4ff]" />
            The Indian Industrial Landscape
          </h2>
          <p className="text-gray-200 font-normal leading-relaxed mb-4 text-lg max-w-4xl">
            In the Indian industrial sector—where manufacturing, power
            generation, and infrastructure development are experiencing rapid,
            unprecedented growth—fault detection systems play a crucial role.
            FDS.AI is designed to maintain high operational efficiency and
            heavily reduce costly breakdowns across these expanding sectors.
          </p>
        </section>

        <hr className="my-10 border-[#333]" />

        {/* ─── Tech Stack ─── */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Architecture & Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 bg-[#1b1b1b] border border-[#333] rounded-sm shadow-sm">
            {/* Stack Column 1 */}
            <div>
              <h3 className="text-xs font-mono font-normal uppercase tracking-widest text-gray-100 mb-5 flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-[#8cb4ff]" /> Core &
                Frontend
              </h3>
              <ul className="space-y-4 text-sm text-gray-300 font-normal">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Next.js 16
                  </strong>{" "}
                  <span className="text-gray-100">(Turbopack)</span>
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
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444]"></div>
                  Shadcn UI
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444]"></div>
                  Lucide & React Icons
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444]"></div>
                  Framer Motion
                </li>
              </ul>
            </div>

            {/* Stack Column 2 */}
            <div className="sm:col-span-2">
              <h3 className="text-xs font-mono font-normal uppercase tracking-widest text-gray-100 mb-5 flex items-center gap-2">
                <CloudCog className="w-4 h-4 text-[#8cb4ff]" /> Amazon Web
                Services (AWS)
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-300 font-normal">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    AWS Amplify:
                  </strong>{" "}
                  Serverless deploy
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Amazon Bedrock:
                  </strong>{" "}
                  LLM integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    AWS Lambda:
                  </strong>{" "}
                  Serverless functions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Amazon CloudWatch:
                  </strong>{" "}
                  Logs
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    Amazon Route53:
                  </strong>{" "}
                  Domains
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                  <strong className="font-normal text-white">
                    AWS Cloud:
                  </strong>{" "}
                  Architecture
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-10 border-[#333]" />

        {/* ─── Footer / Next Steps ─── */}
        <section className="bg-[#1b1b1b] rounded-sm p-8 border border-[#333] shadow-sm">
          <h2 className="text-xl font-medium text-white mb-3">
            Getting Started & Contributions
          </h2>
          <p className="text-sm text-gray-200 font-normal leading-relaxed mb-8 max-w-2xl">
            Want to contribute to the project? Please refer to our contribution
            guidelines or dive deeper into the technical architecture.
            Maintained by{" "}
            <strong className="text-white font-normal">
              Kinshuk-Jain-Website
            </strong>
            .
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/repo-setup"
              className="inline-flex items-center justify-center gap-2 text-sm font-normal text-white bg-transparent border border-[#444] hover:bg-[#333] hover:border-white px-6 py-2.5 rounded-sm transition-all"
            >
              <Cpu className="w-4 h-4" />
              Contribution Guide
            </Link>
            <Link
              href="/docs/project-info"
              className="inline-flex items-center justify-center gap-2 text-sm font-normal text-[#121212] bg-white hover:bg-gray-200 border border-transparent px-6 py-2.5 rounded-sm transition-all"
            >
              Project Info
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
