"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

/**
 * Initializes PostHog for the studio subdomain only (this provider lives in the
 * studio layout, so the root site never loads it). Privacy-lean by design:
 * pageviews are captured automatically, but autocapture and session recording
 * are off — we only send the handful of conversion events in lib/analytics.ts.
 *
 * Without NEXT_PUBLIC_POSTHOG_KEY (e.g. local dev) this is a no-op, so the site
 * runs normally and track() calls silently do nothing.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!KEY || posthog.__loaded) return;
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: true,
      autocapture: false,
      disable_session_recording: true,
    });
  }, []);

  return <>{children}</>;
}
