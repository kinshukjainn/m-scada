import React from "react";

export default function ConsoleComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-6 ">
      {/* Main Content Card */}
      <div className="max-w-2xl w-full bg-[#252525] border border-[#444444] rounded-sm  p-10 md:p-16 text-center">
        {/* Icon Container (Terminal/Console Accent) */}
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-sm flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-100 mb-4 tracking-tight">
          Automated Console
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
          We are currently engineering a powerful, fully automated dashboard.
          Soon, you will be able to manage your workflow with a suite of
          advanced new features.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Intelligent Auto-Scaling
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Real-Time Analytics
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            One-Click Deployments
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Advanced Access Controls
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-2 py-1 bg-black  text-gray-100 font-normal cursor-pointer rounded  transition-colors focus:outline-none">
            Go Back
          </button>

          {/* Docs Link */}
          <a
            href="/docs"
            className="px-2 py-1 bg-[#f38020] text-black font-bold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f38020] text-center"
          >
            Read Documentation
          </a>
        </div>
      </div>

      {/* System Status Indicator */}
      <div className="mt-12 text-sm text-gray-100 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-sm bg-green-500 animate-pulse"></span>
        Core APIs operational
      </div>
    </div>
  );
}
