"use client";

interface LogoProps {
  className?: string;
}

// Microsoft-style logo for MTAC Intel Copilot
export function MTACLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Graph/Network nodes representing GraphRAG */}
      <circle cx="32" cy="20" r="6" fill="#f59e0b" />
      <circle cx="18" cy="38" r="5" fill="#60a5fa" />
      <circle cx="46" cy="38" r="5" fill="#60a5fa" />
      <circle cx="32" cy="50" r="4" fill="#a78bfa" />
      {/* Connecting lines */}
      <line x1="32" y1="26" x2="18" y2="33" stroke="#3f3f46" strokeWidth="2" />
      <line x1="32" y1="26" x2="46" y2="33" stroke="#3f3f46" strokeWidth="2" />
      <line x1="18" y1="43" x2="32" y2="46" stroke="#3f3f46" strokeWidth="2" />
      <line x1="46" y1="43" x2="32" y2="46" stroke="#3f3f46" strokeWidth="2" />
      {/* AI sparkle */}
      <path d="M50 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="#f59e0b" opacity="0.8" />
    </svg>
  );
}

// RollFlow - BJJ/Martial arts themed
export function RollFlowLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Belt circle */}
      <circle cx="32" cy="32" r="24" stroke="#f59e0b" strokeWidth="4" fill="none" />
      {/* Belt knot */}
      <rect x="28" y="24" width="8" height="16" rx="2" fill="#f59e0b" />
      {/* Flow arrows */}
      <path d="M16 32c0-8.837 7.163-16 16-16" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M48 32c0 8.837-7.163 16-16 16" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      {/* RF initials */}
      <text x="32" y="36" textAnchor="middle" fill="#fafafa" fontSize="10" fontFamily="monospace" fontWeight="bold">RF</text>
    </svg>
  );
}

// FaceSensei - Face with zen/meditation vibe
export function FaceSenseiLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Face outline */}
      <ellipse cx="32" cy="34" rx="18" ry="22" stroke="#f59e0b" strokeWidth="2" fill="none" />
      {/* Eyes (closed, meditation) */}
      <path d="M24 30c2 2 4 2 6 0" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 30c2 2 4 2 6 0" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" />
      {/* Serene smile */}
      <path d="M26 42c3 3 9 3 12 0" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Detection points */}
      <circle cx="20" cy="28" r="1.5" fill="#4ade80" />
      <circle cx="44" cy="28" r="1.5" fill="#4ade80" />
      <circle cx="32" cy="36" r="1.5" fill="#4ade80" />
      <circle cx="26" cy="44" r="1.5" fill="#4ade80" />
      <circle cx="38" cy="44" r="1.5" fill="#4ade80" />
      {/* Zen circle */}
      <circle cx="32" cy="12" r="6" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// SheetMagic - Math/Education themed
export function SheetMagicLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Paper/Sheet */}
      <rect x="14" y="10" width="36" height="44" rx="2" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
      {/* Lines representing content */}
      <line x1="20" y1="20" x2="44" y2="20" stroke="#71717a" strokeWidth="2" />
      <line x1="20" y1="28" x2="38" y2="28" stroke="#71717a" strokeWidth="2" />
      <line x1="20" y1="36" x2="42" y2="36" stroke="#71717a" strokeWidth="2" />
      {/* Math symbols */}
      <text x="22" y="48" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">2+2</text>
      {/* Magic sparkle */}
      <path d="M46 8l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" fill="#a78bfa" />
      <path d="M52 20l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#f59e0b" opacity="0.7" />
    </svg>
  );
}

// ABL Meditation - Calm/Meditation themed
export function ABLMeditationLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Lotus/meditation figure silhouette */}
      <ellipse cx="32" cy="46" rx="16" ry="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
      {/* Person meditating */}
      <circle cx="32" cy="24" r="6" fill="#f59e0b" />
      <path d="M32 30v8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 36l8 4 8-4" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Aura rings */}
      <circle cx="32" cy="32" r="18" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="32" cy="32" r="24" stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.2" />
      {/* Sound waves */}
      <path d="M12 28c-2 4-2 8 0 12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M52 28c2 4 2 8 0 12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

// PortraitsAI - Art/Portrait themed
export function PortraitsAILogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Frame */}
      <rect x="12" y="12" width="40" height="40" rx="2" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <rect x="16" y="16" width="32" height="32" rx="1" fill="#27272a" />
      {/* Abstract portrait */}
      <circle cx="32" cy="28" r="8" fill="url(#portrait-gradient)" />
      <ellipse cx="32" cy="42" rx="10" ry="4" fill="url(#portrait-gradient)" />
      {/* AI elements */}
      <path d="M48 14l2 3 3 1-3 1-2 3-2-3-3-1 3-1 2-3z" fill="#a78bfa" />
      {/* Brush stroke */}
      <path d="M20 48l4-6 4 3 4-4 4 5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="portrait-gradient" x1="24" y1="24" x2="40" y2="46">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ClockFlow - Time/Productivity themed
export function ClockFlowLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Clock circle */}
      <circle cx="32" cy="32" r="22" stroke="#f59e0b" strokeWidth="2" fill="none" />
      {/* Clock hands */}
      <line x1="32" y1="32" x2="32" y2="18" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="32" x2="42" y2="32" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="#f59e0b" />
      {/* Hour markers */}
      <circle cx="32" cy="14" r="1.5" fill="#71717a" />
      <circle cx="50" cy="32" r="1.5" fill="#71717a" />
      <circle cx="32" cy="50" r="1.5" fill="#71717a" />
      <circle cx="14" cy="32" r="1.5" fill="#71717a" />
      {/* Flow arrows */}
      <path d="M54 20l4 4-4 4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M56 24h-8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Love2Learn - Education/Tutoring themed
export function Love2LearnLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Book */}
      <path d="M12 14v36l20-6 20 6V14L32 20 12 14z" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
      <line x1="32" y1="20" x2="32" y2="44" stroke="#3f3f46" strokeWidth="2" />
      {/* Heart */}
      <path d="M26 24c-3-4-8-3-8 1s8 10 14 14c6-4 14-10 14-14s-5-5-8-1l-6 5-6-5z" fill="#f59e0b" opacity="0.9" />
      {/* Knowledge sparkles */}
      <circle cx="22" cy="36" r="1.5" fill="#60a5fa" />
      <circle cx="42" cy="36" r="1.5" fill="#60a5fa" />
      <path d="M50 10l2 3 3 1-3 1-2 3-2-3-3-1 3-1 2-3z" fill="#4ade80" opacity="0.7" />
    </svg>
  );
}

// LobbyLoop - Check-in/Display system themed
export function LobbyLoopLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Loop/infinity shape */}
      <path d="M16 32c0-6 5-11 11-11s11 5 11 11-5 11-11 11" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M48 32c0 6-5 11-11 11s-11-5-11-11 5-11 11-11" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Screen/tablet icon */}
      <rect x="26" y="26" width="12" height="12" rx="2" fill="#27272a" stroke="#fafafa" strokeWidth="1.5" />
      {/* Check mark */}
      <path d="M29 32l2 2 4-4" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Signal waves */}
      <path d="M46 22c2 2 3 5 3 10s-1 8-3 10" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M50 18c3 4 5 8 5 14s-2 10-5 14" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
    </svg>
  );
}

// DaBraino - Math Bingo brain with grid
export function DaBrainoLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Brain shape */}
      <path
        d="M32 10c-10 0-18 7-18 16 0 5 2.5 9 6 12l2 3c1 3 1 6 1 8h18c0-2 0-5 1-8l2-3c3.5-3 6-7 6-12 0-9-8-16-18-16z"
        fill="url(#db-brain-gradient)"
        opacity="0.9"
      />
      {/* Bingo grid overlay */}
      <rect x="22" y="18" width="20" height="20" rx="2" fill="#27272a" opacity="0.7" />
      <line x1="26" y1="18" x2="26" y2="38" stroke="#71717a" strokeWidth="0.5" />
      <line x1="30" y1="18" x2="30" y2="38" stroke="#71717a" strokeWidth="0.5" />
      <line x1="34" y1="18" x2="34" y2="38" stroke="#71717a" strokeWidth="0.5" />
      <line x1="38" y1="18" x2="38" y2="38" stroke="#71717a" strokeWidth="0.5" />
      <line x1="22" y1="22" x2="42" y2="22" stroke="#71717a" strokeWidth="0.5" />
      <line x1="22" y1="26" x2="42" y2="26" stroke="#71717a" strokeWidth="0.5" />
      <line x1="22" y1="30" x2="42" y2="30" stroke="#71717a" strokeWidth="0.5" />
      <line x1="22" y1="34" x2="42" y2="34" stroke="#71717a" strokeWidth="0.5" />
      {/* Marked cells */}
      <circle cx="24" cy="20" r="1.5" fill="#4ade80" />
      <circle cx="32" cy="28" r="1.5" fill="#f1c40f" />
      <circle cx="36" cy="24" r="1.5" fill="#4ade80" />
      <circle cx="28" cy="36" r="1.5" fill="#4ade80" />
      <circle cx="40" cy="32" r="1.5" fill="#4ade80" />
      {/* BINGO text */}
      <text x="32" y="47" textAnchor="middle" fill="#fafafa" fontSize="6" fontFamily="monospace" fontWeight="bold" letterSpacing="1">BINGO</text>
      <defs>
        <linearGradient id="db-brain-gradient" x1="14" y1="10" x2="50" y2="49">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="40%" stopColor="#E91E8C" />
          <stop offset="70%" stopColor="#F39C12" />
          <stop offset="100%" stopColor="#F1C40F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Dabingo - Multiplayer bingo game
export function DabingoLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Bingo ball */}
      <circle cx="32" cy="28" r="18" fill="url(#dabingo-gradient)" />
      <ellipse cx="32" cy="22" rx="12" ry="6" fill="#fff" opacity="0.15" />
      {/* Number on ball */}
      <text x="32" y="33" textAnchor="middle" fill="#fafafa" fontSize="14" fontFamily="monospace" fontWeight="bold">75</text>
      {/* Multiplayer dots */}
      <circle cx="16" cy="50" r="4" fill="#60a5fa" />
      <circle cx="28" cy="52" r="4" fill="#4ade80" />
      <circle cx="40" cy="50" r="4" fill="#f59e0b" />
      <circle cx="50" cy="48" r="3" fill="#a78bfa" />
      {/* Connection lines */}
      <line x1="20" y1="50" x2="24" y2="52" stroke="#3f3f46" strokeWidth="1" />
      <line x1="32" y1="52" x2="36" y2="50" stroke="#3f3f46" strokeWidth="1" />
      <line x1="43" y1="49" x2="47" y2="48" stroke="#3f3f46" strokeWidth="1" />
      <defs>
        <linearGradient id="dabingo-gradient" x1="14" y1="10" x2="50" y2="46">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// EternalFrame - Memorial portrait themed
export function EternalFrameLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Ornate frame */}
      <rect x="10" y="8" width="44" height="48" rx="3" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
      <rect x="14" y="12" width="36" height="40" rx="1.5" stroke="#f59e0b" strokeWidth="1" fill="#27272a" opacity="0.8" />
      {/* Portrait silhouette */}
      <circle cx="32" cy="28" r="8" fill="#71717a" />
      <ellipse cx="32" cy="44" rx="11" ry="6" fill="#71717a" />
      {/* AI transformation sparkle */}
      <path d="M48 10l2 3 3 1-3 1-2 3-2-3-3-1 3-1 2-3z" fill="#a78bfa" />
      <path d="M14 46l1.5 2.5 2.5 1-2.5 1L14 53l-1.5-2.5L10 49.5l2.5-1L14 46z" fill="#a78bfa" opacity="0.6" />
      {/* Warm glow */}
      <circle cx="32" cy="32" r="16" stroke="#f59e0b" strokeWidth="0.5" fill="none" opacity="0.3" />
    </svg>
  );
}

// Figurify - Action Figure/Toy themed
export function FigurifyLogo({ className = "" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Figure body */}
      <circle cx="32" cy="18" r="8" fill="#f59e0b" />
      {/* Torso */}
      <rect x="26" y="26" width="12" height="16" rx="2" fill="#f59e0b" />
      {/* Arms */}
      <rect x="16" y="28" width="10" height="4" rx="2" fill="#f59e0b" />
      <rect x="38" y="28" width="10" height="4" rx="2" fill="#f59e0b" />
      {/* Legs */}
      <rect x="26" y="42" width="5" height="12" rx="2" fill="#f59e0b" />
      <rect x="33" y="42" width="5" height="12" rx="2" fill="#f59e0b" />
      {/* Packaging box outline */}
      <rect x="10" y="8" width="44" height="48" rx="3" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="4 2" />
      {/* AI sparkle */}
      <path d="M50 12l2 3 3 1-3 1-2 3-2-3-3-1 3-1 2-3z" fill="#a78bfa" />
    </svg>
  );
}
