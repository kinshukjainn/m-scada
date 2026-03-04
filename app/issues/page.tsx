"use client";

import React, { useState, useEffect } from "react";
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
  AlertCircle,
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

interface MarkdownComponentProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
    setErrorMsg(null);

    try {
      const response = await fetch("/api/fdb");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to fetch data from the server.",
        );
      }

      setFeedbacks(result || []);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unknown error occurred.";

      console.error("Catch Block Error:", message);
      setErrorMsg(message);
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
    <div className="min-h-screen bg-[#0a0a0a] text-white/80  selection:bg-[#4a90e2]/30 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <LayoutList size={20} className="text-red-500" />
            <h1 className="text-xl font-bold text-white">Issues / Feedbacks</h1>
          </div>

          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={16}
            />
            <input
              type="text"
              placeholder="Search feedbacks (e.g. bug, UI, name)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded bg-[#111111] border border-white/10 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#4a90e2]"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full shrink-0 space-y-8 lg:w-48">
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <Filter size={16} /> Filters
            </h3>
            <div className="flex flex-col space-y-1">
              {(["all", "project", "blogs", "portfolio"] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilterCategory(cat);
                      setFilterProject("all");
                    }}
                    className={`text-left px-3 py-2 rounded text-sm capitalize transition-colors ${
                      filterCategory === cat
                        ? " text-[#4a90e2] underline font-bold"
                        : "text-white/60 hover:underline hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>
          </section>

          {filterCategory === "project" && (
            <section>
              <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50">
                <Tag size={14} /> Sub-Projects
              </h3>
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full rounded bg-[#111111] border border-white/10 p-2 text-sm text-white outline-none focus:border-[#4a90e2]"
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
          <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white capitalize">
              {filterCategory === "all"
                ? "All Activity"
                : `${filterCategory} Feedbacks`}
            </h2>
            {!isLoading && !errorMsg && (
              <span className="rounded bg-[#111111] border border-white/10 px-2 py-1 text-xs font-bold text-white/70">
                {filteredFeedbacks.length} Items
              </span>
            )}
          </div>

          <div className="space-y-6">
            {/* Error State */}
            {errorMsg && (
              <div className="flex items-start gap-3 rounded border border-red-500/30 bg-red-500/5 p-4 text-red-400">
                <AlertCircle className="mt-0.5 shrink-0" size={18} />
                <div>
                  <h3 className="font-bold text-red-500">
                    Failed to fetch data
                  </h3>
                  <p className="mt-1 text-sm">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/50">
                <Loader2 className="mb-4 animate-spin" size={32} />
                <p>Loading archive...</p>
              </div>
            ) : !errorMsg && filteredFeedbacks.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded border border-dashed border-white/10 py-20 text-white/50">
                <SearchX className="mb-4" size={48} />
                <p>No matching entries found.</p>
              </div>
            ) : (
              /* Feedback List */
              !errorMsg &&
              filteredFeedbacks.map((fb) => (
                <article
                  key={fb.id}
                  className="border-b border-white/10 pb-8 pt-4"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Timestamp (Left Column) */}
                    <div className="w-32 shrink-0 md:pt-1">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Clock size={12} />
                        {new Date(fb.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Content (Right Column) */}
                    <div className="flex-1">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded bg-[#111111] border border-white/10 px-2 py-0.5 text-xs font-bold uppercase text-[#4a90e2]">
                          {fb.category}
                        </span>
                        {fb.project_name && (
                          <span className="text-xs text-white/50">
                            → {fb.project_name}
                          </span>
                        )}
                      </div>

                      {/* Clean Markdown Rendering */}
                      <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-white/80 prose-headings:text-white prose-a:text-[#4a90e2] mb-6">
                        <ReactMarkdown
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }: MarkdownComponentProps) {
                              return !inline ? (
                                <div className="my-4 overflow-hidden rounded border border-white/10 bg-[#111111]">
                                  <pre className="overflow-x-auto p-4 text-sm text-white/90">
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                </div>
                              ) : (
                                <code
                                  className="rounded bg-[#111111] border border-white/10 px-1 py-0.5 text-sm text-[#4a90e2]"
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

                      {/* User Info Footer */}
                      <footer className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#111111] border border-white/10 text-xs font-bold text-white">
                            {fb.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-white">
                            {fb.name}
                          </span>
                        </div>

                        <a
                          href={`mailto:${fb.email}`}
                          className="flex items-center gap-1.5 text-white/50 transition-colors hover:text-[#4a90e2]"
                        >
                          <Mail size={14} />
                          <span className="text-xs">{fb.email}</span>
                        </a>

                        {fb.github_id && (
                          <a
                            href={`https://github.com/${fb.github_id.replace("@", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-white/50 transition-colors hover:text-[#4a90e2]"
                          >
                            <Github size={14} />
                            <span className="text-xs">
                              @{fb.github_id.replace("@", "")}
                            </span>
                            <ExternalLink size={10} />
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
