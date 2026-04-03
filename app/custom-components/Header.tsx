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
    <header className="sticky top-0 z-50 w-full bg-gray-300 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1  text-lg font-bold text-black"
          >
            M-<span className="text-black">Scada</span>_
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
                  className={`flex items-center gap-2 text-md font-medium transition-colors ${
                    isActive
                      ? "text-black  border-b-3 border-black py-1  "
                      : "text-gray-900 hover:border-b-3 border-gray-900 p-1"
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
              className="flex items-center gap-2 text-md text-white rounded-full transition-colors bg-black font-bold  px-3 py-1.5"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-md font-semibold text-gray-100 bg-blue-800 px-3 py-1.5 rounded-full transition-colors "
            >
              <MessageSquare className="h-4 w-4" />
              <span>Feedback</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="flex items-center justify-center p-2 cursor-pointer text-gray-900 hover:text-black md:hidden"
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
        <div className="border-none bg-gray-300 md:hidden">
          <div className="flex flex-col space-y-2.5 px-6 py-1">
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
                      ? " border-l-4 border-black text-black"
                      : "text-gray-900  hover:border-l-4 border-black text-black hover:text-black"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}

            <div className="my-2 p-3 " />

            <a
              href="https://github.com/kinshukjainn/fds-college"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-black rounded-full px-2 py-2 text-md font-medium text-gray-100 transition-colors  "
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://fdb.cloudkinshuk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-700 rounded-full px-2 py-2 text-md font-medium text-gray-100 transition-colors  "
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
