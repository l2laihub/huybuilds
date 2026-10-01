"use client";

import { createElement, useEffect } from "react";
import { useT } from "../i18n";
import { CONTACT } from "../config";

const WIDGET_SRC = "https://w.behold.so/widget.js";

/**
 * Huy's own Instagram, live on his own site — the thing the NK Nails quote
 * above says he does for clients. Same Behold.so widget used on
 * nknailsseattle.com; see that repo's docs/photo-workflow.md for the feed setup
 * and what to do when the feed dies (Instagram password change revokes it).
 */
export function InstagramFeed() {
  const t = useT();
  const feedId = CONTACT.instagramFeedId;

  useEffect(() => {
    if (!feedId || document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = WIDGET_SRC;
    document.head.append(s);
  }, [feedId]);

  // ponytail: no feed id, no section. Same reason NK Nails' widget carries no
  // intrinsic height — a dead feed collapses to nothing instead of a blank hole.
  if (!feedId) return null;

  return (
    <section id="instagram" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("igTitle")}</h2>
      <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("igSub")}</p>
      <div style={{ marginTop: 24 }}>
        {/* Behold custom element. createElement keeps it out of the JSX
            intrinsic-element types — no global declaration needed for one tag. */}
        {createElement("behold-widget", { "feed-id": feedId })}
      </div>
      <a
        href={CONTACT.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 20, fontSize: 16, fontWeight: 700, color: "var(--st-terracotta)" }}
      >
        {t("igFollow")}
      </a>
    </section>
  );
}
