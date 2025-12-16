"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-[#27272a]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logo.svg"
              alt="huybuilds logo"
              width={28}
              height={28}
              className="w-7 h-7"
            />
            <span className="font-mono text-lg font-semibold text-amber-500">
              huybuilds
            </span>
          </motion.a>

          {/* Copyright */}
          <p className="font-mono text-sm text-zinc-500 text-center">
            &copy; 2025 huybuilds — Crafted with precision in Seattle Area
          </p>

          {/* Back to top */}
          <motion.a
            href="#"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-500 transition-colors"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Back to top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
