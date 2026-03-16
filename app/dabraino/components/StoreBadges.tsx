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
        href="https://apps.apple.com/app/dabraino/id__________"
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
      <a
        href="https://play.google.com/store/apps/details?id=app.huybuilds.dabraino"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <svg className={h} viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="135" height="40" rx="5" fill="#000" />
          <text x="72" y="14" fill="#fff" fontSize="7" fontFamily="system-ui" textAnchor="middle">GET IT ON</text>
          <text x="72" y="28" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Google Play</text>
          <polygon points="15,10 15,30 27,20" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}
