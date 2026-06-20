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

- No DB or auth — the contact form emails the submission and stores nothing.
- The form **complements** the text/Zalo/FB/email rows; those stay the primary, lowest-
  friction path (the audience prefers messaging). The form never replaces them.
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
- `Contact` (`#contact`) — four large tappable rows (sms/Zalo/FB/mailto), capped 640px,
  **plus a `ContactForm`** below them (see Contact form section).
- `ContactForm` — client component, 6 fields, posts to `/api/studio-contact`, bilingual
  labels + validation + loading/success/error states (see below).
- `StudioFooter` — ink bg, light text, wordmark + tagline + location.
- `LangToggle` — EN/VI pill.
- `icons.tsx` — inline SVG marks (browser window, calendar grid, phone) in tinted badges.
- `Wordmark` — "Huy" ink + "Builds" terracotta + 7px amber dot, set in type/CSS.

### Contact & pricing constants
- `app/studio/config.ts` — single source for the four contact handles and their hrefs
  (`sms:`, `mailto:`, Zalo, Facebook). **Currently the handoff placeholders**
  (`(206) 555-0123`, `zalo.me/huybuilds`, `fb.com/huybuilds`, `huy@huybuilds.studio`) —
  owner swaps real values here. Prices come from `strings.json`.

### Contact form
A real, working form that emails Huy each submission. Complements the contact rows.

- **Fields (6):** Name, Phone, Email, Business name, Business type, Message. Plus a hidden
  honeypot field for spam. Required: Name + at least one of Phone/Email + Message; others
  optional. Client-side validation with bilingual inline errors; server re-validates.
- **Component:** `app/studio/components/ContactForm.tsx` (client). Controlled inputs, large
  tap targets (≥48px) and 16px+ font for the older audience. Submits via `fetch` POST to
  `/api/studio-contact`. States: idle → submitting (disabled + spinner) → success (replaces
  form with a warm thank-you, bilingual) or error (inline message, form preserved).
  Business-type is a `<select>` (Restaurant / Café / Market / Salon / Other), bilingual.
- **API route:** `app/api/studio-contact/route.ts` (Node route handler; runs as a Netlify
  Function). Validates payload, rejects if honeypot filled, sends email via **Resend**
  (`resend` npm dependency) to the owner. Returns `{ ok: true }` or a `4xx/5xx` with a
  bilingual-safe error code (client maps code → localized message). No persistence.
- **Env vars** (Netlify site settings, not committed):
  - `RESEND_API_KEY` — Resend API key.
  - `STUDIO_CONTACT_TO` — destination email (defaults to the `huy@huybuilds.studio`
    placeholder if unset; owner sets real value).
  - `STUDIO_CONTACT_FROM` — verified Resend sender (e.g. `studio@huybuilds.app`).
  - Missing `RESEND_API_KEY` → route returns a graceful 503 and the form shows "please text
    me instead" pointing at the sms link, so the page never hard-fails.
- **Strings:** new bilingual keys added to `strings.json` (form heading, the 6 labels +
  placeholders, business-type options, submit button, submitting/success/error messages,
  validation messages). VI translations authored to match the existing copy's warm register.

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
- Contact form: validates required fields in both languages, honeypot blocks bots, success
  state shows after a real submit, and the API route emails the destination. With
  `RESEND_API_KEY` unset, the form degrades gracefully to the "text me" fallback (no crash).

## Open items
- Real contact handles (owner to provide; placeholders ship until then).
- Real photos (owner to provide; placeholder slots ship until then).
- Netlify domain alias + DNS `CNAME studio` for `studio.huybuilds.app` (owner, post-merge).
- Resend account, verified sender domain, and the three `STUDIO_CONTACT_*` / `RESEND_API_KEY`
  env vars set in Netlify (owner). Until then the form runs in graceful-fallback mode.
