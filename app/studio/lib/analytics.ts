import posthog from "posthog-js";

/**
 * The set of custom events we capture on the studio site. Keeping them in one
 * place means dashboards and code stay in sync.
 */
export type StudioEvent =
  | "contact_form_submitted"
  | "contact_clicked"
  | "lang_toggled"
  | "sample_site_clicked";

/**
 * Thin wrapper over the PostHog singleton. No-ops when analytics isn't
 * initialized (no key configured, server render) so components can call it
 * unconditionally and nothing breaks in local dev or on the root site.
 */
export function track(
  event: StudioEvent,
  props?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, props);
}
