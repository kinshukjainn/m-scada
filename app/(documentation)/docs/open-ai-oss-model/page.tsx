"use client";

import React from "react";

export default function OpenAIDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#10a37f]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              OpenAI OSS on Amazon Bedrock{" "}
              <span className="text-[#10a37f]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              A comprehensive deep-dive into OpenAI&apos;s open-weights
              initiative, featuring the GPT-OSS models deployed natively on
              Amazon Bedrock.
            </p>
          </div>

          {/* Section 1: Overview & Bedrock Integration */}
          <section className="mb-16 min-w-0" id="overview">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. Overview & Architecture
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              Marking a significant shift in its deployment strategy, OpenAI
              released the <strong>gpt-oss</strong> series—open-weight models
              designed to run within highly secure, customer-controlled
              environments. Available via Amazon Bedrock Custom Model Import and
              native SageMaker endpoints, these models bring frontier-level
              reasoning directly into a user&apos;s AWS Virtual Private Cloud
              (VPC).
            </p>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Unlike traditional black-box API endpoints, the Bedrock deployment
              allows developers to apply custom safety policies at inference
              time (policy-conditioned safety), enabling strict, domain-specific
              moderation for industries like healthcare, finance, and enterprise
              software.
            </p>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#10a37f]"></span>
              Key Architectural Features
            </h3>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-sm p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#10a37f] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Mixture-of-Experts (MoE):
                  </strong>{" "}
                  The models utilize a sparse MoE architecture. Instead of
                  computing all parameters for every word, the network routes
                  tokens to specialized &quot;expert&quot; sub-networks. This
                  drastically reduces compute costs and latency while
                  maintaining massive internal knowledge.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#10a37f] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    128K Context Window:
                  </strong>{" "}
                  Capable of ingesting massive amounts of data, equivalent to
                  several large books or extensive code repositories, in a
                  single prompt.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#10a37f] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Adjustable Reasoning:
                  </strong>{" "}
                  Developers can toggle between low, medium, and high
                  chain-of-thought (CoT) reasoning modes, dynamically allocating
                  compute based on the complexity of the query.
                </span>
              </li>
            </ul>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 2: The Models */}
          <section className="mb-16 min-w-0" id="models">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. The GPT-OSS Model Family
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              The GPT-OSS family is currently split into two primary parameter
              sizes, optimized for different enterprise workflows and hardware
              profiles on AWS.
            </p>

            <div className="mt-10 overflow-x-auto border border-[#333] rounded-sm shadow-sm bg-[#1b1b1b] mb-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Model Name
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Parameters
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      AWS Deployment
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Key Features / Context
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      gpt-oss-120b
                    </td>
                    <td className="px-5 py-4 font-mono text-[#10a37f]">
                      120B (Total) / ~12B (Active)
                    </td>
                    <td className="px-5 py-4">Amazon Bedrock / S3 Import</td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      The flagship open-weight model. Excels at complex coding,
                      mathematical problem-solving, and agentic workflows.
                      Requires H100-class instances.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      gpt-oss-20b
                    </td>
                    <td className="px-5 py-4 font-mono text-[#10a37f]">
                      21B (Total) / ~3.6B (Active)
                    </td>
                    <td className="px-5 py-4">Amazon Bedrock / S3 Import</td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      A highly efficient, lower-latency variant. Ideal for
                      standard safety classification, routing, and tasks running
                      on smaller 16GB GPU hardware footprints.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Parameter Clarification Callout Box */}
            <div className="rounded-sm p-6 sm:p-8 bg-[#1b1b1b] border-l-4 border-l-[#10a37f] border border-[#333]">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-3 text-lg">
                <svg
                  className="w-5 h-5 text-[#10a37f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Clarification: The 120B vs 102B Discussion
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                It is common to confuse model parameter sizes across the
                open-source ecosystem. While models like Upstage&apos;s{" "}
                <em>Solar Open</em> or Anthrogen&apos;s <em>Odyssey</em> operate
                with <strong>102B</strong> parameters, OpenAI&apos;s official
                open-weight flagship natively available on Bedrock is the{" "}
                <strong>120 Billion</strong> parameter model (
                <code>gpt-oss-120b</code>).
              </p>
            </div>
          </section>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#overview"
              className="hover:text-[#10a37f] transition-colors truncate"
            >
              1. Overview & Architecture
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#overview"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                Key Architectural Features
              </a>
            </div>

            <a
              href="#models"
              className="hover:text-[#10a37f] transition-colors mt-2 truncate"
            >
              2. The GPT-OSS Model Family
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#models"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                Model Comparison Table
              </a>
              <a
                href="#models"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                120B vs 102B Clarification
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
