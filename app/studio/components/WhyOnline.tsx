"use client";

import { useT } from "../i18n";
import { IconSearch, IconPin, IconStar } from "./icons";

const CARDS = [
  { icon: IconSearch, title: "online1Title" as const, body: "online1Body" as const, color: "var(--st-terracotta)" },
  { icon: IconPin, title: "online2Title" as const, body: "online2Body" as const, color: "var(--st-sage)" },
  { icon: IconStar, title: "online3Title" as const, body: "online3Body" as const, color: "var(--st-amber)" },
];

export function WhyOnline() {
  const t = useT();
  return (
    <section id="why-online" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("onlineTitle")}</h2>
      <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("onlineSub")}</p>

      <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-3" style={{ marginTop: 28 }}>
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="st-card st-shadow-card flex items-start gap-4 min-[920px]:flex-col" style={{ padding: 22 }}>
              <span style={{
                flex: "none", width: 54, height: 54, borderRadius: 14,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: `color-mix(in srgb, ${card.color} 14%, white)`, color: card.color,
              }}>
                <Icon className="w-7 h-7" />
              </span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t(card.title)}</h3>
                <p style={{ fontSize: 16, color: "var(--st-muted)", marginTop: 6 }}>{t(card.body)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
