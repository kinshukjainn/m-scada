"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Info,
  Terminal,
  MessageSquare,
  Github,
  Boxes,
  Menu,
  X,
} from "lucide-react";
import { IoBugSharp } from "react-icons/io5";

// Array of navigation items to keep the JSX clean and DRY
const NAV_LINKS = [
  { path: "/about-info", icon: Info, label: "About" },
  { path: "/git-track", icon: Boxes, label: "Logs" },
  { path: "/console", icon: Terminal, label: "Console" },
  { path: "/issues", icon: IoBugSharp, label: "Issues" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#b03931] text-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1  text-lg font-bold text-black"
          >
            M-<span className="text-white">Scada</span>_
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white  border-b-3 border-white py-1  "
                      : "text-gray-200 hover:border-b-3 border-gray-200 p-1"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (External Links) */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-black transition-colors bg-white font-bold  px-2 py-1.5 rounded-xs "
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-100 transition-colors hover:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Feedback</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="flex items-center justify-center p-2 cursor-pointer text-gray-100 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="border-none bg-[#b03931] md:hidden">
          <div className="flex flex-col space-y-1.5 px-5 py-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2  px-2 py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? " border-l-4 border-white text-white"
                      : "text-gray-100  hover:border-l-4 border-white text-white hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-gray-800" />

            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-1 text-sm font-medium text-gray-100 transition-colors hover:border-l-4 border-white hover:text-white"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-1 text-sm font-medium text-gray-100 transition-colors  hover:border-l-4 border-white hover:text-white"
            >
              <MessageSquare className="h-5 w-5" />
              Feedback
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
