import React from "react";

export default function APIIntroductionDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Top Navigation Bar Simulation */}

      {/* Main Grid Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Introduction to APIs
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              If you are new to software development, the term{" "}
              <strong>API (Application Programming Interface)</strong> is
              everywhere. This guide demystifies what APIs are, the core
              historical reason they had to be invented, and exactly how they
              work in plain English.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: The Definition */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. What is an API?
            </h2>
            <p className="text-gray-800 mb-4">
              An API is a software intermediary that allows two different
              applications to talk to each other.
            </p>
            <p className="text-gray-800 mb-6">
              When you use an app on your phone to check the weather, that app
              doesn&apos;t have its own weather satellites or thermometers.
              Instead, it sends a message over the internet to a central weather
              service, asks for the current data for your city, and displays the
              result. The invisible messenger carrying that request and bringing
              back the data is the API.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                The Restaurant Analogy
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Imagine you are sitting at a table in a restaurant with a menu.
                The kitchen (the system containing the food/data) is in the
                back. You cannot simply walk into the kitchen and cook your own
                meal. You need a messenger to take your order to the kitchen and
                bring your food back to your table.{" "}
                <strong>The waiter is the API.</strong>
              </p>
            </div>
          </section>

          {/* Section 2: The Core Reason (Why was it introduced?) */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. The Origin: Why Were APIs Created?
            </h2>
            <p className="text-gray-800 mb-4">
              To truly understand APIs, you have to understand the nightmare
              that existed before them. In the early days of computing, software
              programs were built as massive, closed-off blocks (called
              &quot;monoliths&quot;).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              The Problem: Shared Databases are Dangerous
            </h3>
            <p className="text-gray-800 mb-4">
              Imagine two companies: an Airline and a Travel Agency. The Travel
              Agency needs to know if a flight has open seats. Originally, the
              only way to do this was for the Airline to give the Travel Agency
              direct, raw access to their internal database.
            </p>
            <p className="text-gray-800 mb-6">
              This was disastrous for three reasons:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-1 sm:ml-2 mb-6">
              <li className="pl-2">
                <strong>Security:</strong> The Travel Agency could accidentally
                (or maliciously) delete other flight records.
              </li>
              <li className="pl-2">
                <strong>Fragility:</strong> If the Airline updated their
                database structure, the Travel Agency&apos;s software would
                instantly crash.
              </li>
              <li className="pl-2">
                <strong>Language Barriers:</strong> If the Airline wrote their
                software in Java, and the Travel Agency used Python, they
                couldn&apos;t easily communicate.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              The Solution: The &quot;Contract&quot;
            </h3>
            <p className="text-gray-800 mb-4">
              APIs were introduced to act as a strict, secure{" "}
              <strong>contract</strong> between systems.
            </p>
            <p className="text-gray-800">
              Instead of giving direct database access, the Airline creates an
              API. The API contract states:{" "}
              <em>
                &quot;If you send me a Flight Number in a specific format, I
                will reply with the number of available seats. You cannot touch
                my database directly, and you don&apos;t need to know how my
                database works.&quot;
              </em>
              Because of this abstraction, the Airline can completely rebuild
              their entire backend, and as long as they don&apos;t change the
              API contract, the Travel Agency will never notice.
            </p>
          </section>

          {/* Section 3: How it Works (Under the Hood) */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. How It Actually Works
            </h2>
            <p className="text-gray-800 mb-6">
              Modern web APIs communicate using the internet&apos;s standard
              language (HTTP) and format their data in a lightweight text
              structure called{" "}
              <strong>JSON (JavaScript Object Notation)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Request */}
              <div className="bg-[#1c2128] rounded-lg overflow-hidden shadow-sm w-full min-w-0">
                <div className="bg-[#2d333b] px-4 py-2 text-xs text-green-400 font-mono border-b border-gray-700">
                  Step 1: The Request (Client to API)
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="p-4 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full">
                    <code>{`GET /api/weather?city=London
Host: api.weather.com
Authorization: Bearer <Your_Key>`}</code>
                  </pre>
                </div>
                <div className="p-4 text-xs text-gray-400 border-t border-gray-700 bg-[#22272e]">
                  The client asks the server for information (GET) about the
                  weather in London, providing a secret key to prove they are
                  allowed to ask.
                </div>
              </div>

              {/* The Response */}
              <div className="bg-[#1c2128] rounded-lg overflow-hidden shadow-sm w-full min-w-0">
                <div className="bg-[#2d333b] px-4 py-2 text-xs text-blue-400 font-mono border-b border-gray-700">
                  Step 2: The Response (API to Client)
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="p-4 text-xs sm:text-sm text-gray-300 font-mono inline-block min-w-full">
                    <code>{`{
  "city": "London",
  "temperature": 18,
  "condition": "Rainy",
  "success": true
}`}</code>
                  </pre>
                </div>
                <div className="p-4 text-xs text-gray-400 border-t border-gray-700 bg-[#22272e]">
                  The API retrieves the data from the hidden backend database,
                  packages it neatly into JSON, and hands it back to the client.
                </div>
              </div>
            </div>

            <p className="text-gray-800 mt-6">
              Because JSON is just plain text structured with brackets and
              quotes, literally any programming language in the world can read
              it. This permanently solved the &quot;language barrier&quot;
              problem of early computing.
            </p>
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
              1. What is an API?
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                The Waiter Analogy
              </a>
            </div>
            <a
              href="#"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              2. The Origin Story
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                The Database Problem
              </a>
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
              >
                The &quot;Contract&quot; Solution
              </a>
            </div>
            <a
              href="#"
              className="hover:text-[#f38020] transition-colors mt-2 truncate"
            >
              3. How It Works
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-[#f38020] transition-colors truncate"
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
