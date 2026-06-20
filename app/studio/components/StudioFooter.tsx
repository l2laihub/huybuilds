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
