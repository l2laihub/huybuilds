"use client";

import { motion } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./ui/SectionReveal";
import { AIIcon, CodeIcon, ServerIcon, DataIcon, RocketIcon, ConsultIcon } from "./icons/ServiceIcons";

const services = [
  {
    icon: AIIcon,
    title: "AI/ML Systems",
    description:
      "Custom AI solutions including RAG pipelines, LLM integrations, and intelligent automation. Built Microsoft's first production GraphRAG system.",
  },
  {
    icon: CodeIcon,
    title: "Full-Stack Development",
    description:
      "End-to-end web applications with modern frameworks. React, Next.js, Node.js, Python, and cloud-native architectures on Azure and AWS.",
  },
  {
    icon: ServerIcon,
    title: "Enterprise Systems",
    description:
      "Scalable backend services, API design, and system integrations. C#/.NET specialist with deep Azure expertise and performance optimization.",
  },
  {
    icon: DataIcon,
    title: "Data Pipelines",
    description:
      "ETL workflows, data processing systems, and analytics infrastructure. Transform raw data into actionable intelligence.",
  },
  {
    icon: RocketIcon,
    title: "MVP Development",
    description:
      "Rapid prototyping and product development. Shipped 7 production apps in 2025. Turn your idea into a working product fast.",
  },
  {
    icon: ConsultIcon,
    title: "Technical Consulting",
    description:
      "Architecture reviews, tech stack guidance, and performance audits. Leverage 15+ years of experience for your technical decisions.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container">
        {/* Section Header */}
        <SectionReveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
              // Services
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            What I Build
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            From AI-powered applications to enterprise systems, I deliver solutions
            that make a measurable impact.
          </p>
        </SectionReveal>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative h-full"
              >
                {/* Card */}
                <div className="relative h-full p-6 md:p-8 bg-[#161619] border border-[#27272a] rounded-2xl overflow-hidden transition-colors duration-300 hover:border-amber-500/50 hover:bg-[#1c1c20]">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="w-12 h-12 md:w-14 md:h-14 mb-5 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"
                  >
                    <service.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-mono text-lg md:text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
