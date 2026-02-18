import React from "react";

export default function ParameterDeepDiveDocs() {
  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Top Navigation Bar Simulation */}

      {/* Main Grid Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-8 lg:gap-12 min-w-0">
        {/* Main Content Area */}
        <article className="prose prose-gray max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Model Parameters: Anatomy & Distribution
            </h1>
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
              When we say a model like Meta&apos;s Llama 3.2 has &quot;90
              Billion parameters,&quot; what does that actually mean? This guide
              explores the mathematical reality of parameters, how they are
              structurally distributed across a network, and the calculus-driven
              process that creates them.
            </p>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* Section 1: The Anatomy of a Parameter */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              1. What Exactly Are Parameters?
            </h2>
            <p className="text-gray-800 mb-6">
              At the most fundamental level, a parameter is simply a
              floating-point number (e.g., <code>0.5431</code> or{" "}
              <code>-1.204</code>). They are the internal configuration
              variables that an AI model uses to transform input data into
              predictions. They fall into two strict categories:{" "}
              <strong>Weights</strong> and <strong>Biases</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">
                  Weights (The Multipliers)
                </h4>
                <p className="text-sm text-gray-800">
                  Weights determine the <em>strength</em> of a connection
                  between two neurons. If a neural network is modeled after a
                  biological brain, weights are the synapses. Mathematically, an
                  input signal is multiplied by a weight matrix. A higher weight
                  means the network considers that specific piece of data highly
                  relevant to the final output.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">
                  Biases (The Constants)
                </h4>
                <p className="text-sm text-gray-800">
                  Biases are constant values added to the product of the weights
                  and inputs before the data is passed to an activation
                  function. They shift the activation threshold. Without a bias,
                  if an input value was 0, the output would be 0 regardless of
                  the weight. Biases allow the network flexibility to fire a
                  neuron even when baseline inputs are weak.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 text-sm text-blue-900">
              <strong>Crucial Distinction:</strong> Do not confuse{" "}
              <em>Parameters</em> with <em>Hyperparameters</em>. Hyperparameters
              (like learning rate, batch size, or layer count) are the
              &quot;settings&quot; manually configured by human engineers.
              Parameters are the billions of internal numbers the machine learns
              and adjusts entirely on its own.
            </div>
          </section>

          {/* Section 2: Structural Distribution */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              2. How Parameters are Distributed
            </h2>
            <p className="text-gray-800 mb-4">
              In a Large Language Model (LLM), 90 billion parameters are not
              stored in a random list; they are organized into highly structured
              matrices using linear algebra, distributed sequentially across
              dozens of &quot;Transformer Blocks.&quot;
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
              The Transformer Hierarchy
            </h3>
            <ul className="list-disc list-inside text-gray-800 space-y-4 ml-1 sm:ml-2">
              <li className="pl-2">
                <strong>Embedding Layers:</strong> The first set of parameters
                acts as a massive dictionary. They map raw text tokens into
                dense vector coordinates, placing conceptually similar words
                closer together in a high-dimensional mathematical space.
              </li>
              <li className="pl-2">
                <strong>Attention Mechanisms (Q, K, V Matrices):</strong> A huge
                portion of parameters live here. The network distributes weights
                into Query, Key, and Value matrices. These parameters are solely
                dedicated to calculating how much &quot;attention&quot; the
                current word should pay to every other word in the user&apos;s
                prompt, allowing the model to understand context and grammar.
              </li>
              <li className="pl-2">
                <strong>Feed-Forward Networks (MLPs):</strong> After attention
                is calculated, the signal passes through Multi-Layer
                Perceptrons. If Attention parameters learn{" "}
                <em>grammar and context</em>, MLP parameters are generally
                believed to store the model&apos;s{" "}
                <em>world knowledge and facts</em>. These matrices are often
                massive (e.g., 4096 x 16384 dimensions), accounting for the bulk
                of the parameter count.
              </li>
            </ul>
          </section>

          {/* Section 3: The Forging Process (Training) */}
          <section className="mb-12 sm:mb-14 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">
              3. How Parameters Are Made (The Training Loop)
            </h2>
            <p className="text-gray-800 mb-6">
              Parameters are not programmed; they are <em>forged</em> through a
              repetitive, calculus-heavy optimization loop. The goal of training
              is to find the exact combination of billions of floating-point
              numbers that minimizes prediction errors.
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 text-gray-800 flex items-center justify-center font-bold text-sm">
                  A
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Initialization (The Blank Slate)
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    Before training begins, all billions of parameters are
                    assigned completely random decimal values. At this stage, if
                    you ask the AI a question, it will output pure, mathematical
                    garbage.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 text-gray-800 flex items-center justify-center font-bold text-sm">
                  B
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Forward Pass & Loss Calculation
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    The model is fed a piece of text (e.g., &quot;The sky
                    is...&quot;) and it uses its randomized parameters to guess
                    the next word (e.g., &quot;banana&quot;). A{" "}
                    <strong>Loss Function</strong> measures exactly how
                    mathematically &quot;wrong&quot; this guess is compared to
                    the ground truth (&quot;blue&quot;).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold text-sm">
                  C
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Backpropagation (The Calculus)
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    This is the engine of modern AI. Using the Chain Rule of
                    calculus, the system works backward from the output layer to
                    the input layer. It calculates the <em>Gradient</em>:
                    finding out precisely how much each of the billions of
                    individual weights and biases contributed to the error.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 border border-green-200 text-green-700 flex items-center justify-center font-bold text-sm">
                  D
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg m-0">
                    Gradient Descent
                  </h4>
                  <p className="text-gray-800 mt-1 sm:mt-2 text-sm leading-relaxed">
                    Once the system knows which parameters caused the error, an
                    optimization algorithm (like AdamW) microscopically nudges
                    those parameters in the opposite direction of the error. A
                    weight of <code>0.4501</code> might become{" "}
                    <code>0.4502</code>. This entire loop is repeated trillions
                    of times across thousands of GPUs over several months until
                    the parameters settle into their optimal state.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0">
          <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3 text-sm text-gray-800">
            <a
              href="#"
              className="hover:text-blue-600 transition-colors truncate"
            >
              1. Anatomy of a Parameter
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Weights vs. Biases
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Hyperparameters
              </a>
            </div>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors mt-2 truncate"
            >
              2. Structural Distribution
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Transformer Blocks
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Attention & MLPs
              </a>
            </div>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors mt-2 truncate"
            >
              3. The Training Loop
            </a>
            <div className="flex flex-col gap-2 pl-4 border-l border-gray-200">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Loss Calculation
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors truncate"
              >
                Backpropagation
              </a>
            </div>
          </nav>
        </aside>
      </main>
    </div>
  );
}
