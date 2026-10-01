import { describe, it, expect } from "vitest";
import { resolveInitialLang } from "../i18n";
import strings from "../strings.json";

describe("resolveInitialLang", () => {
  it("returns vi only when explicitly stored", () => {
    expect(resolveInitialLang("vi")).toBe("vi");
  });
  it("defaults to en for null", () => {
    expect(resolveInitialLang(null)).toBe("en");
  });
  it("defaults to en for unknown values", () => {
    expect(resolveInitialLang("fr")).toBe("en");
  });
  it("returns en when stored", () => {
    expect(resolveInitialLang("en")).toBe("en");
  });
});

// A key present in en but missing from vi falls back to English silently
// (lib/strings.ts getString), so nothing else catches a half-translated key.
describe("strings.json", () => {
  it("translates every en key into vi", () => {
    expect(Object.keys(strings.vi).sort()).toEqual(Object.keys(strings.en).sort());
  });
});
