"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function GradientOrbs() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const x1 = useSpring(mouseX, springConfig);
  const y1 = useSpring(mouseY, springConfig);

  // Static values for other orbs (no mouse tracking)
  const staticX = useMotionValue(0);
  const staticY = useMotionValue(0);
  const x2 = useSpring(staticX, springConfig);
  const y2 = useSpring(staticY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) * 0.05);
      mouseY.set((clientY - centerY) * 0.05);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary orb - top left */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent blur-[100px]" />
      </motion.div>

      {/* Secondary orb - bottom right */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-48 -right-48 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tl from-orange-600/25 via-amber-600/15 to-transparent blur-[120px]" />
      </motion.div>

      {/* Accent orb - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          x: ["-50%", "-45%", "-55%", "-50%"],
          y: ["-50%", "-55%", "-45%", "-50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent blur-[80px]" />
      </motion.div>
    </div>
  );
}
