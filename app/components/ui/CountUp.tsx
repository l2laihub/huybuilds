"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  // Use amount instead of margin for better mobile support
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, spring, value, hasAnimated]);

  // Fallback: if still not animated after mount, trigger it
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) {
        spring.set(value);
        setHasAnimated(true);
      }
    }, 1500);
    return () => clearTimeout(fallbackTimer);
  }, [spring, value, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
