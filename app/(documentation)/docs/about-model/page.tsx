import React from "react";

export default function ModelPricingDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* Top Navigation Bar */}

      {/* Main Grid Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10 flex items-start gap-5">
            {/* Meta SVG Logo */}
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-8 h-8 text-[#0668E1]"
                viewBox="0 0 36 36"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M28.463 12.308c-3.141 0-5.875 1.571-7.481 3.968-1.605-2.397-4.34-3.968-7.481-3.968-4.904 0-8.88 3.976-8.88 8.88s3.976 8.88 8.88 8.88c3.141 0 5.875-1.571 7.481-3.968 1.606 2.397 4.34 3.968 7.481 3.968 4.904 0 8.88-3.976 8.88-8.88s-3.976-8.88-8.88-8.88zm0 14.505c-3.104 0-5.629-2.525-5.629-5.625s2.525-5.625 5.629-5.625 5.629 2.525 5.629 5.625-2.525 5.625-5.629 5.625zm-14.962 0c-3.104 0-5.629-2.525-5.629-5.625s2.525-5.625 5.629-5.625 5.629 2.525 5.629 5.625-2.525 5.625-5.629 5.625z" />
                <path d="M13.501 22.844c-1.129 0-2.044-.915-2.044-2.044s.915-2.044 2.044-2.044 2.044.915 2.044 2.044-.915 2.044-2.044 2.044zm14.962 0c-1.129 0-2.044-.915-2.044-2.044s.915-2.044 2.044-2.044 2.044.915 2.044 2.044-.915 2.044-2.044 2.044z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                Meta Llama 3 & Gemma Pricing
              </h1>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed max-w-3xl m-0">
                Llama 3 is an accessible, open large language model (LLM)
                designed for developers and businesses to build, experiment, and
                responsibly scale generative AI ideas.
              </p>
            </div>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: Model Overview */}
          <section className="mb-12 sm:mb-14 min-w-0" id="overview">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-[#f38020] pl-4">
              1. Model Overview
            </h2>

            <p className="text-gray-800 mb-6">
              Part of a foundational system, Llama 3 serves as a bedrock for
              innovation in the global community. It is ideal for content
              creation, conversational AI, language understanding, R&D, and
              enterprise applications.
            </p>

            {/* Spec Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                  Capabilities & Use Cases
                </h4>
                <ul className="text-sm text-gray-800 space-y-2 m-0 list-none p-0">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{" "}
                    Language modeling & Dialog systems
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{" "}
                    Code generation & Instruction following
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{" "}
                    Sentiment analysis with nuanced reasoning
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>{" "}
                    Text classification & accurate summarization
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                  Technical Details
                </h4>
                <table className="text-sm text-gray-800 w-full m-0">
                  <tbody>
                    <tr className="border-b border-gray-200/60">
                      <td className="py-2 font-medium">Model ID</td>
                      <td className="py-2 text-right font-mono text-xs text-gray-900">
                        meta.llama3-70b-instruct-v1:0
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200/60">
                      <td className="py-2 font-medium">Release Date</td>
                      <td className="py-2 text-right">Apr 18, 2024</td>
                    </tr>
                    <tr className="border-b border-gray-200/60">
                      <td className="py-2 font-medium">Modalities</td>
                      <td className="py-2 text-right">
                        Text Input / Text Output
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Max Context</td>
                      <td className="py-2 text-right font-mono font-medium text-[#f38020]">
                        8,000 Tokens
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: AWS Bedrock Pricing */}
          <section className="mb-12 sm:mb-14 min-w-0" id="llama-pricing">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. Llama 3.2 Pricing (AWS Bedrock)
            </h2>
            <p className="text-gray-800 mb-6">
              With Amazon Bedrock, deployments are completely Serverless. You
              are charged purely for model inference and customization. Pricing
              is calculated per 1 million tokens.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4 w-full min-w-0 shadow-sm">
              <table className="min-w-full text-left text-sm text-gray-800 m-0">
                <thead className="bg-[#1c2128] border-b border-gray-200 text-gray-200 font-medium">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Meta Model</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Input Tokens (per 1M)
                    </th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Output Tokens (per 1M)
                    </th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Batch Pricing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Llama 3.2 Instruct (1B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.10</td>
                    <td className="px-4 py-3 text-right font-mono">$0.10</td>
                    <td className="px-4 py-3 text-right text-gray-400">N/A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Llama 3.2 Instruct (3B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.15</td>
                    <td className="px-4 py-3 text-right font-mono">$0.15</td>
                    <td className="px-4 py-3 text-right text-gray-400">N/A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Llama 3.2 Instruct (11B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.16</td>
                    <td className="px-4 py-3 text-right font-mono">$0.16</td>
                    <td className="px-4 py-3 text-right text-gray-400">N/A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Llama 3.2 Instruct (90B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-orange-600">
                      $0.72
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-orange-600">
                      $0.72
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Rates above apply to Standard On-Demand routing.
            </p>
          </section>

          {/* Section 3: Google Gemma 3 Pricing */}
          <section className="mb-12 sm:mb-14 min-w-0" id="gemma-pricing">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. Gemma 3 Pricing (Google Cloud)
            </h2>
            <p className="text-gray-800 mb-6">
              For comparative infrastructure planning, below is the pricing
              matrix for Google&apos;s open-weights Gemma 3 models, deployed in
              the <strong>Asia Pacific (Sydney)</strong> region.
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6 w-full min-w-0 shadow-sm">
              <table className="min-w-full text-left text-sm text-gray-800 m-0">
                <thead className="bg-[#1c2128] border-b border-gray-200 text-gray-200 font-medium">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Google Model</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Standard Input (per 1M)
                    </th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Standard Output (per 1M)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Gemma 3 (4B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.0412</td>
                    <td className="px-4 py-3 text-right font-mono">$0.0824</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Gemma 3 (12B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.0927</td>
                    <td className="px-4 py-3 text-right font-mono">$0.2987</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      Gemma 3 (27B)
                    </td>
                    <td className="px-4 py-3 text-right font-mono">$0.2369</td>
                    <td className="px-4 py-3 text-right font-mono">$0.3914</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compute Tiers Context */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              <p className="text-sm text-blue-800 mb-3">
                Unlike AWS Bedrock&apos;s flat pricing, Google Cloud utilizes a
                tier-based pricing multiplier for the base costs listed above:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-2 m-0">
                <li>
                  <strong className="text-blue-900">Flex Tier:</strong>{" "}
                  Represents a <strong>50% discount</strong> to Standard
                  pricing. Used for lower-priority, asynchronous batch
                  workloads.
                </li>
                <li>
                  <strong className="text-blue-900">Priority Tier:</strong>{" "}
                  Billed at a <strong>75% premium</strong> over Standard
                  pricing. Guarantees top-level hardware availability and lowest
                  latency during high-traffic spikes.
                </li>
              </ul>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#overview"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. Model Overview
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#overview"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Capabilities
              </a>
              <a
                href="#overview"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Technical Details
              </a>
            </div>

            <a
              href="#llama-pricing"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. Llama 3.2 Pricing
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#llama-pricing"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                AWS Bedrock Matrix
              </a>
            </div>

            <a
              href="#gemma-pricing"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              3. Gemma 3 Pricing
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#gemma-pricing"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                GCP Matrix
              </a>
              <a
                href="#gemma-pricing"
                className="hover:text-[#f38020] transition-colors truncate"
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
