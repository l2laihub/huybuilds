"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "@/app/components/ui/SectionReveal";

const steps = [
  {
    number: "1",
    icon: "🎯",
    title: "Pick a Topic & Difficulty",
    description:
      "Choose from 13 topics across math, fractions, decimals, and trivia. Select Easy, Medium, or Hard.",
    color: "#9B59B6",
  },
  {
    number: "2",
    icon: "🎧",
    title: "Listen & Tap Answers",
    description:
      "The virtual caller reads creative clues — word problems, stories, and more. Find and tap the answer on your bingo card.",
    color: "#E91E8C",
  },
  {
    number: "3",
    icon: "🎉",
    title: "BINGO! Earn Stickers",
    description:
      "Get five in a row and call BINGO! Earn fun stickers, build streaks, and track your progress.",
    color: "#F39C12",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-3">
            How It Works
          </h2>
          <p className="text-[#6B5744] text-lg max-w-2xl mx-auto">
            Three simple steps to make math fun
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="relative text-center p-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg"
                  style={{
                    background: `${step.color}12`,
                    boxShadow: `0 8px 24px ${step.color}15`,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute top-0 right-1/2 translate-x-[52px] -translate-y-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-[#2D1B0E] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6B5744] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
