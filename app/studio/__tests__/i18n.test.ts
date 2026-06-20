import { describe, it, expect } from "vitest";
import { resolveInitialLang } from "../i18n";

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
