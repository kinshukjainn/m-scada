"use client";

import React from "react";

export default function ContributingDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Contributing Guidelines <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-400 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              We welcome contributions from the community! Please read through
              these guidelines before contributing to ensure a smooth and
              collaborative process for everyone involved.
            </p>
          </div>

          {/* Section 1: Getting Started */}
          <section className="mb-16 min-w-0" id="getting-started">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. Getting Started
            </h2>
            <p className="text-gray-400 font-normal leading-relaxed mb-6 text-[16px]">
              To contribute to this project, start by{" "}
              <strong className="text-white font-semibold">
                forking the repository
              </strong>{" "}
              on GitHub. Clone your fork locally and create a new branch for
              your changes. Make sure to keep your fork synchronized with the
              upstream repository to avoid merge conflicts.
            </p>

            <div className="mt-8 rounded-md p-6 sm:p-8 bg-[#1b1b1b] border-l-4 border-l-amber-500 border border-[#333] shadow-sm">
              <h4 className="font-semibold text-white mb-3 text-lg">
                Before you write code:
              </h4>
              <p className="text-sm text-gray-400 font-normal leading-relaxed m-0">
                Please check the existing issues and pull requests to avoid
                duplication of effort. If you are planning a major feature or
                significant architectural change, consider opening an issue
                first to discuss it with the maintainers.
              </p>
            </div>
          </section>

          {/* Section 2: Types of Contributions */}
          <section className="mb-16 min-w-0" id="contribution-types">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. Types of Contributions
            </h2>
            <p className="text-gray-400 font-normal leading-relaxed mb-8 text-[16px]">
              We accept various types of contributions. You don&apos;t just have
              to write code to be a valuable part of this project!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Code */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors shadow-sm flex flex-col">
                <div className="text-[#8cb4ff] font-mono text-xs font-semibold mb-4 bg-[#8cb4ff]/10 inline-flex w-fit px-2.5 py-1 rounded-sm border border-[#8cb4ff]/20">
                  {"<Code />"}
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">
                  Code Contributions
                </h4>
                <p className="text-sm text-gray-400 font-normal leading-relaxed m-0">
                  Bug fixes, new features, performance improvements, and
                  refactoring existing code. Should follow project standards and
                  include tests.
                </p>
              </div>

              {/* Documentation */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors shadow-sm flex flex-col">
                <div className="text-emerald-400 font-mono text-xs font-semibold mb-4 bg-emerald-400/10 inline-flex w-fit px-2.5 py-1 rounded-sm border border-emerald-400/20">
                  {"<Documentation />"}
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">
                  Documentation
                </h4>
                <p className="text-sm text-gray-400 font-normal leading-relaxed m-0">
                  Improvements to README files, code comments, API Docs,
                  tutorials, and examples. Clear docs help everyone.
                </p>
              </div>

              {/* Bug Reports */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors shadow-sm flex flex-col">
                <div className="text-red-400 font-mono text-xs font-semibold mb-4 bg-red-400/10 inline-flex w-fit px-2.5 py-1 rounded-sm border border-red-400/20">
                  {"<Bug_Reports />"}
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">
                  Bug Reports
                </h4>
                <p className="text-sm text-gray-400 font-normal leading-relaxed m-0">
                  Detailed reports with reproducible steps help us identify and
                  fix issues quickly. Include environment info and logs.
                </p>
              </div>

              {/* Feature Requests */}
              <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 hover:border-[#444] transition-colors shadow-sm flex flex-col">
                <div className="text-purple-400 font-mono text-xs font-semibold mb-4 bg-purple-400/10 inline-flex w-fit px-2.5 py-1 rounded-sm border border-purple-400/20">
                  {"<Feature_Requests />"}
                </div>
                <h4 className="font-semibold text-white mb-2 text-lg">
                  Feature Requests
                </h4>
                <p className="text-sm text-gray-400 font-normal leading-relaxed m-0">
                  Suggestions for new enhancements. Explain the use case and
                  exactly how it would benefit the project and its users.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Reporting Issues */}
          <section className="mb-16 min-w-0" id="reporting-issues">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. Reporting Issues
            </h2>
            <p className="text-gray-400 font-normal leading-relaxed mb-6 text-[16px]">
              When reporting issues on GitHub, please provide as much detail as
              possible. A good issue report includes:
            </p>
            <ul className="space-y-4 bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm text-gray-400 font-normal text-[15px]">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Clear Title:
                  </strong>{" "}
                  A concise description of the issue.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Description:
                  </strong>{" "}
                  Detailed explanation of what went wrong and what you expected
                  to happen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Steps to Reproduce:
                  </strong>{" "}
                  Numbered steps that allow us to recreate the issue perfectly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Environment:
                  </strong>{" "}
                  Your operating system, browser version, Node.js version, and
                  any other relevant details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-[#8cb4ff] mt-2 flex-shrink-0"></div>
                <span>
                  <strong className="text-white font-semibold">
                    Screenshots or Logs:
                  </strong>{" "}
                  If applicable, include visual proof or terminal error logs
                  that demonstrate the problem.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Pull Request Process */}
          <section className="mb-16 min-w-0" id="pr-process">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              4. Pull Request Process
            </h2>

            <div className="space-y-8 mt-10">
              {[
                {
                  step: 1,
                  title: "Branching",
                  desc: "Create a new branch from the main branch with a descriptive name (e.g., feature/add-login or bugfix/header-alignment).",
                },
                {
                  step: 2,
                  title: "Committing",
                  desc: "Make your changes and commit them with clear, concise commit messages explaining what was changed.",
                },
                {
                  step: 3,
                  title: "Testing & Linting",
                  desc: "Write or update tests to cover your changes. Ensure all tests pass and there are no linting errors.",
                },
                {
                  step: 4,
                  title: "Documentation",
                  desc: "Update READMEs, API docs, or inline comments to reflect any changes in functionality.",
                },
                {
                  step: 5,
                  title: "Submission",
                  desc: "Push your changes to your fork and submit a pull request to the main repository. Link any relevant issues your PR addresses.",
                },
                {
                  step: 6,
                  title: "Review",
                  desc: "A maintainer will review your PR. Be responsive to comments and willing to make adjustments as needed.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex flex-col items-center mt-0.5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2d2d2d] text-[#8cb4ff] font-mono text-sm border border-[#444]">
                      {item.step}
                    </span>
                    {item.step !== 6 && (
                      <div className="w-px h-full bg-[#333] my-2"></div>
                    )}
                  </div>
                  <div className="pb-4 min-w-0">
                    <h3 className="font-semibold text-white text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 font-normal leading-relaxed text-sm m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Code Standards */}
          <section className="mb-16 min-w-0" id="code-standards">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              5. Code Standards
            </h2>
            <p className="text-gray-400 font-normal leading-relaxed mb-6 text-[16px]">
              To maintain code quality and consistency across the project,
              please adhere to these standards:
            </p>
            <div className="bg-[#1b1b1b] border border-[#333] rounded-md p-6 sm:p-8 shadow-sm">
              <ul className="space-y-4 text-gray-400 font-normal text-[15px] m-0">
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Follow the existing code style and formatting conventions
                    used in the project.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Write clear, self-documenting code with meaningful variable
                    and function names.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Add comments to explain complex logic or non-obvious
                    architectural decisions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Keep functions small and focused on a single responsibility.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Avoid unnecessary dependencies and keep the codebase lean.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                  <span>
                    Run linters and formatters before committing your code.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Becoming a Contributor */}
          <section className="mb-16 min-w-0" id="becoming-contributor">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              6. Becoming a Contributor
            </h2>
            <p className="text-gray-400 font-normal leading-relaxed mb-4 text-[16px]">
              Once your pull request is merged, you will automatically be
              recognized as a contributor to the project. We value all
              contributions, whether they are tiny typo fixes or massive feature
              overhauls.
            </p>
            <p className="text-gray-400 font-normal leading-relaxed mb-6 text-[16px]">
              Active contributors who consistently provide high-quality code and
              support may be invited to become{" "}
              <strong className="text-white font-semibold">Maintainers</strong>,
              granting additional responsibilities and merge permissions in the
              repository.
            </p>
            <div className="bg-[#2d2d2d] border border-[#444] rounded-md p-6">
              <p className="text-gray-200 font-normal m-0 leading-relaxed text-[15px]">
                We appreciate your time and effort in helping improve this
                project. Thank you for contributing! If you have questions, feel
                free to open an issue on GitHub or reach out to the team.
              </p>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-400 font-normal">
            <a
              href="#getting-started"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. Getting Started
            </a>
            <a
              href="#contribution-types"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              2. Types of Contributions
            </a>
            <a
              href="#reporting-issues"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              3. Reporting Issues
            </a>
            <a
              href="#pr-process"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              4. Pull Request Process
            </a>
            <a
              href="#code-standards"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              5. Code Standards
            </a>
            <a
              href="#becoming-contributor"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              6. Recognition
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
