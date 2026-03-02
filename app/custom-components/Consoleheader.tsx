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
    <header className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6  border-b-2 border-gray-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo/Title */}
        <div className="flex items-center gap-3">
          {/* Console Home */}
          {isConsoleHome && (
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Principal Console
            </h1>
          )}

          {/* Manual Route with Breadcrumb */}
          {isManual && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/console")}
                className="text-gray-800 hover:text-gray-900  px-2 py-1 rounded cursor-pointer transition-colors text-sm hover:font-bold  hover:underline sm:text-base font-normal"
              >
                Console
              </button>
              <div className="p-1 bg-blue-700 rounded-full">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <div className="bg-blue-300 px-5 py-1 rounded-full">
                <h1 className="text-lg sm:text-lg font-semibold text-gray-900">
                  Manual console
                </h1>
              </div>
            </div>
          )}

          {/* Direct Route with Breadcrumb */}
          {isDirect && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/console")}
                className="text-gray-800 hover:text-gray-900  px-2 py-1 rounded cursor-pointer transition-colors text-sm hover:font-bold  hover:underline sm:text-base font-normal"
              >
                Console
              </button>
              <div className="p-1 bg-blue-700 rounded-full">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <div className="bg-blue-300 px-5 py-1 rounded-full">
                <h1 className="text-lg sm:text-lg font-semibold text-gray-900">
                  Direct Console
                </h1>
              </div>
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
