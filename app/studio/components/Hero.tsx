"use client";

import Image from "next/image";
import { useT } from "../i18n";

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="st-wrap" style={{ paddingTop: 40, paddingBottom: 48 }}>
      <div className="flex flex-col gap-8 min-[920px]:flex-row-reverse min-[920px]:items-center">
        {/* Intro card / photo */}
        <div className="st-card st-shadow-card" style={{ padding: 24, flex: "1 1 0", textAlign: "center" }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: 999, margin: "0 auto 12px",
              border: "1px solid var(--st-line)", position: "relative", overflow: "hidden",
            }}
            className="min-[920px]:!w-[210px] min-[920px]:!h-[210px]"
          >
            <Image
              src="/studio/huy-profile.png"
              alt="Huy, founder of HuyBuilds Studio"
              fill
              sizes="(min-width: 920px) 210px, 64px"
              style={{ objectFit: "cover", objectPosition: "center 18%" }}
              priority
            />
          </div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>{t("introName")}</div>
          <div style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 4 }}>{t("introRole")}</div>
        </div>

        {/* Headline + CTA */}
        <div style={{ flex: "1 1 0" }}>
          <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--st-terracotta)" }}>
            {t("heroEyebrow")}
          </p>
          <h1
            style={{ fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.015em", textWrap: "balance", marginTop: 12 }}
            className="text-[33px] min-[920px]:text-[46px]"
          >
            {t("heroHead")}
          </h1>
          <p style={{ fontSize: 18, color: "var(--st-muted)", lineHeight: 1.5, marginTop: 16 }}>
            {t("heroSub")}
          </p>
          <a href="#contact" className="st-btn st-btn-primary w-full min-[920px]:w-auto"
            style={{ marginTop: 24, minHeight: 60, padding: "0 24px", fontSize: 18, boxShadow: "0 8px 20px rgba(194,96,58,.32)" }}>
            {t("heroCta")}
          </a>
          <p style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 12 }}>{t("heroNote")}</p>
        </div>
      </div>
    </section>
  );
}
