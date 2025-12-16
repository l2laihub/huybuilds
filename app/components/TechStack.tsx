"use client";

import { motion } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./ui/SectionReveal";

const techCategories = [
  {
    name: "AI / ML",
    techs: [
      { name: "GraphRAG", icon: "📊" },
      { name: "GPT-4", icon: "🤖" },
      { name: "Gemini 2.5", icon: "✨" },
      { name: "Claude", icon: "🧠" },
      { name: "LangChain", icon: "🔗" },
      { name: "Vector DBs", icon: "📐" },
    ],
  },
  {
    name: "Frontend",
    techs: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind", icon: "🎨" },
      { name: "Framer", icon: "🎬" },
    ],
  },
  {
    name: "Backend",
    techs: [
      { name: "Python", icon: "🐍" },
      { name: "FastAPI", icon: "⚡" },
      { name: "Node.js", icon: "🟢" },
      { name: "C# / .NET", icon: "🟣" },
      { name: "GraphQL", icon: "◈" },
    ],
  },
  {
    name: "Cloud",
    techs: [
      { name: "Azure", icon: "☁️" },
      { name: "AWS", icon: "🔶" },
      { name: "Vercel", icon: "▲" },
      { name: "Docker", icon: "🐳" },
      { name: "K8s", icon: "☸️" },
    ],
  },
  {
    name: "Data",
    techs: [
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Supabase", icon: "⚡" },
      { name: "Redis", icon: "🔴" },
      { name: "Cosmos DB", icon: "🌌" },
      { name: "Stripe", icon: "💳" },
    ],
  },
];

export function TechStack() {
  return (
    <section
      id="stack"
      className="py-16 md:py-24 lg:py-32 bg-[#111113] border-y border-[#27272a]"
    >
      <div className="container">
        {/* Section Header */}
        <SectionReveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
              // Tech Stack
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Tools of the Trade
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Deep expertise across the modern development ecosystem, from AI/ML to
            cloud infrastructure.
          </p>
        </SectionReveal>

        {/* Tech Categories */}
        <div className="space-y-8 md:space-y-12">
          {techCategories.map((category, catIndex) => (
            <SectionReveal key={category.name} delay={catIndex * 0.1}>
              <div>
                <h3 className="font-mono text-sm text-zinc-500 mb-4 uppercase tracking-wider">
                  {category.name}
                </h3>
                <StaggerContainer
                  className="flex flex-wrap gap-2 md:gap-3"
                  staggerDelay={0.05}
                >
                  {category.techs.map((tech) => (
                    <StaggerItem key={tech.name}>
                      <motion.div
                        whileHover={{
                          y: -4,
                          borderColor: "rgba(245, 158, 11, 0.5)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-[#161619] border border-[#27272a] rounded-lg hover:bg-[#1c1c20] transition-colors cursor-default"
                      >
                        <span className="text-lg md:text-xl">{tech.icon}</span>
                        <span className="font-mono text-xs md:text-sm text-zinc-300">
                          {tech.name}
                        </span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
