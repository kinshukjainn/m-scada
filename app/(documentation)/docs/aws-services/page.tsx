import React from "react";

export default function AWSServicesDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900">
      {/* Top Navigation Bar Simulation */}
      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              AWS Cloud Infrastructure
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              This application leverages a modern, serverless architecture to
              ensure high availability, reduced operational overhead, and
              scalable performance. Below is a detailed breakdown of the two
              primary Amazon Web Services (AWS) powering the backend logic and
              artificial intelligence integrations.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* AWS Lambda Section */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. AWS Lambda (Serverless Compute)
            </h2>
            <p className="text-gray-800 mb-4">
              AWS Lambda is an event-driven, serverless computing service that
              allows us to run application code without the need to provision or
              manage any underlying servers.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              How It Works
            </h3>
            <p className="text-gray-800 mb-4">
              Instead of keeping an active server running 24/7 (which consumes
              resources and incurs costs even when idle), Lambda executes code
              strictly in response to specific <strong>triggers</strong> or{" "}
              <strong>events</strong>. These events can be an incoming HTTP
              request via API Gateway, a file uploaded to an S3 bucket, or a
              change in a database table. When triggered, AWS instantly spins up
              an isolated execution environment, runs our function, and then
              spins it back down.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Why We Use It
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-2 mb-6">
              <li>
                <strong>Zero Infrastructure Management:</strong> There is no OS
                to patch, no auto-scaling groups to configure, and no servers to
                maintain.
              </li>
              <li>
                <strong>Automatic Scaling:</strong> If the application receives
                one request, Lambda spins up one instance. If it receives 10,000
                simultaneous requests, Lambda scales out seamlessly to handle
                the exact load.
              </li>
              <li>
                <strong>Pay-as-you-go Pricing:</strong> We are billed down to
                the millisecond strictly for the compute time consumed while the
                code is actively executing.
              </li>
            </ul>
          </section>

          {/* Amazon Bedrock Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. Amazon Bedrock (Generative AI)
            </h2>
            <p className="text-gray-800 mb-4">
              Amazon Bedrock is a fully managed, serverless platform that
              simplifies the process of building and scaling generative AI
              applications. It acts as a unified hub to access high-performing
              Foundation Models (FMs) from top AI startups and Amazon itself.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              How It Works
            </h3>
            <p className="text-gray-800 mb-4">
              Traditionally, integrating Large Language Models (LLMs) requires
              provisioning expensive, GPU-heavy infrastructure to host the
              models. Bedrock abstracts this away entirely. Through a single,
              unified API, developers can send prompts and retrieve responses
              from a diverse catalog of models (such as Anthropic&apos;s Claude,
              Meta&apos;s Llama, or Amazon&apos;s Titan) without managing the
              underlying machine learning hardware.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Why We Use It
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-2 mb-6">
              <li>
                <strong>Model Agnostic:</strong> Because it provides a unified
                API, we can easily swap out underlying AI models as new, better
                versions are released without having to rewrite our
                application&apos;s integration code.
              </li>
              <li>
                <strong>Data Privacy & Security:</strong> Prompts, responses,
                and fine-tuning data are securely isolated within our AWS
                Virtual Private Cloud (VPC) and are not used to train base
                models, ensuring compliance and enterprise-grade security.
              </li>
              <li>
                <strong>Native Orchestration:</strong> We use Bedrock alongside
                AWS Lambda to orchestrate complex &quot;Agentic&quot;
                workflows—where the AI can intelligently trigger Lambda
                functions to fetch live data or execute tasks on behalf of the
                user.
              </li>
            </ul>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents Simulation) */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a href="#" className="hover:text-[#f38020] transition-colors">
              1. AWS Lambda
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-[#f38020] transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Why We Use It
              </a>
            </div>
            <a href="#" className="hover:text-[#f38020] transition-colors mt-2">
              2. Amazon Bedrock
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-[#f38020] transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Why We Use It
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
