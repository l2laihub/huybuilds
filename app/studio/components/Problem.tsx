"use client";

import { useT } from "../i18n";
import { Quote } from "./icons";

const ITEMS = [
  { key: "prob1" as const, color: "var(--st-terracotta)" },
  { key: "prob2" as const, color: "var(--st-sage)" },
  { key: "prob3" as const, color: "var(--st-amber)" },
];

export function Problem() {
  const t = useT();
  return (
    <section className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24 }}>{t("probTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.key} className="st-card" style={{ borderRadius: 14, padding: 20 }}>
              <Quote className="text-[40px]" style={{ color: item.color }} />
              <p style={{ fontSize: 17, lineHeight: 1.45, marginTop: 4, color: "var(--st-ink)" }}>
                {t(item.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
