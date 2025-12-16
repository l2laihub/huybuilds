"use client";

import { motion } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "./ui/SectionReveal";
import { CountUp } from "./ui/CountUp";
import {
  MTACLogo,
  RollFlowLogo,
  FaceSenseiLogo,
  SheetMagicLogo,
  ABLMeditationLogo,
  PortraitsAILogo,
  ClockFlowLogo,
} from "./icons/ProjectLogos";
import { ComponentType } from "react";

interface Metric {
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  metrics: Metric[];
  featured?: boolean;
  url?: string;
  Logo: ComponentType<{ className?: string }>;
}

const projects: Project[] = [
  {
    title: "MTAC Intel Copilot",
    description:
      "Led development of Microsoft's first production system implementing GraphRAG technology. Built for intelligence analysis with quantifiable workflow improvements.",
    tags: ["GraphRAG", "Azure", "Python", "GPT-4"],
    metrics: [
      { value: 50, suffix: "%", label: "Faster Analysis" },
      { value: 60, suffix: "%", label: "Cost Reduction" },
      { label: "1st Production GraphRAG" },
    ],
    featured: true,
    Logo: MTACLogo,
  },
  {
    title: "RollFlow",
    description:
      "BJJ gym management platform with intelligent tournament analytics, SmoothComp integration, automated billing, and comprehensive member management.",
    tags: ["SaaS", "React", "Stripe", "Supabase"],
    metrics: [
      { label: "SmoothComp Integration" },
      { label: "Tournament Analytics" },
    ],
    url: "https://rollflow.app",
    Logo: RollFlowLogo,
  },
  {
    title: "FaceSensei",
    description:
      "AI-powered face yoga coaching app with real-time feedback. Uses computer vision and Google Gemini for personalized exercise guidance.",
    tags: ["AI", "Gemini 2.5", "MediaPipe", "Next.js"],
    metrics: [{ label: "468-Point Face Analysis" }],
    url: "https://facesensei.app",
    Logo: FaceSenseiLogo,
  },
  {
    title: "SheetMagic",
    description:
      "AI math worksheet generator creating customized practice problems. Helps teachers and parents generate grade-appropriate materials instantly.",
    tags: ["AI", "Claude", "EdTech", "PDF"],
    metrics: [{ label: "K-6 Grade Levels" }, { label: "50+ Standards" }],
    url: "https://sheetmagic.app",
    Logo: SheetMagicLogo,
  },
  {
    title: "ABL Meditation",
    description:
      "Full-stack wellness web app with PWA capabilities. Complete meditation platform with progress tracking and push notifications.",
    tags: ["Freelance", "FastAPI", "PWA", "Supabase"],
    metrics: [{ label: "12-Week Delivery" }, { label: "Client Project" }],
    url: "https://ablmeditation.app",
    Logo: ABLMeditationLogo,
  },
  {
    title: "PortraitsAI",
    description:
      "AI-powered portrait generation application. Transform photos into artistic portraits using advanced image generation models.",
    tags: ["AI", "Image Gen", "React"],
    metrics: [],
    url: "https://portraitsai.app",
    Logo: PortraitsAILogo,
  },
  {
    title: "ClockFlow",
    description:
      "Time tracking application for freelancers and teams. Track hours, manage projects, and generate reports with ease.",
    tags: ["Productivity", "React", "Supabase"],
    metrics: [],
    url: "https://clockflow.app",
    Logo: ClockFlowLogo,
  },
];

export function Projects() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 relative">
      <div className="container">
        {/* Section Header */}
        <SectionReveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
              // Portfolio
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Recent Work
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A selection of projects showcasing AI innovation, system design, and
            rapid product development.
          </p>
        </SectionReveal>

        {/* Featured Project */}
        {featuredProject && (
          <SectionReveal className="mb-8">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="relative overflow-hidden bg-[#161619] border border-[#27272a] rounded-2xl hover:border-amber-500/50 transition-colors duration-300">
                <div className="grid md:grid-cols-2 gap-6 md:gap-0">
                  {/* Logo area */}
                  <div className="relative h-48 md:h-full min-h-[250px] bg-gradient-to-br from-[#1c1c20] to-[#111113] flex items-center justify-center overflow-hidden">
                    <featuredProject.Logo className="w-32 h-32 md:w-40 md:h-40" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2.5 py-1 text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                        FEATURED
                      </span>
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono bg-[#111113] text-zinc-500 border border-[#27272a] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-mono text-xl md:text-2xl font-semibold text-white mb-3">
                      {featuredProject.title}
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-6 pt-4 border-t border-[#27272a]">
                      {featuredProject.metrics.map((metric, i) => (
                        <div key={i}>
                          {metric.value !== undefined ? (
                            <div className="font-mono text-xl md:text-2xl font-bold text-amber-500">
                              <CountUp
                                value={metric.value}
                                prefix={metric.prefix}
                                suffix={metric.suffix}
                              />
                            </div>
                          ) : null}
                          <div className="text-xs text-zinc-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        )}

        {/* Other Projects Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          staggerDelay={0.1}
        >
          {otherProjects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group block h-full"
              >
                <div className="relative h-full overflow-hidden bg-[#161619] border border-[#27272a] rounded-2xl hover:border-amber-500/50 transition-colors duration-300">
                  {/* Logo area */}
                  <div className="h-32 md:h-40 bg-gradient-to-br from-[#1c1c20] to-[#111113] flex items-center justify-center relative overflow-hidden">
                    <project.Logo className="w-16 h-16 md:w-20 md:h-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-mono bg-[#111113] text-zinc-500 border border-[#27272a] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-mono text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-4 pt-3 border-t border-[#27272a]">
                        {project.metrics.slice(0, 2).map((metric, i) => (
                          <div key={i}>
                            {metric.value !== undefined ? (
                              <div className="font-mono text-lg font-bold text-amber-500">
                                <CountUp
                                  value={metric.value}
                                  prefix={metric.prefix}
                                  suffix={metric.suffix}
                                />
                              </div>
                            ) : null}
                            <div className="text-[10px] text-zinc-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* External link indicator */}
                  {project.url && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#111113] border border-[#27272a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
