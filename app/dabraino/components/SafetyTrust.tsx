"use client";

import { SectionReveal, StaggerContainer, StaggerItem } from "@/app/components/ui/SectionReveal";

const badges = [
  { icon: "🚫", label: "No Ads — Ever", color: "#E74C3C" },
  { icon: "🔒", label: "No Data Collection", color: "#9B59B6" },
  { icon: "👤", label: "No Accounts Required", color: "#3498DB" },
  { icon: "📵", label: "No Tracking", color: "#E91E8C" },
  { icon: "✅", label: "COPPA-Compliant", color: "#51CF66" },
  { icon: "💚", label: "100% Free", color: "#2ECC71" },
];

export function SafetyTrust() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionReveal className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-3">
            Built for Kids. Safe by Design.
          </h2>
          <p className="text-[#6B5744] text-lg max-w-2xl mx-auto">
            Parents can feel confident — DaBraino puts children&rsquo;s safety first
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <StaggerItem key={badge.label}>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#F0E6D8] hover:shadow-md transition-shadow duration-300">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3"
                  style={{ background: `${badge.color}12` }}
                >
                  {badge.icon}
                </div>
                <span className="text-xs font-semibold text-[#2D1B0E]">
                  {badge.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
