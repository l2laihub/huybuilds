"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "../i18n";
import { getString } from "../lib/strings";
import { studioHref } from "../lib/host";
import { CONTACT, mailtoHref, smsHref } from "../config";
import type { LegalDoc } from "../lib/legal-content";

/** Turn the contact email and phone inside body text into clickable links. */
function linkify(text: string, key: string) {
  const parts = text.split(new RegExp(`(${CONTACT.email}|${escapeRe(CONTACT.phoneDisplay)})`, "g"));
  return parts.map((part, i) => {
    if (part === CONTACT.email) {
      return (
        <a key={`${key}-${i}`} href={mailtoHref(CONTACT.email)} style={LINK}>
          {part}
        </a>
      );
    }
    if (part === CONTACT.phoneDisplay) {
      return (
        <a key={`${key}-${i}`} href={smsHref(CONTACT.phoneDisplay)} style={LINK}>
          {part}
        </a>
      );
    }
    return <Fragment key={`${key}-${i}`}>{part}</Fragment>;
  });
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const LINK: React.CSSProperties = {
  color: "var(--st-terracotta)",
  fontWeight: 600,
  textDecoration: "underline",
};

const PARA: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.6,
  color: "var(--st-ink)",
  marginTop: 12,
};

export function LegalPage({ doc }: { doc: Record<"en" | "vi", LegalDoc> }) {
  const { lang } = useLang();
  const pathname = usePathname();
  const d = doc[lang];

  return (
    <section className="st-wrap" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 760 }}>
      {/*
        Plain anchor (not next/link): home resolves through studioHref so it
        works both on the studio subdomain ("/") and under the /studio path
        prefix (e.g. localhost:3000/studio), matching the footer's links.
      */}
      <a href={studioHref(pathname, "")} style={{ ...LINK, fontSize: 15, display: "inline-block", marginBottom: 24 }}>
        ← {getString(lang, "navBackHome")}
      </a>

      <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>{d.title}</h1>
      <p style={{ fontSize: 14, color: "var(--st-muted)", marginTop: 8 }}>{d.updated}</p>

      {d.intro.map((p, i) => (
        <p key={`intro-${i}`} style={PARA}>
          {linkify(p, `intro-${i}`)}
        </p>
      ))}

      {d.sections.map((s, si) => (
        <div key={`sec-${si}`} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 21, fontWeight: 700, color: "var(--st-ink)" }}>{s.heading}</h2>
          {s.body.map((p, pi) => (
            <p key={`sec-${si}-p-${pi}`} style={PARA}>
              {linkify(p, `sec-${si}-p-${pi}`)}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
