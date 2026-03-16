"use client";

import { SectionReveal } from "@/app/components/ui/SectionReveal";

export function AboutStory() {
  return (
    <section className="py-16 md:py-24 bg-white/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F39C12]/10 text-[#F39C12] text-sm font-medium mb-6">
              <span>👨‍👩‍👦</span> Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-6">
              Made with Love by a Small Team
            </h2>
            <p className="text-lg text-[#6B5744] leading-relaxed mb-4">
              DaBraino was built by a husband-and-wife team — a software engineer
              and a math tutor — for their own tutoring students.
            </p>
            <p className="text-[#6B5744] leading-relaxed">
              We wanted a modern, fun, and safe math bingo app that actually felt
              like playing bingo. Not a faceless corporation — just two people who
              care about helping kids learn math while having a blast.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
