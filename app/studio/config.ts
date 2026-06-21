/**
 * HuyBuilds Studio contact handles. EDIT THESE — currently handoff placeholders.
 * Phone is US; smsHref/telDigits assume +1 when no country code is present.
 */
export const CONTACT = {
  phoneDisplay: "(425) 998-7191",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591364631052",
  facebookDisplay: "fb.com/huybuilds-studio",
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

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
