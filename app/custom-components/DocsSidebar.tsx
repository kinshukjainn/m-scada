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

  // React-recommended way to reset state on route change without useEffect
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

  // Determine the mobile header title based on the current route
  const mobileHeaderTitle =
    pathname === "/docs"
      ? "Documentation"
      : navItems.find((item) => item.href === pathname)?.title ||
        "Documentation";

  return (
    <>
      {/* ─── Mobile Top Header ─── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#333] bg-[#1b1b1b] flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#8cb4ff]" />
          </div>
          <span className="font-normal text-white text-sm tracking-wide">
            {mobileHeaderTitle}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-gray-300 border-white border-2  hover:bg-[#333] hover:text-white rounded-full cursor-pointer transition-colors"
          aria-label="Open documentation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ─── Mobile Backdrop Overlay ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ─── Sidebar (Desktop Fixed & Mobile Drawer) ─── */}
      <aside
        className={`
          absolute lg:relative top-0 left-0 z-50 h-full w-64 xl:w-[280px] 
          flex-shrink-0 flex flex-col bg-[#1b1b1b] border-r border-[#333]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          lg:translate-x-0 lg:shadow-none
          ${className}
        `}
      >
        {/* Sidebar Header (With Mobile Close Button) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#333] h-[60px] flex-shrink-0 bg-[#1b1b1b]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#2d2d2d] border border-[#444] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#8cb4ff]" />
            </div>
            <h2 className="text-base font-normal text-white tracking-tight truncate flex items-center gap-0.5">
              FDS<span className="text-[#8cb4ff]">.ai</span>
              <span className="font-mono animate-pulse text-[#8cb4ff]">
                _
              </span>{" "}
              Docs
            </h2>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 cursor-pointer text-gray-200 hover:text-white hover:bg-[#333] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Ensures menu closes when clicking a link on mobile
                className={`
                  flex items-center gap-3 px-2 py-1 text-sm transition-all  duration-200
                  ${
                    isActive
                      ? " bg-blue-400/20 text-blue-200 w-max border-l-4 border-blue-500  hover:underline  font-medium  shadow-sm"
                      : "border-l-4 border-transparent hover:underline text-gray-200 hover:bg-[#2d2d2d] hover:text-gray-200"
                  }
                `}
              >
                <span
                  className={`flex-shrink-0 ${
                    isActive ? "text-[#8cb4ff]" : "text-gray-100"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default DocsSidebar;
