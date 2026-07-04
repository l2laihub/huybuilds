# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server at localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test` — run all tests (Vitest)
- `npx vitest run app/studio/config.test.ts` — run a single test file
- `npm run test:watch` — watch mode

## Deployment

Deploys on **Netlify**, not Vercel (README is create-next-app boilerplate; ignore its Vercel section). See `docs/studio-deploy.md` for subdomain setup and env vars.

## Architecture

Next.js 14 App Router serving **three brands from one repo**:

- `app/` (root) — huybuilds.app portfolio site
- `app/studio/` — HuyBuilds Studio landing page, served at **studio.huybuilds.app**
- `app/dabraino/` — DaBraino app pages (landing, privacy, FAQ)

### Studio subdomain rewrite (`middleware.ts`)

Requests to `studio.huybuilds.app` are host-rewritten to `/studio/*`. Consequences:

- Studio pages are reachable both at `studio.huybuilds.app/privacy` (rewritten) and `localhost:3000/studio/privacy` (direct). Internal studio links must work in both — use `studioHref()` from `app/studio/lib/host.ts`, never hardcode `/studio/...` or bare paths.
- `/favicon.ico` is routed per host in the middleware (studio gets its own mark).
- Local subdomain testing: add `127.0.0.1 studio.localhost` to `/etc/hosts`, open `http://studio.localhost:3000`.

### Studio i18n (English/Vietnamese)

- All copy lives in `app/studio/strings.json`; typed access via `app/studio/lib/strings.ts` (`StringKey`).
- `LangProvider` in `app/studio/i18n.tsx`: SSR/first paint is always English, stored preference (`localStorage` key `hb-studio-lang`) hydrates after mount. Bilingual legal pages get content from `app/studio/lib/legal-content.ts`.

### Studio contact form

`app/api/studio-contact/route.ts` sends email via Resend. Designed to degrade gracefully:

- No `RESEND_API_KEY` → 503 with code `no_email`, client shows "text me instead".
- Honeypot hits return a fake `{ ok: true }` so bots don't learn.
- Validation in `app/studio/lib/contact-schema.ts`; contact handles/defaults in `app/studio/config.ts`.

### Analytics

PostHog loads only on the studio subdomain (`PostHogProvider`); no-op when `NEXT_PUBLIC_POSTHOG_KEY` is unset. Custom events go through `app/studio/lib/analytics.ts`.

## Conventions

- Tests are colocated (`config.test.ts`, `__tests__/`), Vitest node environment, `@/` alias = repo root.
- Tailwind CSS v4 (PostCSS plugin, no tailwind.config); each brand has its own CSS file (`globals.css`, `studio.css`, `dabraino.css`).
