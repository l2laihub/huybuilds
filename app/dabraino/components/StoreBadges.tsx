"use client";

interface StoreBadgesProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
};

export function StoreBadges({ className = "", size = "md" }: StoreBadgesProps) {
  const h = sizeMap[size];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="https://apps.apple.com/us/app/dabraino-educational-bingo/id6759766972"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <svg className={h} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="40" rx="5" fill="#000" />
          <text x="60" y="14" fill="#fff" fontSize="7" fontFamily="system-ui" textAnchor="middle">Download on the</text>
          <text x="60" y="28" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui" textAnchor="middle">App Store</text>
          <path d="M15 10c0 0 2.5 4 5 8s-2 8-2 8M13 26h8M21 18h-10" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </svg>
      </a>
    </div>
  );
}
