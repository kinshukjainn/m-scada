import React from "react";

export default function RequestFlowDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              End-to-End Request Flow & Llama 3.2 Response Design
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              Understanding the lifecycle of an AI prompt—from the moment a user
              clicks &quot;send&quot; in the browser to the exact JSON structure
              returned by Meta&apos;s Llama 3.2 models running on AWS
              infrastructure.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: The Request Lifecycle */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. The End-to-End Architecture Flow
            </h2>
            <p className="text-gray-800 mb-6">
              When a user interacts with the AI, the payload travels through
              several distinct layers of infrastructure before a response is
              rendered on screen. Here is the exact lifecycle of that request.
            </p>

            <div className="space-y-6 mt-8">
              {[
                {
                  step: 1,
                  color: "blue",
                  title: "Frontend (Next.js / React)",
                  desc: "The user types a prompt. The React client packages this data into a JSON payload and makes an HTTP POST request to your backend API route.",
                },
                {
                  step: 2,
                  color: "blue",
                  title: "Backend (Next.js API Route)",
                  desc: "The server receives the request, validates user authentication, applies rate limiting, and securely forwards the payload to the AWS environment.",
                },
                {
                  step: 3,
                  color: "orange",
                  title: "AWS Lambda",
                  desc: "Lambda spins up an isolated execution environment, parses the prompt, and uses the AWS SDK to formulate a strictly typed request to the Amazon Bedrock API.",
                },
                {
                  step: 4,
                  color: "purple",
                  title: "Amazon Bedrock & Meta Llama 3.2",
                  desc: "Bedrock securely routes the prompt to the requested model. The neural network processes the tokens and Bedrock packages the output into a JSON format.",
                },
                {
                  step: 5,
                  color: "green",
                  title: "The Return Journey",
                  desc: "The API returns the JSON to Lambda. Lambda executes any necessary post-processing and sends an HTTP 200 response back to the Backend, updating the UI.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-${item.color}-100 text-${item.color}-700 flex items-center justify-center font-bold text-sm`}
                  >
                    {item.step}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                      {item.title}
                    </h4>
                    <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Llama 3.2 Response Design */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. Meta Llama 3.2 Response Design
            </h2>
            <p className="text-gray-800 mb-4">
              When communicating with Llama 3.2 on AWS, the architecture relies
              on the Bedrock <strong>Converse API</strong>. This API
              standardizes interactions so that text and multimodal models all
              return a predictable, uniform JSON structure.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
              Detailed JSON Response Example
            </h3>
            <p className="text-gray-800 text-sm mb-4">
              Below is an exact example of how Llama 3.2 formats its response
              when asked to describe an image and answer a question.
            </p>

            <div className="bg-[#1c2128] rounded-lg overflow-hidden shadow-sm mb-6 w-full min-w-0">
              <div className="bg-[#2d333b] px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Response Payload (JSON)</span>
                <span className="truncate">
                  meta.llama3-2-90b-instruct-v1:0
                </span>
              </div>
              <div className="overflow-x-auto w-full">
                <pre className="p-4 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full">
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

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
              Breaking Down the Design
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-3 ml-1 sm:ml-2">
              <li className="pl-2">
                <strong>
                  The <code>output.message</code> object:
                </strong>{" "}
                Llama 3.2 is fine-tuned for conversational instruction. It
                explicitly tags its response with the{" "}
                <code>&quot;role&quot;: &quot;assistant&quot;</code>.
              </li>
              <li className="pl-2">
                <strong>
                  The <code>stopReason</code> flag:
                </strong>{" "}
                A value of <code>end_turn</code> means the model successfully
                finished its thought.
              </li>
              <li className="pl-2">
                <strong>
                  The <code>usage</code> block:
                </strong>{" "}
                Llama 3.2 provides exact token counts, essential for
                cost-monitoring and rate-limiting.
              </li>
            </ul>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. The End-to-End Flow
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                Frontend & Backend
              </a>
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                AWS Infrastructure
              </a>
            </div>
            <a
              href="#"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. Llama 3.2 Response Design
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
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
