export default function ScadaVsModernAppDocs() {
  return (
    <div className="min-h-screen  text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content Area */}
        <article className="prose prose-slate max-w-none">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              SCADA vs. Modern Cloud Architecture
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed">
              Understanding the traditional working of SCADA (Supervisory
              Control and Data Acquisition), how it detects faults, and why
              modern Serverless + AI architectures are redefining industrial
              software.
            </p>
          </div>

          <hr className="border-slate-200 my-8" />

          {/* Section 1: How SCADA Works */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">
              1. What is SCADA & How Does It Work?
            </h2>
            <p className="text-slate-700 mb-6">
              SCADA is a control system architecture heavily used in industries
              like water treatment, oil and gas, and manufacturing. It is
              designed to gather real-time data from remote physical locations
              to control equipment and conditions.
            </p>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                The 4 Core Components of SCADA:
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li>
                  <strong>1. Sensors & Actuators:</strong> The physical devices.
                  Sensors measure things (temperature, pressure, flow), and
                  actuators do things (open valves, start motors).
                </li>
                <li>
                  <strong>2. RTUs / PLCs:</strong> Remote Terminal Units or
                  Programmable Logic Controllers. These act as local
                  micro-computers. They read the sensor data, convert it to
                  digital signals, and can execute basic local logic (e.g.,
                  &quot;stop the motor if it gets too hot&quot;).
                </li>
                <li>
                  <strong>3. Communication Network:</strong> The wiring that
                  connects everything. Historically, this used radio, serial
                  cables, or proprietary industrial protocols like Modbus or
                  DNP3.
                </li>
                <li>
                  <strong>4. Master Terminal Unit (MTU) / HMI:</strong> The
                  central software system and Human-Machine Interface. This is
                  the computer screen where human operators sit to monitor the
                  entire plant visually.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Fault Detection */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-4">
              2. How SCADA Detects Faults Internally
            </h2>
            <p className="text-slate-700 mb-4">
              SCADA systems are incredibly reliable, but their fault detection
              is strictly <strong>rule-based and reactive</strong>. They
              generally rely on a continuous &quot;polling&quot; loop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2">
                  Threshold Alarming
                </h4>
                <p className="text-sm text-indigo-800">
                  The SCADA MTU constantly asks the PLCs for current values
                  (e.g., every 1 second). If a value breaches a hard-coded limit
                  (e.g., Pressure {">"} 500 PSI), the system triggers an
                  immediate visual and auditory alarm on the HMI.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2">
                  State Mismatches
                </h4>
                <p className="text-sm text-indigo-800">
                  If the SCADA software sends a command to &quot;Open Valve
                  A&quot;, it waits for a confirmation signal from the sensor.
                  If it doesn&apos;t receive the &quot;Valve is Open&quot;
                  signal within a strict timeout period, it logs a mechanical
                  fault.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Why it is Not Modern */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-indigo-500 pl-4">
              3. Why is SCADA Considered &quot;Not Modern&quot;?
            </h2>
            <p className="text-slate-700 mb-6">
              While SCADA is essential for critical infrastructure, its
              fundamental software architecture was designed decades before the
              cloud existed.
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-3 ml-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <li>
                <strong>Monolithic & On-Premise:</strong> SCADA software is
                usually installed on massive, expensive servers sitting in a
                physical control room. You can&apos;t just access it securely
                from an iPhone halfway across the world.
              </li>
              <li>
                <strong>Lack of Predictive Intelligence:</strong> SCADA tells
                you a machine <em>has</em> broken. It cannot look at historical
                trends using Machine Learning to tell you a machine{" "}
                <em>will</em> break next week.
              </li>
              <li>
                <strong>Proprietary Silos:</strong> Different vendors use
                different, closed-source protocols. Getting a Siemens PLC to
                talk to an Allen-Bradley PLC often requires expensive
                middleware. It lacks the universal standard of RESTful HTTP
                APIs.
              </li>
              <li>
                <strong>Security through Isolation:</strong> SCADA systems are
                notoriously vulnerable to cyberattacks (like Stuxnet). Their
                primary defense is &quot;air-gapping&quot; (literally unplugging
                them from the internet), which prevents modern remote
                management.
              </li>
            </ul>
          </section>

          {/* Section 4: Modern App vs SCADA */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-indigo-500 pl-4">
              4. Your Modern App vs. Traditional SCADA
            </h2>
            <p className="text-slate-700 mb-6">
              If we compare standard SCADA to the modern AWS architecture we
              discussed (Amplify → API Gateway → Lambda → Bedrock), the
              differences in system design are staggering.
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                  <tr>
                    <th className="px-5 py-4">Feature</th>
                    <th className="px-5 py-4 w-2/5">Traditional SCADA</th>
                    <th className="px-5 py-4 w-2/5">
                      Your Modern AI Architecture
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-normal text-slate-900">
                      Infrastructure
                    </td>
                    <td className="px-5 py-4">
                      Physical, on-premise servers. Fixed compute limits.
                    </td>
                    <td className="px-5 py-4 font-normal text-indigo-700">
                      100% Serverless. Infinite auto-scaling via AWS Lambda.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-normal text-slate-900">
                      Communication
                    </td>
                    <td className="px-5 py-4">
                      Polling loops over heavy, proprietary protocols (Modbus).
                    </td>
                    <td className="px-5 py-4 font-normal text-indigo-700">
                      Event-driven triggers over standard HTTP/WebSockets via
                      API Gateway.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-normal text-slate-900">
                      Fault Detection
                    </td>
                    <td className="px-5 py-4">
                      Reactive. Hard-coded &quot;If X {"&"} Y; thresholds.
                    </td>
                    <td className="px-5 py-4 font-normal text-indigo-700">
                      Predictive. AWS Bedrock/AI can analyze patterns and
                      predict anomalies before they happen.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-normal text-slate-900">
                      Updates & UI
                    </td>
                    <td className="px-5 py-4">
                      Clunky HMIs. Requires shutting down systems to patch
                      software.
                    </td>
                    <td className="px-5 py-4 font-normal text-indigo-700">
                      Sleek Next.js interfaces deployed instantly via Amplify
                      CI/CD with zero downtime.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block sticky top-12 h-fit">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-slate-600 font-normal">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              1. What is SCADA?
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              2. Fault Detection
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              3. Why it is Not Modern
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              4. Your App vs SCADA
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
