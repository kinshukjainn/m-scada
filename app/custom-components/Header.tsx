"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Terminal, MessageSquare, Github } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { useState } from "react";
import { IoBugSharp } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-mono hover:text-gray-800 transition-colors">
            FDS<span className="text-blue-700">.ai</span>
            <span className="animate-pulse text-black font-bold">{"_"}</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/about-info"
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded transition-all ${
              isActive("/about-info")
                ? "text-black font-semibold code-body/90"
                : "text-black hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            <Info className="w-4 h-4" />
            <span className="text-sm lg:text-base">About</span>
          </Link>

          <Link
            href="/console"
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded transition-all ${
              isActive("/console")
                ? "text-black  font-semibold code-body/90"
                : "text-black hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span className="text-sm lg:text-base">Console</span>
          </Link>

          <Link
            href="/docs"
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded transition-all ${
              isActive("/docs")
                ? "text-black  font-semibold code-body/90"
                : "text-black hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            <SiGoogledocs className="w-4 h-4" />
            <span className="text-sm lg:text-base">Docs</span>
          </Link>

          <Link
            href="/issues"
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded transition-all ${
              isActive("/issues")
                ? "text-black  font-semibold code-body/90"
                : "text-black hover:text-gray-900 hover:bg-gray-300"
            }`}
          >
            <IoBugSharp className="w-4 h-4" />
            <span className="text-sm lg:text-base">Issues</span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* GitHub Link with Sliding Text */}
          <a
            href="https://github.com/kinshukjainn/fds-college"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
            className="hidden sm:flex items-center gap-2 px-6 py-2 rounded border border-gray-300 bg-white hover:bg-blue-100 transition-all overflow-hidden group"
          >
            <Github className="w-4 h-4 text-gray-800 flex-shrink-0" />
            <div className="relative h-5 overflow-hidden">
              <span
                className={`block text-sm font-medium text-gray-800 transition-transform duration-300 ${
                  isGithubHovered ? "-translate-y-5" : "translate-y-0"
                }`}
              >
                Open source
              </span>
              <span
                className={`block text-sm font-medium text-gray-800 absolute top-5 left-0 transition-transform duration-300 ${
                  isGithubHovered ? "-translate-y-5" : "translate-y-0"
                }`}
              >
                checkout repo
              </span>
            </div>
          </a>

          {/* GitHub Icon Only (Mobile) */}
          <a
            href="https://github.com/kinshukjainn/fds-college"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 text-gray-800" />
          </a>

          {/* Feedback Button */}
          <a
            href="https://fdb.cloudkinshuk.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition-all text-sm font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Feedback</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 ml-2 mr-2 mb-2 rounded-2xl  bg-gray-100 shadow-lg shadow-gray-400  px-2 py-2 flex items-center justify-around z-50">
        <Link
          href="/about-info"
          className={`flex flex-col items-center gap-1 px-4 py-1/2 rounded transition-all ${
            isActive("/about-info")
              ? "text-gray-900 font-bold code-body "
              : "text-gray-800"
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-xs">About</span>
        </Link>

        <Link
          href="/console"
          className={`flex flex-col items-center gap-1 px-4 py-1/2 rounded transition-all ${
            isActive("/console")
              ? "text-gray-900 code-body font-bold"
              : "text-gray-800"
          }`}
        >
          <Terminal className="w-5 h-5" />
          <span className="text-xs">Console</span>
        </Link>

        <Link
          href="/docs"
          className={`flex flex-col items-center gap-1 px-4 py-1/2 rounded transition-all ${
            isActive("/docs")
              ? "text-gray-900 code-body font-bold"
              : "text-gray-800"
          }`}
        >
          <SiGoogledocs className="w-5 h-5" />
          <span className="text-xs">Docs</span>
        </Link>

        <Link
          href="/issues"
          className={`flex flex-col items-center gap-1 px-4 py-1/2 rounded transition-all ${
            isActive("/issues")
              ? "text-gray-900 code-body font-bold"
              : "text-gray-800"
          }`}
        >
          <IoBugSharp className="w-5 h-5" />
          <span className="text-xs">Issues</span>
        </Link>
      </nav>
    </header>
  );
}
