"use client";

import React from "react";

export default function APIIntroductionDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0] selection:bg-[#f38020]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Introduction to APIs <span className="text-[#f38020]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              If you are new to software development, the term{" "}
              <strong className="text-white font-semibold">
                API (Application Programming Interface)
              </strong>{" "}
              is everywhere. This guide demystifies what APIs are, the core
              historical reason they had to be invented, and exactly how they
              work in plain English.
            </p>
          </div>

          {/* Section 1: The Definition */}
          <section className="mb-16 min-w-0" id="definition">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. What is an API?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              An API is a software intermediary that allows two different
              applications to talk to each other.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              When you use an app on your phone to check the weather, that app
              doesn&apos;t have its own weather satellites or thermometers.
              Instead, it sends a message over the internet to a central weather
              service, asks for the current data for your city, and displays the
              result. The invisible messenger carrying that request and bringing
              back the data is the API.
            </p>

            <div className="rounded-2xl p-6 sm:p-8 bg-[#1b1b1b] border-l-4 border-l-[#f38020] border border-[#333]">
              <h4 className="font-semibold text-white mb-3 text-lg">
                The Restaurant Analogy
              </h4>
              <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                Imagine you are sitting at a table in a restaurant with a menu.
                The kitchen (the system containing the food/data) is in the
                back. You cannot simply walk into the kitchen and cook your own
                meal. You need a messenger to take your order to the kitchen and
                bring your food back to your table.{" "}
                <strong className="text-white font-semibold">
                  The waiter is the API.
                </strong>
              </p>
            </div>
          </section>

          {/* Section 2: The Core Reason (Why was it introduced?) */}
          <section className="mb-16 min-w-0" id="origin">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. The Origin: Why Were APIs Created?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              To truly understand APIs, you have to understand the nightmare
              that existed before them. In the early days of computing, software
              programs were built as massive, closed-off blocks (called
              &quot;monoliths&quot;).
            </p>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-2xl bg-[#f38020]"></span>
              The Problem: Shared Databases are Dangerous
            </h3>
            <p className="text-gray-200 font-normal leading-relaxed mb-6 text-[16px]">
              Imagine two companies: an Airline and a Travel Agency. The Travel
              Agency needs to know if a flight has open seats. Originally, the
              only way to do this was for the Airline to give the Travel Agency
              direct, raw access to their internal database.
            </p>

            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              This was disastrous for three reasons:
            </p>

            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-2xl p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-2xl bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Security:
                  </strong>{" "}
                  The Travel Agency could accidentally (or maliciously) delete
                  other flight records.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-2xl bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Fragility:
                  </strong>{" "}
                  If the Airline updated their database structure, the Travel
                  Agency&apos;s software would instantly crash.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-2xl bg-[#f38020] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Language Barriers:
                  </strong>{" "}
                  If the Airline wrote their software in Java, and the Travel
                  Agency used Python, they couldn&apos;t easily communicate.
                </span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-4 mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-2xl bg-[#f38020]"></span>
              The Solution: The &quot;Contract&quot;
            </h3>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              APIs were introduced to act as a strict, secure{" "}
              <strong className="text-white font-semibold">contract</strong>{" "}
              between systems.
            </p>
            <p className="text-gray-200 font-normal leading-relaxed mb-4 text-[16px]">
              Instead of giving direct database access, the Airline creates an
              API. The API contract states:{" "}
              <em className="text-gray-400">
                &quot;If you send me a Flight Number in a specific format, I
                will reply with the number of available seats. You cannot touch
                my database directly, and you don&apos;t need to know how my
                database works.&quot;
              </em>
            </p>
            <p className="text-gray-200 font-normal leading-relaxed text-[16px]">
              Because of this abstraction, the Airline can completely rebuild
              their entire backend, and as long as they don&apos;t change the
              API contract, the Travel Agency will never notice.
            </p>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 3: How it Works (Under the Hood) */}
          <section className="mb-16 min-w-0" id="how-it-works">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. How It Actually Works
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Modern web APIs communicate using the internet&apos;s standard
              language (HTTP) and format their data in a lightweight text
              structure called{" "}
              <strong className="text-white font-semibold">
                JSON (JavaScript Object Notation)
              </strong>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* The Request */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-2xl overflow-hidden shadow-sm w-full min-w-0 flex flex-col">
                <div className="bg-[#2d2d2d] px-4 py-3 text-[11px] text-[#f38020] uppercase tracking-widest font-mono border-b border-[#444] font-semibold">
                  Step 1: The Request (Client to API)
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="p-5 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full m-0">
                    <code>{`GET /api/weather?city=London
Host: api.weather.com
Authorization: Bearer <Your_Key>`}</code>
                  </pre>
                </div>
                <div className="p-5 text-sm text-gray-400 border-t border-[#333] bg-[#161616] mt-auto">
                  The client asks the server for information (GET) about the
                  weather in London, providing a secret key to prove they are
                  allowed to ask.
                </div>
              </div>

              {/* The Response */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-2xl overflow-hidden shadow-sm w-full min-w-0 flex flex-col">
                <div className="bg-[#2d2d2d] px-4 py-3 text-[11px] text-[#8cb4ff] uppercase tracking-widest font-mono border-b border-[#444] font-semibold">
                  Step 2: The Response (API to Client)
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="p-5 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full m-0">
                    <code>{`{
  "city": "London",
  "temperature": 18,
  "condition": "Rainy",
  "success": true
}`}</code>
                  </pre>
                </div>
                <div className="p-5 text-sm text-gray-400 border-t border-[#333] bg-[#161616] mt-auto">
                  The API retrieves the data from the hidden backend database,
                  packages it neatly into JSON, and hands it back to the client.
                </div>
              </div>
            </div>

            <p className="text-gray-200 font-normal leading-relaxed text-[16px]">
              Because JSON is just plain text structured with brackets and
              quotes, literally any programming language in the world can read
              it. This permanently solved the &quot;language barrier&quot;
              problem of early computing.
            </p>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#definition"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. What is an API?
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#definition"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                The Waiter Analogy
              </a>
            </div>

            <a
              href="#origin"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. The Origin Story
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#origin"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                The Database Problem
              </a>
              <a
                href="#origin"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                The &quot;Contract&quot; Solution
              </a>
            </div>

            <a
              href="#how-it-works"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              3. How It Works
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#how-it-works"
                className="text-gray-100 hover:text-[#f38020] transition-colors truncate"
              >
                Requests & JSON Responses
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
