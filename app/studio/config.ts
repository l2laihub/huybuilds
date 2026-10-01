/**
 * HuyBuilds Studio contact handles. EDIT THESE — currently handoff placeholders.
 * Phone is US; smsHref/telDigits assume +1 when no country code is present.
 */
export const CONTACT = {
  phoneDisplay: "(425) 998-7191",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591364631052",
  facebookDisplay: "Messenger",
  instagramUrl: "https://www.instagram.com/huybuildsstudio/",
  /** Behold.so feed id for @huybuildsstudio. Empty hides the Instagram section
   *  entirely — also the graceful path if the feed ever dies.
   *  Live id: GYVB1Dw6xIw02bERRFim — paste it back when the account has ~9+
   *  posts (three full rows of the 3-up grid). Fewer reads as thin next to the
   *  3-posts-a-week promise on the pricing card. Held off 2026-09-08. */
  instagramFeedId: "" as string,
  email: "studio@huybuilds.app",
} as const;

/** Normalize a display phone to E.164-ish digits, assuming +1 for 10-digit US numbers. */
export function telDigits(display: string): string {
  const digits = display.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export function smsHref(display: string): string {
  return `sms:${telDigits(display)}`;
}

export function telHref(display: string): string {
  return `tel:${telDigits(display)}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
