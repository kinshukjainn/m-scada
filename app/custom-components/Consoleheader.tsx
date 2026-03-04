"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Consoleheader() {
  const pathname = usePathname();

  // Check current route
  const isConsoleHome = pathname === "/console";
  const isManual = pathname === "/console/manual";
  const isDirect = pathname === "/console/direct";

  return (
    <header className="w-full border-b border-gray-800 bg-[#252525] px-4 py-3  text-sm text-white sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left side - Text-based Breadcrumbs */}
        <div className="flex items-center gap-2">
          {isConsoleHome && (
            <h1 className="font-bold tracking-tight text-white">
              Principal Console
            </h1>
          )}

          {(isManual || isDirect) && (
            <div className="flex items-center gap-2">
              <Link
                href="/console"
                className="text-[#4a90e2] hover:text-white hover:underline"
              >
                Console
              </Link>

              <span className="text-gray-500">/</span>

              <h1 className="font-bold text-white">
                {isManual && "Manual Console"}
                {isDirect && "Direct Console"}
              </h1>
            </div>
          )}
        </div>

        {/* Right side - Optional actions */}
        <div className="flex items-center gap-3 text-gray-500">
          {/* Action slots */}
        </div>
      </div>
    </header>
  );
}
