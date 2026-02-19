import {
  Activity,
  Code2,
  Cpu,
  TerminalSquare,
  CloudCog,
  ArrowRight,
  BookOpen,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function DocsLandingPage() {
  return (
    <article className="max-w-4xl pb-12 ">
      {/* ─── Page Header ─── */}
      <header className="mb-10 block">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Welcome to FDS Documentation
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed max-w-3xl">
          Explore our comprehensive guides, API references, and architecture
          breakdowns to understand, integrate, and contribute to the AI-Powered
          Fault Detection System (FDS.AI).
        </p>
      </header>

      <hr className="my-8 border-gray-200" />

      {/* ─── Quick Navigation Grid ─── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Explore the Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <Link
            href="/docs/project-info"
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 border border-blue-100 group-hover:bg-blue-100 transition-colors">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Project Information
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Understand the core mechanics of FDS.AI, types of faults detected,
              and the benefits of predictive maintenance in industrial
              landscapes.
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            href="/docs/rar"
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
              <Code2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
              API Routes
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Complete technical reference for our backend endpoints,
              request/response structures, and integration guidelines.
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/docs/about-model"
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4 border border-purple-100 group-hover:bg-purple-100 transition-colors">
              <Cpu className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Meta AI Model
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Deep dive into the machine learning architecture, threshold
              configurations, and anomaly detection algorithms.
            </p>
          </Link>

          {/* Card 4 */}
          <Link
            href="/docs/aws-services"
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4 border border-orange-100 group-hover:bg-orange-100 transition-colors">
              <CloudCog className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-between">
              Amazon Services{" (AWS)"}
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Learn how FDS utilizes Amazon Bedrock, Lambda, and serverless
              deployments to maintain high availability.
            </p>
          </Link>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* ─── Tech Stack Summary ─── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Architecture & Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          {/* Stack Column 1 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4" /> Core Frameworks
            </h3>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <strong>Next.js 16</strong> (App Router)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <strong>Node.js</strong> (v22)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <strong>Tailwind CSS</strong> (v4)
              </li>
            </ul>
          </div>

          {/* Stack Column 2 */}
          <div className="sm:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <CloudCog className="w-4 h-4" /> Infrastructure (AWS)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                <strong>Amplify:</strong> Serverless deployment
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                <strong>Bedrock:</strong> LLM integration
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                <strong>Lambda:</strong> Serverless functions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                <strong>CloudWatch:</strong> Monitoring & logs
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* ─── Footer / Next Steps ─── */}
      <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to contribute?
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed max-w-md">
              We welcome community contributions. Check out our repository setup
              guide, coding standards, and UI/UX guidelines to get started.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/docs/setup"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-2.5 rounded-lg transition-all"
            >
              <Github className="w-4 h-4" />
              Repository Setup
            </Link>
            <Link
              href="/docs/introduction"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Start Reading
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
