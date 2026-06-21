"use client";

import { useT } from "../i18n";
import { IconCheck } from "./icons";

const PLANS = [
  { name: "p1Name", tag: "p1Tag", price: "p1Price", per: "p1Per", cta: "p1Cta",
    features: ["p1f1", "p1f5", "p1f2", "p1f3", "p1f4", "p1f6"], popular: false, outline: true },
  { name: "p2Name", tag: "p2Tag", price: "p2Price", per: "p2Per", cta: "p2Cta",
    features: ["p2f1", "p2f2", "p2f3", "p2f5", "p2f4", "p2f6"], popular: true, outline: false },
  { name: "p3Name", tag: "p3Tag", price: "p3Price", per: "p3Per", cta: "p3Cta",
    features: ["p3f1", "p3f5", "p3f2", "p3f6", "p3f3", "p3f4"], popular: false, outline: true },
] as const;

export function Pricing() {
  const t = useT();
  return (
    <section id="pricing" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("priceTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("priceSub")}</p>

        <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-3" style={{ marginTop: 28, alignItems: "start" }}>
          {PLANS.map((plan) => (
            <div key={plan.name} className="st-card"
              style={{
                padding: 24, position: "relative",
                border: plan.popular ? "2px solid var(--st-terracotta)" : "1px solid var(--st-line)",
                boxShadow: plan.popular ? "0 12px 30px rgba(194,96,58,.18)" : "0 4px 18px rgba(43,36,32,.05)",
              }}>
              {plan.popular && (
                <span style={{ position: "absolute", top: -12, left: 20, background: "var(--st-terracotta)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>
                  {t("popular")}
                </span>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>{t(plan.name)}</h3>
              <p style={{ fontSize: 15, color: "var(--st-muted)" }}>{t(plan.tag)}</p>
              <div style={{ marginTop: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 30, fontWeight: 800 }}>{t(plan.price)}</span>
                <span style={{ fontSize: 15, color: "var(--st-muted)", marginLeft: 6 }}>{t(plan.per)}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 15 }}>
                    <IconCheck className="w-4 h-4" style={{ color: "var(--st-sage)", flex: "none", marginTop: 3 }} />
                    <span>{t(f)}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact"
                className={`st-btn ${plan.outline ? "st-btn-outline" : "st-btn-primary"}`}
                style={{ marginTop: 20, width: "100%", minHeight: 48, fontSize: 16 }}>
                {t(plan.cta)}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "var(--st-muted)", marginTop: 20 }}>
          {t("priceFoot")}
        </p>
      </div>
    </section>
  );
}
