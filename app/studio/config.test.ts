import { describe, it, expect } from "vitest";
import { CONTACT, smsHref, telDigits, mailtoHref } from "./config";

describe("contact config", () => {
  it("exposes the contact handles", () => {
    expect(CONTACT.phoneDisplay).toBeTruthy();
    expect(CONTACT.facebookUrl).toMatch(/^https?:\/\//);
    expect(CONTACT.email).toContain("@");
  });
  it("strips formatting from the sms href", () => {
    expect(smsHref("(206) 555-0123")).toBe("sms:+12065550123");
  });
  it("keeps an existing country code", () => {
    expect(smsHref("+1 206 555 0123")).toBe("sms:+12065550123");
  });
  it("returns clean digits", () => {
    expect(telDigits("(206) 555-0123")).toBe("+12065550123");
  });
  it("builds a mailto", () => {
    expect(mailtoHref("a@b.com")).toBe("mailto:a@b.com");
  });
});
