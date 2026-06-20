# HuyBuilds Studio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual (EN/VI), mobile-first marketing landing page for HuyBuilds Studio, served at the `studio.huybuilds.app` subdomain, with a working Resend-backed contact form.

**Architecture:** A self-contained Next.js App Router sub-site at `app/studio/` (mirroring the existing `app/dabraino/` convention: own layout, scoped CSS theme, own components). A root `middleware.ts` rewrites the `studio.huybuilds.app` host to the `/studio` path. Copy lives in a bundled `strings.json`; a small client `LangProvider` + `useT()` hook drives an instant EN/VI toggle. The contact form posts to a Node route handler that emails submissions via Resend, with a graceful fallback when the API key is absent.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS v4, TypeScript, `next/font/google` (Hanken Grotesk), Resend (email), Vitest (unit tests for logic units).

## Global Constraints

- Next.js `^14.2.35`, App Router, React `^18.3.1` — match existing `package.json`.
- All studio styles scoped under a `.studio-theme` root class; **must not** alter the portfolio (`huybuilds.app`) or DaBraino styles.
- **No framer-motion, no animation, no orbs/magnetic buttons** in the studio sub-site. The handoff is explicit: "NOT a flashy tech startup," "no animation."
- Hanken Grotesk loaded via `next/font/google` in `app/studio/layout.tsx` only; weights 400/500/600/700/800.
- Default language `en`; persisted to `localStorage` key `hb-studio-lang`. SSR renders English for SEO.
- Single responsive breakpoint at **920px** (`min-[920px]:` Tailwind utilities).
- Copy is sourced **only** from `app/studio/strings.json`. Prices live there and are canonical.
- Contact handles live **only** in `app/studio/config.ts` (currently handoff placeholders).
- Palette (exact hex): terracotta `#C2603A`, terracotta-dark `#A44E2D`, sage `#6E8C5A`, amber `#CC9A46`, ink `#2C2620`, muted `#6E6358`, sand `#F5EDE1`, off-white `#FAF5ED`, surface `#FFFFFF`, line `#E9DECF`.
- Radii: pill `999px`, card `22px`, mockup `16px`, inset `14px`.
- Commit after every task. Run `npm run lint` and `npm run build` before each commit; both must pass.

## File Structure

```
middleware.ts                              # root: host -> /studio rewrite
vitest.config.ts                           # test runner config
app/studio/
  layout.tsx                               # scoped theme, Hanken font, LangProvider, Nav+Footer
  page.tsx                                 # assembles all sections (server component)
  studio.css                               # .studio-theme tokens + helper classes
  strings.json                             # EN/VI copy (from handoff + form keys)
  config.ts                                # contact handles + href builders
  i18n.tsx                                 # LangProvider, useLang, useT, resolveInitialLang
  lib/
    host.ts                                # isStudioHost() pure helper
    strings.ts                             # typed strings accessor + StudioLang/StringKey types
    contact-schema.ts                      # validateContactPayload() pure validator
  components/
    icons.tsx                              # inline SVG marks (browser, calendar, phone, check, quote)
    Wordmark.tsx                           # "Huy"+"Builds"+amber dot
    LangToggle.tsx                         # EN/VI pill
    StudioNav.tsx                          # sticky blurred header
    Hero.tsx
    Problem.tsx
    WhatIDo.tsx
    Sample.tsx
    WhyMe.tsx
    Pricing.tsx
    Contact.tsx                            # rows + <ContactForm/>
    ContactForm.tsx                        # 6-field form, posts to API
    StudioFooter.tsx
  lib/__tests__/host.test.ts
  lib/__tests__/contact-schema.test.ts
  __tests__/i18n.test.ts
  config.test.ts
app/api/studio-contact/route.ts            # Resend email route handler
docs/studio-deploy.md                      # Netlify domain + env var instructions
```

---

### Task 1: Project setup — dependencies and Vitest

**Files:**
- Modify: `package.json` (add `resend`; devDeps `vitest`)
- Create: `vitest.config.ts`
- Create: `app/studio/lib/__tests__/smoke.test.ts` (temporary, deleted in this task's last step)

**Interfaces:**
- Produces: a working `npm run test` script and a `resend` dependency for later tasks.

- [ ] **Step 1: Install dependencies**

```bash
npm install resend@^4.0.0
npm install -D vitest@^2.1.0
```

- [ ] **Step 2: Add the test script to `package.json`**

In the `"scripts"` block, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["app/**/*.test.ts", "app/**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": new URL(".", import.meta.url).pathname },
  },
});
```

- [ ] **Step 4: Create a smoke test to prove the runner works**

`app/studio/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run the test**

Run: `npm run test`
Expected: PASS — 1 passed.

- [ ] **Step 6: Delete the smoke test**

```bash
rm app/studio/lib/__tests__/smoke.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add resend + vitest for studio sub-site"
```

---

### Task 2: Subdomain middleware

**Files:**
- Create: `app/studio/lib/host.ts`
- Create: `app/studio/lib/__tests__/host.test.ts`
- Create: `middleware.ts`

**Interfaces:**
- Produces: `isStudioHost(host: string | null): boolean` and a root middleware that rewrites the studio host to `/studio`.

- [ ] **Step 1: Write the failing test**

`app/studio/lib/__tests__/host.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- host`
Expected: FAIL — cannot find module `../host`.

- [ ] **Step 3: Write minimal implementation**

`app/studio/lib/host.ts`:

```ts
/** True when the request host is the studio subdomain (prod or local dev). */
export function isStudioHost(host: string | null): boolean {
  if (!host) return false;
  const name = host.split(":")[0].toLowerCase();
  return name === "studio.huybuilds.app" || name === "studio.localhost";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- host`
Expected: PASS — 6 passed.

- [ ] **Step 5: Write the middleware**

`middleware.ts` (repo root):

```ts
import { NextResponse, type NextRequest } from "next/server";
import { isStudioHost } from "@/app/studio/lib/host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!isStudioHost(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Already under /studio (e.g. assets/anchors) — leave it.
  if (url.pathname === "/studio" || url.pathname.startsWith("/studio/")) {
    return NextResponse.next();
  }
  url.pathname = `/studio${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (assets).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
```

- [ ] **Step 6: Verify build still passes**

Run: `npm run build`
Expected: build completes; output lists `ƒ Middleware`.

- [ ] **Step 7: Commit**

```bash
git add middleware.ts app/studio/lib/host.ts app/studio/lib/__tests__/host.test.ts
git commit -m "feat: rewrite studio.huybuilds.app host to /studio via middleware"
```

---

### Task 3: Strings file and typed accessor

**Files:**
- Create: `app/studio/strings.json` (copy of handoff `strings.json` + new form keys)
- Create: `app/studio/lib/strings.ts`

**Interfaces:**
- Produces: `type StudioLang = "en" | "vi"`, `type StringKey`, `STRINGS: Record<StudioLang, Record<StringKey, string>>`, `getString(lang, key)`.

- [ ] **Step 1: Copy the handoff strings into the app**

```bash
cp "design_handoff_landing_page/strings.json" app/studio/strings.json
```

- [ ] **Step 2: Append the contact-form keys**

Add these keys to **both** the `en` and `vi` objects in `app/studio/strings.json` (insert before each object's closing brace; keep the existing keys). EN block:

```json
    "formHeading": "Or send me a message",
    "formName": "Your name",
    "formPhone": "Phone",
    "formEmail": "Email",
    "formBiz": "Business name",
    "formType": "Type of business",
    "formTypeRestaurant": "Restaurant",
    "formTypeCafe": "Café",
    "formTypeMarket": "Market",
    "formTypeSalon": "Salon",
    "formTypeOther": "Other",
    "formMsg": "What do you need?",
    "formSubmit": "Send message",
    "formSending": "Sending…",
    "formSuccess": "Thank you — I got your message and will reply the same day, usually by text.",
    "formErrGeneric": "Something went wrong. Please text me instead — it's the fastest way.",
    "formErrRequired": "Please fill in your name, a message, and a phone or email.",
    "formErrEmail": "That email doesn't look right.",
    "formNeedContact": "Please give me a phone number or an email so I can reach you."
```

VI block:

```json
    "formHeading": "Hoặc gửi tin nhắn cho tôi",
    "formName": "Tên của anh chị/cô chú",
    "formPhone": "Số điện thoại",
    "formEmail": "Email",
    "formBiz": "Tên quán/tiệm",
    "formType": "Loại hình kinh doanh",
    "formTypeRestaurant": "Nhà hàng",
    "formTypeCafe": "Quán cà phê",
    "formTypeMarket": "Chợ/Tiệm tạp hóa",
    "formTypeSalon": "Tiệm làm tóc/nail",
    "formTypeOther": "Khác",
    "formMsg": "Anh chị/cô chú cần gì?",
    "formSubmit": "Gửi tin nhắn",
    "formSending": "Đang gửi…",
    "formSuccess": "Cảm ơn anh chị/cô chú — tôi đã nhận được và sẽ trả lời trong ngày, thường là qua tin nhắn.",
    "formErrGeneric": "Có lỗi xảy ra. Anh chị/cô chú nhắn tin cho tôi nhé — đó là cách nhanh nhất.",
    "formErrRequired": "Vui lòng điền tên, nội dung, và số điện thoại hoặc email.",
    "formErrEmail": "Email này có vẻ chưa đúng.",
    "formNeedContact": "Vui lòng cho tôi số điện thoại hoặc email để tôi liên lạc lại."
```

- [ ] **Step 3: Create the typed accessor**

`app/studio/lib/strings.ts`:

```ts
import strings from "../strings.json";

export type StudioLang = "en" | "vi";

const en = (strings as Record<string, Record<string, string>>).en;
export type StringKey = keyof typeof en;

export const STRINGS: Record<StudioLang, Record<StringKey, string>> = {
  en: (strings as Record<StudioLang, Record<StringKey, string>>).en,
  vi: (strings as Record<StudioLang, Record<StringKey, string>>).vi,
};

export function getString(lang: StudioLang, key: StringKey): string {
  return STRINGS[lang][key] ?? STRINGS.en[key] ?? String(key);
}
```

- [ ] **Step 4: Verify it type-checks via build**

Run: `npm run build`
Expected: build succeeds (no TS error about the JSON import — `resolveJsonModule` is already enabled in `tsconfig.json`).

- [ ] **Step 5: Commit**

```bash
git add app/studio/strings.json app/studio/lib/strings.ts
git commit -m "feat: add studio bilingual strings + typed accessor"
```

---

### Task 4: i18n provider and hooks

**Files:**
- Create: `app/studio/i18n.tsx`
- Create: `app/studio/__tests__/i18n.test.ts`

**Interfaces:**
- Consumes: `StudioLang`, `StringKey`, `getString` from `lib/strings`.
- Produces: `resolveInitialLang(stored: string | null): StudioLang`, `LangProvider`, `useLang(): { lang, setLang, toggle }`, `useT(): (key: StringKey) => string`.

- [ ] **Step 1: Write the failing test**

`app/studio/__tests__/i18n.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- i18n`
Expected: FAIL — cannot find module `../i18n`.

- [ ] **Step 3: Write the implementation**

`app/studio/i18n.tsx`:

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getString, type StringKey, type StudioLang } from "./lib/strings";

const STORAGE_KEY = "hb-studio-lang";

export function resolveInitialLang(stored: string | null): StudioLang {
  return stored === "vi" ? "vi" : "en";
}

type LangContextValue = {
  lang: StudioLang;
  setLang: (lang: StudioLang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // SSR + first paint render English; hydrate stored preference after mount.
  const [lang, setLangState] = useState<StudioLang>("en");

  useEffect(() => {
    setLangState(resolveInitialLang(localStorage.getItem(STORAGE_KEY)));
  }, []);

  const setLang = useCallback((next: StudioLang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "vi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function useT(): (key: StringKey) => string {
  const { lang } = useLang();
  return useCallback((key: StringKey) => getString(lang, key), [lang]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- i18n`
Expected: PASS — 4 passed.

- [ ] **Step 5: Commit**

```bash
git add app/studio/i18n.tsx app/studio/__tests__/i18n.test.ts
git commit -m "feat: add studio i18n provider with EN/VI toggle"
```

---

### Task 5: Contact config and href builders

**Files:**
- Create: `app/studio/config.ts`
- Create: `app/studio/config.test.ts`

**Interfaces:**
- Produces: `CONTACT` object and `smsHref`, `telDigits`, `mailtoHref` helpers used by `Contact` and `StudioNav`.

- [ ] **Step 1: Write the failing test**

`app/studio/config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { CONTACT, smsHref, telDigits, mailtoHref } from "./config";

describe("contact config", () => {
  it("exposes the four handles", () => {
    expect(CONTACT.phoneDisplay).toBeTruthy();
    expect(CONTACT.zaloUrl).toMatch(/^https?:\/\//);
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- config`
Expected: FAIL — cannot find module `./config`.

- [ ] **Step 3: Write the implementation**

`app/studio/config.ts`:

```ts
/**
 * HuyBuilds Studio contact handles. EDIT THESE — currently handoff placeholders.
 * Phone is US; smsHref/telDigits assume +1 when no country code is present.
 */
export const CONTACT = {
  phoneDisplay: "(206) 555-0123",
  zaloUrl: "https://zalo.me/huybuilds",
  zaloDisplay: "zalo.me/huybuilds",
  facebookUrl: "https://fb.com/huybuilds",
  facebookDisplay: "fb.com/huybuilds",
  email: "huy@huybuilds.studio",
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- config`
Expected: PASS — 5 passed.

- [ ] **Step 5: Commit**

```bash
git add app/studio/config.ts app/studio/config.test.ts
git commit -m "feat: add studio contact config + href builders"
```

---

### Task 6: Theme CSS and layout

**Files:**
- Create: `app/studio/studio.css`
- Create: `app/studio/layout.tsx`

**Interfaces:**
- Consumes: `LangProvider` (Task 4), `StudioNav` + `StudioFooter` (Tasks 8, 16 — referenced now, created later; build will fail until they exist, so this task's build gate runs after temporary stubs).
- Produces: the `.studio-theme` token scope and helper classes `.st-band`, `.st-card`, `.st-shadow-card`, `.st-btn`, `.st-btn-primary`, `.st-btn-outline`.

- [ ] **Step 1: Create temporary stubs for Nav and Footer**

So the layout compiles before Tasks 8/16. `app/studio/components/StudioNav.tsx`:

```tsx
export function StudioNav() {
  return null;
}
```

`app/studio/components/StudioFooter.tsx`:

```tsx
export function StudioFooter() {
  return null;
}
```

- [ ] **Step 2: Create `app/studio/studio.css`**

```css
.studio-theme {
  --st-terracotta: #C2603A;
  --st-terracotta-dark: #A44E2D;
  --st-sage: #6E8C5A;
  --st-amber: #CC9A46;
  --st-ink: #2C2620;
  --st-muted: #6E6358;
  --st-sand: #F5EDE1;
  --st-offwhite: #FAF5ED;
  --st-surface: #FFFFFF;
  --st-line: #E9DECF;

  background: var(--st-offwhite);
  color: var(--st-ink);
  font-family: var(--font-studio), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Centered content column with mobile gutter. */
.st-wrap {
  width: 100%;
  max-width: 1060px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* Full-bleed Sand band with hairline borders. */
.st-band {
  background: var(--st-sand);
  border-top: 1px solid var(--st-line);
  border-bottom: 1px solid var(--st-line);
}

.st-card {
  background: var(--st-surface);
  border: 1px solid var(--st-line);
  border-radius: 22px;
}

.st-shadow-card {
  box-shadow: 0 4px 18px rgba(43, 36, 32, 0.05);
}

/* Buttons */
.st-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.st-btn-primary {
  background: var(--st-terracotta);
  color: #fff;
}
.st-btn-primary:hover {
  background: var(--st-terracotta-dark);
}

.st-btn-outline {
  background: transparent;
  color: var(--st-terracotta);
  border: 1.5px solid var(--st-terracotta);
}
.st-btn-outline:hover {
  background: var(--st-terracotta);
  color: #fff;
}

.studio-theme :focus-visible {
  outline: 2px solid var(--st-terracotta);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Create `app/studio/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./studio.css";
import { LangProvider } from "./i18n";
import { StudioNav } from "./components/StudioNav";
import { StudioFooter } from "./components/StudioFooter";

const hanken = Hanken_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-studio",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HuyBuilds Studio — Websites for local businesses",
  description:
    "I build your website, run your social media automatically, and handle it all — in English or Vietnamese. Serving Vietnamese-American businesses in Seattle.",
  openGraph: {
    title: "HuyBuilds Studio — Websites for local businesses",
    description:
      "Websites & online help for local businesses, done for you, in your language.",
    url: "https://studio.huybuilds.app",
    siteName: "HuyBuilds Studio",
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`studio-theme min-h-screen ${hanken.variable}`}>
      <LangProvider>
        <StudioNav />
        <main>{children}</main>
        <StudioFooter />
      </LangProvider>
    </div>
  );
}
```

- [ ] **Step 4: Create a minimal `app/studio/page.tsx` placeholder**

```tsx
export default function StudioPage() {
  return <div className="st-wrap py-20">Studio — under construction</div>;
}
```

- [ ] **Step 5: Verify build and dev render**

Run: `npm run build`
Expected: build succeeds; route `/studio` is listed.

Run: `npm run dev`, open `http://localhost:3000/studio` — page shows the off-white background and the placeholder text in Hanken Grotesk. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/studio/studio.css app/studio/layout.tsx app/studio/page.tsx app/studio/components/StudioNav.tsx app/studio/components/StudioFooter.tsx
git commit -m "feat: add studio theme, layout, and Hanken font"
```

---

### Task 7: Shared UI — icons, Wordmark, LangToggle

**Files:**
- Create: `app/studio/components/icons.tsx`
- Create: `app/studio/components/Wordmark.tsx`
- Create: `app/studio/components/LangToggle.tsx`

**Interfaces:**
- Consumes: `useLang` (Task 4).
- Produces: `IconBrowser`, `IconCalendar`, `IconPhone`, `IconCheck`, `Quote` (all `({ className }: { className?: string }) => JSX.Element`); `Wordmark({ withStudio?: boolean })`; `LangToggle`.

- [ ] **Step 1: Create `app/studio/components/icons.tsx`**

```tsx
type IconProps = { className?: string; style?: React.CSSProperties };

export function IconBrowser({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18" />
      <path d="M9 21h6M12 18v3" />
    </svg>
  );
}

export function IconCalendar({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
      <rect x="7" y="13" width="4" height="3" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPhone({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 19h4" />
    </svg>
  );
}

export function IconCheck({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Large decorative opening curly quote. */
export function Quote({ className, style }: IconProps) {
  return (
    <span aria-hidden className={className} style={{ fontWeight: 800, lineHeight: 1, ...style }}>
      &ldquo;
    </span>
  );
}
```

- [ ] **Step 2: Create `app/studio/components/Wordmark.tsx`**

```tsx
export function Wordmark({ withStudio = false }: { withStudio?: boolean }) {
  return (
    <span style={{ fontWeight: 800, fontSize: 21, letterSpacing: "-0.01em" }}>
      <span style={{ color: "var(--st-ink)" }}>Huy</span>
      <span style={{ color: "var(--st-terracotta)" }}>Builds</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: 999,
          background: "var(--st-amber)",
          marginLeft: 3,
          verticalAlign: "middle",
        }}
      />
      {withStudio && (
        <span style={{ color: "inherit", marginLeft: 6 }}>Studio</span>
      )}
    </span>
  );
}
```

- [ ] **Step 3: Create `app/studio/components/LangToggle.tsx`**

```tsx
"use client";

import { useLang } from "../i18n";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        border: "1px solid var(--st-line)",
        borderRadius: 999,
        overflow: "hidden",
        background: "var(--st-surface)",
      }}
    >
      {(["en", "vi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className="st-btn"
          style={{
            padding: "6px 12px",
            fontSize: 13,
            fontWeight: 700,
            borderRadius: 0,
            background: lang === code ? "var(--st-terracotta)" : "transparent",
            color: lang === code ? "#fff" : "var(--st-muted)",
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/studio/components/icons.tsx app/studio/components/Wordmark.tsx app/studio/components/LangToggle.tsx
git commit -m "feat: add studio icons, wordmark, and language toggle"
```

---

### Task 8: StudioNav

**Files:**
- Modify (replace stub): `app/studio/components/StudioNav.tsx`

**Interfaces:**
- Consumes: `useT`, `Wordmark`, `LangToggle`.
- Produces: `StudioNav` (sticky blurred header).

- [ ] **Step 1: Replace the stub with the real nav**

`app/studio/components/StudioNav.tsx`:

```tsx
"use client";

import { useT } from "../i18n";
import { Wordmark } from "./Wordmark";
import { LangToggle } from "./LangToggle";

const NAV = [
  { href: "#proof", key: "navWork" as const },
  { href: "#whatido", key: "navWhat" as const },
  { href: "#pricing", key: "navPricing" as const },
];

export function StudioNav() {
  const t = useT();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--st-offwhite) 86%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--st-line)",
      }}
    >
      <div className="st-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 16 }}>
        <a href="#top" aria-label="HuyBuilds Studio">
          <Wordmark />
        </a>

        <nav className="hidden min-[920px]:flex" style={{ alignItems: "center", gap: 24 }}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}
              style={{ fontSize: 15, fontWeight: 600, color: "var(--st-ink)" }}>
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LangToggle />
          <a href="#contact" className="st-btn st-btn-primary hidden min-[920px]:inline-flex"
            style={{ height: 42, padding: "0 18px", fontSize: 15 }}>
            {t("navMsg")}
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build + dev**

Run: `npm run build` → succeeds.
Run: `npm run dev`, open `/studio`: sticky header shows the wordmark, EN/VI toggle works (text switches), and at ≥920px the nav links + "Message me" button appear. Stop dev.

- [ ] **Step 3: Commit**

```bash
git add app/studio/components/StudioNav.tsx
git commit -m "feat: add studio sticky nav"
```

---

### Task 9: Hero

**Files:**
- Create: `app/studio/components/Hero.tsx`

**Interfaces:**
- Consumes: `useT`.
- Produces: `Hero` (renders an element with `id="top"`).

- [ ] **Step 1: Create `app/studio/components/Hero.tsx`**

```tsx
"use client";

import { useT } from "../i18n";

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="st-wrap" style={{ paddingTop: 40, paddingBottom: 48 }}>
      <div className="flex flex-col gap-8 min-[920px]:flex-row-reverse min-[920px]:items-center">
        {/* Intro card / photo */}
        <div className="st-card st-shadow-card" style={{ padding: 24, flex: "1 1 0", textAlign: "center" }}>
          {/* TODO: replace with Huy's circular headshot */}
          <div
            aria-label="Photo of Huy"
            style={{
              width: 64, height: 64, borderRadius: 999, margin: "0 auto 12px",
              background: "var(--st-sand)", border: "1px solid var(--st-line)",
            }}
            className="min-[920px]:!w-[210px] min-[920px]:!h-[210px]"
          />
          <div style={{ fontSize: 16, fontWeight: 800 }}>{t("introName")}</div>
          <div style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 4 }}>{t("introRole")}</div>
        </div>

        {/* Headline + CTA */}
        <div style={{ flex: "1 1 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--st-terracotta)" }}>
            {t("heroEyebrow")}
          </p>
          <h1
            style={{ fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.015em", textWrap: "balance", marginTop: 12 }}
            className="text-[33px] min-[920px]:text-[46px]"
          >
            {t("heroHead")}
          </h1>
          <p style={{ fontSize: 18, color: "var(--st-muted)", lineHeight: 1.5, marginTop: 16 }}>
            {t("heroSub")}
          </p>
          <a href="#contact" className="st-btn st-btn-primary w-full min-[920px]:w-auto"
            style={{ marginTop: 24, minHeight: 60, padding: "0 24px", fontSize: 18, boxShadow: "0 8px 20px rgba(194,96,58,.32)" }}>
            {t("heroCta")}
          </a>
          <p style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 12 }}>{t("heroNote")}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the page temporarily to view it**

Replace `app/studio/page.tsx` body with:

```tsx
import { Hero } from "./components/Hero";

export default function StudioPage() {
  return <Hero />;
}
```

- [ ] **Step 3: Verify dev render**

Run: `npm run dev`, open `/studio`: headline, eyebrow, subhead, CTA, and intro card render; CTA is full-width on mobile and the layout becomes two-column (photo right) at ≥920px. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add app/studio/components/Hero.tsx app/studio/page.tsx
git commit -m "feat: add studio hero section"
```

---

### Task 10: Problem and WhatIDo

**Files:**
- Create: `app/studio/components/Problem.tsx`
- Create: `app/studio/components/WhatIDo.tsx`

**Interfaces:**
- Consumes: `useT`, `IconBrowser`, `IconCalendar`, `IconPhone`, `Quote`.
- Produces: `Problem` (Sand band), `WhatIDo` (id `whatido`).

- [ ] **Step 1: Create `app/studio/components/Problem.tsx`**

```tsx
"use client";

import { useT } from "../i18n";
import { Quote } from "./icons";

const ITEMS = [
  { key: "prob1" as const, color: "var(--st-terracotta)" },
  { key: "prob2" as const, color: "var(--st-sage)" },
  { key: "prob3" as const, color: "var(--st-amber)" },
];

export function Problem() {
  const t = useT();
  return (
    <section className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>{t("probTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.key} className="st-card" style={{ borderRadius: 14, padding: 20 }}>
              <Quote className="text-[40px]" style={{ color: item.color }} />
              <p style={{ fontSize: 17, lineHeight: 1.45, marginTop: 4, color: "var(--st-ink)" }}>
                {t(item.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/studio/components/WhatIDo.tsx`**

```tsx
"use client";

import { useT } from "../i18n";
import { IconBrowser, IconCalendar, IconPhone } from "./icons";

const CARDS = [
  { icon: IconBrowser, title: "item1Title" as const, body: "item1Body" as const, color: "var(--st-terracotta)" },
  { icon: IconCalendar, title: "item2Title" as const, body: "item2Body" as const, color: "var(--st-sage)" },
  { icon: IconPhone, title: "item3Title" as const, body: "item3Body" as const, color: "var(--st-amber)" },
];

export function WhatIDo() {
  const t = useT();
  return (
    <section id="whatido" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("bundleTitle")}</h2>
      <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("bundleSub")}</p>

      <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-3" style={{ marginTop: 28 }}>
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="st-card st-shadow-card flex items-start gap-4 min-[920px]:flex-col" style={{ padding: 22 }}>
              <span style={{
                flex: "none", width: 54, height: 54, borderRadius: 14,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: `color-mix(in srgb, ${card.color} 14%, white)`, color: card.color,
              }}>
                <Icon className="w-7 h-7" />
              </span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t(card.title)}</h3>
                <p style={{ fontSize: 16, color: "var(--st-muted)", marginTop: 6 }}>{t(card.body)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", fontSize: 19, fontWeight: 800, color: "var(--st-terracotta)", marginTop: 28 }}>
        {t("bundleClose")}
      </p>
    </section>
  );
}
```

- [ ] **Step 3: View both in the page**

Update `app/studio/page.tsx`:

```tsx
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { WhatIDo } from "./components/WhatIDo";

export default function StudioPage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatIDo />
    </>
  );
}
```

- [ ] **Step 4: Verify dev render**

Run: `npm run dev`, open `/studio`: Problem is a Sand band with 3 accent-quote cards (terracotta/sage/amber); WhatIDo shows 3 icon-badge cards (icon left on mobile, above text at ≥920px) and the terracotta closer line. Stop dev.

- [ ] **Step 5: Commit**

```bash
git add app/studio/components/Problem.tsx app/studio/components/WhatIDo.tsx app/studio/page.tsx
git commit -m "feat: add studio problem + what-i-do sections"
```

---

### Task 11: Sample and WhyMe

**Files:**
- Create: `app/studio/components/Sample.tsx`
- Create: `app/studio/components/WhyMe.tsx`

**Interfaces:**
- Consumes: `useT`, `IconCheck`.
- Produces: `Sample` (id `proof`, Sand band), `WhyMe`.

- [ ] **Step 1: Create `app/studio/components/Sample.tsx`**

```tsx
"use client";

import { useT } from "../i18n";

export function Sample() {
  const t = useT();
  return (
    <section id="proof" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("proofTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("proofSub")}</p>

        <div className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-end" style={{ marginTop: 28 }}>
          {/* Browser mockup */}
          <div style={{ flex: "1 1 0", background: "var(--st-surface)", borderRadius: 16, boxShadow: "0 16px 40px rgba(43,36,32,.12)", overflow: "hidden", border: "1px solid var(--st-line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--st-line)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E07A5F" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-amber)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-sage)" }} />
              <span style={{ marginLeft: 10, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--st-muted)", background: "var(--st-sand)", borderRadius: 999, padding: "3px 10px" }}>
                huybuilds.studio/your-shop
              </span>
            </div>
            {/* TODO: replace with a real website screenshot */}
            <div style={{ background: "var(--st-sand)" }} className="h-[220px] min-[920px]:h-[400px]" />
          </div>

          {/* Phone mockup */}
          <div style={{ flex: "none", background: "var(--st-ink)", borderRadius: 30, padding: 10, width: 200 }} className="self-center min-[920px]:self-end">
            <div style={{ background: "var(--st-surface)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                <span style={{ width: 60, height: 5, borderRadius: 999, background: "var(--st-line)" }} />
              </div>
              {/* TODO: replace with a real mobile screenshot */}
              <div style={{ background: "var(--st-sand)", height: 360, marginTop: 8 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/studio/components/WhyMe.tsx`**

```tsx
"use client";

import { useT } from "../i18n";
import { IconCheck } from "./icons";

const BULLETS = ["why1", "why2", "why3", "why4", "why5"] as const;

export function WhyMe() {
  const t = useT();
  return (
    <section className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="flex flex-col gap-6 min-[920px]:flex-row">
        {/* TODO: replace with Huy's portrait */}
        <div
          style={{ flex: "none", background: "var(--st-sand)", border: "1px solid var(--st-line)", borderRadius: 18 }}
          className="w-[104px] h-[120px] min-[920px]:w-[140px] min-[920px]:h-[160px]"
        />
        <div style={{ flex: "1 1 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("whyTitle")}</h2>
          <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("whyLede")}</p>
          <ul className="grid grid-cols-1 gap-3 min-[920px]:grid-cols-2" style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
            {BULLETS.map((key) => (
              <li key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <IconCheck className="w-5 h-5" style={{ color: "var(--st-terracotta)", flex: "none", marginTop: 2 }} />
                <span style={{ fontSize: 17 }}>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

(`IconCheck` already accepts `style` from Task 7.)

- [ ] **Step 3: View in the page**

Update `app/studio/page.tsx` to add `<Sample />` and `<WhyMe />` after `<WhatIDo />` (import both).

- [ ] **Step 4: Verify dev render**

Run: `npm run dev`, open `/studio`: Sample is a Sand band with a browser mockup (3 traffic dots + mono URL pill) and a phone mockup (side-by-side at ≥920px, stacked on mobile); WhyMe shows the portrait slot + 5 terracotta-check bullets (2-col at ≥920px). Stop dev.

- [ ] **Step 5: Commit**

```bash
git add app/studio/components/Sample.tsx app/studio/components/WhyMe.tsx app/studio/components/icons.tsx app/studio/page.tsx
git commit -m "feat: add studio sample + why-me sections"
```

---

### Task 12: Pricing

**Files:**
- Create: `app/studio/components/Pricing.tsx`

**Interfaces:**
- Consumes: `useT`, `IconCheck`.
- Produces: `Pricing` (id `pricing`, Sand band).

- [ ] **Step 1: Create `app/studio/components/Pricing.tsx`**

```tsx
"use client";

import { useT } from "../i18n";
import { IconCheck } from "./icons";

const PLANS = [
  { name: "p1Name", tag: "p1Tag", price: "p1Price", per: "p1Per", cta: "p1Cta",
    features: ["p1f1", "p1f2", "p1f3", "p1f4"], popular: false, outline: true },
  { name: "p2Name", tag: "p2Tag", price: "p2Price", per: "p2Per", cta: "p2Cta",
    features: ["p2f1", "p2f2", "p2f3", "p2f4"], popular: true, outline: false },
  { name: "p3Name", tag: "p3Tag", price: "p3Price", per: "p3Per", cta: "p3Cta",
    features: ["p3f1", "p3f2", "p3f3", "p3f4"], popular: false, outline: true },
] as const;

export function Pricing() {
  const t = useT();
  return (
    <section id="pricing" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("priceTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("priceSub")}</p>

        <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-3" style={{ marginTop: 28, alignItems: "start" }}>
          {PLANS.map((plan) => (
            <div key={plan.name} className="st-card"
              style={{
                padding: 24, position: "relative",
                border: plan.popular ? "2px solid var(--st-terracotta)" : "1px solid var(--st-line)",
                boxShadow: plan.popular ? "0 12px 30px rgba(194,96,58,.18)" : "0 4px 18px rgba(43,36,32,.05)",
              }}>
              {plan.popular && (
                <span style={{ position: "absolute", top: -12, left: 20, background: "var(--st-terracotta)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
                  {t("popular")}
                </span>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>{t(plan.name)}</h3>
              <p style={{ fontSize: 15, color: "var(--st-muted)" }}>{t(plan.tag)}</p>
              <div style={{ marginTop: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 30, fontWeight: 800 }}>{t(plan.price)}</span>
                <span style={{ fontSize: 15, color: "var(--st-muted)", marginLeft: 6 }}>{t(plan.per)}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 15 }}>
                    <IconCheck className="w-4 h-4" style={{ color: "var(--st-sage)", flex: "none", marginTop: 3 }} />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`st-btn ${plan.outline ? "st-btn-outline" : "st-btn-primary"}`}
                style={{ marginTop: 20, width: "100%", minHeight: 48, fontSize: 16 }}>
                {t(plan.cta)}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "var(--st-muted)", marginTop: 20 }}>
          {t("priceFoot")}
        </p>
      </div>
    </section>
  );
}
```

Note: each `PLANS` entry's string keys are passed to `t()`, which accepts any `StringKey`.

- [ ] **Step 2: View in the page** — add `<Pricing />` after `<WhyMe />` in `app/studio/page.tsx`.

- [ ] **Step 3: Verify dev render**

Run: `npm run dev`, open `/studio`: 3 pricing cards stacked on mobile / side-by-side at ≥920px; the middle "Stay Visible" card has the 2px terracotta border, "Most popular" badge, and elevated shadow; sage checks; prices from strings; "Let's talk" shows for the third. Toggle VI — names/periods translate, dollar prices stay. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add app/studio/components/Pricing.tsx app/studio/page.tsx
git commit -m "feat: add studio pricing section"
```

---

### Task 13: Contact payload validation

**Files:**
- Create: `app/studio/lib/contact-schema.ts`
- Create: `app/studio/lib/__tests__/contact-schema.test.ts`

**Interfaces:**
- Produces: `type ContactPayload`, `type ValidationResult`, `validateContactPayload(body: unknown): ValidationResult`. Error codes: `"required" | "email" | "honeypot"`.

- [ ] **Step 1: Write the failing test**

`app/studio/lib/__tests__/contact-schema.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- contact-schema`
Expected: FAIL — cannot find module `../contact-schema`.

- [ ] **Step 3: Write the implementation**

`app/studio/lib/contact-schema.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- contact-schema`
Expected: PASS — 8 passed.

- [ ] **Step 5: Commit**

```bash
git add app/studio/lib/contact-schema.ts app/studio/lib/__tests__/contact-schema.test.ts
git commit -m "feat: add studio contact payload validation"
```

---

### Task 14: Contact API route (Resend)

**Files:**
- Create: `app/api/studio-contact/route.ts`

**Interfaces:**
- Consumes: `validateContactPayload`, `CONTACT`.
- Produces: `POST /api/studio-contact` returning `{ ok: true }` (200), `{ ok: false, code }` (400), or `{ ok: false, code: "no_email" }` (503).

- [ ] **Step 1: Create the route handler**

`app/api/studio-contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactPayload } from "@/app/studio/lib/contact-schema";
import { CONTACT } from "@/app/studio/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "required" }, { status: 400 });
  }

  const result = validateContactPayload(body);
  if (!result.ok) {
    // Honeypot hits look successful to the bot, but we send nothing.
    if (result.code === "honeypot") return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, code: result.code }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful fallback: tell the client to use the sms link instead.
    return NextResponse.json({ ok: false, code: "no_email" }, { status: 503 });
  }

  const to = process.env.STUDIO_CONTACT_TO || CONTACT.email;
  const from = process.env.STUDIO_CONTACT_FROM || "HuyBuilds Studio <studio@huybuilds.app>";
  const d = result.data;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: d.email || undefined,
      subject: `New studio inquiry — ${d.name}${d.business ? ` (${d.business})` : ""}`,
      text: [
        `Name: ${d.name}`,
        `Phone: ${d.phone || "—"}`,
        `Email: ${d.email || "—"}`,
        `Business: ${d.business || "—"}`,
        `Type: ${d.businessType || "—"}`,
        "",
        d.message,
      ].join("\n"),
    });
  } catch {
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds; route `/api/studio-contact` is listed as a function.

- [ ] **Step 3: Smoke-test the validation paths locally (no API key set)**

Run: `npm run dev`, then in another shell:

```bash
curl -s -X POST localhost:3000/api/studio-contact -H 'content-type: application/json' -d '{}'
# Expected: {"ok":false,"code":"required"}  (HTTP 400)

curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:3000/api/studio-contact \
  -H 'content-type: application/json' \
  -d '{"name":"An","phone":"2065550000","message":"Hi"}'
# Expected: 503  (no RESEND_API_KEY -> graceful fallback)
```

Stop dev.

- [ ] **Step 4: Commit**

```bash
git add app/api/studio-contact/route.ts
git commit -m "feat: add studio contact API route with Resend + fallback"
```

---

### Task 15: Contact section and form

**Files:**
- Create: `app/studio/components/ContactForm.tsx`
- Create: `app/studio/components/Contact.tsx`

**Interfaces:**
- Consumes: `useT`, `CONTACT`, `smsHref`, `mailtoHref`.
- Produces: `Contact` (id `contact`) rendering the four rows + `<ContactForm/>`.

- [ ] **Step 1: Create `app/studio/components/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useT } from "../i18n";
import { CONTACT, smsHref } from "../config";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Client-side guard mirrors the server rules.
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    if (!name || !message || (!phone && !email)) {
      setStatus("error");
      setErrorMsg(t("formErrRequired"));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/studio-contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; code?: string };
      if (json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      setStatus("error");
      setErrorMsg(json.code === "email" ? t("formErrEmail") : t("formErrGeneric"));
    } catch {
      setStatus("error");
      setErrorMsg(t("formErrGeneric"));
    }
  }

  if (status === "success") {
    return (
      <div className="st-card st-shadow-card" style={{ padding: 24, marginTop: 24, textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: "var(--st-sage)" }}>{t("formSuccess")}</p>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%", minHeight: 48, fontSize: 16, padding: "10px 14px",
    border: "1px solid var(--st-line)", borderRadius: 14, background: "var(--st-surface)",
    color: "var(--st-ink)",
  };
  const labelStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24, textAlign: "left" }} noValidate>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{t("formHeading")}</h3>

      {/* Honeypot — visually hidden, not announced. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off"
        aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />

      <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-2">
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formName")}</span>
          <input name="name" style={fieldStyle} required />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formPhone")}</span>
          <input name="phone" type="tel" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formEmail")}</span>
          <input name="email" type="email" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formBiz")}</span>
          <input name="business" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }} className="min-[920px]:col-span-2">
          <span style={labelStyle}>{t("formType")}</span>
          <select name="businessType" style={fieldStyle} defaultValue="">
            <option value="" disabled>{t("formType")}</option>
            <option value="restaurant">{t("formTypeRestaurant")}</option>
            <option value="cafe">{t("formTypeCafe")}</option>
            <option value="market">{t("formTypeMarket")}</option>
            <option value="salon">{t("formTypeSalon")}</option>
            <option value="other">{t("formTypeOther")}</option>
          </select>
        </label>
        <label style={{ display: "block" }} className="min-[920px]:col-span-2">
          <span style={labelStyle}>{t("formMsg")}</span>
          <textarea name="message" rows={4} style={{ ...fieldStyle, minHeight: 110, resize: "vertical" }} required />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" style={{ color: "var(--st-terracotta-dark)", fontSize: 15, marginTop: 12 }}>
          {errorMsg}{" "}
          <a href={smsHref(CONTACT.phoneDisplay)} style={{ textDecoration: "underline", fontWeight: 700 }}>
            {CONTACT.phoneDisplay}
          </a>
        </p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="st-btn st-btn-primary" style={{ marginTop: 16, width: "100%", minHeight: 54, fontSize: 17 }}>
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create `app/studio/components/Contact.tsx`**

```tsx
"use client";

import { useT } from "../i18n";
import { CONTACT, smsHref, mailtoHref } from "../config";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const t = useT();
  const rows = [
    { href: smsHref(CONTACT.phoneDisplay), label: t("cCall"), value: CONTACT.phoneDisplay, primary: true },
    { href: CONTACT.zaloUrl, label: t("cZalo"), value: CONTACT.zaloDisplay, primary: false },
    { href: CONTACT.facebookUrl, label: t("cFb"), value: CONTACT.facebookDisplay, primary: false },
    { href: mailtoHref(CONTACT.email), label: t("cEmail"), value: CONTACT.email, primary: false },
  ];

  return (
    <section id="contact" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 56 }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("contactTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("contactSub")}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          {rows.map((row) => (
            <a key={row.label} href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                minHeight: 62, padding: "0 20px", borderRadius: 14,
                background: row.primary ? "var(--st-terracotta)" : "var(--st-surface)",
                color: row.primary ? "#fff" : "var(--st-ink)",
                border: row.primary ? "none" : "1px solid var(--st-line)",
                fontWeight: 700, fontSize: 16,
              }}>
              <span style={{ color: row.primary ? "#fff" : "var(--st-sage)" }}>{row.label}</span>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, opacity: 0.95 }}>{row.value}</span>
            </a>
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: View in the page** — add `<Contact />` after `<Pricing />` in `app/studio/page.tsx`.

- [ ] **Step 4: Verify dev render + submit**

Run: `npm run dev`, open `/studio`:
- Four contact rows render (call/text is terracotta; others white with sage labels).
- The form shows 6 fields; submitting empty shows the bilingual required error + the sms fallback link.
- Filling name + phone + message and submitting shows the 503 fallback error (no API key locally) — confirms the wiring. Toggle VI: labels/errors translate.

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add app/studio/components/Contact.tsx app/studio/components/ContactForm.tsx app/studio/page.tsx
git commit -m "feat: add studio contact section + form"
```

---

### Task 16: StudioFooter

**Files:**
- Modify (replace stub): `app/studio/components/StudioFooter.tsx`

**Interfaces:**
- Consumes: `useT`, `Wordmark`.
- Produces: `StudioFooter`.

- [ ] **Step 1: Replace the stub**

`app/studio/components/StudioFooter.tsx`:

```tsx
"use client";

import { useT } from "../i18n";

export function StudioFooter() {
  const t = useT();
  return (
    <footer style={{ background: "var(--st-ink)", color: "var(--st-offwhite)" }}>
      <div className="st-wrap" style={{ paddingTop: 36, paddingBottom: 36 }}>
        {/* Light wordmark variant for the dark footer */}
        <span style={{ fontWeight: 800, fontSize: 21 }}>
          <span style={{ color: "#fff" }}>Huy</span>
          <span style={{ color: "var(--st-amber)" }}>Builds</span>
          <span style={{ color: "#fff", marginLeft: 6 }}>Studio</span>
        </span>
        <p style={{ marginTop: 12, fontSize: 16, color: "rgba(250,245,237,0.8)" }}>{t("footTag")}</p>
        <p style={{ marginTop: 6, fontSize: 14, color: "rgba(250,245,237,0.6)" }}>{t("footLoc")}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build + dev**

Run: `npm run build` → succeeds.
Run: `npm run dev`, open `/studio`: ink footer with the light "HuyBuilds Studio" wordmark, tagline, and location line; both translate on VI toggle. Stop dev.

- [ ] **Step 3: Commit**

```bash
git add app/studio/components/StudioFooter.tsx
git commit -m "feat: add studio footer"
```

---

### Task 17: Final assembly, verification, and deploy docs

**Files:**
- Modify: `app/studio/page.tsx` (final, ordered assembly)
- Create: `docs/studio-deploy.md`

**Interfaces:**
- Consumes: all section components.

- [ ] **Step 1: Finalize `app/studio/page.tsx`**

```tsx
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { WhatIDo } from "./components/WhatIDo";
import { Sample } from "./components/Sample";
import { WhyMe } from "./components/WhyMe";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";

export default function StudioPage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatIDo />
      <Sample />
      <WhyMe />
      <Pricing />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Create `docs/studio-deploy.md`**

```markdown
# Deploying studio.huybuilds.app (Netlify)

The studio landing page lives at the `/studio` route and is served at the
`studio.huybuilds.app` subdomain via `middleware.ts` (host rewrite). No code
changes are needed to attach the subdomain — only Netlify config.

## 1. Add the subdomain in Netlify
- Netlify site → **Domain management → Add a domain alias** → `studio.huybuilds.app`.
- Add a DNS record: `CNAME studio` → your Netlify site (e.g. `<site>.netlify.app`),
  or use Netlify DNS and add the subdomain there.

## 2. Contact form env vars (Site settings → Environment variables)
- `RESEND_API_KEY` — from resend.com.
- `STUDIO_CONTACT_TO` — where inquiries are emailed (defaults to the placeholder in
  `app/studio/config.ts` if unset).
- `STUDIO_CONTACT_FROM` — a verified Resend sender, e.g. `HuyBuilds Studio <studio@huybuilds.app>`.

Until `RESEND_API_KEY` is set, the form returns a graceful "text me instead" message
(HTTP 503) and never crashes.

## 3. Edit before launch
- Real contact handles: `app/studio/config.ts`.
- Real photos: replace the four `TODO` image slots (Hero headshot, WhyMe portrait,
  Sample browser + phone screenshots).
- Prices/copy: `app/studio/strings.json`.

## Local subdomain testing
Add to `/etc/hosts`: `127.0.0.1 studio.localhost`, run `npm run dev`, and open
`http://studio.localhost:3000` — the middleware rewrites it to `/studio`.
```

- [ ] **Step 3: Full verification pass**

Run: `npm run test`
Expected: all unit tests pass (host, i18n, config, contact-schema).

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds; `/studio` and `/api/studio-contact` both listed; `ƒ Middleware` present.

- [ ] **Step 4: Manual acceptance check**

Run: `npm run dev`. Verify on `http://localhost:3000/studio` and via `http://studio.localhost:3000` (after `/etc/hosts` entry):
- All 8 sections render top-to-bottom in order (Hero → Problem → WhatIDo → Sample → WhyMe → Pricing → Contact → Footer).
- EN/VI toggle flips **every** visible string instantly and persists across reload.
- Anchor nav (Sample / What I do / Pricing / Message me) smooth-scrolls to the right sections.
- Layout switches at 920px exactly per the responsive table.
- Contact links use `sms:`, Zalo/FB `https` (new tab), `mailto:`.
- Portfolio site (`http://localhost:3000/`) and DaBraino (`/dabraino`) are visually unchanged.

Stop dev.

- [ ] **Step 5: Commit**

```bash
git add app/studio/page.tsx docs/studio-deploy.md
git commit -m "feat: assemble studio landing page + deploy docs"
```

---

## Self-Review Notes (author)

- **Spec coverage:** routing/subdomain (T2, T17 docs), theme/tokens (T6), Hanken font (T6), i18n (T3/T4), all 9 sections incl. nav+footer (T7–T12, T15, T16), contact form 6 fields + Resend + fallback + honeypot (T13–T15), env vars (T14, T17), photo placeholders (T9/T11), responsive 920px (every section), verification (T17). All spec sections map to a task.
- **Placeholder discipline:** image `TODO`s are intentional drop-in slots per spec (Assets), not plan gaps.
- **Type consistency:** `useT()` returns `(key: StringKey) => string`; `StudioLang`/`StringKey` defined in `lib/strings.ts` and consumed everywhere; `validateContactPayload` codes (`required|email|honeypot`) match the route's handling; `CONTACT`/`smsHref`/`mailtoHref`/`telDigits` signatures consistent across config, Contact, ContactForm, and route.
