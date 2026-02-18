import React from "react";

export default function MetaAIDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar Simulation */}

      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Meta AI & The Llama Ecosystem
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              An overview of Meta&apos;s artificial intelligence research
              division, its historical milestones, and a comprehensive breakdown
              of the open-weight Llama foundation models that have redefined the
              generative AI landscape.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: History */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              1. History & Overview
            </h2>
            <p className="text-gray-800 mb-4">
              Meta AI was originally founded in 2013 as{" "}
              <strong>Facebook Artificial Intelligence Research (FAIR)</strong>.
              Directed initially by AI pioneer Yann LeCun, the division was
              established to advance the academic problems surrounding AI,
              focusing heavily on deep learning, computer vision, and natural
              language processing.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Key Milestones
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-2 mb-6">
              <li>
                <strong>2013:</strong> FAIR is established to pursue open
                research and collaboration in machine learning.
              </li>
              <li>
                <strong>2017:</strong> Meta releases <strong>PyTorch</strong>,
                an open-source machine learning framework that quickly became
                the industry standard for AI research and deep learning
                technologies globally.
              </li>
              <li>
                <strong>2021:</strong> FAIR is rebranded to Meta AI alongside
                the corporate name change from Facebook to Meta Platforms, Inc.
              </li>
              <li>
                <strong>2023 - Present:</strong> Meta shifts significant focus
                toward Generative AI, launching the open-weight{" "}
                <strong>Llama</strong> (Large Language Model Meta AI) series,
                making frontier-level LLMs widely available to researchers and
                developers.
              </li>
            </ul>
          </section>

          {/* Section 2: The Llama Models */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              2. The Llama Model Family
            </h2>
            <p className="text-gray-800 mb-6">
              Unlike many proprietary systems, Meta has largely championed an
              &quot;open-weights&quot; approach, allowing developers to
              download, fine-tune, and deploy these models locally or in the
              cloud. Below is a breakdown of the major Llama releases and their
              parameter sizes.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                  <tr>
                    <th className="px-4 py-3">Model Generation</th>
                    <th className="px-4 py-3">Release Date</th>
                    <th className="px-4 py-3">Parameter Sizes</th>
                    <th className="px-4 py-3">Key Features / Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Llama 1
                    </td>
                    <td className="px-4 py-3">Feb 2023</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      7B, 13B, 33B, 65B
                    </td>
                    <td className="px-4 py-3">
                      Foundation text models; 2K context window. Proved small
                      models could rival much larger ones (like GPT-3).
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Llama 2
                    </td>
                    <td className="px-4 py-3">Jul 2023</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      7B, 13B, 70B
                    </td>
                    <td className="px-4 py-3">
                      Introduced specialized &quot;Chat&quot; variants
                      fine-tuned for dialogue; 4K context window. Allowed
                      commercial use.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Llama 3.1
                    </td>
                    <td className="px-4 py-3">Jul 2024</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      8B, 70B, 405B
                    </td>
                    <td className="px-4 py-3">
                      Massive 405B flagship model; expanded to 128K context
                      window; strong multilingual support.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Llama 3.2
                    </td>
                    <td className="px-4 py-3">Sep 2024</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      1B, 3B, 11B, 90B
                    </td>
                    <td className="px-4 py-3">
                      Introduced Vision capabilities (11B & 90B) for image
                      analysis. 1B and 3B models optimized for mobile/edge
                      devices.
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Llama 4
                    </td>
                    <td className="px-4 py-3">Apr 2025</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      109B (Scout), 400B (Maverick)
                    </td>
                    <td className="px-4 py-3">
                      Shifted to a sparse Mixture-of-Experts (MoE) architecture.
                      Incredible 1M to 10M token context windows.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                What does &quot;B&quot; mean?
              </h4>
              <p className="text-sm text-blue-800">
                The &quot;B&quot; stands for Billions of{" "}
                <strong>Parameters</strong>. Parameters are the internal
                weights/variables a neural network learns during training.
                Generally, a higher parameter count allows a model to grasp more
                complex reasoning and retain more world knowledge, though it
                requires significantly more computing power to run (inference).
              </p>
            </div>
          </section>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a href="#" className="hover:text-blue-600 transition-colors">
              1. History & Overview
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Key Milestones
              </a>
            </div>
            <a href="#" className="hover:text-blue-600 transition-colors mt-2">
              2. The Llama Model Family
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Model Comparison Table
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Parameter Explanation
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
