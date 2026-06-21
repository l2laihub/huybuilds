/**
 * HuyBuilds Studio contact handles. EDIT THESE — currently handoff placeholders.
 * Phone is US; smsHref/telDigits assume +1 when no country code is present.
 */
export const CONTACT = {
  phoneDisplay: "(206) 816-4212",
  zaloUrl: "https://zalo.me/huybuilds",
  zaloDisplay: "zalo.me/huybuilds",
  facebookUrl: "https://fb.com/huybuilds",
  facebookDisplay: "fb.com/huybuilds",
  email: "huybuilds@gmail.com",
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
