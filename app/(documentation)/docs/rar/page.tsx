"use client";

import React from "react";

export default function RequestFlowDocs() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              End-to-End Request Flow & Llama 3.2 Response{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl m-0 tracking-wide">
              Understanding the lifecycle of an AI prompt—from the moment a user
              clicks &quot;send&quot; in the browser to the exact JSON structure
              returned by Meta&apos;s Llama 3.2 models running on AWS
              infrastructure.
            </p>
          </div>

          {/* Section 1: The Request Lifecycle */}
          <section className="mb-16 min-w-0" id="end-to-end-flow">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. The End-to-End Architecture Flow
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              When a user interacts with the AI, the payload travels through
              several distinct layers of infrastructure before a response is
              rendered on screen. Here is the exact lifecycle of that request.
            </p>

            <div className="space-y-8 mt-10">
              {[
                {
                  step: 1,
                  title: "Frontend (Next.js / React)",
                  desc: "The user types a prompt. The React client packages this data into a JSON payload and makes an HTTP POST request to your backend API route.",
                },
                {
                  step: 2,
                  title: "Backend (Next.js API Route)",
                  desc: "The server receives the request, validates user authentication, applies rate limiting, and securely forwards the payload to the AWS environment.",
                },
                {
                  step: 3,
                  title: "AWS Lambda",
                  desc: "Lambda spins up an isolated execution environment, parses the prompt, and uses the AWS SDK to formulate a strictly typed request to the Amazon Bedrock API.",
                },
                {
                  step: 4,
                  title: "Amazon Bedrock & Meta Llama 3.2",
                  desc: "Bedrock securely routes the prompt to the requested model. The neural network processes the tokens and Bedrock packages the output into a JSON format.",
                },
                {
                  step: 5,
                  title: "The Return Journey",
                  desc: "The API returns the JSON to Lambda. Lambda executes any necessary post-processing and sends an HTTP 200 response back to the Backend, updating the UI.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex flex-col items-center mt-0.5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2d2d2d] text-[#8cb4ff] font-mono text-sm border border-[#444]">
                      {item.step}
                    </span>
                    {item.step !== 5 && (
                      <div className="w-px h-full bg-[#333] my-2"></div>
                    )}
                  </div>
                  <div className="pb-4 min-w-0">
                    <h3 className="font-semibold text-white text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 font-normal leading-relaxed text-sm m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 2: Llama 3.2 Response Design */}
          <section className="mb-16 min-w-0" id="response-design">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. Meta Llama 3.2 Response Design
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              When communicating with Llama 3.2 on AWS, the architecture relies
              on the Bedrock{" "}
              <strong className="text-white font-semibold">Converse API</strong>
              . This API standardizes interactions so that text and multimodal
              models all return a predictable, uniform JSON structure.
            </p>

            <h3 className="text-lg font-semibold text-white mt-8 mb-4">
              Detailed JSON Response Example
            </h3>
            <p className="text-gray-200 font-normal text-[15px] mb-6">
              Below is an exact example of how Llama 3.2 formats its response
              when asked to describe an image and answer a question.
            </p>

            <div className="bg-[#1e1e1e] rounded-sm overflow-hidden border border-[#333] shadow-sm mb-8 w-full min-w-0">
              <div className="bg-[#2d2d2d] px-4 py-2.5 text-xs text-gray-200 font-mono border-b border-[#444] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#444]"></div>
                  </div>
                  <span>Response Payload (JSON)</span>
                </div>
                <span className="truncate text-[#8cb4ff]">
                  meta.llama3-2-90b-instruct-v1:0
                </span>
              </div>
              <div className="overflow-x-auto w-full">
                <pre className="p-5 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full leading-relaxed">
                  <code>{`{
  "output": {
    "message": {
      "role": "assistant",
      "content": [
        {
          "text": "The image shows a chrysalis hanging from a branch. Based on its current stage of development, the chrysalis will eventually hatch into a butterfly within the near future."
        }
      ]
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 342,
    "outputTokens": 32,
    "totalTokens": 374
  },
  "metrics": {
    "latencyMs": 1450
  }
}`}</code>
                </pre>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-10 mb-4">
              Breaking Down the Design
            </h3>
            <div className="bg-[#1e1e1e] border border-[#333] rounded-sm p-6 sm:p-8 shadow-sm">
              <ul className="space-y-5 text-gray-200 font-normal text-[15px] m-0">
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    <strong className="text-white font-semibold">
                      The{" "}
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                        output.message
                      </code>{" "}
                      object:
                    </strong>{" "}
                    Llama 3.2 is fine-tuned for conversational instruction. It
                    explicitly tags its response with the{" "}
                    <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                      &quot;role&quot;: &quot;assistant&quot;
                    </code>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    <strong className="text-white font-semibold">
                      The{" "}
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                        stopReason
                      </code>{" "}
                      flag:
                    </strong>{" "}
                    A value of{" "}
                    <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                      end_turn
                    </code>{" "}
                    means the model successfully finished its thought.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    <strong className="text-white font-semibold">
                      The{" "}
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                        usage
                      </code>{" "}
                      block:
                    </strong>{" "}
                    Llama 3.2 provides exact token counts, essential for
                    cost-monitoring and rate-limiting.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#end-to-end-flow"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. The End-to-End Flow
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#end-to-end-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Frontend & Backend
              </a>
              <a
                href="#end-to-end-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                AWS Infrastructure
              </a>
            </div>

            <a
              href="#response-design"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Llama 3.2 Response
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#response-design"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                JSON Example
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
