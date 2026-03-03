"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineWifiProtectedSetup, MdViewQuilt } from "react-icons/md";
import { IoMdCodeWorking, IoMdInformationCircleOutline } from "react-icons/io";
import { FaAws } from "react-icons/fa";
import { SiAwslambda, SiFormspree, SiMeta } from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { TbApi } from "react-icons/tb";
import { GiElectricalSocket } from "react-icons/gi";
import { FaCodePullRequest } from "react-icons/fa6";

// ───────────────────────────────────────────────
// Types & Nav Data
// ───────────────────────────────────────────────
interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  className?: string;
}

const navItems: NavItem[] = [
  {
    title: "Introduction",
    href: "/docs/introduction",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    title: "Project Info",
    href: "/docs/project-info",
    icon: <IoMdInformationCircleOutline className="w-4 h-4" />,
  },
  {
    title: "Devlopment Setup",
    href: "/docs/setup",
    icon: <MdOutlineWifiProtectedSetup className="w-4 h-4" />,
  },
  {
    title: "AWS Services used",
    href: "/docs/aws-services",
    icon: <FaAws className="w-4 h-4" />,
  },
  {
    title: "Amazon Lambda Function",
    href: "/docs/lambda-function",
    icon: <SiAwslambda className="w-4 h-4" />,
  },
  {
    title: "Amazon api Gateway",
    href: "/docs/amazon-api-gateway",
    icon: <TbApi className="w-4 h-4" />,
  },
  {
    title: "Service Integrations",
    href: "/docs/lambda-integration-with-api-gateway",
    icon: <TbApi className="w-4 h-4" />,
  },
  {
    title: "Open AI Model",
    href: "/docs/open-ai-oss-model",
    icon: <SiMeta className="w-4 h-4" />,
  },
  {
    title: "Bedrock Model",
    href: "/docs/about-model",
    icon: <SiMeta className="w-4 h-4" />,
  },
  {
    title: "Response and Request of model",
    href: "/docs/rar",
    icon: <VscJson className="w-4 h-4" />,
  },
  {
    title: "Introduction to Model Parameters",
    href: "/docs/params",
    icon: <SiFormspree className="w-4 h-4" />,
  },
  {
    title: "What is an API",
    href: "/docs/api-intro",
    icon: <TbApi className="w-4 h-4" />,
  },
  {
    title: "Introduction to SCADA",
    href: "/docs/intro-scada",
    icon: <GiElectricalSocket className="w-4 h-4" />,
  },
  {
    title: "Scada systems working",
    href: "/docs/working-scada",
    icon: <IoMdCodeWorking className="w-4 h-4" />,
  },
  {
    title: "UI/UX Guidlines",
    href: "/docs/uiux-guide",
    icon: <MdViewQuilt className="w-4 h-4" />,
  },
  {
    title: "Contribution Guidlines",
    href: "/docs/contri",
    icon: <FaCodePullRequest className="w-4 h-4" />,
  },
];

// ───────────────────────────────────────────────
// Responsive Sidebar Component
// ───────────────────────────────────────────────
export function DocsSidebar({
  className = "",
}: SidebarProps): React.ReactElement {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // React-recommended way to reset state on route change
  if (pathname !== prevPathname) {
    setIsOpen(false);
    setPrevPathname(pathname);
  }

  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const mobileHeaderTitle =
    pathname === "/docs"
      ? "Documentation"
      : navItems.find((item) => item.href === pathname)?.title ||
        "Documentation";

  return (
    <>
      {/* Scrollbar Fix embedded directly for this component */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .custom-dark-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-dark-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-dark-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-dark-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `,
        }}
      />

      {/* ─── Mobile Top Header ─── */}
      <div className="flex z-40 flex-shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <BookOpen className="h-4 w-4 text-[#8cb4ff]" />
          </div>
          <span className="text-sm font-medium tracking-wide text-gray-200">
            {mobileHeaderTitle}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Open documentation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ─── Mobile Backdrop Overlay ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ─── Sidebar (Strict Dark Theme) ─── */}
      <aside
        className={`
          absolute left-0 top-0 z-50 flex h-full w-64 flex-shrink-0 
          flex-col border-r border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl
          transition-transform duration-300 ease-in-out xl:w-[280px]
          ${isOpen ? "translate-x-0 shadow-[20px_0_40px_-10px_rgba(0,0,0,0.8)]" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:shadow-none
          ${className}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-[60px] flex-shrink-0 items-center justify-between border-b border-white/5 bg-transparent px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <BookOpen className="h-4 w-4 text-[#8cb4ff]" />
            </div>
            <h2 className="flex items-center gap-0.5 text-base font-medium tracking-tight text-gray-200">
              FDS<span className="text-[#8cb4ff]">.ai</span>
              <span className="animate-pulse font-mono text-[#8cb4ff]">
                _
              </span>{" "}
              Docs
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-full p-1.5 text-gray-500 transition-all hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu with Custom Dark Scrollbar */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 custom-dark-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/5"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }
                `}
              >
                <span
                  className={`flex-shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "text-[#8cb4ff]"
                      : "text-gray-500 group-hover:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`truncate ${isActive ? "font-medium" : "font-normal"}`}
                >
                  {item.title}
                </span>

                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8cb4ff] shadow-[0_0_8px_rgba(140,180,255,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default DocsSidebar;
