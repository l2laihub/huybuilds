"use client";

import { useLang } from "../i18n";
import { track } from "../lib/analytics";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        border: "1px solid var(--st-line)",
        borderRadius: 999,
        overflow: "hidden",
        background: "var(--st-surface)",
      }}
    >
      {(["en", "vi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            track("lang_toggled", { to: code });
            setLang(code);
          }}
          aria-pressed={lang === code}
          className="st-btn"
          style={{
            padding: "6px 12px",
            fontSize: 13,
            fontWeight: 700,
            borderRadius: 0,
            background: lang === code ? "var(--st-terracotta)" : "transparent",
            color: lang === code ? "#fff" : "var(--st-muted)",
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
