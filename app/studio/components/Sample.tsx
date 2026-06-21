"use client";

import Image from "next/image";

import { useT } from "../i18n";

const DEMO_URL = "https://studio-huybuilds.netlify.app/";

export function Sample() {
  const t = useT();
  return (
    <section id="proof" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("proofTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("proofSub")}</p>

        <div className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-end" style={{ marginTop: 28 }}>
          {/* Browser mockup — links to the live demo */}
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: "1 1 0", background: "var(--st-surface)", borderRadius: 16, boxShadow: "0 16px 40px rgba(43,36,32,.12)", overflow: "hidden", border: "1px solid var(--st-line)", display: "block", color: "inherit", textDecoration: "none" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--st-line)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E07A5F" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-amber)" }} />
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-sage)" }} />
              <span style={{ marginLeft: 10, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--st-muted)", background: "var(--st-sand)", borderRadius: 999, padding: "3px 10px" }}>
                studio-huybuilds.netlify.app
              </span>
            </div>
            <div style={{ position: "relative", background: "var(--st-sand)" }} className="h-[220px] min-[920px]:h-[400px]">
              <Image
                src="/studio/sample-desktop.png"
                alt="A sample website built by HuyBuilds Studio — Biển Xanh Seafood Market"
                fill
                sizes="(min-width: 920px) 700px, 100vw"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
          </a>

          {/* Phone mockup — links to the live demo */}
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: "none", background: "var(--st-ink)", borderRadius: 30, padding: 10, width: 200, display: "block" }}
            className="self-center min-[920px]:self-end"
          >
            <div style={{ background: "var(--st-surface)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                <span style={{ width: 60, height: 5, borderRadius: 999, background: "var(--st-line)" }} />
              </div>
              <div style={{ position: "relative", background: "var(--st-sand)", height: 360, marginTop: 8 }}>
                <Image
                  src="/studio/sample-mobile.png"
                  alt="A sample website on mobile built by HuyBuilds Studio — Biển Xanh Seafood Market"
                  fill
                  sizes="180px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
            </div>
          </a>
        </div>

        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 15, fontWeight: 700, color: "var(--st-terracotta)", textDecoration: "none" }}
        >
          {t("proofCta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
