"use client";

import React from "react";
import { PiMetaLogoDuotone } from "react-icons/pi";

export default function ModelPricingDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8 flex flex-col sm:flex-row items-start gap-6">
            {/* Meta SVG Logo */}
            <div className="w-14 h-14 bg-[#1b1b1b] border border-[#444] rounded-md flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
              <PiMetaLogoDuotone className="w-8 h-8 text-[#8cb4ff]" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-normal text-white mb-4 tracking-tight">
                Meta Llama 3 & Gemma Pricing{" "}
                <span className="text-[#8cb4ff]">_</span>
              </h1>
              <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl m-0 tracking-wide">
                Llama 3 is an accessible, open large language model (LLM)
                designed for developers and businesses to build, experiment, and
                responsibly scale generative AI ideas.
              </p>
            </div>
          </div>

          {/* Section 1: Model Overview */}
          <section className="mb-16 min-w-0" id="overview">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              1. Model Overview
            </h2>

            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Part of a foundational system, Llama 3 serves as a bedrock for
              innovation in the global community. It is ideal for content
              creation, conversational AI, language understanding, R&D, and
              enterprise applications.
            </p>

            {/* Spec Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors">
                <h4 className="font-mono font-normal text-gray-300 mb-4 text-[11px] uppercase tracking-widest border-b border-[#333] pb-3">
                  Capabilities & Use Cases
                </h4>
                <ul className="text-sm text-gray-200 font-normal space-y-3 m-0 list-none p-0">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                    Language modeling & Dialog systems
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                    Code generation & Instruction following
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                    Sentiment analysis with nuanced reasoning
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff]"></div>
                    Text classification & accurate summarization
                  </li>
                </ul>
              </div>

              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors">
                <h4 className="font-mono font-normal text-gray-300 mb-4 text-[11px] uppercase tracking-widest border-b border-[#333] pb-3">
                  Technical Details
                </h4>
                <table className="text-sm text-gray-200 font-normal w-full m-0">
                  <tbody className="divide-y divide-[#333]">
                    <tr>
                      <td className="py-2.5 font-normal text-gray-300">
                        Model ID
                      </td>
                      <td className="py-2.5 text-right font-mono text-xs text-[#8cb4ff]">
                        meta.llama3-70b-instruct-v1:0
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-normal text-gray-300">
                        Release Date
                      </td>
                      <td className="py-2.5 text-right">Apr 18, 2024</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-normal text-gray-300">
                        Modalities
                      </td>
                      <td className="py-2.5 text-right">
                        Text Input / Text Output
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-normal text-gray-300">
                        Max Context
                      </td>
                      <td className="py-2.5 text-right font-mono text-white">
                        8,000 Tokens
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: AWS Bedrock Pricing */}
          <section className="mb-16 min-w-0" id="llama-pricing">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              2. Llama 3.2 Pricing (AWS Bedrock)
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              With Amazon Bedrock, deployments are completely Serverless. You
              are charged purely for model inference and customization. Pricing
              is calculated per 1 million tokens.
            </p>

            <div className="mt-8 overflow-x-auto border border-[#333] rounded-md shadow-sm bg-[#1b1b1b] mb-3">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      Meta Model
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Input Tokens (per 1M)
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Output Tokens (per 1M)
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Batch Pricing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Llama 3.2 Instruct (1B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.10</td>
                    <td className="px-5 py-4 text-right font-mono">$0.10</td>
                    <td className="px-5 py-4 text-right text-gray-100">N/A</td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Llama 3.2 Instruct (3B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.15</td>
                    <td className="px-5 py-4 text-right font-mono">$0.15</td>
                    <td className="px-5 py-4 text-right text-gray-100">N/A</td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Llama 3.2 Instruct (11B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.16</td>
                    <td className="px-5 py-4 text-right font-mono">$0.16</td>
                    <td className="px-5 py-4 text-right text-gray-100">N/A</td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Llama 3.2 Instruct (90B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-normal text-[#8cb4ff]">
                      $0.72
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-normal text-[#8cb4ff]">
                      $0.72
                    </td>
                    <td className="px-5 py-4 text-right text-gray-100">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-gray-100 tracking-wide uppercase">
              Rates above apply to Standard On-Demand routing.
            </p>
          </section>

          {/* Section 3: Google Gemma 3 Pricing */}
          <section className="mb-16 min-w-0" id="gemma-pricing">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              3. Gemma 3 Pricing (Google Cloud)
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              For comparative infrastructure planning, below is the pricing
              matrix for Google&apos;s open-weights Gemma 3 models, deployed in
              the{" "}
              <strong className="text-white font-normal">
                Asia Pacific (Sydney)
              </strong>{" "}
              region.
            </p>

            <div className="overflow-x-auto border border-[#333] rounded-md shadow-sm bg-[#1b1b1b] mb-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      Google Model
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Standard Input (per 1M)
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Standard Output (per 1M)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Gemma 3 (4B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.0412</td>
                    <td className="px-5 py-4 text-right font-mono">$0.0824</td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Gemma 3 (12B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.0927</td>
                    <td className="px-5 py-4 text-right font-mono">$0.2987</td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      Gemma 3 (27B)
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.2369</td>
                    <td className="px-5 py-4 text-right font-mono">$0.3914</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compute Tiers Context */}
            <div className="rounded-md p-6 sm:p-8 bg-[#1b1b1b] border-l-4 border-l-[#8cb4ff] border border-[#333]">
              <h4 className="font-normal text-white mb-4 flex items-center gap-3 text-lg">
                <svg
                  className="w-5 h-5 text-[#8cb4ff]"
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
                Google Cloud Compute Tiers
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed mb-4">
                Unlike AWS Bedrock&apos;s flat pricing, Google Cloud utilizes a
                tier-based pricing multiplier for the base costs listed above:
              </p>
              <ul className="space-y-4 m-0 text-sm text-gray-200 font-normal">
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    <strong className="text-white font-normal">
                      Flex Tier:
                    </strong>{" "}
                    Represents a{" "}
                    <strong className="text-gray-200">50% discount</strong> to
                    Standard pricing. Used for lower-priority, asynchronous
                    batch workloads.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    <strong className="text-white font-normal">
                      Priority Tier:
                    </strong>{" "}
                    Billed at a{" "}
                    <strong className="text-gray-200">75% premium</strong> over
                    Standard pricing. Guarantees top-level hardware availability
                    and lowest latency during high-traffic spikes.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-normal text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#overview"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. Model Overview
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#overview"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Capabilities
              </a>
              <a
                href="#overview"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Technical Details
              </a>
            </div>

            <a
              href="#llama-pricing"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Llama 3.2 Pricing
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#llama-pricing"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                AWS Bedrock Matrix
              </a>
            </div>

            <a
              href="#gemma-pricing"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              3. Gemma 3 Pricing
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#gemma-pricing"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                GCP Matrix
              </a>
              <a
                href="#gemma-pricing"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Compute Tiers
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
