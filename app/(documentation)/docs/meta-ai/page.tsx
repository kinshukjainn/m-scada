"use client";

import React from "react";

export default function MetaAIDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0] font-sans selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Meta AI & The Llama Ecosystem{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              An overview of Meta&apos;s artificial intelligence research
              division, its historical milestones, and a comprehensive breakdown
              of the open-weight Llama foundation models that have redefined the
              generative AI landscape.
            </p>
          </div>

          {/* Section 1: History */}
          <section className="mb-16 min-w-0" id="history">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. History & Overview
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Meta AI was originally founded in 2013 as{" "}
              <strong className="text-white font-semibold">
                Facebook Artificial Intelligence Research (FAIR)
              </strong>
              . Directed initially by AI pioneer Yann LeCun, the division was
              established to advance the academic problems surrounding AI,
              focusing heavily on deep learning, computer vision, and natural
              language processing.
            </p>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Key Milestones
            </h3>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">2013:</strong>{" "}
                  FAIR is established to pursue open research and collaboration
                  in machine learning.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">2017:</strong>{" "}
                  Meta releases{" "}
                  <strong className="text-white font-semibold">PyTorch</strong>,
                  an open-source machine learning framework that quickly became
                  the industry standard for AI research and deep learning
                  technologies globally.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">2021:</strong>{" "}
                  FAIR is rebranded to Meta AI alongside the corporate name
                  change from Facebook to Meta Platforms, Inc.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    2023 - Present:
                  </strong>{" "}
                  Meta shifts significant focus toward Generative AI, launching
                  the open-weight{" "}
                  <strong className="text-white font-semibold">Llama</strong>{" "}
                  (Large Language Model Meta AI) series, making frontier-level
                  LLMs widely available to researchers and developers.
                </span>
              </li>
            </ul>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 2: The Llama Models */}
          <section className="mb-16 min-w-0" id="llama-family">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. The Llama Model Family
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Unlike many proprietary systems, Meta has largely championed an
              &quot;open-weights&quot; approach, allowing developers to
              download, fine-tune, and deploy these models locally or in the
              cloud. Below is a breakdown of the major Llama releases and their
              parameter sizes.
            </p>

            <div className="mt-10 overflow-x-auto border border-[#333] rounded-md shadow-sm bg-[#1b1b1b] mb-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Model Generation
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Release Date
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Parameter Sizes
                    </th>
                    <th className="px-5 py-4 font-semibold border-b border-[#444]">
                      Key Features / Context
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Llama 1
                    </td>
                    <td className="px-5 py-4">Feb 2023</td>
                    <td className="px-5 py-4 font-mono text-[#8cb4ff]">
                      7B, 13B, 33B, 65B
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Foundation text models; 2K context window. Proved small
                      models could rival much larger ones (like GPT-3).
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Llama 2
                    </td>
                    <td className="px-5 py-4">Jul 2023</td>
                    <td className="px-5 py-4 font-mono text-[#8cb4ff]">
                      7B, 13B, 70B
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Introduced specialized &quot;Chat&quot; variants
                      fine-tuned for dialogue; 4K context window. Allowed
                      commercial use.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Llama 3.1
                    </td>
                    <td className="px-5 py-4">Jul 2024</td>
                    <td className="px-5 py-4 font-mono text-[#8cb4ff]">
                      8B, 70B, 405B
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Massive 405B flagship model; expanded to 128K context
                      window; strong multilingual support.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Llama 3.2
                    </td>
                    <td className="px-5 py-4">Sep 2024</td>
                    <td className="px-5 py-4 font-mono text-[#8cb4ff]">
                      1B, 3B, 11B, 90B
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Introduced Vision capabilities (11B & 90B) for image
                      analysis. 1B and 3B models optimized for mobile/edge
                      devices.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-semibold text-white">
                      Llama 4
                    </td>
                    <td className="px-5 py-4">Apr 2025</td>
                    <td className="px-5 py-4 font-mono text-[#8cb4ff]">
                      109B (Scout), 400B (Maverick)
                    </td>
                    <td className="px-5 py-4 leading-relaxed whitespace-normal">
                      Shifted to a sparse Mixture-of-Experts (MoE) architecture.
                      Incredible 1M to 10M token context windows.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Info Callout Box */}
            <div className="rounded-md p-6 sm:p-8 bg-[#1b1b1b] border-l-4 border-l-[#8cb4ff] border border-[#333]">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-3 text-lg">
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
                What does &quot;B&quot; mean?
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                The &quot;B&quot; stands for Billions of{" "}
                <strong className="text-gray-200 font-semibold">
                  Parameters
                </strong>
                . Parameters are the internal weights/variables a neural network
                learns during training. Generally, a higher parameter count
                allows a model to grasp more complex reasoning and retain more
                world knowledge, though it requires significantly more computing
                power to run (inference).
              </p>
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
              href="#history"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. History & Overview
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#history"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Key Milestones
              </a>
            </div>

            <a
              href="#llama-family"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. The Llama Model Family
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#llama-family"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Model Comparison Table
              </a>
              <a
                href="#llama-family"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Parameter Explanation
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
