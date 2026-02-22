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

  // Filters
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

  // Apply filters
  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filterCategory !== "all" && fb.category !== filterCategory)
      return false;
    if (
      filterCategory === "project" &&
      filterProject !== "all" &&
      fb.project_name !== filterProject
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans text-gray-900 pb-12">
      {/* Cloudflare-style Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="bg-[#ff9100] text-black p-2 rounded-full border border-[#ff9100]">
            <LayoutList size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 leading-tight">
              Feedbacks & Issues
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Filters Panel - Cloudflare Control Bar */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900 font-semibold text-md">
            <div className="bg-[#ff9100] text-black p-2 rounded-full border border-[#ff9100]">
              <Filter size={18} className="text-gray-900" />
            </div>
            <span>Filter Results</span>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(
                  e.target.value as "all" | "blogs" | "project" | "portfolio",
                );
                setFilterProject("all");
              }}
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0051C3] focus:border-[#0051C3] rounded-md shadow-sm"
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
                className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#0051C3] focus:border-[#0051C3] rounded-md shadow-sm animate-in fade-in"
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

        {/* Feedbacks Output */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-gray-500 shadow-sm">
              <Loader2 className="w-8 h-8 animate-spin text-[#0051C3] mb-4" />
              <p className="text-sm">Loading ...Please wait</p>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-gray-500 shadow-sm">
              <SearchX className="w-10 h-10 text-gray-300 mb-3" />
              <h3 className="text-base font-medium text-gray-900 mb-1">
                No results found
              </h3>
              <p className="text-sm">
                Try adjusting your filters to see more feedbacks.
              </p>
            </div>
          ) : (
            filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                {/* Card Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap gap-y-3 justify-between items-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium bg-blue-800 text-white border border-blue-100">
                      <FolderGit2 size={14} />
                      <span className="capitalize">{fb.category}</span>
                    </span>

                    {fb.category === "project" && fb.project_name && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-[#F48120] border border-orange-100">
                        Target: {fb.project_name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Clock size={14} className="text-gray-400" />
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
                <div className="px-5 py-6">
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown
                      components={{
                        h1: ({ ...props }) => (
                          <h1
                            className="text-lg font-semibold text-gray-900 mb-3"
                            {...props}
                          />
                        ),
                        h2: ({ ...props }) => (
                          <h2
                            className="text-base font-semibold text-gray-900 mb-2 mt-4"
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
                            className="text-[#0051C3] hover:underline"
                            target="_blank"
                            rel="noreferrer"
                            {...props}
                          />
                        ),
                        ul: ({ ...props }) => (
                          <ul
                            className="list-disc list-inside mb-4 space-y-1"
                            {...props}
                          />
                        ),
                        ol: ({ ...props }) => (
                          <ol
                            className="list-decimal list-inside mb-4 space-y-1"
                            {...props}
                          />
                        ),
                        blockquote: ({ ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-200 pl-4 italic text-gray-600 bg-gray-50 py-2 pr-4 rounded-r-md my-4"
                            {...props}
                          />
                        ),
                        code: ({
                          inline,
                          ...props
                        }: {
                          inline?: boolean;
                          children?: React.ReactNode;
                          className?: string;
                        }) =>
                          inline ? (
                            <code
                              className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-200"
                              {...props}
                            />
                          ) : (
                            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md my-4 overflow-x-auto shadow-inner">
                              <code
                                className="text-sm text-gray-800 font-mono whitespace-pre"
                                {...props}
                              />
                            </div>
                          ),
                      }}
                    >
                      {fb.feedback}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Card Footer - User Info */}
                <div className="bg-white border-t border-gray-100 px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-1.5 rounded-full border border-gray-200">
                      <User size={14} className="text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{fb.name}</span>
                  </div>

                  {fb.github_id && (
                    <div className="flex items-center gap-2">
                      <Github size={16} className="text-gray-400" />
                      <a
                        href={`https://github.com/${fb.github_id.replace("@", "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#0051C3] hover:underline transition-colors"
                      >
                        {fb.github_id.startsWith("@")
                          ? fb.github_id
                          : `@${fb.github_id}`}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Mail size={16} className="text-gray-400" />
                    <a
                      href={`mailto:${fb.email}`}
                      className="hover:text-[#0051C3] hover:underline transition-colors"
                    >
                      {fb.email}
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
