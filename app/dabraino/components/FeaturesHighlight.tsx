"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "@/app/components/ui/SectionReveal";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Clues",
    description:
      "Not just \"What is 7×8?\" — word problems, contextual stories, and reverse questions keep it fresh.",
    color: "#9B59B6",
  },
  {
    icon: "🔊",
    title: "Audio Caller",
    description:
      "A virtual bingo caller reads clues aloud with text backup, just like a real bingo hall.",
    color: "#E91E8C",
  },
  {
    icon: "💡",
    title: "Teaching Moments",
    description:
      "Wrong answers show the correct solution — \"7 × 8 = 56, not 54\" — never just \"wrong!\"",
    color: "#F39C12",
  },
  {
    icon: "⭐",
    title: "Stickers & Streaks",
    description:
      "Earn fun stickers for every win. Build streaks and track stats across all topics.",
    color: "#F1C40F",
  },
  {
    icon: "📶",
    title: "Works Offline",
    description:
      "After the first launch, DaBraino works completely offline. Play anywhere, anytime.",
    color: "#51CF66",
  },
  {
    icon: "🎲",
    title: "Randomized Cards",
    description:
      "Every bingo card is different. B-I-N-G-O columns, free center space — authentic bingo.",
    color: "#3498DB",
  },
];

export function FeaturesHighlight() {
  return (
    <section className="py-16 md:py-24 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-3">
            Why Kids Love It
          </h2>
          <p className="text-[#6B5744] text-lg max-w-2xl mx-auto">
            Modern design meets classic bingo fun
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="bg-white rounded-2xl p-6 border border-[#F0E6D8] hover:shadow-lg hover:shadow-[#9B59B6]/5 transition-all duration-300 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${feature.color}12` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-[#2D1B0E] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B5744] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
