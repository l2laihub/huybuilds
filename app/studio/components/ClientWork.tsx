"use client";

import { useLang, useT } from "../i18n";
import { SiteCard, type SampleSite } from "./Sample";

const CLIENTS: SampleSite[] = [
  {
    slug: "nk-nails",
    host: "nknailsseattle.com",
    href: "https://nknailsseattle.com/",
    cta: "site",
    kind: { en: "Nail Salon — Seattle, WA", vi: "Tiệm Nail — Seattle, WA" },
    title: "NK Nails & Spa",
    desc: {
      en: "Live today for a nail salon in Seattle's Westwood Village — online booking, full service menu, gallery, and reviews.",
      vi: "Đang hoạt động cho tiệm nail tại Westwood Village, Seattle — đặt lịch online, bảng dịch vụ đầy đủ, thư viện ảnh và đánh giá.",
    },
    tags: {
      en: ["Live site", "Online booking", "Service menu", "Reviews"],
      vi: ["Website đang chạy", "Đặt lịch online", "Bảng dịch vụ", "Đánh giá"],
    },
    preview: {
      kind: "image",
      desktop: "/studio/nknails-desktop.png",
      mobile: "/studio/nknails-mobile.png",
    },
  },
];

// ponytail: no real client quote yet — set this when NK Nails gives one and
// the testimonial renders automatically.
const QUOTES: Partial<
  Record<string, { text: { en: string; vi: string }; author: string }>
> = {};

export function ClientWork() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="work" className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("clientsTitle")}</h2>
      <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("clientsSub")}</p>

      <div className="flex flex-col" style={{ gap: 24, marginTop: 28 }}>
        {CLIENTS.map((c) => {
          const quote = QUOTES[c.slug];
          return (
            <div key={c.slug} className="flex flex-col" style={{ gap: 16 }}>
              <SiteCard site={c} />
              {quote && (
                <blockquote
                  style={{ fontSize: 16, lineHeight: 1.6, color: "var(--st-ink)", background: "var(--st-sand)", border: "1px solid var(--st-line)", borderRadius: 16, padding: "18px 22px" }}
                >
                  “{quote.text[lang]}”
                  <footer style={{ fontSize: 14, fontWeight: 700, color: "var(--st-muted)", marginTop: 8 }}>
                    — {quote.author}
                  </footer>
                </blockquote>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
