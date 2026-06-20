"use client";

import { useT } from "../i18n";
import { Wordmark } from "./Wordmark";
import { LangToggle } from "./LangToggle";

const NAV = [
  { href: "#proof", key: "navWork" as const },
  { href: "#whatido", key: "navWhat" as const },
  { href: "#pricing", key: "navPricing" as const },
];

export function StudioNav() {
  const t = useT();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--st-offwhite) 86%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--st-line)",
      }}
    >
      <div className="st-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 16 }}>
        <a href="#top" aria-label="HuyBuilds Studio">
          <Wordmark />
        </a>

        <nav className="hidden min-[920px]:flex" style={{ alignItems: "center", gap: 24 }}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}
              style={{ fontSize: 15, fontWeight: 600, color: "var(--st-ink)" }}>
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LangToggle />
          <a href="#contact" className="st-btn st-btn-primary hidden min-[920px]:inline-flex"
            style={{ height: 42, padding: "0 18px", fontSize: 15 }}>
            {t("navMsg")}
          </a>
        </div>
      </div>
    </header>
  );
}
