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
