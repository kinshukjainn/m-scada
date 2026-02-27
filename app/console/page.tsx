import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Console */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Manual Console
              </h2>
              <p className="text-gray-800">
                You have full control and flexibility
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-3">
                How it works
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You control every aspect of data collection and analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Customize metrics, reports, and visualizations to your needs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Make informed decisions with complete transparency
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Integrate with your existing tools and workflows</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-3">
                Key Benefits
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Full customization and control</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Transparency in all processes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Integration with your existing systems</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>No dependency on external algorithms</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 p-4 bg-gray-100  border border-gray-400 rounded-lg">
              <h4 className="font-normal text-gray-900 mb-2">
                Full Customization
              </h4>
              <p className="text-sm text-gray-800">
                Build your perfect Console with complete control over every
                metric and visualization.
              </p>
            </div>

            <Link
              href="/console/manual"
              className="block w-full bg-black rounded-lg text-white w-max  text-center py-2 px-4  font-normal   transition-colors"
            >
              Manual Console
            </Link>
          </div>

          {/* Automated Console */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Automated Console
              </h2>
              <p className="text-gray-800">Let the system handle everything</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-3">
                How it works
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Automatically collects and processes all data in real-time
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Uses intelligent algorithms to identify patterns and
                    anomalies
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Generates insights and recommendations without human input
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Continuously learns and adapts to your usage patterns
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-normal text-gray-900 mb-3">
                Key Benefits
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>No manual configuration required</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Real-time data processing and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>AI-powered insights and predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Saves time and reduces manual work</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-400">
              <h4 className="font-normal text-gray-900 mb-2">
                Smart Analytics
              </h4>
              <p className="text-sm text-gray-800">
                Automatically tracks metrics and generates actionable insights
                tailored to your business.
              </p>
            </div>

            <Link
              href="/console/direct"
              className="block w-full bg-black rounded-lg text-white  text-center py-2 px-4  font-normal w-max  transition-colors"
            >
              Automated Console
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Comparison
          </h2>
          <p className="text-gray-800 text-center mb-8">
            See which approach works best for your needs
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-6 py-3 text-left font-normal text-gray-900">
                    Feature
                  </th>
                  <th className="border border-gray-200 px-6 py-3 text-left font-normal text-gray-900">
                    Automated
                  </th>
                  <th className="border border-gray-200 px-6 py-3 text-left font-normal text-gray-900">
                    Manual
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 font-normal text-gray-900">
                    Setup Time
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Minutes
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Hours
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4 font-normal text-gray-900">
                    Customization
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Limited
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 font-normal text-gray-900">
                    Maintenance
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Minimal
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    High
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4 font-normal text-gray-900">
                    AI Insights
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-green-600">
                    ✓
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    Optional
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 font-normal text-gray-900">
                    Learning Curve
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
                    None
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-gray-800">
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
