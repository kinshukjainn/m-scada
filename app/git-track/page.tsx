"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  GitCommit,
  Github,
  User,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  X,
  Activity,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface CommitData {
  message: string;
  author: CommitAuthor;
}

interface GithubCommit {
  sha: string;
  html_url: string;
  commit: CommitData;
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

// ============================================================================
// Configuration
// ============================================================================

const GITHUB_CONFIG = {
  username: "kinshukjainn",
  repository: "fds-college",
  branch: "master",
  // We keep perPage at 100 (API Max), but we'll loop to fetch multiple pages!
  perPage: 100,
  maxPages: 10, // Safeguard: maximum 1000 commits so we don't get rate-limited
};

const COMMIT_TYPES = [
  { id: "all", label: "All Types" },
  { id: "feat", label: "Features" },
  { id: "fix", label: "Bug Fixes" },
  { id: "chore", label: "Chores" },
  { id: "docs", label: "Documentation" },
  { id: "refactor", label: "Refactors" },
];

// ============================================================================
// Utility Functions
// ============================================================================

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const getCommitTitle = (message: string) => message.split("\n")[0];

const getCommitBody = (message: string) => {
  const parts = message.split("\n");
  if (parts.length <= 1) return null;
  return parts.slice(1).join("\n").trim();
};

const getContributionColor = (count: number) => {
  if (count === 0) return "bg-[#252525] border-none";
  if (count === 1) return "bg-blue-500 border-none";
  if (count <= 3) return "bg-red-500 border-none";
  if (count <= 5) return "bg-yellow-500  border-none ";
  return "bg-green-500 border-none";
};

// ============================================================================
// Main Component
// ============================================================================

export default function ChangelogTracker() {
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchingProgress, setFetchingProgress] = useState<number>(0);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Interactive Heatmap State
  const [selectedHeatmapDate, setSelectedHeatmapDate] = useState<string | null>(
    null,
  );

  // Advanced Fetching Engine: Loops to get up to a year of data
  const fetchCommits = async () => {
    setLoading(true);
    setError(null);
    setFetchingProgress(0);

    try {
      let allCommits: GithubCommit[] = [];
      let page = 1;
      let shouldFetchMore = true;

      // Target: 1 year ago from today to fill the heatmap
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      while (shouldFetchMore && page <= GITHUB_CONFIG.maxPages) {
        setFetchingProgress(page);

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}/commits?sha=${GITHUB_CONFIG.branch}&per_page=${GITHUB_CONFIG.perPage}&page=${page}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          if (response.status === 403)
            throw new Error("GitHub API rate limit exceeded.");
          if (response.status === 404) throw new Error("Repository not found.");
          throw new Error(
            `Failed to fetch commits (Status: ${response.status})`,
          );
        }

        const data: GithubCommit[] = await response.json();

        // Break if we hit an empty page
        if (data.length === 0) {
          break;
        }

        allCommits = [...allCommits, ...data];

        // Check the date of the oldest commit in this batch
        const oldestDateInBatch = new Date(
          data[data.length - 1].commit.author.date,
        );

        // Stop fetching if we've successfully gone back more than 1 year
        if (oldestDateInBatch < oneYearAgo) {
          shouldFetchMore = false;
        } else {
          page++;
        }
      }

      setCommits(allCommits);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  // --------------------------------------------------------------------------
  // Data Processing & Filtering
  // --------------------------------------------------------------------------

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(commits.map((c) => c.commit.author.name)));
  }, [commits]);

  const baseFilteredCommits = useMemo(() => {
    return commits.filter((commit) => {
      const msg = commit.commit.message.toLowerCase();
      const authorName = commit.commit.author.name;
      const commitDate = new Date(commit.commit.author.date);
      const sha = commit.sha.toLowerCase();

      if (
        searchQuery &&
        !msg.includes(searchQuery.toLowerCase()) &&
        !sha.includes(searchQuery.toLowerCase())
      )
        return false;
      if (authorFilter !== "all" && authorName !== authorFilter) return false;
      if (
        typeFilter !== "all" &&
        !(msg.startsWith(`${typeFilter}:`) || msg.startsWith(`${typeFilter}(`))
      )
        return false;

      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        startDate.setHours(0, 0, 0, 0);
        if (commitDate < startDate) return false;
      }
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);
        if (commitDate > endDate) return false;
      }
      return true;
    });
  }, [commits, searchQuery, authorFilter, typeFilter, dateRange]);

  const displayCommits = useMemo(() => {
    if (!selectedHeatmapDate) return baseFilteredCommits;
    return baseFilteredCommits.filter((c) => {
      const commitDateStr = new Date(c.commit.author.date)
        .toISOString()
        .split("T")[0];
      return commitDateStr === selectedHeatmapDate;
    });
  }, [baseFilteredCommits, selectedHeatmapDate]);

  // --------------------------------------------------------------------------
  // Heatmap Grid Generation
  // --------------------------------------------------------------------------

  const heatmapData = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const commitCounts: Record<string, number> = {};
    baseFilteredCommits.forEach((commit) => {
      const dateStr = new Date(commit.commit.author.date)
        .toISOString()
        .split("T")[0];
      commitCounts[dateStr] = (commitCounts[dateStr] || 0) + 1;
    });

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        count: commitCounts[dateStr] || 0,
        dayOfWeek: currentDate.getDay(),
        month: currentDate.toLocaleString("default", { month: "short" }),
        isFirstOfMonth: currentDate.getDate() === 1,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [baseFilteredCommits]);

  const clearFilters = () => {
    setSearchQuery("");
    setAuthorFilter("all");
    setTypeFilter("all");
    setDateRange({ start: "", end: "" });
    setSelectedHeatmapDate(null);
  };

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (authorFilter !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0) +
    (dateRange.start || dateRange.end ? 1 : 0) +
    (selectedHeatmapDate ? 1 : 0);

  return (
    <div className="min-h-screen md:pt-16 bg-[#161616] text-[#c9d1d9] selection:bg-[#39d353] selection:text-black ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Block */}
        <header className="mb-8 pt-10  pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-semibold text-blue-500 mb-2 tracking-tight flex items-center gap-3">
                <Github className="w-8 h-8 text-[#39d353]" />
                <span className="text-red-500 font-mono">M-</span>Scada
                <span className="font-bold text-red-500">{"_"}</span>
                <span className="text-red-500 font-mono">Logs</span>
              </h1>
              <p className="text-[#8b949e]">
                Tracking{" "}
                <span className="text-white font-medium">
                  {displayCommits.length}
                </span>{" "}
                commits across the timeline.
              </p>
            </div>

            <a
              href={`https://github.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repository}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#252525]  text-white text-sm font-medium rounded-md transition-all w-fit"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-[#8b949e] border border-dashed border-[#30363d] rounded-lg bg-none">
            <RefreshCw className="w-8 h-8 animate-spin mb-4 text-[#39d353]" />
            <p className="font-medium text-white mb-1">
              Building the Heatmap...
            </p>
            <p className="text-sm">
              Fetching up to a year of history (Page {fetchingProgress})
            </p>
          </div>
        )}

        {/* Heatmap Section */}
        {!loading && !error && commits.length > 0 && (
          <div className="mb-10 px-4 py-4 border border-white rounded-lg  shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-medium text-gray-400">
                {baseFilteredCommits.length} contributions in the selected
                timeframe
              </h2>
              {selectedHeatmapDate && (
                <button
                  onClick={() => setSelectedHeatmapDate(null)}
                  className="text-xs flex items-center gap-1 text-[#39d353] hover:text-[#26a641] transition-colors"
                >
                  <X className="w-3 h-3" /> Clear Date Selection
                </button>
              )}
            </div>

            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[800px]">
                {/* Heatmap Grid */}
                <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                  {heatmapData.map((day) => (
                    <div
                      key={day.date}
                      onClick={() =>
                        setSelectedHeatmapDate(day.count > 0 ? day.date : null)
                      }
                      className={`w-3 h-3 rounded-full border border-[#444444] cursor-pointer transition-all ${getContributionColor(day.count)} 
                        ${selectedHeatmapDate === day.date ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-[#0d1117] z-10 scale-110" : "hover:ring-1 hover:ring-white z-0"}
                        ${day.count > 0 ? "hover:scale-125" : "cursor-default"}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between mt-4 text-xs text-[#8b949e]">
                  <div className="flex gap-4">
                    <span>Learn how we count contributions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 4, 6].map((count) => (
                        <div
                          key={count}
                          className={`w-3 h-3 rounded-full  border ${getContributionColor(count)}`}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {!loading && !error && commits.length > 0 && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Search commit messages or SHAs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full  border border-[#30363d] text-white pl-10 pr-4 py-1  focus:outline-none transition-all"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex items-center gap-2 px-2 py-1  rounded-xs cursor-pointer transition-all font-medium text-sm ${
                  isFilterOpen || activeFilterCount > 0
                    ? "bg-[#238636] border-[#2ea043] text-white hover:bg-[#2ea043]"
                    : "bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e]"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters{" "}
                {activeFilterCount > 0 && (
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Expandable Filter Panel */}
            {isFilterOpen && (
              <div className="p-2   grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8b949e]">
                    Author
                  </label>
                  <select
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="w-full bg-[#252525]  text-white px-1 py-1 rounded-md focus:outline-none focus:border-[#58a6ff] text-sm"
                  >
                    <option value="all">All Authors</option>
                    {uniqueAuthors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8b949e]">
                    Commit Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full bg-[#252525]  text-white px-1 py-1 rounded-md focus:outline-none focus:border-[#58a6ff] text-sm"
                  >
                    {COMMIT_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-1">
                    Date Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full bg-[#252525]  text-white px-1 py-1 rounded-md focus:outline-none focus:border-[#58a6ff] text-sm"
                    />
                    <span className="text-[#8b949e] text-xs">to</span>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full bg-[#252525]  text-white px-1 py-1 rounded-md focus:outline-none focus:border-[#58a6ff] text-sm"
                    />
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="md:col-span-3 flex justify-end mt-2 pt-4 border-t border-[#30363d]">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1.5 text-sm text-[#f85149] hover:text-[#ff7b72] transition-colors font-medium"
                    >
                      <X className="w-4 h-4" /> Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Timeline Content */}
        <main>
          {error ? (
            <div className="p-6 bg-[#252525] border border-[#ff8182] rounded-md flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#cf222e] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#cf222e] font-bold mb-1">
                  Failed to load timeline
                </h3>
                <p className="text-[#24292f] text-sm">{error}</p>
                <button
                  onClick={fetchCommits}
                  className="mt-4 px-4 py-2 bg-[#cf222e] text-white text-sm font-medium rounded-md hover:bg-[#a40e26] transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : !loading && displayCommits.length === 0 ? (
            <div className="text-center py-20 px-4 border border-dashed border-[#30363d] rounded-lg">
              <Activity className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                No activity found
              </h3>
              <p className="text-[#8b949e] text-sm max-w-md mx-auto">
                {selectedHeatmapDate
                  ? `There are no commits on ${selectedHeatmapDate} matching your current filters.`
                  : "No commits match your selected filters. Try adjusting your search criteria."}
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-4 py-2 bg-blue-500  text-black text-sm font-bold rounded-lg  transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            !loading && (
              <div className="relative border-l-2 border-[#30363d] ml-4 space-y-8 py-4">
                {displayCommits.map((commit) => {
                  const title = getCommitTitle(commit.commit.message);
                  const body = getCommitBody(commit.commit.message);
                  const shortSha = commit.sha.substring(0, 7);

                  return (
                    <div key={commit.sha} className="relative pl-8 group">
                      <div className="absolute w-[15px] h-[15px] bg-green-400 rounded-md -left-[8.5px] top-2 transition-transform group-hover:scale-110" />

                      <div className="  p-2 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-400 break-words leading-tight mb-2">
                              <a
                                href={commit.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white hover:underline"
                              >
                                {title}
                              </a>
                            </h3>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-md">
                              <div className="flex items-center gap-2">
                                {commit.author?.avatar_url ? (
                                  <Image
                                    src={commit.author.avatar_url}
                                    alt={commit.commit.author.name}
                                    width={20}
                                    height={20}
                                    className="rounded-md  bg-[#30363d]"
                                  />
                                ) : (
                                  <div className="w-5 h-5 rounded-md  bg-[#30363d] flex items-center justify-center">
                                    <User className="w-3 h-3 text-green-500" />
                                  </div>
                                )}
                                <span className="font-medium text-green-500 font-mono">
                                  {"@"}
                                  {commit.commit.author.name}
                                </span>
                              </div>
                              <span className="text-[#8b949e] text-xs">
                                committed on{" "}
                                {formatDateTime(commit.commit.author.date)}
                              </span>
                            </div>
                          </div>

                          <a
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-1.5  text-gray-400 font-mono text-xs font-bold transition-colors"
                          >
                            <GitCommit className="w-3.5 h-3.5" /> {shortSha}
                          </a>
                        </div>

                        {body && (
                          <pre className="mt-2 text-[#8b949e] text-sm font-mono whitespace-pre-wrap overflow-x-auto border-t border-[#30363d] pt-3">
                            {body}
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d1117;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #30363d;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #8b949e;
        }
      `,
        }}
      />
    </div>
  );
}
