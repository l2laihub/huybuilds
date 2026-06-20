# HuyBuilds Studio — Landing Page Design Spec

**Date:** 2026-06-20
**Status:** Approved (integration approach)
**Source design:** `design_handoff_landing_page/` (README.md, strings.json, two HTML references)

## Goal

Add a single-page, mobile-first, bilingual (EN/VI) marketing landing page for
**HuyBuilds Studio** — Huy building websites + online presence for Vietnamese-American
local businesses in Seattle. It must be served as its own subdomain
`studio.huybuilds.app`, isolated from the existing portfolio site at `huybuilds.app`.

Tone: warm, trustworthy, calm, professional — **NOT a flashy tech startup**. No animation.

## Non-Goals

- No contact form, backend, or DB — contact is via text/Zalo/FB/email links only.
- No reuse of the portfolio's animated/techy UI (framer-motion, magnetic buttons, orbs).
- No CMS — copy lives in `strings.json`; prices/handles in plain constants.
- The portfolio site (`huybuilds.app`) and DaBraino sub-site are untouched.

## Architecture

Mirrors the existing self-contained sub-site convention (`app/dabraino/`).

### Routing & subdomain
- New route group at `app/studio/` with its own `layout.tsx`, CSS theme, and components.
  Served at the path `/studio`.
- New `middleware.ts` at repo root: when the request `host` is `studio.huybuilds.app`,
  rewrite to `/studio` so the URL bar shows the clean subdomain. `huybuilds.app/studio`
  continues to work as a fallback. Middleware matcher excludes `/_next`, `/api`, and
  static assets.
- **Deploy step (manual, owner):** add `studio.huybuilds.app` as a domain alias in Netlify
  (Domain management) and point a DNS `CNAME studio` → the Netlify site. Netlify's Next.js
  runtime (`@netlify/plugin-nextjs`, auto-installed at build) runs the middleware as a
  Netlify Edge Function, so the host→path rewrite works with no extra config. Documented in
  the implementation notes; no code dependency.

### Theme & tokens
- `app/studio/studio.css` defines the Terracotta + Sage token set as CSS custom properties,
  scoped under a `.studio-theme` root so it cannot leak into the portfolio:
  | Token | Hex |
  |---|---|
  | terracotta (primary) | `#C2603A` |
  | terracotta-dark (hover) | `#A44E2D` |
  | sage | `#6E8C5A` |
  | amber | `#CC9A46` |
  | ink | `#2C2620` |
  | muted | `#6E6358` |
  | sand | `#F5EDE1` |
  | off-white (page bg) | `#FAF5ED` |
  | surface | `#FFFFFF` |
  | line | `#E9DECF` |
- **Hanken Grotesk** via `next/font/google` (weights 400/500/600/700/800), loaded in
  `app/studio/layout.tsx` only. Does not alter the root layout's fonts.
- Radii: pill `999px`, card `22px`, mockup `16px`, inset `14px`.
- Shadows, spacing scale, and typography sizes per handoff README "Design Tokens".

### i18n
- `app/studio/i18n.tsx`: client `LangProvider` (React context) holding `lang: 'en' | 'vi'`,
  default `'en'`, persisted to `localStorage` (`hb-studio-lang`). A `useT()` hook returns a
  `t(key)` function reading from the bundled strings. Toggle flips language instantly, no
  reload. Initial server render is EN; provider applies stored preference on hydration.
- Strings sourced from `app/studio/strings.json` (copied from the handoff). Complete EN/VI
  copy already exists for every key. Prices live in strings.json (`p1Price` etc.) and are
  the source of truth; period labels and `p3Price` ("Let's talk") translate.

### Components (`app/studio/components/`, one purpose each)
- `StudioNav` — sticky, blurred translucent bg, 1px bottom border. Wordmark (CSS) + nav
  (desktop) + `LangToggle` + "Message me" pill → `#contact`.
- `Hero` — intro card (circular photo slot), eyebrow, h1, subhead, CTA → `#contact`, note.
  Desktop: two-column row-reverse.
- `Problem` — Sand band, three quote cards (terracotta/sage/amber accents).
- `WhatIDo` (`#whatido`) — three icon-badge cards + centered closer line.
- `Sample` (`#proof`) — Sand band, browser mockup frame + phone mockup, image slots.
- `WhyMe` — portrait slot + five terracotta-check trust bullets (2-col desktop).
- `Pricing` (`#pricing`) — Sand band, three cards, middle "Most popular" elevated/bordered.
- `Contact` (`#contact`) — four large tappable rows (sms/Zalo/FB/mailto), capped 640px.
- `StudioFooter` — ink bg, light text, wordmark + tagline + location.
- `LangToggle` — EN/VI pill.
- `icons.tsx` — inline SVG marks (browser window, calendar grid, phone) in tinted badges.
- `Wordmark` — "Huy" ink + "Builds" terracotta + 7px amber dot, set in type/CSS.

### Contact & pricing constants
- `app/studio/config.ts` — single source for the four contact handles and their hrefs
  (`sms:`, `mailto:`, Zalo, Facebook). **Currently the handoff placeholders**
  (`(206) 555-0123`, `zalo.me/huybuilds`, `fb.com/huybuilds`, `huy@huybuilds.studio`) —
  owner swaps real values here. Prices come from `strings.json`.

### Photos (placeholders)
Drop-in `<img>` slots with neutral placeholder backgrounds + `TODO` comments:
hero headshot (circular), why-me portrait (rounded rect), sample website screenshot
(browser frame), sample mobile screenshot (phone frame).

## Responsive
Single breakpoint at **920px** (Tailwind `min-[920px]:` utilities / CSS media queries),
per the handoff responsive table. Mobile-first. Inner content capped ~1060px, 20px mobile
gutter. Section bands full-bleed Sand with 1px top/bottom borders.

## Testing / verification
- `npm run build` and `npm run lint` pass.
- Manual: load `/studio`, verify all sections render, EN/VI toggle flips every string and
  persists across reload, anchor nav scrolls, layout switches at 920px, contact links use
  correct schemes. Verify middleware rewrite locally via a `Host: studio.huybuilds.app`
  header (or `/etc/hosts` + `next dev`).

## Open items
- Real contact handles (owner to provide; placeholders ship until then).
- Real photos (owner to provide; placeholder slots ship until then).
- Netlify domain alias + DNS `CNAME studio` for `studio.huybuilds.app` (owner, post-merge).
