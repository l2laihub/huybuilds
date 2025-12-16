"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./ui/SectionReveal";
import { MagneticButton } from "./ui/MagneticButton";

const contactLinks = [
  {
    name: "Email",
    href: "mailto:huy.q.duong@hotmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/huy-duong-b3116414",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/l2laihub",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~01d9b3062b52dd062d",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32">
      <div className="container">
        <SectionReveal>
          <div className="relative max-w-3xl mx-auto">
            {/* Background glow */}
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 blur-3xl rounded-3xl" />

            {/* Card */}
            <div className="relative bg-[#161619] border border-[#27272a] rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center overflow-hidden">
              {/* Top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-48 md:h-64 bg-amber-500/10 rounded-full blur-[100px]" />

              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-green-500/10 border border-green-500/20 rounded-full"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-green-400 font-medium">
                  Available for Projects
                </span>
              </motion.div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="font-mono text-xs md:text-sm text-amber-500 tracking-wider uppercase">
                    // Contact
                  </span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                  Let&apos;s Build Something
                </h2>

                <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg mx-auto">
                  Have a project in mind? I&apos;m available for freelance work
                  and consulting engagements. Let&apos;s discuss how I can help.
                </p>

                {/* Contact Links */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {contactLinks.map((link) => (
                    <MagneticButton key={link.name} href={link.href} strength={0.15}>
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-[#111113] border border-[#27272a] rounded-lg text-zinc-300 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-200"
                      >
                        {link.icon}
                        <span className="text-sm font-medium">{link.name}</span>
                      </motion.span>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
