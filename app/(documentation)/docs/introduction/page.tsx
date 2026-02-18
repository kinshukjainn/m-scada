import {
  Activity,
  BrainCircuit,
  Cpu,
  Factory,
  TerminalSquare,
  CloudCog,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <article className="max-w-4xl pb-12">
      {/* ─── Page Header ─── */}
      <header className="mb-10 block">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Introduction to FDS.AI
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed max-w-3xl">
          Welcome to the Fault Detection System With AI (FDS.AI). FDS is an
          automated process that monitors systems and applications to identify
          abnormalities, errors, or potential failures before they impact
          operations.
        </p>
      </header>

      <hr className="my-8 border-gray-200" />

      {/* ─── Core Concepts Grid ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Card 1 */}
        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            How it Works
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            The system continuously monitors your infrastructure, collecting
            metrics and logs. Using machine learning models and predefined
            rules, it analyzes this data in real-time to detect anomalies. When
            an issue is detected, notifications are sent to configured channels
            immediately.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 border border-indigo-100">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            AI-Powered Detection
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            Utilizes advanced artificial intelligence and ML algorithms to
            automatically identify, diagnose, and predict equipment failures and
            system anomalies before they cause significant damage or costly
            downtime.
          </p>
        </div>
      </section>

      {/* ─── Industry Context ─── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Factory className="w-6 h-6 text-gray-400" />
          The Indian Industrial Landscape
        </h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          In the Indian industrial sector—where manufacturing, power generation,
          and infrastructure development are experiencing rapid, unprecedented
          growth—fault detection systems play a crucial role. FDS.AI is designed
          to maintain high operational efficiency and heavily reduce costly
          breakdowns across these expanding sectors.
        </p>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* ─── Tech Stack ─── */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Architecture & Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Stack Column 1 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4" /> Core & Frontend
            </h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>
                <strong>Next.js 16</strong> (App Router / Turbopack)
              </li>
              <li>
                <strong>Node.js</strong> (v22)
              </li>
              <li>
                <strong>Tailwind CSS</strong> (v4)
              </li>
              <li>
                <strong>Shadcn UI</strong>
              </li>
              <li>Lucide React & React Icons</li>
              <li>Framer Motion</li>
            </ul>
          </div>

          {/* Stack Column 2 */}
          <div className="sm:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <CloudCog className="w-4 h-4" /> Amazon Web Services (AWS)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
              <li>
                <strong>AWS Amplify:</strong> Serverless deployment
              </li>
              <li>
                <strong>Amazon Bedrock:</strong> LLM integration
              </li>
              <li>
                <strong>AWS Lambda:</strong> Serverless functions
              </li>
              <li>
                <strong>Amazon CloudWatch:</strong> Monitoring & logs
              </li>
              <li>
                <strong>Amazon Route53:</strong> Domain management
              </li>
              <li>
                <strong>AWS Cloud:</strong> General deployment
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* ─── Footer / Next Steps ─── */}
      <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Getting Started & Contributions
        </h2>
        <p className="text-sm text-gray-800 mb-4 leading-relaxed">
          Want to contribute to the project? Please refer to our contribution
          guidelines or dive deeper into the technical architecture. Maintained
          by <strong>Kinshuk-Jain-Website</strong>.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/repo-setup"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-white border border-gray-200 hover:border-blue-300 px-4 py-2 rounded-lg transition-colors"
          >
            <Cpu className="w-4 h-4" />
            Contribution Guide
          </Link>
          <Link
            href="/docs/project-info"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            Project Info
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
