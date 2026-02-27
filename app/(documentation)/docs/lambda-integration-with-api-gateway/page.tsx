"use client";

import React from "react";
import Image from "next/image";

export default function ServerlessAIArchitectureDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              The Ultimate Serverless AI Architecture{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              Discover how AWS Amplify, Amazon API Gateway, AWS Lambda, and
              Amazon Bedrock couple together to create an incredibly easy,
              highly scalable, and amazing system design for modern generative
              AI applications.
            </p>
          </div>

          {/* Architecture Image */}
          <section className="mb-16 min-w-0">
            <div className="mb-6 rounded-md overflow-hidden border border-[#333] bg-[#1b1b1b] p-2">
              <Image
                src="/flowdiagram.png"
                alt="AWS Serverless AI Architecture Diagram connecting Amplify, API Gateway, Lambda, and Bedrock"
                width={1000}
                height={500}
                className="w-full h-auto rounded-sm"
                priority
              />
            </div>
            <p className="text-sm text-gray-100 font-mono text-center mt-4 tracking-wide uppercase">
              Fig 1: Data flow from client to foundational GenAI models.
            </p>
          </section>

          {/* Section 1: How the Pieces Connect */}
          <section className="mb-16 min-w-0" id="internal-flow">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. The Internal Flow: How It All Connects
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-10 text-[16px]">
              This architecture is designed around the principle of{" "}
              <strong className="text-white font-semibold">
                loose coupling and high cohesion
              </strong>
              . Each service handles exactly what it is best at, passing the
              baton seamlessly to the next layer. Here is how the request
              travels:
            </p>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#444] before:to-transparent">
              {/* Step 1: Amplify */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  1
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-md border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    AWS Amplify (Frontend)
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    The user interacts with your React/Next.js UI hosted on
                    Amplify. Amplify securely manages user sessions (via
                    Cognito) and makes an HTTP request carrying the user&apos;s
                    prompt to the backend.
                  </p>
                </div>
              </div>

              {/* Step 2: API Gateway */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  2
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-md border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Amazon API Gateway
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    Acting as the &quot;front door,&quot; API Gateway receives
                    the request. It validates authentication tokens, throttles
                    traffic to prevent abuse, and securely routes the payload to
                    the specific Lambda function.
                  </p>
                </div>
              </div>

              {/* Step 3: Lambda */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  3
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-md border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    AWS Lambda (Compute)
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    The central orchestrator. Lambda spins up instantly, parses
                    the user&apos;s request, formats the payload specifically
                    for the chosen AI model, and uses the AWS SDK to invoke
                    Amazon Bedrock.
                  </p>
                </div>
              </div>

              {/* Step 4: Bedrock */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  4
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-md border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Amazon Bedrock (AI/LLM)
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    Bedrock processes the prompt using Foundation Models (like
                    Claude or Llama). It generates the intelligent response and
                    streams it back through Lambda to the client.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 2: Why this design is amazing */}
          <section className="mb-16 min-w-0" id="why-amazing">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. Why This System Design is Amazing
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Historically, building AI infrastructure required provisioning
              heavy GPU instances, managing complex networking, and configuring
              load balancers. This architectural pattern flips that on its head.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1b1b1b] rounded-md p-6 sm:p-8 border-t-4 border-t-[#8cb4ff] border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Zero Infrastructure Management
                </h3>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  It is 100% serverless. You never SSH into a server, manage OS
                  updates, or provision GPU clusters. AWS handles all underlying
                  hardware automatically.
                </p>
              </div>

              <div className="bg-[#1b1b1b] rounded-md p-6 sm:p-8 border-t-4 border-t-[#8cb4ff] border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Infinite & Instant Scalability
                </h3>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  Whether you have 1 user or 100,000, API Gateway and Lambda
                  scale concurrently per request. Bedrock handles the massive AI
                  inference seamlessly behind an API.
                </p>
              </div>

              <div className="bg-[#1b1b1b] rounded-md p-6 sm:p-8 border-t-4 border-t-[#8cb4ff] border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">
                  True Pay-As-You-Go
                </h3>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  You are billed purely on usage. You pay per API Gateway
                  request, per millisecond of Lambda execution time, and per
                  token generated by Bedrock. Idle time costs nothing.
                </p>
              </div>

              <div className="bg-[#1b1b1b] rounded-md p-6 sm:p-8 border-t-4 border-t-[#8cb4ff] border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Incredible Modularity
                </h3>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  Because Lambda acts as the middleware, you can hot-swap
                  Bedrock models (e.g., switching from Claude 3 Haiku to Sonnet)
                  with a single line of code change without touching your
                  frontend.
                </p>
              </div>
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
              href="#"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              Architecture Overview
            </a>

            <a
              href="#internal-flow"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              1. The Internal Flow
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#internal-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Amplify
              </a>
              <a
                href="#internal-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                API Gateway
              </a>
              <a
                href="#internal-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Lambda
              </a>
              <a
                href="#internal-flow"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Bedrock
              </a>
            </div>

            <a
              href="#why-amazing"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Why it&apos;s Amazing
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
