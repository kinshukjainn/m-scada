"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  Terminal,
  MessageSquare,
  Github,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";
import { IoBugSharp } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  const isActive = (path: string) => pathname === path;

  // MDN Nav Link Styles
  const linkBaseStyle =
    "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-md transition-all font-normal text-sm lg:text-base border";
  const linkActiveStyle = "text-[#8cb4ff] bg-[#121212] border-[#333] shadow-sm";
  const linkInactiveStyle =
    "text-gray-300 border-transparent hover:text-white hover:bg-[#333]";

  return (
    <>
      <header className="border-b border-[#333] bg-[#1b1b1b] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Logo - MDN Style */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-normal text-white tracking-tight hover:text-gray-200 transition-colors flex items-center gap-0.5">
              FDS<span className="text-[#8cb4ff]">.ai</span>
              <span className="animate-pulse text-[#8cb4ff] font-bold">_</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/about-info"
              className={`${linkBaseStyle} ${isActive("/about-info") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link
              href="/docs"
              className={`${linkBaseStyle} ${isActive("/docs") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <NotebookPen className="w-4 h-4" />
              <span>Documentation</span>
            </Link>

            <Link
              href="/console"
              className={`${linkBaseStyle} ${isActive("/console") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Terminal className="w-4 h-4" />
              <span>Console</span>
            </Link>

            <Link
              href="/issues"
              className={`${linkBaseStyle} ${isActive("/issues") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <IoBugSharp className="w-4 h-4" />
              <span>Issues</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Link with Sliding Text (Desktop) */}
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-md border border-[#444] bg-black transition-all overflow-hidden group"
            >
              <Github className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-white transition-colors" />
              <div className="relative h-5 overflow-hidden w-[85px]">
                <span
                  className={`block text-sm font-normal text-gray-300 transition-transform duration-300 group-hover:text-white ${
                    isGithubHovered ? "-translate-y-5" : "translate-y-0"
                  }`}
                >
                  Open
                </span>
                <span
                  className={`block text-sm font-normal text-white absolute top-5 left-0 transition-transform duration-300 ${
                    isGithubHovered ? "-translate-y-5" : "translate-y-0"
                  }`}
                >
                  View repo
                </span>
              </div>
            </a>

            {/* GitHub Icon Only (Mobile) */}
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden p-2 rounded-md border border-[#444] bg-[#121212] hover:bg-[#333] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-gray-300" />
            </a>

            {/* Feedback Button - MDN Highlight Style */}
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md border border-[#444] hover:border-white text-gray-200 hover:text-white hover:bg-[#333] transition-all text-sm font-normal"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Feedback</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1b1b1b] border-t border-[#333] shadow-[0_-4px_10px_rgba(0,0,0,0.5)] px-2 py-2 flex items-center justify-around z-50 pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/about-info"
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-md transition-all w-full ${
            isActive("/about-info")
              ? "text-[#8cb4ff] bg-[#121212] border border-[#333]"
              : "text-gray-200 hover:text-gray-200 border border-transparent"
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px] font-normal tracking-wide">About</span>
        </Link>
        <Link
          href="/docs"
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-md transition-all w-full ${
            isActive("/docs")
              ? "text-[#8cb4ff] bg-[#121212] border border-[#333]"
              : "text-gray-200 hover:text-gray-200 border border-transparent"
          }`}
        >
          <NotebookPen className="w-5 h-5" />
          <span className="text-[10px] font-normal tracking-wide">
            Documentation
          </span>
        </Link>

        <Link
          href="/console"
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-md transition-all w-full ${
            isActive("/console")
              ? "text-[#8cb4ff] bg-[#121212] border border-[#333]"
              : "text-gray-200 hover:text-gray-200 border border-transparent"
          }`}
        >
          <Terminal className="w-5 h-5" />
          <span className="text-[10px] font-normal tracking-wide">Console</span>
        </Link>

        <Link
          href="/issues"
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-md transition-all w-full ${
            isActive("/issues")
              ? "text-[#8cb4ff] bg-[#121212] border border-[#333]"
              : "text-gray-200 hover:text-gray-200 border border-transparent"
          }`}
        >
          <IoBugSharp className="w-5 h-5" />
          <span className="text-[10px] font-normal tracking-wide">Issues</span>
        </Link>
      </nav>
    </>
  );
}
