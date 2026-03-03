import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Console */}
          <div className="border border-white/10 bg-white/[0.02] rounded-lg p-8 hover:shadow-2xl hover:bg-white/[0.04] transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Manual Console
              </h2>
              <p className="text-gray-400">
                You have full control and flexibility
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                How it works
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    You control every aspect of data collection and analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Customize metrics, reports, and visualizations to your needs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Make informed decisions with complete transparency
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>Integrate with your existing tools and workflows</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Key Benefits
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>Full customization and control</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>Transparency in all processes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>Integration with your existing systems</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>No dependency on external algorithms</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-medium text-white mb-2">
                Full Customization
              </h4>
              <p className="text-sm text-gray-400">
                Build your perfect Console with complete control over every
                metric and visualization.
              </p>
            </div>

            <Link
              href="/console/manual"
              className="block w-full bg-white rounded-lg text-black text-center py-2 px-4 font-medium hover:bg-gray-200 transition-colors"
            >
              Manual Console
            </Link>
          </div>

          {/* Automated Console */}
          <div className="border border-white/10 bg-white/[0.02] rounded-lg p-8 hover:shadow-2xl hover:bg-white/[0.04] transition-all">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Automated Console
              </h2>
              <p className="text-gray-400">Let the system handle everything</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                How it works
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Automatically collects and processes all data in real-time
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Uses intelligent algorithms to identify patterns and
                    anomalies
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Generates insights and recommendations without human input
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-500">•</span>
                  <span>
                    Continuously learns and adapts to your usage patterns
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Key Benefits
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>No manual configuration required</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>Real-time data processing and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>AI-powered insights and predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-400">✓</span>
                  <span>Saves time and reduces manual work</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">Smart Analytics</h4>
              <p className="text-sm text-gray-400">
                Automatically tracks metrics and generates actionable insights
                tailored to your business.
              </p>
            </div>

            <Link
              href="/console/direct"
              className="block w-full bg-[#8cb4ff] hover:bg-[#a6c6ff] rounded-lg text-black text-center py-2 px-4 font-medium transition-colors"
            >
              Automated Console
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Quick Comparison
          </h2>
          <p className="text-gray-400 text-center mb-8">
            See which approach works best for your needs
          </p>

          <div className="overflow-x-auto rounded-lg border border-white/10 shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="border-b border-white/10 px-6 py-4 text-left font-medium text-white">
                    Feature
                  </th>
                  <th className="border-b border-l border-white/10 px-6 py-4 text-left font-medium text-white">
                    Automated
                  </th>
                  <th className="border-b border-l border-white/10 px-6 py-4 text-left font-medium text-white">
                    Manual
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/[0.02]">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="border-b border-white/10 px-6 py-4 font-medium text-white">
                    Setup Time
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Minutes
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Hours
                  </td>
                </tr>
                <tr className="bg-white/[0.01] hover:bg-white/5 transition-colors">
                  <td className="border-b border-white/10 px-6 py-4 font-medium text-white">
                    Customization
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Limited
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Unlimited
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="border-b border-white/10 px-6 py-4 font-medium text-white">
                    Maintenance
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Minimal
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    High
                  </td>
                </tr>
                <tr className="bg-white/[0.01] hover:bg-white/5 transition-colors">
                  <td className="border-b border-white/10 px-6 py-4 font-medium text-white">
                    AI Insights
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-green-400 font-bold">
                    ✓
                  </td>
                  <td className="border-b border-l border-white/10 px-6 py-4 text-gray-400">
                    Optional
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    Learning Curve
                  </td>
                  <td className="border-l border-white/10 px-6 py-4 text-gray-400">
                    None
                  </td>
                  <td className="border-l border-white/10 px-6 py-4 text-gray-400">
                    Moderate
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
