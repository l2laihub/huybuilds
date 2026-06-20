import { describe, it, expect } from "vitest";
import { validateContactPayload } from "../contact-schema";

const base = { name: "An", phone: "206-555-0000", email: "", business: "Pho 88", businessType: "restaurant", message: "Need a site", website: "" };

describe("validateContactPayload", () => {
  it("accepts a valid payload with phone", () => {
    const r = validateContactPayload(base);
    expect(r.ok).toBe(true);
  });
  it("accepts a valid payload with email only", () => {
    const r = validateContactPayload({ ...base, phone: "", email: "a@b.com" });
    expect(r.ok).toBe(true);
  });
  it("rejects when name missing", () => {
    const r = validateContactPayload({ ...base, name: "" });
    expect(r).toEqual({ ok: false, code: "required" });
  });
  it("rejects when message missing", () => {
    const r = validateContactPayload({ ...base, message: "  " });
    expect(r).toEqual({ ok: false, code: "required" });
  });
  it("rejects when neither phone nor email present", () => {
    const r = validateContactPayload({ ...base, phone: "", email: "" });
    expect(r).toEqual({ ok: false, code: "required" });
  });
  it("rejects a malformed email", () => {
    const r = validateContactPayload({ ...base, phone: "", email: "not-an-email" });
    expect(r).toEqual({ ok: false, code: "email" });
  });
  it("rejects when honeypot is filled", () => {
    const r = validateContactPayload({ ...base, website: "spam" });
    expect(r).toEqual({ ok: false, code: "honeypot" });
  });
  it("rejects a non-object", () => {
    expect(validateContactPayload(null)).toEqual({ ok: false, code: "required" });
  });
});
