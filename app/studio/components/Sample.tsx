"use client";

import { useT } from "../i18n";

export function Sample() {
  const t = useT();
  return (
    <section id="proof" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("proofTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("proofSub")}</p>

        <div className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-end" style={{ marginTop: 28 }}>
          {/* Browser mockup */}
          <div style={{ flex: "1 1 0", background: "var(--st-surface)", borderRadius: 16, boxShadow: "0 16px 40px rgba(43,36,32,.12)", overflow: "hidden", border: "1px solid var(--st-line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--st-line)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E07A5F" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-amber)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-sage)" }} />
              <span style={{ marginLeft: 10, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--st-muted)", background: "var(--st-sand)", borderRadius: 999, padding: "3px 10px" }}>
                huybuilds.studio/your-shop
              </span>
            </div>
            {/* TODO: replace with a real website screenshot */}
            <div style={{ background: "var(--st-sand)" }} className="h-[220px] min-[920px]:h-[400px]" />
          </div>

          {/* Phone mockup */}
          <div style={{ flex: "none", background: "var(--st-ink)", borderRadius: 30, padding: 10, width: 200 }} className="self-center min-[920px]:self-end">
            <div style={{ background: "var(--st-surface)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                <span style={{ width: 60, height: 5, borderRadius: 999, background: "var(--st-line)" }} />
              </div>
              {/* TODO: replace with a real mobile screenshot */}
              <div style={{ background: "var(--st-sand)", height: 360, marginTop: 8 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
