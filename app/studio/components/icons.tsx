type IconProps = { className?: string; style?: React.CSSProperties };

export function IconBrowser({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18" />
      <path d="M9 21h6M12 18v3" />
    </svg>
  );
}

export function IconCalendar({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
      <rect x="7" y="13" width="4" height="3" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPhone({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 19h4" />
    </svg>
  );
}

export function IconCheck({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Large decorative opening curly quote. */
export function Quote({ className, style }: IconProps) {
  return (
    <span aria-hidden className={className} style={{ fontWeight: 800, lineHeight: 1, ...style }}>
      &ldquo;
    </span>
  );
}
