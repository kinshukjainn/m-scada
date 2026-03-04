import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Select <span className="text-red-500">Console</span> Mode
          </h1>
          <p className="text-gray-400">
            Choose how you want to interact with your data and workflows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {/* Manual Console Card */}
          <div className="flex flex-col ">
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-white mb-2">
                Manual Console
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Full control and flexibility. You dictate every aspect of data
                collection, analysis, and metric tracking.
              </p>

              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 mb-8 list-disc list-inside">
                <li>Customize metrics and visualizations</li>
                <li>Complete transparency in processes</li>
                <li>Integrate existing tools/workflows</li>
                <li>No external algorithm dependency</li>
              </ul>
            </div>

            <Link
              href="/console/manual"
              className="w-full rounded bg-blue-400 py-1 w-max px-2 text-center text-md  font-semibold text-black  transition-colors"
            >
              Go for manual
            </Link>
          </div>

          {/* Automated Console Card */}
          <div className="flex flex-col ">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-white">
                  Automated Console
                </h2>
                <span className="rounded bg-[#4a90e2] font-mono px-2 py-0.5 text-xs font-bold  text-black">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Let the system handle it. Automatically collects data,
                identifies patterns, and generates insights.
              </p>

              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 mb-8 list-disc list-inside">
                <li>No manual configuration required</li>
                <li>Real-time processing and updates</li>
                <li>AI-powered predictions</li>
                <li>Saves time and reduces manual work</li>
              </ul>
            </div>

            <Link
              href="/console/direct"
              className="w-full rounded bg-green-500 py-1 w-max px-2 text-center text-md  font-semibold text-black  transition-colors"
            >
              Go for auto
            </Link>
          </div>
        </div>

        {/* Minimal Comparison Table */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500">
                  <th className="py-3 font-normal">Feature</th>
                  <th className="py-3 font-normal">Automated</th>
                  <th className="py-3 font-normal">Manual</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Setup Time</td>
                  <td className="py-3">Minutes</td>
                  <td className="py-3 text-gray-500">Hours</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Customization</td>
                  <td className="py-3 text-gray-500">Limited</td>
                  <td className="py-3">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">Maintenance</td>
                  <td className="py-3">Minimal</td>
                  <td className="py-3 text-gray-500">High</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3">AI Insights</td>
                  <td className="py-3 text-[#4a90e2]">Included</td>
                  <td className="py-3 text-gray-500">Optional</td>
                </tr>
                <tr>
                  <td className="py-3">Learning Curve</td>
                  <td className="py-3">None</td>
                  <td className="py-3 text-gray-500">Moderate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
