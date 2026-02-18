import React from "react";

export default function ContributingDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* Top Navigation Bar Simulation */}

      {/* Main Grid Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Contributing Guidelines
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              We welcome contributions from the community! Please read through
              these guidelines before contributing to ensure a smooth and
              collaborative process for everyone involved.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: Getting Started */}
          <section className="mb-12 sm:mb-14 min-w-0" id="getting-started">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. Getting Started
            </h2>
            <p className="text-gray-800 mb-4">
              To contribute to this project, start by{" "}
              <strong>forking the repository</strong> on GitHub. Clone your fork
              locally and create a new branch for your changes. Make sure to
              keep your fork synchronized with the upstream repository to avoid
              merge conflicts.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mt-6">
              <h4 className="font-semibold text-yellow-900 mb-2">
                Before you write code:
              </h4>
              <p className="text-sm text-yellow-800 leading-relaxed">
                Please check the existing issues and pull requests to avoid
                duplication of effort. If you are planning a major feature or
                significant architectural change, consider opening an issue
                first to discuss it with the maintainers.
              </p>
            </div>
          </section>

          {/* Section 2: Types of Contributions */}
          <section className="mb-12 sm:mb-14 min-w-0" id="contribution-types">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-[#f38020] pl-4">
              2. Types of Contributions
            </h2>
            <p className="text-gray-800 mb-6">
              We accept various types of contributions. You don&apos;t just have
              to write code to be a valuable part of this project!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                <div className="text-blue-600 font-mono text-sm font-semibold mb-2 bg-blue-100 inline-block px-2 py-1 rounded">
                  {"<Code />"}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Code Contributions
                </h4>
                <p className="text-sm text-gray-800">
                  Bug fixes, new features, performance improvements, and
                  refactoring existing code. Should follow project standards and
                  include tests.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                <div className="text-green-600 font-mono text-sm font-semibold mb-2 bg-green-100 inline-block px-2 py-1 rounded">
                  {"<Documentation />"}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Documentation
                </h4>
                <p className="text-sm text-gray-800">
                  Improvements to README files, code comments, API Docs,
                  tutorials, and examples. Clear docs help everyone.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-red-300 transition-colors">
                <div className="text-red-600 font-mono text-sm font-semibold mb-2 bg-red-100 inline-block px-2 py-1 rounded">
                  {"<Bug_Reports />"}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Bug Reports
                </h4>
                <p className="text-sm text-gray-800">
                  Detailed reports with reproducible steps help us identify and
                  fix issues quickly. Include environment info and logs.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors">
                <div className="text-purple-600 font-mono text-sm font-semibold mb-2 bg-purple-100 inline-block px-2 py-1 rounded">
                  {"<Feature_Requests />"}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Feature Requests
                </h4>
                <p className="text-sm text-gray-800">
                  Suggestions for new enhancements. Explain the use case and
                  exactly how it would benefit the project and its users.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Reporting Issues */}
          <section className="mb-12 sm:mb-14 min-w-0" id="reporting-issues">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. Reporting Issues
            </h2>
            <p className="text-gray-800 mb-4">
              When reporting issues on GitHub, please provide as much detail as
              possible. A good issue report includes:
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-3 ml-1 sm:ml-2">
              <li className="pl-2">
                <strong>Clear Title:</strong> A concise description of the
                issue.
              </li>
              <li className="pl-2">
                <strong>Description:</strong> Detailed explanation of what went
                wrong and what you expected to happen.
              </li>
              <li className="pl-2">
                <strong>Steps to Reproduce:</strong> Numbered steps that allow
                us to recreate the issue perfectly.
              </li>
              <li className="pl-2">
                <strong>Environment:</strong> Your operating system, browser
                version, Node.js version, and any other relevant details.
              </li>
              <li className="pl-2">
                <strong>Screenshots or Logs:</strong> If applicable, include
                visual proof or terminal error logs that demonstrate the
                problem.
              </li>
            </ul>
          </section>

          {/* Section 4: Pull Request Process */}
          <section className="mb-12 sm:mb-14 min-w-0" id="pr-process">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 border-l-4 border-[#f38020] pl-4">
              4. Pull Request Process
            </h2>

            <div className="space-y-6 mt-6">
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
                <div
                  key={item.step}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 text-gray-800 flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                      {item.title}
                    </h4>
                    <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Code Standards */}
          <section className="mb-12 sm:mb-14 min-w-0" id="code-standards">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              5. Code Standards
            </h2>
            <p className="text-gray-800 mb-4">
              To maintain code quality and consistency across the project,
              please adhere to these standards:
            </p>
            <div className="bg-[#1c2128] rounded-lg p-6 shadow-sm w-full min-w-0">
              <ul className="list-disc list-inside text-gray-300 space-y-3">
                <li>
                  Follow the existing code style and formatting conventions used
                  in the project.
                </li>
                <li>
                  Write clear, self-documenting code with meaningful variable
                  and function names.
                </li>
                <li>
                  Add comments to explain complex logic or non-obvious
                  architectural decisions.
                </li>
                <li>
                  Keep functions small and focused on a single responsibility.
                </li>
                <li>
                  Avoid unnecessary dependencies and keep the codebase lean.
                </li>
                <li>Run linters and formatters before committing your code.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Becoming a Contributor */}
          <section className="mb-12 sm:mb-14 min-w-0" id="becoming-contributor">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              6. Becoming a Contributor
            </h2>
            <p className="text-gray-800 mb-4">
              Once your pull request is merged, you will automatically be
              recognized as a contributor to the project. We value all
              contributions, whether they are tiny typo fixes or massive feature
              overhauls.
            </p>
            <p className="text-gray-800 mb-4">
              Active contributors who consistently provide high-quality code and
              support may be invited to become <strong>Maintainers</strong>,
              granting additional responsibilities and merge permissions in the
              repository.
            </p>
            <p className="text-gray-900 font-medium mt-6">
              We appreciate your time and effort in helping improve this
              project. Thank you for contributing! If you have questions, feel
              free to open an issue on GitHub or reach out to the team.
            </p>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#getting-started"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              1. Getting Started
            </a>
            <a
              href="#contribution-types"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              2. Types of Contributions
            </a>
            <a
              href="#reporting-issues"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              3. Reporting Issues
            </a>
            <a
              href="#pr-process"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              4. Pull Request Process
            </a>
            <a
              href="#code-standards"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              5. Code Standards
            </a>
            <a
              href="#becoming-contributor"
              className="hover:text-[#f38020] transition-colors truncate"
            >
              6. Recognition
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
