"use client";

import { motion } from "framer-motion";
import { CodeWindow } from "./ui/CodeWindow";
import { CountUp } from "./ui/CountUp";
import { MagneticButton } from "./ui/MagneticButton";
import { AnimatedText } from "./ui/AnimatedText";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 7, suffix: "", label: "Apps in 2025" },
  { value: 50, suffix: "%", label: "LLM Cost Reduced" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 md:w-12 h-0.5 bg-amber-500" />
              <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
                Senior Software Engineer
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              <AnimatedText
                text="I build intelligent systems that solve real problems."
                className="text-white"
                delay={0.2}
              />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-zinc-400 mb-8 max-w-xl leading-relaxed"
            >
              15+ years crafting enterprise software. Specializing in AI/ML systems,
              GraphRAG, and turning complex challenges into elegant solutions.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-8 md:gap-12 mb-10"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-amber-500">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton href="#contact">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 text-zinc-900 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40">
                  Start a Project
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </MagneticButton>

              <MagneticButton href="#projects">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-700 text-white rounded-lg font-medium hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-200">
                  View Work
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Code Window */}
          <div className="order-1 lg:order-2">
            <CodeWindow />
          </div>
        </div>
      </div>

      {/* Availability Badge - Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-6 right-6 z-30 md:hidden"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-zinc-400">Available</span>
        </div>
      </motion.div>
    </section>
  );
}
