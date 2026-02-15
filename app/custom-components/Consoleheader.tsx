"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Consoleheader() {
  const pathname = usePathname();
  const router = useRouter();

  // Check current route
  const isConsoleHome = pathname === "/console";
  const isManual = pathname === "/console/manual";
  const isDirect = pathname === "/console/direct";

  return (
    <header className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo/Title */}
        <div className="flex items-center gap-3">
          {/* Console Home */}
          {isConsoleHome && (
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Principal Console
            </h1>
          )}

          {/* Manual Route with Breadcrumb */}
          {isManual && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/console")}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base font-medium"
              >
                Console
              </button>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Manual
              </h1>
            </div>
          )}

          {/* Direct Route with Breadcrumb */}
          {isDirect && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/console")}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base font-medium"
              >
                Console
              </button>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Direct
              </h1>
            </div>
          )}
        </div>

        {/* Right side - Optional actions */}
        <div className="flex items-center gap-3">
          {/* You can add additional header actions here */}
        </div>
      </div>
    </header>
  );
}
