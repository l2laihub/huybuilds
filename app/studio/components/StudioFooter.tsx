"use client";

import { usePathname } from "next/navigation";
import { useT } from "../i18n";
import { studioHref } from "../lib/host";

export function StudioFooter() {
  const t = useT();
  const pathname = usePathname();
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
        <nav style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 20 }}>
          <a href={studioHref(pathname, "/privacy")} style={{ fontSize: 14, color: "rgba(250,245,237,0.8)", textDecoration: "underline" }}>
            {t("footPrivacy")}
          </a>
          <a href={studioHref(pathname, "/terms")} style={{ fontSize: 14, color: "rgba(250,245,237,0.8)", textDecoration: "underline" }}>
            {t("footTerms")}
          </a>
        </nav>
      </div>
    </footer>
  );
}
