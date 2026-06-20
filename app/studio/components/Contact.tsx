"use client";

import { useT } from "../i18n";
import { CONTACT, smsHref, mailtoHref } from "../config";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const t = useT();
  const rows = [
    { href: smsHref(CONTACT.phoneDisplay), label: t("cCall"), value: CONTACT.phoneDisplay, primary: true },
    { href: CONTACT.zaloUrl, label: t("cZalo"), value: CONTACT.zaloDisplay, primary: false },
    { href: CONTACT.facebookUrl, label: t("cFb"), value: CONTACT.facebookDisplay, primary: false },
    { href: mailtoHref(CONTACT.email), label: t("cEmail"), value: CONTACT.email, primary: false },
  ];

  return (
    <section id="contact" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 56 }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("contactTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("contactSub")}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          {rows.map((row) => (
            <a key={row.label} href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                minHeight: 62, padding: "0 20px", borderRadius: 14,
                background: row.primary ? "var(--st-terracotta)" : "var(--st-surface)",
                color: row.primary ? "#fff" : "var(--st-ink)",
                border: row.primary ? "none" : "1px solid var(--st-line)",
                fontWeight: 700, fontSize: 16,
              }}>
              <span style={{ color: row.primary ? "#fff" : "var(--st-sage)" }}>{row.label}</span>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, opacity: 0.95 }}>{row.value}</span>
            </a>
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
