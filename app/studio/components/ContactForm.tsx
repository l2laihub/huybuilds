"use client";

import { useState } from "react";
import { useLang, useT } from "../i18n";
import { CONTACT, smsHref } from "../config";
import { track } from "../lib/analytics";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useT();
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Client-side guard mirrors the server rules.
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    if (!name || !message || (!phone && !email)) {
      setStatus("error");
      setErrorMsg(t("formErrRequired"));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/studio-contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; code?: string };
      if (json.ok) {
        track("contact_form_submitted", {
          business_type: String(data.businessType || "") || undefined,
          lang,
        });
        setStatus("success");
        form.reset();
        return;
      }
      setStatus("error");
      setErrorMsg(json.code === "email" ? t("formErrEmail") : t("formErrGeneric"));
    } catch {
      setStatus("error");
      setErrorMsg(t("formErrGeneric"));
    }
  }

  if (status === "success") {
    return (
      <div className="st-card st-shadow-card" style={{ padding: 24, marginTop: 24, textAlign: "center" }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: "var(--st-sage)" }}>{t("formSuccess")}</p>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%", minHeight: 48, fontSize: 16, padding: "10px 14px",
    border: "1px solid var(--st-line)", borderRadius: 14, background: "var(--st-surface)",
    color: "var(--st-ink)",
  };
  const labelStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24, textAlign: "left" }} noValidate>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{t("formHeading")}</h3>

      {/* Honeypot — visually hidden, not announced. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off"
        aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />

      <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-2">
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formName")}</span>
          <input name="name" style={fieldStyle} required />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formPhone")}</span>
          <input name="phone" type="tel" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formEmail")}</span>
          <input name="email" type="email" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }}>
          <span style={labelStyle}>{t("formBiz")}</span>
          <input name="business" style={fieldStyle} />
        </label>
        <label style={{ display: "block" }} className="min-[920px]:col-span-2">
          <span style={labelStyle}>{t("formType")}</span>
          <select name="businessType" style={fieldStyle} defaultValue="">
            <option value="" disabled>{t("formType")}</option>
            <option value="restaurant">{t("formTypeRestaurant")}</option>
            <option value="cafe">{t("formTypeCafe")}</option>
            <option value="market">{t("formTypeMarket")}</option>
            <option value="salon">{t("formTypeSalon")}</option>
            <option value="other">{t("formTypeOther")}</option>
          </select>
        </label>
        <label style={{ display: "block" }} className="min-[920px]:col-span-2">
          <span style={labelStyle}>{t("formMsg")}</span>
          <textarea name="message" rows={4} style={{ ...fieldStyle, minHeight: 110, resize: "vertical" }} required />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" style={{ color: "var(--st-terracotta-dark)", fontSize: 15, marginTop: 12 }}>
          {errorMsg}{" "}
          <a href={smsHref(CONTACT.phoneDisplay)} style={{ textDecoration: "underline", fontWeight: 700 }}>
            {CONTACT.phoneDisplay}
          </a>
        </p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="st-btn st-btn-primary" style={{ marginTop: 16, width: "100%", minHeight: 54, fontSize: 17 }}>
        {status === "sending" ? t("formSending") : t("formSubmit")}
      </button>
    </form>
  );
}
