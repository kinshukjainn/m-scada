"use client";

import React from "react";

export default function LambdaFunctionDocs() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white">
      <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-16">
        {/* Main Content Area */}
        <article className="max-w-none">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-normal text-white mb-6 tracking-tight">
              AWS Lambda <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide">
              A deep dive into AWS Lambda: Amazon&apos;s foundational serverless
              compute service. Learn what it is, how it works under the hood,
              and the different ways it can execute your code.
            </p>
          </div>

          {/* Section 1: What is it */}
          <section className="mb-16">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              1. What is AWS Lambda?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              <strong className="text-white font-normal">AWS Lambda</strong> is
              a serverless, event-driven compute service that lets you run code
              for virtually any type of application or backend service without
              provisioning or managing servers. You simply upload your code
              (written in Node.js, Python, Go, Java, etc.) as a ZIP file or
              container image, and Lambda handles the rest.
            </p>

            <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-normal text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-sm bg-[#8cb4ff]"></span>
                Core Benefits
              </h3>
              <ul className="space-y-4 text-gray-200 font-normal text-[15px]">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-gray-200 font-normal">
                      No Servers to Manage:
                    </strong>{" "}
                    Infrastructure management, OS maintenance, and patching are
                    handled entirely by AWS.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-gray-200 font-normal">
                      Continuous Scaling:
                    </strong>{" "}
                    Lambda automatically scales your application by running code
                    in response to each individual trigger. It scales from zero
                    to thousands of concurrent requests instantly.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#444] mt-2 flex-shrink-0"></div>
                  <span>
                    <strong className="text-gray-200 font-normal">
                      Subsecond Metering:
                    </strong>{" "}
                    You are charged based on the number of requests and the
                    duration your code executes, billed in 1-millisecond
                    increments. If your code isn&apos;t running, you pay
                    nothing.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: How it Works */}
          <section className="mb-16">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              2. How it Works
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Behind the scenes, Lambda doesn&apos;t just run code in a vacuum.
              It uses a sophisticated architecture to securely isolate and
              execute your functions.
            </p>

            <div className="my-8 rounded-md overflow-hidden border border-[#333] bg-[#1b1b1b] p-2"></div>

            <div className="space-y-6 mt-8">
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors">
                <h4 className="font-normal text-white mb-3 text-lg">
                  A. The Execution Environment (Firecracker)
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  When a Lambda function is invoked, AWS provisions an isolated
                  execution environment. To do this quickly and securely, AWS
                  uses{" "}
                  <strong className="text-gray-200 font-normal">
                    Firecracker
                  </strong>
                  , an open-source virtualization technology that provisions
                  lightweight microVMs in fractions of a second.
                </p>
              </div>

              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors">
                <h4 className="font-normal text-white mb-3 text-lg">
                  B. The Lifecycle & Cold Starts
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  The first time a function is triggered, Lambda must download
                  your code, start the execution environment, and initialize
                  your runtime (e.g., loading dependencies). This is known as a{" "}
                  <strong className="text-gray-200 font-normal">
                    Cold Start
                  </strong>
                  . Once running, the environment stays &quot;warm&quot; for a
                  period of time to handle subsequent requests instantly (a{" "}
                  <strong className="text-gray-200 font-normal">
                    Warm Start
                  </strong>
                  ).
                </p>
              </div>

              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors">
                <h4 className="font-normal text-white mb-3 text-lg">
                  C. Event-Driven Execution
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Lambda functions are strictly event-driven. They do not run
                  continuously. They sit dormant until triggered by an AWS
                  service (like a file uploaded to S3), an HTTP request (via API
                  Gateway or Function URLs), or a scheduled event (via
                  EventBridge).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Invocation Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              3. Invocation Models
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              Depending on the service triggering your Lambda function, AWS
              supports three primary invocation models that dictate how the
              event is processed:
            </p>

            <div className="overflow-x-auto rounded-md border border-[#333] bg-[#121212] shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#1b1b1b] border-b border-[#333] text-gray-200 text-[11px] font-mono uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 font-normal">Invocation Type</th>
                    <th className="px-6 py-4 font-normal">How it works</th>
                    <th className="px-6 py-4 font-normal">Common Triggers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d2d2d] text-[14px] text-gray-300 font-normal">
                  <tr className="hover:bg-[#1b1b1b] transition-colors">
                    <td className="px-6 py-4 font-normal text-white whitespace-nowrap">
                      Synchronous
                    </td>
                    <td className="px-6 py-4 leading-relaxed">
                      The caller waits for the Lambda function to finish
                      processing and return a response immediately.
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-2 py-1 rounded-sm font-mono text-xs">
                        API Gateway, ALB, Function URLs
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#1b1b1b] transition-colors">
                    <td className="px-6 py-4 font-normal text-white whitespace-nowrap">
                      Asynchronous
                    </td>
                    <td className="px-6 py-4 leading-relaxed">
                      AWS places the event in a queue and returns a success
                      response instantly. Lambda processes it in the background
                      and auto-retries on failure.
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-2 py-1 rounded-sm font-mono text-xs">
                        Amazon S3, EventBridge, SNS
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#1b1b1b] transition-colors">
                    <td className="px-6 py-4 font-normal text-white whitespace-nowrap">
                      Event Source Mapping
                    </td>
                    <td className="px-6 py-4 leading-relaxed">
                      Lambda actively polls a stream or queue for records and
                      processes them in batches synchronously.
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-[#2d2d2d] text-[#8cb4ff] px-2 py-1 rounded-sm font-mono text-xs">
                        Amazon SQS, DynamoDB, Kinesis
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-normal text-gray-100 uppercase tracking-widest mb-5">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a href="#" className="hover:text-[#8cb4ff] transition-colors">
              1. What is AWS Lambda?
            </a>
            <a href="#" className="hover:text-[#8cb4ff] transition-colors">
              2. How it Works
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Execution Environment
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Lifecycle & Cold Starts
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Event-Driven Execution
              </a>
            </div>
            <a href="#" className="hover:text-[#8cb4ff] transition-colors">
              3. Invocation Models
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
