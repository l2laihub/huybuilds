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

## 3. Analytics env vars (PostHog) — optional but recommended
Tracks studio visitors and key conversions. Loads only on the studio subdomain.
- `NEXT_PUBLIC_POSTHOG_KEY` — Project API key from PostHog → **Settings → Project**.
- `NEXT_PUBLIC_POSTHOG_HOST` — `https://us.i.posthog.com` (US) or `https://eu.i.posthog.com` (EU).

Both are `NEXT_PUBLIC_` (sent to the browser, as analytics keys must be). When the
key is unset (e.g. local dev), analytics is a silent no-op — nothing breaks.

What's tracked: automatic pageviews + visitor info (country, device, referrer/UTM),
plus custom events `contact_form_submitted`, `contact_clicked` (call/facebook/email),
`lang_toggled`, and `sample_site_clicked`. Autocapture and session recording are off.
Build funnels/insights in PostHog from these events. Note: PostHog sets cookies by
default — add a consent banner if your audience requires one.

## 4. Edit before launch
- Real contact handles: `app/studio/config.ts`.
- Real photos: replace the four `TODO` image slots (Hero headshot, WhyMe portrait,
  Sample browser + phone screenshots).
- Prices/copy: `app/studio/strings.json`.

## Local subdomain testing
Add to `/etc/hosts`: `127.0.0.1 studio.localhost`, run `npm run dev`, and open
`http://studio.localhost:3000` — the middleware rewrites it to `/studio`.
