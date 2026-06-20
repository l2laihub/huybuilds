import { describe, it, expect } from "vitest";
import { isStudioHost } from "../host";

describe("isStudioHost", () => {
  it("matches the studio subdomain", () => {
    expect(isStudioHost("studio.huybuilds.app")).toBe(true);
  });
  it("matches the studio subdomain with a port", () => {
    expect(isStudioHost("studio.huybuilds.app:443")).toBe(true);
  });
  it("matches the local studio host", () => {
    expect(isStudioHost("studio.localhost:3000")).toBe(true);
  });
  it("rejects the apex domain", () => {
    expect(isStudioHost("huybuilds.app")).toBe(false);
  });
  it("rejects an unrelated subdomain", () => {
    expect(isStudioHost("www.huybuilds.app")).toBe(false);
  });
  it("rejects null", () => {
    expect(isStudioHost(null)).toBe(false);
  });
});
