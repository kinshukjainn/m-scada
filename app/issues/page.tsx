import React from "react";

export default function IssuesPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6 ">
      {/* Main Content Card */}
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg shadow-sm p-10 md:p-16 text-center">
        {/* Icon Container (Cloudflare Orange Accent) */}
        <div className="mx-auto w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mb-6">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
          Issues & Feedback Hub
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-800 mb-8 max-w-lg mx-auto leading-relaxed">
          We are currently building a dedicated space to list user feedback,
          feature requests, and known bugs. This portal will be available soon.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-2 bg-white border border-gray-300 text-gray-800 font-medium cursor-pointer rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
            Go Back
          </button>

          {/* Updated Feedback Link */}
          <a
            href="https://feedbacks.cloudkinshuk.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-[#f38020] text-white font-medium rounded hover:bg-[#d9731c] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f38020] text-center"
          >
            Give Feedback
          </a>
        </div>
      </div>

      {/* Cloudflare-style System Status Indicator */}
      <div className="mt-12 text-sm text-gray-500 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
        All other systems operational
      </div>
    </div>
  );
}
