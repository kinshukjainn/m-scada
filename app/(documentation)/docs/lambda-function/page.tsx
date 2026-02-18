import React from "react";

export default function LambdaFunctionUrlDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-orange-100 selection:text-orange-900">
      {/* Top Navigation Bar Simulation */}

      <main className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              AWS Lambda Function URL&apos;s
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              A deep dive into Lambda Function URLs: dedicated HTTPS endpoints
              for your serverless functions. Learn when to use them, how to lock
              them down securely, and how they compare to other invocation
              methods.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: What and Why */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              1. What is it & Why use it?
            </h2>
            <p className="text-gray-800 mb-4">
              Introduced in 2022, a <strong>Lambda Function URL</strong> is a
              built-in, dedicated HTTP(S) endpoint that AWS automatically
              assigns to your Lambda function (e.g.,{" "}
              <code>
                https://&lt;url-id&gt;.lambda-url.&lt;region&gt;.on.aws
              </code>
              ).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f38020]"></span>
              Why use it instead of API Gateway?
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2 ml-2 mb-6">
              <li>
                <strong>Zero Additional Cost:</strong> You only pay for the
                standard Lambda compute time. There is no API Gateway surcharge
                per million requests.
              </li>
              <li>
                <strong>Extended Timeouts:</strong> API Gateway enforces a
                strict 29-second maximum timeout. Function URLs inherit
                Lambda&apos;s maximum timeout, allowing connections to stay open
                for up to <strong>15 minutes</strong>—perfect for long-polling
                or heavy background processing.
              </li>
              <li>
                <strong>Simplicity:</strong> It is the fastest way to expose a
                single-function microservice, a webhook, or a server-side
                rendered application (like a Next.js backend) to the web.
              </li>
            </ul>
          </section>

          {/* Section 2: Security */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              2. The Safest Way to Use Function URLs
            </h2>
            <p className="text-gray-800 mb-4">
              By default, setting your Function URL authorization to{" "}
              <code>NONE</code> makes it completely public. To properly secure
              your infrastructure, you should implement the following
              multi-layered approach:
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  A. IAM Authentication (AWS_IAM)
                </h4>
                <p className="text-sm text-gray-800">
                  Always set the AuthType to <code>AWS_IAM</code> for internal
                  or sensitive APIs. This ensures the endpoint will only accept
                  HTTP requests that are cryptographically signed using the AWS
                  Signature Version 4 (SigV4) process by a valid IAM principal
                  with the <code>lambda:InvokeFunctionUrl</code> permission.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  B. CloudFront with Origin Access Control (OAC)
                </h4>
                <p className="text-sm text-gray-800">
                  Never expose the URL directly to end-users if it requires
                  caching or security filters. Place an{" "}
                  <strong>Amazon CloudFront</strong> distribution in front of
                  the Function URL. By using CloudFront OAC, you can strictly
                  configure the Lambda function to <em>only</em> accept traffic
                  routed through your specific CloudFront distribution, allowing
                  you to attach an AWS WAF (Web Application Firewall) to block
                  malicious IPs and DDoS attacks.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  C. Reserved Concurrency
                </h4>
                <p className="text-sm text-gray-800">
                  To prevent &quot;Denial of Wallet&quot; attacks (where a
                  malicious actor spams your URL to rack up your AWS bill), set
                  a <strong>Reserved Concurrency</strong> limit on the function.
                  This acts as a hard throttle, ensuring the function cannot
                  scale infinitely and consume all account resources if flooded
                  with traffic.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Other Invocation Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-[#f38020] pl-4">
              3. Other Ways to Invoke Lambda
            </h2>
            <p className="text-gray-800 mb-6">
              Function URLs are just one way to trigger code. AWS supports three
              primary invocation models depending on your architectural needs:
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
              <table className="min-w-full text-left text-sm text-gray-800">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                  <tr>
                    <th className="px-4 py-3">Invocation Type</th>
                    <th className="px-4 py-3">How it works</th>
                    <th className="px-4 py-3">Common Triggers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Synchronous
                    </td>
                    <td className="px-4 py-3">
                      The caller waits for the Lambda function to finish
                      processing and return a response immediately.
                    </td>
                    <td className="px-4 py-3 code-body text-xs">
                      API Gateway, Application Load Balancer (ALB), Amazon
                      Cognito
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Asynchronous
                    </td>
                    <td className="px-4 py-3">
                      AWS places the event in a queue and returns a success
                      response instantly. Lambda processes it in the background
                      and auto-retries on failure.
                    </td>
                    <td className="px-4 py-3 code-body text-xs">
                      Amazon S3 (file uploads), EventBridge, SNS, SES
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Event Source Mapping (Polling)
                    </td>
                    <td className="px-4 py-3">
                      Lambda actively polls a stream or queue for records and
                      processes them in batches synchronously.
                    </td>
                    <td className="px-4 py-3 code-body text-xs">
                      Amazon SQS, DynamoDB Streams, Amazon Kinesis
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a href="#" className="hover:text-[#f38020] transition-colors">
              1. What is it & Why use it?
            </a>
            <a href="#" className="hover:text-[#f38020] transition-colors">
              2. The Safest Way to Use It
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a href="#" className="hover:text-[#f38020] transition-colors">
                IAM Authentication
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                CloudFront OAC
              </a>
              <a href="#" className="hover:text-[#f38020] transition-colors">
                Reserved Concurrency
              </a>
            </div>
            <a href="#" className="hover:text-[#f38020] transition-colors">
              3. Other Ways to Invoke
            </a>
          </nav>
        </aside>
      </main>
    </div>
  );
}
