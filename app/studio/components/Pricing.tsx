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
  /** Prose instead of bullets, for plans small enough not to need a list. */
  body?: StringKey;
  cta: StringKey;
  /** Fine print above the CTA (e.g. the $400 credit toward Get Found). */
  note?: StringKey;
  variant: "default" | "hi";
};

/*
 * Grouped by how you pay, not by tier order: five prices in three billing units
 * read as one undifferentiated wall otherwise. Keep It Running sits beside Stay
 * Visible because they are the two monthly options and the buyer picks between
 * them — the copy for that choice lives in `addonIncluded`.
 */
const PAY_ONCE: Plan[] = [
  { name: "p1Name", tag: "p1Tag", price: "p1Price", per: "p1Per", badge: "p1Badge",
    features: ["p1f1", "p1f2", "p1f3", "p1f4", "p1f5", "p1f6"], cta: "p1Cta", note: "p1Note", variant: "default" },
  { name: "p2Name", tag: "p2Tag", price: "p2Price", per: "p2Per", split: "p2Split",
    features: ["p2f1", "p2f2", "p2f3", "p2f4", "p2f5", "p2f6"], cta: "p2Cta", variant: "default" },
  { name: "p4Name", tag: "p4Tag", price: "p4Price", pricePrefix: "p4PricePrefix", split: "p4Split",
    features: ["p4f1", "p4f2", "p4f3", "p4f4", "p4f5", "p4f6"], cta: "p4Cta", variant: "default" },
];

const MONTHLY: Plan[] = [
  { name: "p3Name", tag: "p3Tag", price: "p3Price", per: "p3Per", split: "p3Split", badge: "p3Badge",
    featureLead: { bold: "p3f1Bold", rest: "p3f1Rest" },
    features: ["p3f2", "p3f3", "p3f4", "p3f5", "p3f6"], cta: "p3Cta", variant: "hi" },
  { name: "addonName", tag: "addonNote", price: "addonPrice", per: "addonPer",
    features: [], body: "addonBody", cta: "addonCta", note: "addonIncluded", variant: "default" },
];

/*
 * One highlighted card only, and it is Stay Visible — the monthly plan is where
 * the business is trying to land people. Google First carries a "Start here"
 * badge instead of a card treatment: it is the door onto that ladder ($400
 * credits in full toward Get Found), so it has to look like a real option, not
 * a lesser one. It was previously dashed on a tinted ground, which read as
 * provisional and argued against the section's own "most shops start with
 * Google" line.
 */
const CARD_STYLE: Record<Plan["variant"], React.CSSProperties> = {
  default: { border: "1px solid var(--st-line)", boxShadow: "0 4px 18px rgba(43,36,32,.05)" },
  hi: { border: "2px solid var(--st-terracotta)", boxShadow: "0 12px 30px rgba(164,78,45,.18)" },
};

function PlanCard({ plan }: { plan: Plan }) {
  const t = useT();
  return (
    <div className="st-card st-plan"
      style={{ padding: "22px 20px 20px", position: "relative", ...CARD_STYLE[plan.variant] }}>
      {plan.badge && (
        <span style={{
          position: "absolute", top: -12, left: 18, fontSize: 13, fontWeight: 700,
          padding: "4px 12px", borderRadius: 999,
          background: plan.variant === "hi" ? "var(--st-terracotta)" : "var(--st-line)",
          color: plan.variant === "hi" ? "#fff" : "var(--st-ink)",
        }}>
          {t(plan.badge)}
        </span>
      )}

      <h3 style={{ fontSize: 20, fontWeight: 800 }}>{t(plan.name)}</h3>

      <p style={{ fontSize: 15, color: "var(--st-muted)", marginTop: 2 }}>{t(plan.tag)}</p>

      {/* Unit sits under the number in the same weight family — a 15px muted
          "/ month" trailing a 28px number made $400 one-time and $500/mo read
          as the same shape. */}
      <div style={{ marginTop: 14 }}>
        {/* Prefix runs inline with the number, not stacked above it — stacking
            dropped Custom Build's "$2,500" 22px below its siblings' numbers. */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          {plan.pricePrefix && (
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--st-muted)" }}>{t(plan.pricePrefix)}</span>
          )}
          <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.05 }}>{t(plan.price)}</span>
        </div>
        {plan.per && <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{t(plan.per)}</div>}
      </div>

      <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--st-terracotta)", marginTop: 6, marginBottom: 16 }}>
        {/* Rendered even when empty so every card keeps the same subgrid row
            count; empty rather than a non-breaking space so it collapses on
            mobile, where cards stack and there is no row to reserve. */}
        {plan.split ? t(plan.split) : ""}
      </p>

      {plan.body ? (
        <p style={{ fontSize: 14.5, lineHeight: 1.6 }}>{t(plan.body)}</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
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
      )}

      {/* Always rendered, even when empty: the note owns a shared subgrid row,
          so an absent note must not pull this card's CTA up a row. */}
      {plan.note ? (
        <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--st-muted)", fontStyle: "italic", marginTop: 16 }}>
          {t(plan.note)}
        </p>
      ) : (
        <span aria-hidden="true" />
      )}

      <a href="#contact"
        className={`st-btn ${plan.variant === "hi" ? "st-btn-primary" : "st-btn-outline"}`}
        style={{ marginTop: 16, width: "100%", minHeight: 48, fontSize: 16 }}>
        {t(plan.cta)}
      </a>
    </div>
  );
}

export function Pricing() {
  const t = useT();
  return (
    <section id="pricing" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("priceTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8, maxWidth: 640 }}>{t("priceSub")}</p>

        <p className="st-band-label" style={{ marginTop: 32, marginBottom: 16 }}>{t("bandOnce")}</p>
        <div className="st-plans st-plans-3">
          {PAY_ONCE.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
        </div>

        <p className="st-band-label" style={{ marginTop: 40, marginBottom: 16 }}>{t("bandMonthly")}</p>
        <div className="st-plans st-plans-2">
          {MONTHLY.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
        </div>

        <div className="grid grid-cols-1 gap-5 min-[920px]:grid-cols-2" style={{ marginTop: 32 }}>
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
