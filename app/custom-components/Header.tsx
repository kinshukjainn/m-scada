"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  Terminal,
  MessageSquare,
  Github,
  NotebookPen,
  Boxes,
} from "lucide-react";
import { useState } from "react";
import { IoBugSharp } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Fluid responsive padding and text sizing
  const linkBaseStyle =
    "relative flex items-center justify-center gap-1.5 xl:gap-2 px-2.5 md:px-3 lg:px-4 py-2 rounded-full transition-all duration-300 font-medium text-xs lg:text-sm overflow-hidden group drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]";

  const linkActiveStyle =
    "text-white bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-white/20";

  const linkInactiveStyle = "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-1 sm:top-2 z-[9999] mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1400px]">
        <div className="flex items-center justify-between rounded-full bg-neutral-900/40 px-3 py-2 sm:px-4 lg:px-6 backdrop-blur-2xl saturate-200 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-500">
          {/* Logo Section */}
          <div className="flex shrink-0 items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            <Link href="/" className="group flex shrink-0 items-center">
              <h1 className="flex items-center gap-0.5 font-mono text-lg font-bold tracking-tight transition-colors group-hover:text-white/80 sm:text-xl lg:text-2xl">
                FDS<span className="text-[#8cb4ff]">.ai</span>
                <span className="animate-pulse text-[#8cb4ff] font-bold">
                  _
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* Hides below md. Uses tight gaps on md, expands on lg/xl */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2">
            <Link
              href="/about-info"
              className={`${linkBaseStyle} ${isActive("/about-info") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Info className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden md:inline-block">About</span>
            </Link>
            <Link
              href="/docs"
              className={`${linkBaseStyle} ${isActive("/docs") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <NotebookPen className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden md:inline-block">Docs</span>
            </Link>
            <Link
              href="/git-track"
              className={`${linkBaseStyle} ${isActive("/git-track") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Boxes className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden md:inline-block">Logs</span>
            </Link>
            <Link
              href="/console"
              className={`${linkBaseStyle} ${isActive("/console") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Terminal className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden md:inline-block">Console</span>
            </Link>
            <Link
              href="/issues"
              className={`${linkBaseStyle} ${isActive("/issues") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <IoBugSharp className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden md:inline-block">Issues</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            {/* GitHub Link (Desktop) */}
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
              className="group hidden sm:flex items-center gap-1.5 lg:gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 px-3 lg:px-5 py-1.5 lg:py-2 transition-all hover:bg-white/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <Github className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 transition-colors drop-shadow-md" />
              <div className="relative h-4 lg:h-5 w-[65px] lg:w-[85px] overflow-hidden hidden md:block">
                <span
                  className={`block text-xs lg:text-sm font-medium transition-transform duration-300 ${isGithubHovered ? "-translate-y-5" : "translate-y-0"}`}
                >
                  Open
                </span>
                <span
                  className={`absolute left-0 top-4 lg:top-5 block text-xs lg:text-sm font-medium transition-transform duration-300 ${isGithubHovered ? "-translate-y-5 lg:-translate-y-5" : "translate-y-0"}`}
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
              className="flex h-8 w-8 sm:hidden items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/15"
            >
              <Github className="h-3.5 w-3.5 drop-shadow-md" />
            </a>

            {/* Feedback Button */}
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 lg:gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium transition-all hover:bg-white/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <MessageSquare className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 drop-shadow-md" />
              <span className="hidden xs:inline sm:hidden md:inline">
                Feedback
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="fixed bottom-4 sm:bottom-6 left-1/2 z-[9999] flex w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-[2rem] bg-neutral-900/50 px-1 sm:px-2 py-1.5 sm:py-2 backdrop-blur-3xl saturate-200 border border-white/20 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
        {[
          { path: "/about-info", icon: Info, label: "About" },
          { path: "/docs", icon: NotebookPen, label: "Docs" },
          { path: "/git-track", icon: Boxes, label: "Logs" },
          { path: "/console", icon: Terminal, label: "Console" },
          { path: "/issues", icon: IoBugSharp, label: "Issues" },
        ].map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              // flex-1 ensures the buttons evenly distribute and shrink perfectly on small screens
              className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-1 rounded-2xl py-1.5 sm:py-2 transition-all duration-300 ${
                active
                  ? "bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] mx-0.5 sm:mx-1"
                  : "opacity-70 hover:bg-white/10 hover:opacity-100"
              }`}
            >
              <Icon
                className={`h-4 w-4 sm:h-5 sm:w-5 drop-shadow-md shrink-0 ${active ? "scale-110" : "scale-100"} transition-transform duration-300`}
              />
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide truncate px-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
