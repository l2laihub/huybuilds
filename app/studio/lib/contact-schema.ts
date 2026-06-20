export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  business: string;
  businessType: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; code: "required" | "email" | "honeypot" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function validateContactPayload(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, code: "required" };
  }
  const b = body as Record<string, unknown>;

  // Honeypot: real users never fill the hidden "website" field.
  if (str(b.website) !== "") return { ok: false, code: "honeypot" };

  const name = str(b.name);
  const phone = str(b.phone);
  const email = str(b.email);
  const message = str(b.message);

  if (!name || !message || (!phone && !email)) {
    return { ok: false, code: "required" };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { ok: false, code: "email" };
  }

  return {
    ok: true,
    data: { name, phone, email, message, business: str(b.business), businessType: str(b.businessType) },
  };
}
