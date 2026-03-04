"use client";

import React from "react";
import { SiOpenai } from "react-icons/si";

export default function OpenAIDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#10a37f]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8 flex flex-col sm:flex-row items-start gap-6">
            {/* OpenAI SVG Logo */}
            <div className="w-14 h-14 bg-[#1b1b1b] border border-[#444] rounded-sm flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
              <SiOpenai className="w-7 h-7 text-[#10a37f]" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-normal text-white mb-4 tracking-tight">
                OpenAI GPT-OSS Ecosystem{" "}
                <span className="text-[#10a37f]">_</span>
              </h1>
              <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl m-0 tracking-wide">
                A comprehensive guide to OpenAI&apos;s open-weights initiative,
                featuring the GPT-OSS reasoning models designed for secure,
                self-hosted enterprise deployments.
              </p>
            </div>
          </div>

          {/* Section 1: What is OSS / Open-Weights? */}
          <section className="mb-16 min-w-0" id="oss-explained">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              1. What is &quot;OSS&quot; in AI? (Open-Weights Explained)
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              While traditional <strong>OSS</strong> (Open Source Software)
              implies that all underlying source code and data are public, in
              the AI space, the term usually refers to{" "}
              <strong>&quot;Open-Weights&quot;</strong> models.
            </p>
            <div className="bg-[#1b1b1b] border border-[#333] rounded-sm p-6 mb-8 text-sm text-gray-200 leading-relaxed">
              <ul className="space-y-4 m-0 list-none p-0">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#10a37f] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-normal">
                      Apache 2.0 License:
                    </strong>{" "}
                    Unlike OpenAI&apos;s proprietary models (like GPT-4o) which
                    are locked behind an API, GPT-OSS is released under a
                    permissive Apache 2.0 license. This means you can download
                    the neural network, modify it, fine-tune it on private data,
                    and use it commercially without paying OpenAI any API fees.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#10a37f] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-white font-normal">
                      Data Privacy & Sovereignty:
                    </strong>{" "}
                    Because the model weights are downloaded to your own cloud
                    environment (like an AWS VPC), your sensitive data never
                    leaves your servers.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Model Architecture */}
          <section className="mb-16 min-w-0" id="architecture">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              2. What Kind of Model is GPT-OSS-120B?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              GPT-OSS-120B is a text-only reasoning model designed for complex
              logic, agentic tool use, and deep coding tasks. It shifts away
              from dense architectures to highly optimized sparse structures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1b1b1b] border border-[#333] rounded-sm p-6 hover:border-[#444] transition-colors">
                <h4 className="font-mono font-normal text-gray-300 mb-4 text-[11px] uppercase tracking-widest border-b border-[#333] pb-3">
                  Technical Specifications
                </h4>
                <ul className="text-sm text-gray-200 font-normal space-y-3 m-0 list-none p-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>117B Total Parameters:</strong> The model holds
                      massive world knowledge but uses a{" "}
                      <em>Mixture of Experts (MoE)</em> architecture.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>5.1B Active Parameters:</strong> For any single
                      word/token, it only activates ~5.1B parameters, making it
                      incredibly fast and efficient to run.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>128K Context Window:</strong> Capable of analyzing
                      massive documents or entire code repositories in a single
                      prompt.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>Native MXFP4 Quantization:</strong> Thanks to
                      advanced compression, this 120B model fits entirely on a
                      single 80GB GPU (like an NVIDIA H100).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1b1b1b] border border-[#333] rounded-sm p-6 hover:border-[#444] transition-colors">
                <h4 className="font-mono font-normal text-gray-300 mb-4 text-[11px] uppercase tracking-widest border-b border-[#333] pb-3">
                  Agentic & Reasoning Features
                </h4>
                <ul className="text-sm text-gray-200 font-normal space-y-3 m-0 list-none p-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>Adjustable Reasoning:</strong> Developers can
                      toggle reasoning effort (Low, Medium, High) to balance
                      speed versus deep logical analysis.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>Transparent Chain-of-Thought:</strong> You get
                      full access to the model&apos;s internal reasoning process
                      for easier debugging and output trust.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10a37f] mt-0.5 opacity-70">▹</span>
                    <span>
                      <strong>Native Tool Use:</strong> Built natively to
                      execute Python code, browse the web, and call
                      developer-defined functions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: AWS Bedrock Pricing */}
          <section className="mb-16 min-w-0" id="pricing">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              3. GPT-OSS Pricing (AWS Bedrock & Cloud)
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              Because GPT-OSS is an open-weights model, you pay your cloud
              provider (like AWS Bedrock) for the compute infrastructure rather
              than paying OpenAI an API toll. Below is standard Serverless
              inference pricing per <strong>1 million tokens</strong>.
            </p>

            <div className="mt-8 overflow-x-auto border border-[#333] rounded-sm shadow-sm bg-[#1b1b1b] mb-3">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      Model Name
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Input Tokens (per 1M)
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Output Tokens (per 1M)
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444] text-right">
                      Hardware Footprint
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      gpt-oss-120b
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-[#10a37f]">
                      $0.15
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-[#10a37f]">
                      $0.60
                    </td>
                    <td className="px-5 py-4 text-right text-gray-200">
                      1x 80GB GPU
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-white">
                      gpt-oss-20b
                    </td>
                    <td className="px-5 py-4 text-right font-mono">$0.05</td>
                    <td className="px-5 py-4 text-right font-mono">$0.20</td>
                    <td className="px-5 py-4 text-right text-gray-200">
                      1x 16GB GPU
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-gray-100 tracking-wide uppercase">
              *Estimated standard on-demand routing costs. Pricing may vary
              slightly based on AWS region.
            </p>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-normal text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#oss-explained"
              className="hover:text-[#10a37f] transition-colors truncate"
            >
              1. What is OSS?
            </a>

            <a
              href="#architecture"
              className="hover:text-[#10a37f] transition-colors mt-2 truncate"
            >
              2. Model Architecture
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#architecture"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                Technical Specs
              </a>
              <a
                href="#architecture"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                Agentic Features
              </a>
            </div>

            <a
              href="#pricing"
              className="hover:text-[#10a37f] transition-colors mt-2 truncate"
            >
              3. Cloud Pricing
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#pricing"
                className="text-gray-100 hover:text-[#10a37f] transition-colors truncate"
              >
                Serverless Matrix
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
