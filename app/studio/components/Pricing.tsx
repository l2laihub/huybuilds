"use client";

import { useT } from "../i18n";
import type { StringKey } from "../lib/strings";
import { IconCheck } from "./icons";

type Plan = {
  name: StringKey;
  tag: StringKey;
  price: StringKey;
  pricePrefix?: StringKey;
  per?: StringKey;
  /** Payment terms shown directly under the price (e.g. the $600/$600 split). */
  split?: StringKey;
  badge?: StringKey;
  /** First bullet with a bold lead-in (e.g. "Everything in Keep It Running — …"). */
  featureLead?: { bold: StringKey; rest: StringKey };
  features: StringKey[];
  cta: StringKey;
  /** Fine print under the CTA (e.g. the $400 credit toward Get Found). */
  note?: StringKey;
  variant: "start" | "default" | "hi";
};

const PLANS: Plan[] = [
  { name: "p1Name", tag: "p1Tag", price: "p1Price", per: "p1Per", badge: "p1Badge",
    features: ["p1f1", "p1f2", "p1f3", "p1f4", "p1f5", "p1f6"], cta: "p1Cta", note: "p1Note", variant: "start" },
  { name: "p2Name", tag: "p2Tag", price: "p2Price", per: "p2Per", split: "p2Split",
    features: ["p2f1", "p2f2", "p2f3", "p2f4", "p2f5", "p2f6"], cta: "p2Cta", variant: "default" },
  { name: "p3Name", tag: "p3Tag", price: "p3Price", per: "p3Per", split: "p3Split", badge: "p3Badge",
    featureLead: { bold: "p3f1Bold", rest: "p3f1Rest" },
    features: ["p3f2", "p3f3", "p3f4", "p3f5", "p3f6"], cta: "p3Cta", variant: "hi" },
  { name: "p4Name", tag: "p4Tag", price: "p4Price", pricePrefix: "p4PricePrefix", split: "p4Split",
    features: ["p4f1", "p4f2", "p4f3", "p4f4", "p4f5", "p4f6"], cta: "p4Cta", variant: "default" },
];

const CARD_STYLE: Record<Plan["variant"], React.CSSProperties> = {
  start: { border: "1.5px dashed var(--st-line)", background: "var(--st-offwhite)" },
  default: { border: "1px solid var(--st-line)", boxShadow: "0 4px 18px rgba(43,36,32,.05)" },
  hi: { border: "2px solid var(--st-terracotta)", boxShadow: "0 12px 30px rgba(194,96,58,.18)" },
};

export function Pricing() {
  const t = useT();
  return (
    <section id="pricing" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("priceTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8, maxWidth: 640 }}>{t("priceSub")}</p>

        <div className="grid grid-cols-1 gap-5 min-[620px]:grid-cols-2 min-[1000px]:grid-cols-4" style={{ marginTop: 28 }}>
          {PLANS.map((plan) => (
            <div key={plan.name} className="st-card"
              style={{ padding: "22px 20px 20px", position: "relative", display: "flex", flexDirection: "column", ...CARD_STYLE[plan.variant] }}>
              {plan.badge && (
                <span style={{
                  position: "absolute", top: -12, left: 18, fontSize: 13, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 999,
                  background: plan.variant === "hi" ? "var(--st-terracotta)" : "var(--st-line)",
                  color: plan.variant === "hi" ? "#fff" : "var(--st-muted)",
                }}>
                  {t(plan.badge)}
                </span>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>{t(plan.name)}</h3>
              <p style={{ fontSize: 15, color: "var(--st-muted)" }}>{t(plan.tag)}</p>
              <div style={{ marginTop: 12 }}>
                {plan.pricePrefix && <span style={{ fontSize: 17, fontWeight: 700, marginRight: 6 }}>{t(plan.pricePrefix)}</span>}
                <span style={{ fontSize: 28, fontWeight: 800 }}>{t(plan.price)}</span>
                {plan.per && <span style={{ fontSize: 15, color: "var(--st-muted)", marginLeft: 6 }}>{t(plan.per)}</span>}
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--st-terracotta)", marginTop: 4, marginBottom: 16, minHeight: 20 }}>
                {plan.split ? t(plan.split) : " "}
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {plan.featureLead && (
                  <li style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14.5 }}>
                    <IconCheck className="w-4 h-4" style={{ color: "var(--st-sage)", flex: "none", marginTop: 3 }} />
                    <span><strong>{t(plan.featureLead.bold)}</strong>{t(plan.featureLead.rest)}</span>
                  </li>
                )}
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14.5 }}>
                    <IconCheck className="w-4 h-4" style={{ color: "var(--st-sage)", flex: "none", marginTop: 3 }} />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`st-btn ${plan.variant === "hi" ? "st-btn-primary" : "st-btn-outline"}`}
                style={{ marginTop: 20, width: "100%", minHeight: 48, fontSize: 16 }}>
                {t(plan.cta)}
              </a>
              {plan.note && (
                <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--st-muted)", fontStyle: "italic", marginTop: 12 }}>
                  {t(plan.note)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="st-card" style={{ marginTop: 24, padding: "22px 26px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 26, fontWeight: 800 }}>{t("addonPrice")}</span>
            <span style={{ fontSize: 15, color: "var(--st-muted)", marginLeft: 6 }}>{t("addonPer")}</span>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: 16, fontWeight: 800 }}>{t("addonName")}</p>
            <p style={{ fontSize: 15, marginTop: 4, lineHeight: 1.55 }}>{t("addonBody")}</p>
            <p style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 6 }}>{t("addonNote")}</p>
            <p style={{ fontSize: 14, fontWeight: 700, marginTop: 6 }}>{t("addonIncluded")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-2" style={{ marginTop: 28 }}>
          {([["faq1Q", "faq1A1", "faq1A2"], ["faq2Q", "faq2A1", "faq2A2"]] as const).map(([q, a1, a2]) => (
            <div key={q} className="st-card st-shadow-card" style={{ padding: "22px 24px" }}>
              <h4 style={{ fontSize: 16, fontWeight: 800 }}>{t(q)}</h4>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>{t(a1)}</p>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>{t(a2)}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "var(--st-muted)", marginTop: 28 }}>
          {t("priceFoot")}
        </p>
      </div>
    </section>
  );
}
