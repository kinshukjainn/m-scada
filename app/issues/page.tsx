"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import {
  Filter,
  Github,
  Clock,
  LayoutList,
  Mail,
  SearchX,
  Loader2,
  Search,
  ExternalLink,
  Tag,
} from "lucide-react";

type Feedback = {
  id: number;
  created_at: string;
  category: "blogs" | "project" | "portfolio";
  project_name: string | null;
  name: string;
  github_id: string | null;
  email: string;
  feedback: string;
};

// Interface for Markdown component props to avoid 'any'
interface MarkdownComponentProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    "all" | "blogs" | "project" | "portfolio"
  >("all");
  const [filterProject, setFilterProject] = useState<string>("all");

  const projects = ["FDS.AI", "Password Generator ( zeroleaks)"];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filterCategory !== "all" && fb.category !== filterCategory)
      return false;
    if (
      filterCategory === "project" &&
      filterProject !== "all" &&
      fb.project_name !== filterProject
    )
      return false;
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      return (
        fb.name.toLowerCase().includes(lowerQuery) ||
        fb.email.toLowerCase().includes(lowerQuery) ||
        (fb.github_id && fb.github_id.toLowerCase().includes(lowerQuery)) ||
        fb.feedback.toLowerCase().includes(lowerQuery)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#1b1b1b] text-[#e0e0e0]  selection:bg-[#4d85ff44]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#1b1b1b]/95 backdrop-blur border-b border-[#3c3c3c] px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full text-black">
              <LayoutList size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Issues <span className="text-[#4d85ff]">/</span> Feedbacks
            </h1>
          </div>

          <div className="flex-1 max-w-xl relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search feedbacks (e.g. bug, UI, name)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2b2b2b] border border-[#3c3c3c] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d85ff] focus:border-transparent transition-all placeholder:text-gray-500"
            />
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 px-4 py-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <section>
            <div className="p-1 bg-[#252525] mt-2 mb-2  rounded-full border-2 border-[#313131]">
              <h3 className="text-md font-semibold ml-4  text-gray-100  flex items-center gap-2">
                <Filter size={14} /> Filters
              </h3>
            </div>
            <div className="space-y-1">
              {(["all", "project", "blogs", "portfolio"] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilterCategory(cat);
                      setFilterProject("all");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-full text-sm transition-colors capitalize ${
                      filterCategory === cat
                        ? "bg-[#4d85ff22] text-[#81a9ff] font-bold "
                        : "text-gray-200 font-medium hover:bg-[#2b2b2b] "
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>
          </section>

          {filterCategory === "project" && (
            <section className="animate-in slide-in-from-top-2 duration-300">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Tag size={14} /> Sub-Projects
              </h3>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full bg-[#2b2b2b] border border-[#3c3c3c] rounded text-sm p-2 outline-none focus:border-[#4d85ff]"
              >
                <option value="all">All Projects</option>
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </section>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 flex items-center justify-between border-b border-[#3c3c3c] pb-4">
            <h2 className="text-2xl font-bold text-white">
              {filterCategory === "all"
                ? "All Activity"
                : `${filterCategory} Feedbacks`}
            </h2>
            {!isLoading && (
              <span className="text-md font-mono bg-green-600 px-2 py-1 rounded-xl border border-[#3c3c3c]">
                {filteredFeedbacks.length} items
              </span>
            )}
          </div>

          <div className="space-y-10">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center gap-4 text-gray-500">
                <Loader2 className="animate-spin" size={32} />
                <p className="animate-pulse">Loading archive...</p>
              </div>
            ) : filteredFeedbacks.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-[#3c3c3c] rounded-xl">
                <SearchX className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">No matching entries found.</p>
              </div>
            ) : (
              filteredFeedbacks.map((fb) => (
                <article key={fb.id} className="group relative">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="hidden md:block w-32 shrink-0 pt-1">
                      <div className="text-sm font-mono text-green-500 flex items-center gap-2">
                        <Clock size={12} />
                        {new Date(fb.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex-1 pb-10 border-b border-[#3c3c3c]">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="bg-blue-800 text-white text-sm uppercase font-medium px-2 py-0.5 rounded-full ">
                          {fb.category}
                        </span>
                        {fb.project_name && (
                          <span className="text-xs text-orange-400/80 font-mono">
                            :: {fb.project_name}
                          </span>
                        )}
                      </div>

                      <div
                        className="prose prose-invert max-w-none 
                        prose-p:text-[#c9d1d9] prose-p:leading-7 prose-p:mb-4
                        prose-headings:text-white prose-headings:font-bold
                        prose-a:text-[#58a6ff] hover:prose-a:underline"
                      >
                        <ReactMarkdown
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }: MarkdownComponentProps) {
                              const match = /language-(\w+)/.exec(
                                className || "",
                              );
                              return !inline ? (
                                <div className="relative my-6 rounded-md overflow-hidden border border-[#30363d] bg-[#0d1117]">
                                  <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-gray-400 font-mono">
                                    <span>{match ? match[1] : "code"}</span>
                                  </div>
                                  <pre className="p-4 overflow-x-auto m-0">
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                </div>
                              ) : (
                                <code
                                  className="bg-[#2b2b2b] text-[#e2e2e2] px-1.5 py-0.5 rounded text-sm font-mono border border-[#3c3c3c]"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {fb.feedback}
                        </ReactMarkdown>
                      </div>

                      <footer className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-sm">
                        <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#4d85ff] to-[#81a9ff] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                            {fb.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-300">
                            {fb.name}
                          </span>
                        </div>

                        <a
                          href={`mailto:${fb.email}`}
                          className="flex items-center gap-1.5 text-gray-500 hover:text-[#4d85ff] transition-colors"
                        >
                          <Mail size={14} />
                          <span className="text-xs">{fb.email}</span>
                        </a>

                        {fb.github_id && (
                          <a
                            href={`https://github.com/${fb.github_id.replace("@", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-gray-500 hover:text-[#4d85ff] transition-colors"
                          >
                            <Github size={14} />
                            <span className="text-xs">
                              @{fb.github_id.replace("@", "")}
                            </span>
                            <ExternalLink size={10} className="opacity-50" />
                          </a>
                        )}
                      </footer>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
