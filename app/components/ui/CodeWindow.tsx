"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  { number: 1, content: '<span class="text-purple-400">const</span> <span class="text-amber-400">builder</span> = {' },
  { number: 2, content: '  name: <span class="text-green-400">"Huy Duong"</span>,' },
  { number: 3, content: '  role: <span class="text-green-400">"Senior Engineer"</span>,' },
  { number: 4, content: '  focus: [<span class="text-green-400">"AI/ML"</span>, <span class="text-green-400">"Full-Stack"</span>],' },
  { number: 5, content: '  shipped: <span class="text-green-400">"7 apps in 2025"</span>,' },
  { number: 6, content: '};' },
  { number: 7, content: '' },
  { number: 8, content: '<span class="text-zinc-500">// Let\'s build something great</span>' },
  { number: 9, content: '<span class="text-blue-400">builder</span>.<span class="text-blue-400">create</span>(<span class="text-amber-400">yourIdea</span>);' },
];

export function CodeWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 blur-2xl rounded-3xl opacity-50" />

      <div className="relative bg-[#111113] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161619] border-b border-[#27272a]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-auto font-mono text-xs text-zinc-500">huybuilds.ts</span>
        </div>

        {/* Code content */}
        <div className="p-4 md:p-6 font-mono text-sm md:text-base leading-relaxed">
          {codeLines.map((line, index) => (
            <motion.div
              key={line.number}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index < visibleLines ? 1 : 0,
                x: index < visibleLines ? 0 : -10,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex gap-4"
            >
              <span className="text-zinc-600 select-none w-4 text-right">{line.number}</span>
              <span
                dangerouslySetInnerHTML={{ __html: line.content || "&nbsp;" }}
                className="text-zinc-300"
              />
            </motion.div>
          ))}

          {/* Cursor */}
          {isTyping && (
            <motion.span
              className="inline-block w-2 h-5 bg-amber-500 ml-8"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
