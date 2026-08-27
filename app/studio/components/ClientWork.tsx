"use client";

import { useLang, useT } from "../i18n";
import { SiteCard, type SampleSite } from "./Sample";

const CLIENTS: SampleSite[] = [
  {
    slug: "lucky-nails",
    host: "luckynailsboca.com",
    href: "https://luckynailsboca.com/",
    cta: "site",
    kind: { en: "Nail Salon — Boca Raton, FL", vi: "Tiệm Nail — Boca Raton, FL" },
    title: "Lucky Nails",
    desc: {
      en: "Live today for a nail salon in West Boca Place — online booking around the clock, service menu with prices, NexGen gallery, and tap-to-call.",
      vi: "Đang hoạt động cho tiệm nail tại West Boca Place — đặt lịch online 24/7, bảng dịch vụ kèm giá, thư viện ảnh NexGen và bấm gọi ngay.",
    },
    tags: {
      en: ["Live site", "Online booking", "Service menu", "Tap to call"],
      vi: ["Website đang chạy", "Đặt lịch online", "Bảng dịch vụ", "Bấm gọi"],
    },
    preview: {
      kind: "image",
      desktop: "/studio/luckynails-desktop.png",
      mobile: "/studio/luckynails-mobile.png",
    },
  },
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

// Keyed by client slug — a quote renders under its card automatically.
const QUOTES: Partial<
  Record<
    string,
    { text: { en: string; vi: string }; author: { en: string; vi: string } }
  >
> = {
  "nk-nails": {
    text: {
      en: "We had hundreds of Google reviews and no way to manage any of it. Huy got that back for us, built the new website with our photos, and put our Instagram right on the site so it updates itself. When I text him something, it gets done — I'm not waiting around. Any shop owner who isn't online yet, I'd tell them to call Huy.",
      vi: "Tiệm có hàng trăm đánh giá trên Google mà không quản lý được gì cả. Huy lấy lại quyền quản lý cho tụi tôi, làm website mới bằng hình của tiệm, và gắn Instagram ngay trên trang nên nó tự cập nhật. Nhắn tin cái là xong việc — không phải chờ đợi. Chủ tiệm nào chưa có mặt trên mạng, tôi khuyên nên gọi Huy.",
    },
    author: {
      en: "Nathan & Kevin, Owners, NK Nails & Spa",
      vi: "Nathan & Kevin, Chủ tiệm NK Nails & Spa",
    },
  },
};

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
                    — {quote.author[lang]}
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
