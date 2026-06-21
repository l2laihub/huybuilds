"use client";

import Image from "next/image";
import { useT } from "../i18n";
import { IconCheck } from "./icons";

const BULLETS = ["why1", "why2", "why3", "why4", "why5"] as const;

export function WhyMe() {
  const t = useT();
  return (
    <section className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="flex flex-col gap-6 min-[920px]:flex-row">
        <div
          style={{ flex: "none", border: "1px solid var(--st-line)", borderRadius: 18, position: "relative", overflow: "hidden" }}
          className="w-[104px] h-[120px] min-[920px]:w-[140px] min-[920px]:h-[160px]"
        >
          <Image
            src="/studio/huy-profile.png"
            alt="Huy, founder of HuyBuilds Studio"
            fill
            sizes="(min-width: 920px) 140px, 104px"
            style={{ objectFit: "cover", objectPosition: "center 12%" }}
          />
        </div>
        <div style={{ flex: "1 1 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("whyTitle")}</h2>
          <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("whyLede")}</p>
          <ul className="grid grid-cols-1 gap-3 min-[920px]:grid-cols-2" style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
            {BULLETS.map((key) => (
              <li key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <IconCheck className="w-5 h-5" style={{ color: "var(--st-terracotta)", flex: "none", marginTop: 2 }} />
                <span style={{ fontSize: 17 }}>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
