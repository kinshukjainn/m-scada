"use client";

import React from "react";

export default function ApiGatewayDocs() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white">
      <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-16">
        {/* Main Content Area */}
        <article className="max-w-none">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-normal text-white mb-6 tracking-tight">
              Amazon API Gateway <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide">
              An in-depth look at AWS&apos;s fully managed API routing service.
              Learn why Amazon built it, the massive architectural pain points
              it solves, and how it acts as the ultimate &quot;front door&quot;
              for your applications.
            </p>
          </div>

          {/* Section 1: The Origin Story */}
          <section className="mb-16">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              1. Why Did Amazon Create It?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              Before API Gateway was introduced in 2015, building and exposing
              backend services to the public internet was a heavy, repetitive,
              and error-prone chore.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              If you had a fleet of servers (or the newly announced AWS Lambda)
              and wanted mobile apps or web clients to talk to them, you
              couldn&apos;t just open them up to the world. You had to build a
              custom &quot;API layer&quot; from scratch. This meant every
              engineering team was wasting time reinventing the wheel to solve
              the exact same infrastructure problems:
            </p>

            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm mb-6 text-gray-200 font-normal text-[15px]">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-normal">Security:</strong>{" "}
                  How do we authenticate users before they hit the database?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-normal">
                    Traffic Surges:
                  </strong>{" "}
                  If a mobile app goes viral, how do we stop the database from
                  crashing?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-normal">
                    DDoS Attacks:
                  </strong>{" "}
                  How do we drop malicious traffic before it consumes expensive
                  compute power?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-normal">Routing:</strong>{" "}
                  How do we route{" "}
                  <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                    /users
                  </code>{" "}
                  to Server A and{" "}
                  <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                    /orders
                  </code>{" "}
                  to Server B reliably?
                </span>
              </li>
            </ul>

            <p className="text-gray-200 font-normal leading-relaxed mt-6 text-[16px]">
              Amazon created API Gateway to be a fully managed, serverless proxy
              that absorbs all the complex, undifferentiated heavy lifting of
              managing APIs at a massive scale.
            </p>
          </section>

          {/* Section 2: Core Utilities */}
          <section className="mb-16">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              2. Why is API Gateway So Useful?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              API Gateway is not just a router; it is a highly intelligent
              middleware layer. Here is why it is practically indispensable in
              modern system design:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Feature 1 */}
              <div className="bg-[#1b1b1b] rounded-md p-6 border border-[#333] hover:border-[#444] transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-[#2d2d2d] flex items-center justify-center text-[#8cb4ff] font-mono border border-[#444]">
                    A
                  </div>
                  <h3 className="text-lg font-normal text-white m-0">
                    The Ultimate &quot;Front Door&quot;
                  </h3>
                </div>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Instead of writing auth logic in every microservice, offload
                  it. API Gateway natively validates Amazon Cognito tokens,
                  integrates with AWS WAF to block SQL injections, and uses
                  Lambda Authorizers to verify custom JWTs before requests ever
                  touch your backend.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#1b1b1b] rounded-md p-6 border border-[#333] hover:border-[#444] transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-[#2d2d2d] flex items-center justify-center text-[#8cb4ff] font-mono border border-[#444]">
                    B
                  </div>
                  <h3 className="text-lg font-normal text-white m-0">
                    Traffic Throttling
                  </h3>
                </div>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  It protects your backend from getting overwhelmed. Using
                  token-bucket algorithms, it enforces rate limits (e.g., 1,000
                  req/sec). Excess traffic instantly receives a{" "}
                  <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-xs border border-[#444]">
                    429 Too Many Requests
                  </code>{" "}
                  error, saving your database from crashing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#1b1b1b] rounded-md p-6 border border-[#333] hover:border-[#444] transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-[#2d2d2d] flex items-center justify-center text-[#8cb4ff] font-mono border border-[#444]">
                    C
                  </div>
                  <h3 className="text-lg font-normal text-white m-0">
                    Edge Caching
                  </h3>
                </div>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Instead of hitting your Lambda for every request, API Gateway
                  can cache responses. If 100 users request the same dashboard,
                  99 are served instantly from the high-speed cache, drastically
                  reducing compute costs and latency.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#1b1b1b] rounded-md p-6 border border-[#333] hover:border-[#444] transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-[#2d2d2d] flex items-center justify-center text-[#8cb4ff] font-mono border border-[#444]">
                    D
                  </div>
                  <h3 className="text-lg font-normal text-white m-0">
                    Data Transformation
                  </h3>
                </div>
                <p className="text-sm text-gray-200 font-normal leading-relaxed">
                  Using Apache Velocity Template Language (VTL), it modifies
                  data in flight. It can translate legacy XML from a client into
                  JSON for your modern backend, or inject/strip headers,
                  entirely without requiring backend code changes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: API Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-normal text-white mb-6 border-b border-[#333] pb-2">
              3. Supported API Types
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              To fit different architectural needs, API Gateway supports three
              distinct flavors of APIs. Choosing the right one optimizes both
              your costs and performance.
            </p>

            <div className="overflow-x-auto rounded-md border border-[#333] bg-[#1b1b1b] shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#2d2d2d] text-gray-300 font-mono text-[11px] uppercase tracking-widest">
                  <tr>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      API Type
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      Best Use Case
                    </th>
                    <th className="px-5 py-4 font-normal border-b border-[#444]">
                      Key Characteristic
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-[#8cb4ff] whitespace-nowrap">
                      HTTP API
                    </td>
                    <td className="px-5 py-4 leading-relaxed">
                      Standard serverless backends and simple proxying.
                    </td>
                    <td className="px-5 py-4 text-gray-200 leading-relaxed">
                      The newer, faster, and up to{" "}
                      <strong className="text-white font-normal">
                        71% cheaper
                      </strong>{" "}
                      option. Minimal configuration required.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-[#8cb4ff] whitespace-nowrap">
                      REST API
                    </td>
                    <td className="px-5 py-4 leading-relaxed">
                      Enterprise APIs requiring strict controls and
                      monetization.
                    </td>
                    <td className="px-5 py-4 text-gray-200 leading-relaxed">
                      The original, feature-rich offering. Supports VTL
                      transformations, Usage Plans, API Keys, and edge caching.
                    </td>
                  </tr>
                  <tr className="hover:bg-[#2d2d2d] transition-colors text-gray-300 font-normal">
                    <td className="px-5 py-4 font-mono font-normal text-[#8cb4ff] whitespace-nowrap">
                      WebSocket API
                    </td>
                    <td className="px-5 py-4 leading-relaxed">
                      Real-time chat apps, live dashboards, multiplayer games.
                    </td>
                    <td className="px-5 py-4 text-gray-200 leading-relaxed">
                      Maintains persistent, two-way stateful connections between
                      the client and the backend.
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
              1. Why Did Amazon Create It?
            </a>
            <a href="#" className="hover:text-[#8cb4ff] transition-colors">
              2. Why is API Gateway Useful?
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Security & Auth
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Traffic Throttling
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Edge Caching
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors"
              >
                Data Transformation
              </a>
            </div>
            <a href="#" className="hover:text-[#8cb4ff] transition-colors">
              3. Supported API Types
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
