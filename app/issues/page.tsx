"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import {
  Filter,
  FolderGit2,
  User,
  Github,
  Clock,
  LayoutList,
  Mail,
  SearchX,
  Loader2,
  Search,
} from "lucide-react";

// Define the shape of our data
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

export default function FeedbacksList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
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

  // Apply filters and advanced search
  const filteredFeedbacks = feedbacks.filter((fb) => {
    // 1. Category Filter
    if (filterCategory !== "all" && fb.category !== filterCategory)
      return false;

    // 2. Project Filter
    if (
      filterCategory === "project" &&
      filterProject !== "all" &&
      fb.project_name !== filterProject
    )
      return false;

    // 3. Search Filter (matches name, email, github_id, or feedback text)
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        fb.name.toLowerCase().includes(lowerQuery) ||
        fb.email.toLowerCase().includes(lowerQuery) ||
        (fb.github_id && fb.github_id.toLowerCase().includes(lowerQuery)) ||
        fb.feedback.toLowerCase().includes(lowerQuery);

      if (!matchesSearch) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white text-[#333333] pb-12">
      {/* Dashboard Top Bar */}
      <header className="bg-white border-b border-gray-300 px-6 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="text-[#f38020]">
            <LayoutList size={24} />
          </div>
          <div>
            <h1 className="text-lg font-normal text-gray-900 leading-tight">
              Feedbacks & Issues
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-4">
        {/* Control Panel: Search & Filters */}
        <div className="bg-white border border-gray-300 rounded-sm shadow-sm p-3">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-2 bg-transparent p-1 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-900 mr-2" />
              </div>
              <input
                type="text"
                placeholder="Search across feedback, name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-sm focus:outline-none transition-colors placeholder:text-gray-200"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-center">
              <div className="flex items-center gap-2 w-full sm:w-auto text-sm text-gray-600">
                <Filter size={16} />
                <span className="font-normal whitespace-nowrap">
                  Filter by:
                </span>
              </div>

              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(
                    e.target.value as "all" | "blogs" | "project" | "portfolio",
                  );
                  setFilterProject("all");
                }}
                className="w-full sm:w-auto bg-white border border-gray-300 text-sm text-gray-800 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#0f73ee] focus:ring-1 focus:ring-[#0f73ee] rounded-sm cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="project">Projects</option>
                <option value="blogs">Blogs</option>
                <option value="portfolio">Portfolio</option>
              </select>

              {filterCategory === "project" && (
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="w-full sm:w-auto bg-white border border-gray-300 text-sm text-gray-800 py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#0f73ee] focus:ring-1 focus:ring-[#0f73ee] rounded-sm cursor-pointer animate-in fade-in"
                >
                  <option value="all">All Projects</option>
                  {projects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!isLoading && (
          <div className="text-sm text-gray-600 font-normal px-1">
            Showing {filteredFeedbacks.length} result
            {filteredFeedbacks.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Feedbacks Output */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white border border-gray-300 rounded-sm p-12 flex flex-col items-center justify-center text-gray-100 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-[#0f73ee] mb-4" />
              <p className="text-sm">Fetching data...</p>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="bg-white border border-gray-300 rounded-sm p-12 flex flex-col items-center justify-center text-gray-100 shadow-sm">
              <SearchX className="w-10 h-10 text-gray-300 mb-3" />
              <h3 className="text-base font-normal text-gray-900 mb-1">
                No matching records found
              </h3>
              <p className="text-sm">
                Try adjusting your search query or filters.
              </p>
            </div>
          ) : (
            filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white border border-gray-300 rounded-xl  hover:border-gray-400 transition-colors flex flex-col"
              >
                {/* Card Header */}
                <div className="bg-gray-50 rounded-t-xl border-b border-gray-300 px-4 py-2.5 flex flex-wrap gap-y-2 justify-between items-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-normal uppercase text-gray-700">
                      <FolderGit2 size={14} className="text-gray-100" />
                      {fb.category}
                    </span>

                    {fb.category === "project" && fb.project_name && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs font-normal text-[#f38020]">
                          Target: {fb.project_name}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-100 font-normal">
                    <Clock size={12} />
                    {new Date(fb.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Card Body - Markdown Rendered */}
                <div className="px-4 py-4 text-sm">
                  {/* Removed prose-code utilities to prevent conflict with custom markdown renderer */}
                  <div className="prose prose-sm max-w-none prose-p:text-gray-800 prose-a:text-[#0f73ee]">
                    <ReactMarkdown
                      components={{
                        h1: ({ ...props }) => (
                          <h1
                            className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3"
                            {...props}
                          />
                        ),
                        h2: ({ ...props }) => (
                          <h2
                            className="text-base font-normal text-gray-900 mb-2 mt-4"
                            {...props}
                          />
                        ),
                        p: ({ ...props }) => (
                          <p
                            className="mb-3 whitespace-pre-wrap leading-relaxed"
                            {...props}
                          />
                        ),
                        a: ({ ...props }) => (
                          <a
                            className="hover:underline"
                            target="_blank"
                            rel="noreferrer"
                            {...props}
                          />
                        ),
                        ul: ({ ...props }) => (
                          <ul
                            className="list-disc list-inside mb-4 space-y-1 ml-2"
                            {...props}
                          />
                        ),
                        ol: ({ ...props }) => (
                          <ol
                            className="list-decimal list-inside mb-4 space-y-1 ml-2"
                            {...props}
                          />
                        ),
                        blockquote: ({ ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-300 pl-3 italic text-gray-600 my-3"
                            {...props}
                          />
                        ),
                        // Code block renderer - separates inline highlighting from block code
                        code({
                          inline,
                          className,
                          children,
                          ...props
                        }: React.DetailedHTMLProps<
                          React.HTMLAttributes<HTMLElement>,
                          HTMLElement
                        > & {
                          node?: unknown;
                          inline?: boolean;
                          className?: string;
                          children?: React.ReactNode;
                        }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const isBlock = match || inline === false;

                          // Triple backtick style - separate code blocks
                          if (isBlock) {
                            return (
                              <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg my-4 overflow-x-auto shadow-sm border border-gray-700">
                                <code
                                  className={`text-sm font-mono whitespace-pre ${className || ""}`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              </div>
                            );
                          }

                          // Single quote style - inline code highlighting
                          return (
                            <code
                              className="bg-red-50 text-[#d92d20] px-1.5 py-0.5 rounded-md text-sm font-mono border border-red-100 mx-0.5"
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
                </div>

                {/* Card Footer - User Info */}
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-gray-200" />
                    <span className="font-normal text-gray-800">{fb.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-gray-200" />
                    <a
                      href={`mailto:${fb.email}`}
                      className="hover:text-[#0f73ee] hover:underline transition-colors"
                    >
                      {fb.email}
                    </a>
                  </div>

                  {fb.github_id && (
                    <div className="flex items-center gap-1.5">
                      <Github size={14} className="text-gray-200" />
                      <a
                        href={`https://github.com/${fb.github_id.replace(
                          "@",
                          "",
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#0f73ee] hover:underline transition-colors"
                      >
                        {fb.github_id.startsWith("@")
                          ? fb.github_id
                          : `@${fb.github_id}`}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
