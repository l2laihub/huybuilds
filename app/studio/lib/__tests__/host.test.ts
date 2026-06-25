import { describe, it, expect } from "vitest";
import { isStudioHost, studioHref } from "../host";

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

describe("studioHref", () => {
  it("uses bare paths on the subdomain (served at root)", () => {
    expect(studioHref("/privacy", "/privacy")).toBe("/privacy");
    expect(studioHref("/", "/terms")).toBe("/terms");
  });
  it("keeps the /studio prefix when viewed under the path prefix", () => {
    expect(studioHref("/studio/privacy", "/privacy")).toBe("/studio/privacy");
    expect(studioHref("/studio", "/terms")).toBe("/studio/terms");
  });
  it("resolves the home link in both contexts", () => {
    expect(studioHref("/privacy", "")).toBe("/");
    expect(studioHref("/studio/privacy", "")).toBe("/studio");
  });
  it("treats null pathname as root context", () => {
    expect(studioHref(null, "/privacy")).toBe("/privacy");
  });
});
