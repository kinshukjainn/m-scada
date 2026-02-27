"use client";

import React from "react";

export default function AWSServicesDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-medium text-white mb-6 tracking-tight">
              AWS Cloud Infrastructure <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-light leading-relaxed max-w-3xl tracking-wide m-0">
              This application leverages a modern, serverless architecture to
              ensure high availability, reduced operational overhead, and
              scalable performance. Below is a detailed breakdown of the two
              primary Amazon Web Services (AWS) powering the backend logic and
              artificial intelligence integrations.
            </p>
          </div>

          {/* AWS Lambda Section */}
          <section className="mb-16 min-w-0" id="aws-lambda">
            <h2 className="text-2xl font-medium text-white mb-6 border-b border-[#333] pb-2">
              1. AWS Lambda (Serverless Compute)
            </h2>
            <p className="text-gray-200 font-light leading-relaxed mb-8 text-[16px]">
              AWS Lambda is an event-driven, serverless computing service that
              allows us to run application code without the need to provision or
              manage any underlying servers.
            </p>

            <h3 className="text-lg font-medium text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              How It Works
            </h3>
            <p className="text-gray-200 font-light leading-relaxed mb-8 text-[16px]">
              Instead of keeping an active server running 24/7 (which consumes
              resources and incurs costs even when idle), Lambda executes code
              strictly in response to specific{" "}
              <strong className="text-white font-medium">triggers</strong> or{" "}
              <strong className="text-white font-medium">events</strong>. These
              events can be an incoming HTTP request via API Gateway, a file
              uploaded to an S3 bucket, or a change in a database table. When
              triggered, AWS instantly spins up an isolated execution
              environment, runs our function, and then spins it back down.
            </p>

            <h3 className="text-lg font-medium text-white mb-4 mt-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Why We Use It
            </h3>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-200 font-light text-[15px] m-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Zero Infrastructure Management:
                  </strong>{" "}
                  There is no OS to patch, no auto-scaling groups to configure,
                  and no servers to maintain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Automatic Scaling:
                  </strong>{" "}
                  If the application receives one request, Lambda spins up one
                  instance. If it receives 10,000 simultaneous requests, Lambda
                  scales out seamlessly to handle the exact load.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Pay-as-you-go Pricing:
                  </strong>{" "}
                  We are billed down to the millisecond strictly for the compute
                  time consumed while the code is actively executing.
                </span>
              </li>
            </ul>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Amazon Bedrock Section */}
          <section className="mb-16 min-w-0" id="amazon-bedrock">
            <h2 className="text-2xl font-medium text-white mb-6 border-b border-[#333] pb-2">
              2. Amazon Bedrock (Generative AI)
            </h2>
            <p className="text-gray-200 font-light leading-relaxed mb-8 text-[16px]">
              Amazon Bedrock is a fully managed, serverless platform that
              simplifies the process of building and scaling generative AI
              applications. It acts as a unified hub to access high-performing
              Foundation Models (FMs) from top AI startups and Amazon itself.
            </p>

            <h3 className="text-lg font-medium text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              How It Works
            </h3>
            <p className="text-gray-200 font-light leading-relaxed mb-8 text-[16px]">
              Traditionally, integrating Large Language Models (LLMs) requires
              provisioning expensive, GPU-heavy infrastructure to host the
              models. Bedrock abstracts this away entirely. Through a single,
              unified API, developers can send prompts and retrieve responses
              from a diverse catalog of models (such as Anthropic&apos;s Claude,
              Meta&apos;s Llama, or Amazon&apos;s Titan) without managing the
              underlying machine learning hardware.
            </p>

            <h3 className="text-lg font-medium text-white mb-4 mt-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
              Why We Use It
            </h3>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-200 font-light text-[15px] m-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Model Agnostic:
                  </strong>{" "}
                  Because it provides a unified API, we can easily swap out
                  underlying AI models as new, better versions are released
                  without having to rewrite our application&apos;s integration
                  code.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Data Privacy & Security:
                  </strong>{" "}
                  Prompts, responses, and fine-tuning data are securely isolated
                  within our AWS Virtual Private Cloud (VPC) and are not used to
                  train base models, ensuring compliance and enterprise-grade
                  security.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-medium">
                    Native Orchestration:
                  </strong>{" "}
                  We use Bedrock alongside AWS Lambda to orchestrate complex
                  &quot;Agentic&quot; workflows—where the AI can intelligently
                  trigger Lambda functions to fetch live data or execute tasks
                  on behalf of the user.
                </span>
              </li>
            </ul>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents Simulation) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-medium text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-light">
            <a
              href="#aws-lambda"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. AWS Lambda
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#aws-lambda"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                How It Works
              </a>
              <a
                href="#aws-lambda"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Why We Use It
              </a>
            </div>

            <a
              href="#amazon-bedrock"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Amazon Bedrock
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#amazon-bedrock"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                How It Works
              </a>
              <a
                href="#amazon-bedrock"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Why We Use It
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
