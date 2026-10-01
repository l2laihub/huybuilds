"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useT } from "../i18n";
import { CONTACT } from "../config";
import { studioHref } from "../lib/host";

export function StudioFooter() {
  const t = useT();
  const pathname = usePathname();
  const linkStyle: CSSProperties = { fontSize: 14, color: "rgba(250,245,237,0.8)", textDecoration: "underline" };
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
        {/* ponytail: brand names are the same in EN and VI, so no i18n keys.
            TikTok stays off until the account has videos — an empty profile
            contradicts the 3-posts-a-week promise on the pricing card. */}
        <nav style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 20 }}>
          <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            Facebook
          </a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            Instagram
          </a>
          <a href={studioHref(pathname, "/privacy")} style={linkStyle}>
            {t("footPrivacy")}
          </a>
          <a href={studioHref(pathname, "/terms")} style={linkStyle}>
            {t("footTerms")}
          </a>
        </nav>
      </div>
    </footer>
  );
}
