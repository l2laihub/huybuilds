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

export function IconSearch({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function IconPin({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconStar({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <polygon points="12 2.5 14.85 8.3 21.25 9.25 16.6 13.75 17.7 20.1 12 17.1 6.3 20.1 7.4 13.75 2.75 9.25 9.15 8.3" />
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
