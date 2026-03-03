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

  // Added drop-shadow to text so it pops against white backgrounds behind the glass
  const linkBaseStyle =
    "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm overflow-hidden group drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]";

  const linkActiveStyle =
    "text-white bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] ring-1 ring-white/20";

  const linkInactiveStyle = "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <>
      {/* Desktop Header
        - bg-neutral-900/30: Slightly darker tint ensures white text is readable even over a white page.
        - backdrop-blur-2xl maintains the beautiful glass effect.
      */}
      <header className="sticky top-1 z-[9999] mx-auto w-[calc(100%-2rem)] max-w-[1400px]">
        <div className="flex items-center justify-between rounded-full bg-neutral-900/30 px-4 py-2 sm:px-6 backdrop-blur-2xl saturate-200 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-500">
          {/* Logo Section */}
          <div className="flex items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            <Link href="/" className="flex-shrink-0 group">
              <h1 className="flex items-center gap-0.5 font-mono text-xl font-bold tracking-tight transition-colors group-hover:text-white/80 sm:text-2xl">
                FDS<span className="text-[#8cb4ff]">.ai</span>
                <span className="animate-pulse text-[#8cb4ff] font-bold">
                  _
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex lg:gap-2">
            <Link
              href="/about-info"
              className={`${linkBaseStyle} ${isActive("/about-info") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Info className="h-4 w-4 drop-shadow-md" />
              <span>About</span>
            </Link>
            <Link
              href="/docs"
              className={`${linkBaseStyle} ${isActive("/docs") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <NotebookPen className="h-4 w-4 drop-shadow-md" />
              <span>Documentation</span>
            </Link>
            <Link
              href="/git-track"
              className={`${linkBaseStyle} ${isActive("/git-track") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Boxes className="h-4 w-4 drop-shadow-md" />
              <span>Logs</span>
            </Link>
            <Link
              href="/console"
              className={`${linkBaseStyle} ${isActive("/console") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <Terminal className="h-4 w-4 drop-shadow-md" />
              <span>Console</span>
            </Link>
            <Link
              href="/issues"
              className={`${linkBaseStyle} ${isActive("/issues") ? linkActiveStyle : linkInactiveStyle}`}
            >
              <IoBugSharp className="h-4 w-4 drop-shadow-md" />
              <span>Issues</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            {/* GitHub Link */}
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
              className="group hidden items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 px-5 py-2 transition-all hover:bg-white/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] sm:flex"
            >
              <Github className="h-4 w-4 flex-shrink-0 transition-colors drop-shadow-md" />
              <div className="relative h-5 w-[85px] overflow-hidden">
                <span
                  className={`block text-sm font-medium transition-transform duration-300 ${isGithubHovered ? "-translate-y-5" : "translate-y-0"}`}
                >
                  Open
                </span>
                <span
                  className={`absolute left-0 top-5 block text-sm font-medium transition-transform duration-300 ${isGithubHovered ? "-translate-y-5" : "translate-y-0"}`}
                >
                  View repo
                </span>
              </div>
            </a>

            {/* GitHub Mobile */}
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/15 sm:hidden"
            >
              <Github className="h-4 w-4 drop-shadow-md" />
            </a>

            {/* Feedback Button */}
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium transition-all hover:bg-white/15 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] sm:px-4"
            >
              <MessageSquare className="h-4 w-4 drop-shadow-md" />
              <span className="hidden sm:inline">Feedback</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="fixed bottom-6 left-1/2 z-[9999] flex w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-around rounded-[2rem] bg-neutral-900/30 px-2 py-2 backdrop-blur-2xl saturate-200 border border-white/20 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)] md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
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
              className={`flex w-[4.5rem] flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-all duration-300 ${
                active
                  ? "bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
                  : "opacity-80 hover:bg-white/10 hover:opacity-100"
              }`}
            >
              <Icon
                className={`h-5 w-5 drop-shadow-md ${active ? "scale-110" : "scale-100"} transition-transform duration-300`}
              />
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
