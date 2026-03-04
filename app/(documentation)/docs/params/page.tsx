"use client";

import React from "react";

export default function ParameterDeepDiveDocs() {
  return (
    <div className="min-h-screen bg-[#121212] flex justify-center text-[#e0e0e0]  selection:bg-[#8cb4ff]/30 selection:text-white overflow-x-hidden">
      {/* Main Grid Layout */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-16 min-w-0">
        {/* Main Content Area */}
        <article className="max-w-none min-w-0 break-words">
          {/* Page Header */}
          <div className="mb-12 border-b border-[#333] pb-8">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Model Parameters: Anatomy & Distribution{" "}
              <span className="text-[#8cb4ff]">_</span>
            </h1>
            <p className="text-lg text-gray-200 font-normal leading-relaxed max-w-3xl tracking-wide m-0">
              When we say a model like Meta&apos;s Llama 3.2 has &quot;90
              Billion parameters,&quot; what does that actually mean? This guide
              explores the mathematical reality of parameters, how they are
              structurally distributed across a network, and the calculus-driven
              process that creates them.
            </p>
          </div>

          {/* Section 1: The Anatomy of a Parameter */}
          <section className="mb-16 min-w-0" id="anatomy">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              1. What Exactly Are Parameters?
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              At the most fundamental level, a parameter is simply a
              floating-point number (e.g.,{" "}
              <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                0.5431
              </code>{" "}
              or{" "}
              <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-sm border border-[#444]">
                -1.204
              </code>
              ). They are the internal configuration variables that an AI model
              uses to transform input data into predictions. They fall into two
              strict categories:{" "}
              <strong className="text-white font-semibold">Weights</strong> and{" "}
              <strong className="text-white font-semibold">Biases</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#1b1b1b] border border-[#333] rounded-sm p-6 sm:p-8 shadow-sm hover:border-[#444] transition-colors">
                <h4 className="font-semibold text-white mb-3 border-b border-[#333] pb-3 text-lg">
                  Weights (The Multipliers)
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  Weights determine the <em>strength</em> of a connection
                  between two neurons. If a neural network is modeled after a
                  biological brain, weights are the synapses. Mathematically, an
                  input signal is multiplied by a weight matrix. A higher weight
                  means the network considers that specific piece of data highly
                  relevant to the final output.
                </p>
              </div>

              <div className="bg-[#1b1b1b] border border-[#333] rounded-sm p-6 sm:p-8 shadow-sm hover:border-[#444] transition-colors">
                <h4 className="font-semibold text-white mb-3 border-b border-[#333] pb-3 text-lg">
                  Biases (The Constants)
                </h4>
                <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                  Biases are constant values added to the product of the weights
                  and inputs before the data is passed to an activation
                  function. They shift the activation threshold. Without a bias,
                  if an input value was 0, the output would be 0 regardless of
                  the weight. Biases allow the network flexibility to fire a
                  neuron even when baseline inputs are weak.
                </p>
              </div>
            </div>

            <div className="rounded-sm p-6 sm:p-8 mt-8 bg-[#1b1b1b] border-l-4 border-l-amber-500 border border-[#333] shadow-sm">
              <p className="text-gray-300 font-normal text-[15px] m-0 leading-relaxed">
                <strong className="text-white font-semibold">
                  Crucial Distinction:
                </strong>{" "}
                Do not confuse <em className="text-gray-200">Parameters</em>{" "}
                with <em className="text-gray-200">Hyperparameters</em>.
                Hyperparameters (like learning rate, batch size, or layer count)
                are the &quot;settings&quot; manually configured by human
                engineers. Parameters are the billions of internal numbers the
                machine learns and adjusts entirely on its own.
              </p>
            </div>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 2: Structural Distribution */}
          <section className="mb-16 min-w-0" id="distribution">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              2. How Parameters are Distributed
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              In a Large Language Model (LLM), 90 billion parameters are not
              stored in a random list; they are organized into highly structured
              matrices using linear algebra, distributed sequentially across
              dozens of &quot;Transformer Blocks.&quot;
            </p>

            <h3 className="text-lg font-semibold text-white mt-10 mb-4">
              The Transformer Hierarchy
            </h3>
            <ul className="space-y-6 bg-[#1b1b1b] border border-[#333] rounded-sm p-6 sm:p-8 shadow-sm text-gray-200 font-normal text-[15px] m-0">
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-semibold">
                    Embedding Layers:
                  </strong>{" "}
                  The first set of parameters acts as a massive dictionary. They
                  map raw text tokens into dense vector coordinates, placing
                  conceptually similar words closer together in a
                  high-dimensional mathematical space.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-semibold">
                    Attention Mechanisms (Q, K, V Matrices):
                  </strong>{" "}
                  A huge portion of parameters live here. The network
                  distributes weights into Query, Key, and Value matrices. These
                  parameters are solely dedicated to calculating how much
                  &quot;attention&quot; the current word should pay to every
                  other word in the user&apos;s prompt, allowing the model to
                  understand context and grammar.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#8cb4ff] mt-0.5 opacity-70">▹</span>
                <span>
                  <strong className="text-white font-semibold">
                    Feed-Forward Networks (MLPs):
                  </strong>{" "}
                  After attention is calculated, the signal passes through
                  Multi-Layer Perceptrons. If Attention parameters learn{" "}
                  <em className="text-gray-300">grammar and context</em>, MLP
                  parameters are generally believed to store the model&apos;s{" "}
                  <em className="text-gray-300">world knowledge and facts</em>.
                  These matrices are often massive (e.g., 4096 x 16384
                  dimensions), accounting for the bulk of the parameter count.
                </span>
              </li>
            </ul>
          </section>

          <hr className="my-12 border-[#333]" />

          {/* Section 3: The Forging Process (Training) */}
          <section className="mb-16 min-w-0" id="training-loop">
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">
              3. How Parameters Are Made (The Training Loop)
            </h2>
            <p className="text-gray-200 font-normal leading-relaxed mb-8 text-[16px]">
              Parameters are not programmed; they are{" "}
              <em className="text-gray-200">forged</em> through a repetitive,
              calculus-heavy optimization loop. The goal of training is to find
              the exact combination of billions of floating-point numbers that
              minimizes prediction errors.
            </p>

            <div className="space-y-8 mt-10 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#444] before:to-transparent">
              {/* Step A */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  A
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-sm border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Initialization (The Blank Slate)
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    Before training begins, all billions of parameters are
                    assigned completely random decimal values. At this stage, if
                    you ask the AI a question, it will output pure, mathematical
                    garbage.
                  </p>
                </div>
              </div>

              {/* Step B */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  B
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-sm border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Forward Pass & Loss Calculation
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    The model is fed a piece of text (e.g., &quot;The sky
                    is...&quot;) and it uses its randomized parameters to guess
                    the next word (e.g., &quot;banana&quot;). A{" "}
                    <strong className="text-gray-200 font-semibold">
                      Loss Function
                    </strong>{" "}
                    measures exactly how mathematically &quot;wrong&quot; this
                    guess is compared to the ground truth (&quot;blue&quot;).
                  </p>
                </div>
              </div>

              {/* Step C */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  C
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-sm border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Backpropagation (The Calculus)
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    This is the engine of modern AI. Using the Chain Rule of
                    calculus, the system works backward from the output layer to
                    the input layer. It calculates the{" "}
                    <em className="text-gray-200">Gradient</em>: finding out
                    precisely how much each of the billions of individual
                    weights and biases contributed to the error.
                  </p>
                </div>
              </div>

              {/* Step D */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-sm border border-[#444] bg-[#2d2d2d] text-[#8cb4ff] font-mono font-semibold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  D
                </div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-[#1b1b1b] p-6 rounded-sm border border-[#333] shadow-sm hover:border-[#444] transition-colors">
                  <h4 className="font-semibold text-white mb-2 text-lg">
                    Gradient Descent
                  </h4>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed m-0">
                    Once the system knows which parameters caused the error, an
                    optimization algorithm (like AdamW) microscopically nudges
                    those parameters in the opposite direction of the error. A
                    weight of{" "}
                    <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-xs border border-[#444]">
                      0.4501
                    </code>{" "}
                    might become{" "}
                    <code className="bg-[#2d2d2d] text-[#8cb4ff] px-1.5 py-0.5 rounded-sm font-mono text-xs border border-[#444]">
                      0.4502
                    </code>
                    . This entire loop is repeated trillions of times across
                    thousands of GPUs over several months until the parameters
                    settle into their optimal state.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Right Sidebar (Table of Contents Simulation) */}
        <aside className="hidden lg:block sticky top-24 h-fit min-w-0 border-l border-[#333] pl-6 py-2">
          <div className="text-xs font-mono font-semibold text-gray-100 uppercase tracking-widest mb-5 truncate">
            On this page
          </div>
          <nav className="flex flex-col gap-3.5 text-sm text-gray-200 font-normal">
            <a
              href="#anatomy"
              className="hover:text-[#8cb4ff] transition-colors truncate"
            >
              1. Anatomy of a Parameter
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#anatomy"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Weights vs. Biases
              </a>
              <a
                href="#anatomy"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Hyperparameters
              </a>
            </div>

            <a
              href="#distribution"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              2. Structural Distribution
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#distribution"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Transformer Blocks
              </a>
              <a
                href="#distribution"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Attention & MLPs
              </a>
            </div>

            <a
              href="#training-loop"
              className="hover:text-[#8cb4ff] transition-colors mt-2 truncate"
            >
              3. The Training Loop
            </a>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333]">
              <a
                href="#training-loop"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
              >
                Loss Calculation
              </a>
              <a
                href="#training-loop"
                className="text-gray-100 hover:text-[#8cb4ff] transition-colors truncate"
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
