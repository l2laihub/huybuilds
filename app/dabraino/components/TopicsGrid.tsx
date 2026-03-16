"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "@/app/components/ui/SectionReveal";

const categories = [
  {
    title: "Basic Math",
    topics: ["Addition", "Subtraction", "Multiplication", "Division"],
    grades: "K-5",
    icon: "➕",
    color: "#9B59B6",
    bg: "#9B59B6",
  },
  {
    title: "Fractions",
    topics: ["Add", "Subtract", "Multiply", "Divide"],
    grades: "3-7",
    icon: "🔢",
    color: "#E91E8C",
    bg: "#E91E8C",
  },
  {
    title: "Decimals",
    topics: ["Add", "Subtract", "Multiply", "Divide"],
    grades: "4-7",
    icon: "📊",
    color: "#F39C12",
    bg: "#F39C12",
  },
  {
    title: "Trivia",
    topics: ["US States & Capitals"],
    grades: "3-7",
    icon: "🗺️",
    color: "#51CF66",
    bg: "#51CF66",
  },
];

export function TopicsGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-3">
            13 Topics to Explore
          </h2>
          <p className="text-[#6B5744] text-lg max-w-2xl mx-auto">
            3 difficulty levels each. Endless replay.
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <StaggerItem key={cat.title}>
              <div
                className="relative rounded-2xl p-5 overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                style={{ background: `${cat.bg}08`, border: `1px solid ${cat.bg}20` }}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold mb-1" style={{ color: cat.color }}>
                  {cat.title}
                </h3>
                <p className="text-xs font-medium text-[#6B5744] mb-3">
                  Grades {cat.grades}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: `${cat.bg}12`,
                        color: cat.color,
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
