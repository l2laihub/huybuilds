"use client";

import Image from "next/image";
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
        <a href="#top" aria-label="HuyBuilds Studio" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/studio/brand/logo-app-icon-256.png"
            alt=""
            width={32}
            height={32}
            style={{ borderRadius: 8, display: "block" }}
          />
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
          <a href="#contact" className="st-btn st-btn-primary st-nav-cta"
            style={{ height: 42, padding: "0 18px", fontSize: 15, whiteSpace: "nowrap" }}>
            {t("navMsg")}
          </a>
        </div>
      </div>
    </header>
  );
}
