"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StoreBadges } from "./StoreBadges";

export function DaBrainoHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#9B59B6]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#F39C12]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E91E8C]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] hidden lg:block"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F1C40F] to-[#F39C12] opacity-20 rotate-12" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-[12%] hidden lg:block"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#E91E8C] opacity-20" />
      </motion.div>
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-48 left-[25%] hidden lg:block"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#51CF66] to-[#40C057] opacity-15 -rotate-12" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9B59B6]/10 text-[#9B59B6] text-sm font-medium mb-6">
                <span>🎲</span> Free Educational Game
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="bg-gradient-to-r from-[#9B59B6] via-[#E91E8C] to-[#F39C12] bg-clip-text text-transparent">
                Math Bingo
              </span>
              <br />
              <span className="text-[#2D1B0E]">for Kids</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[#6B5744] mb-8 max-w-lg mx-auto lg:mx-0"
            >
              DaBraino turns math practice into an exciting bingo game for kids.
              13 topics, 3 difficulty levels, zero ads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center lg:justify-start"
            >
              <StoreBadges size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mt-6 justify-center lg:justify-start text-sm text-[#6B5744]"
            >
              <span className="flex items-center gap-1">
                <span className="text-[#51CF66]">✓</span> No ads
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#51CF66]">✓</span> No data collection
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#51CF66]">✓</span> COPPA-compliant
              </span>
            </motion.div>
          </div>

          {/* App mockup / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Glow behind the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9B59B6]/20 via-[#E91E8C]/20 to-[#F39C12]/20 rounded-3xl blur-2xl scale-110" />

              {/* App preview card */}
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-[#9B59B6]/10 p-6 md:p-8 w-[280px] sm:w-[320px] md:w-[360px]">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/dabraino/dabraino-logo.png"
                    alt="DaBraino"
                    width={56}
                    height={56}
                    className="rounded-2xl shadow-md"
                  />
                  <div>
                    <h2 className="font-bold text-[#2D1B0E] text-lg">DaBraino</h2>
                    <p className="text-xs text-[#6B5744]">Math Bingo for Kids</p>
                  </div>
                </div>

                {/* Mini bingo grid */}
                <div className="grid grid-cols-5 gap-1.5 mb-5">
                  {["B", "I", "N", "G", "O"].map((letter) => (
                    <div
                      key={letter}
                      className="aspect-square rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: "linear-gradient(135deg, #9B59B6, #E91E8C)" }}
                    >
                      {letter}
                    </div>
                  ))}
                  {Array.from({ length: 20 }, (_, i) => {
                    const answers = [12, 7, 24, 36, 15, 9, 42, 18, 6, "★", 30, 21, 8, 45, 27, 16, 54, 11, 33, 48];
                    const marked = [0, 4, 6, 9, 11, 14, 18];
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                          marked.includes(i)
                            ? "bg-[#51CF66]/20 text-[#2D7A3A] ring-1 ring-[#51CF66]/40"
                            : answers[i] === "★"
                            ? "bg-[#F1C40F]/20 text-[#F39C12]"
                            : "bg-[#FFF8F0] text-[#6B5744]"
                        }`}
                      >
                        {answers[i]}
                      </div>
                    );
                  })}
                </div>

                {/* Clue bubble */}
                <div className="bg-[#9B59B6]/5 rounded-xl p-3 border border-[#9B59B6]/10">
                  <p className="text-xs text-[#6B5744]">
                    <span className="font-semibold text-[#9B59B6]">Caller:</span>{" "}
                    &ldquo;If you have 6 groups of 4 pencils, how many pencils do you have?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
