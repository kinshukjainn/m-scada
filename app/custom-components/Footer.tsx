import React from "react";
import Link from "next/link";
import {
  Github,
  MessageSquare,
  Globe,
  TerminalSquare,
  Info,
  Activity,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Brand & Status Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight mb-4">
              <Activity size={20} className="text-blue-700" />
              <span>Faut Detection System</span>{" "}
              {/* Feel free to change this placeholder name */}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Predictive intelligence and anomaly detection for critical
              industrial infrastructure.
            </p>
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-600 uppercase tracking-wider">
                All Systems Normal
              </span>
            </div>
          </div>

          {/* Internal Navigation */}
          <div>
            <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-5">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/console"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <TerminalSquare
                    size={16}
                    className="text-slate-400 group-hover:text-blue-700 transition-colors"
                  />
                  System Console
                </Link>
              </li>
              <li>
                <Link
                  href="/about-info"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <Info
                    size={16}
                    className="text-slate-400 group-hover:text-blue-700 transition-colors"
                  />
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links & Resources */}
          <div>
            <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-5">
              Resources & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://cloudkinshuk.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <Globe
                    size={16}
                    className="text-slate-400 group-hover:text-blue-700 transition-colors"
                  />
                  Developer Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kinshukjainn/your-repo" // REPLACE WITH YOUR REPO
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <Github
                    size={16}
                    className="text-slate-400 group-hover:text-blue-700 transition-colors"
                  />
                  Source Code
                </a>
              </li>
              <li>
                <a
                  href="mailto:feedback@cloudkinshuk.in" // REPLACE WITH YOUR FEEDBACK LINK/MAIL
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <MessageSquare
                    size={16}
                    className="text-slate-400 group-hover:text-blue-700 transition-colors"
                  />
                  Submit Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Version */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            &copy; {currentYear} Kinshuk Jain. All rights reserved.
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            BUILD_VERSION: v2.4.1-stable
          </div>
        </div>
      </div>
    </footer>
  );
}
