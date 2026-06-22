"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { useLang, useT } from "../i18n";

const DEMO_URL = "https://studio-huybuilds.netlify.app/";
const SAMPLES_BASE = "/studio/samples/";

type Localized = { en: string; vi: string };

// A card either embeds a live, scaled iframe of a locally-served mockup, or —
// when the real site can't be framed (e.g. the live demo sends X-Frame-Options:
// DENY) — shows static screenshots and opens the external site on click.
type Preview =
  | { kind: "iframe"; file: string }
  | { kind: "image"; desktop: string; mobile: string };

type SampleSite = {
  slug: string;
  /** Browser-bar host label for the mockup chrome. */
  host: string;
  /** Where the card opens (new tab). */
  href: string;
  /** CTA label variant. */
  cta: "site" | "demo";
  kind: Localized;
  title: string;
  desc: Localized;
  tags: { en: string[]; vi: string[] };
  preview: Preview;
};

const CTA: Record<SampleSite["cta"], Localized> = {
  site: { en: "Open full site", vi: "Mở website đầy đủ" },
  demo: { en: "View the live demo", vi: "Xem bản demo trực tiếp" },
};

const SAMPLES: SampleSite[] = [
  {
    slug: "seafood",
    host: "studio-huybuilds.netlify.app",
    href: DEMO_URL,
    cta: "demo",
    kind: { en: "Seafood Market", vi: "Chợ Hải Sản" },
    title: "Harbor Fresh Seafood",
    desc: {
      en: "A full, interactive seafood-market demo — live online ordering, weekly specials, and a product catalog you can click through right now.",
      vi: "Bản demo chợ hải sản đầy đủ, tương tác trực tiếp — đặt hàng online, ưu đãi hàng tuần và danh mục sản phẩm bạn có thể bấm thử ngay.",
    },
    tags: {
      en: ["Live demo", "Online order", "Weekly specials", "EN / VI"],
      vi: ["Demo trực tiếp", "Đặt hàng online", "Ưu đãi tuần", "EN / VI"],
    },
    preview: {
      kind: "image",
      desktop: "/studio/sample-desktop.png",
      mobile: "/studio/sample-mobile.png",
    },
  },
  {
    slug: "nail-spa",
    host: "orchidnailspa.com",
    href: `${SAMPLES_BASE}nail-spa-mockup-sample.html`,
    cta: "site",
    kind: { en: "Nail & Spa", vi: "Tiệm Nail & Spa" },
    title: "Orchid Nail & Spa",
    desc: {
      en: "Calm, elegant booking site with a service menu, before/after slider, and one-tap booking — the polished look a salon deserves.",
      vi: "Trang đặt lịch thanh lịch, nhẹ nhàng — có bảng dịch vụ, ảnh trước/sau và đặt hẹn chỉ một chạm.",
    },
    tags: {
      en: ["Booking", "Service menu", "Before / after", "EN / VI"],
      vi: ["Đặt lịch", "Bảng dịch vụ", "Trước / sau", "EN / VI"],
    },
    preview: { kind: "iframe", file: "nail-spa-mockup-sample.html" },
  },
  {
    slug: "viet-deli",
    host: "benthanhdeli.com",
    href: `${SAMPLES_BASE}viet-deli-mockup-sample.html`,
    cta: "site",
    kind: { en: "Vietnamese Deli", vi: "Quán Ăn Việt" },
    title: "Bến Thành Deli",
    desc: {
      en: "Appetizing, energetic menu site for a bánh mì & phở shop — full menu, online ordering, and a catering call-to-action.",
      vi: "Trang thực đơn bắt mắt cho tiệm bánh mì & phở — thực đơn đầy đủ, đặt món online và nhận đặt tiệc.",
    },
    tags: {
      en: ["Full menu", "Online order", "Catering", "EN / VI"],
      vi: ["Thực đơn", "Đặt món online", "Đặt tiệc", "EN / VI"],
    },
    preview: { kind: "iframe", file: "viet-deli-mockup-sample.html" },
  },
  {
    slug: "cafe-bakery",
    host: "lanhbakehouse.com",
    href: `${SAMPLES_BASE}cafe-bakery-mockup-sample.html`,
    cta: "site",
    kind: { en: "Café & Bakery", vi: "Café & Tiệm Bánh" },
    title: "Lành Café & Bakehouse",
    desc: {
      en: "Cozy, warm site for a coffee & pastry spot — drinks and bakehouse menu, custom-cake ordering, and order-ahead.",
      vi: "Trang ấm cúng cho quán cà phê & bánh ngọt — thực đơn đồ uống và bánh, đặt bánh kem theo yêu cầu và đặt trước.",
    },
    tags: {
      en: ["Menu", "Order ahead", "Custom cakes", "EN / VI"],
      vi: ["Thực đơn", "Đặt trước", "Bánh kem theo yêu cầu", "EN / VI"],
    },
    preview: { kind: "iframe", file: "cafe-bakery-mockup-sample.html" },
  },
];

// Rendered preview sizes — live iframes are laid out at this size then scaled
// down to fit their frame, so the full page shows without scrollbars/cropping.
// Image previews reuse the same aspect ratios so every card matches.
const DESK = { w: 1360, h: 900 };
const PHONE = { w: 390, h: 720 };

export function Sample() {
  const t = useT();
  const { lang } = useLang();
  const galleryRef = useRef<HTMLDivElement>(null);

  // Scale each live iframe preview to fit the width of its frame, and keep it
  // fitted on resize / after the iframe document loads.
  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;

    const fit = (vp: HTMLElement) => {
      const src = vp.dataset.vp === "phone" ? PHONE : DESK;
      const iframe = vp.querySelector("iframe");
      if (!iframe) return;
      const scale = vp.clientWidth / src.w;
      iframe.style.width = `${src.w}px`;
      iframe.style.height = `${src.h}px`;
      iframe.style.transform = `scale(${scale})`;
      vp.style.height = `${src.h * scale}px`;
    };
    const fitAll = () =>
      root.querySelectorAll<HTMLElement>(".st-vp").forEach(fit);

    fitAll();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(fitAll, 120);
    };
    window.addEventListener("resize", onResize);

    const iframes = Array.from(root.querySelectorAll("iframe"));
    iframes.forEach((f) => f.addEventListener("load", fitAll));

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      iframes.forEach((f) => f.removeEventListener("load", fitAll));
    };
  }, []);

  return (
    <section id="proof" className="st-band">
      <div className="st-wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800 }}>{t("proofTitle")}</h2>
        <p style={{ fontSize: 18, color: "var(--st-muted)", marginTop: 8 }}>{t("proofSub")}</p>

        {/* Sample gallery — each card opens its real site (local mockup or live demo). */}
        <div ref={galleryRef} className="flex flex-col" style={{ gap: 24, marginTop: 28 }}>
          {SAMPLES.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-center"
              style={{ background: "var(--st-surface)", border: "1px solid var(--st-line)", borderRadius: 20, padding: 22, boxShadow: "0 16px 40px rgba(43,36,32,.12)" }}
            >
              {/* Stage: browser + phone previews */}
              <div className="flex items-end" style={{ gap: 16, flex: "1 1 0", minWidth: 0 }}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${s.title} full site`}
                  style={{ flex: "1 1 0", minWidth: 0, borderRadius: 12, overflow: "hidden", border: "1px solid var(--st-line)", boxShadow: "0 14px 34px rgba(43,36,32,.14)", background: "var(--st-surface)", display: "block" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderBottom: "1px solid var(--st-line)", background: "var(--st-sand)" }}>
                    <span style={{ width: 9, height: 9, borderRadius: 999, background: "#E07A5F" }} />
                    <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--st-amber)" }} />
                    <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--st-sage)" }} />
                    <span style={{ flex: 1, marginLeft: 6, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11.5, color: "var(--st-muted)", background: "var(--st-surface)", borderRadius: 999, padding: "3px 10px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {s.host}
                    </span>
                  </div>
                  {s.preview.kind === "iframe" ? (
                    <div className="st-vp" data-vp="desk" style={{ position: "relative", overflow: "hidden", background: "var(--st-surface)" }}>
                      <iframe
                        src={`${SAMPLES_BASE}${s.preview.file}`}
                        title={`${s.title} desktop preview`}
                        loading="lazy"
                        scrolling="no"
                        tabIndex={-1}
                        style={{ border: 0, transformOrigin: "top left", pointerEvents: "none" }}
                      />
                    </div>
                  ) : (
                    <div style={{ position: "relative", background: "var(--st-sand)", aspectRatio: `${DESK.w} / ${DESK.h}` }}>
                      <Image
                        src={s.preview.desktop}
                        alt={`${s.title} desktop preview`}
                        fill
                        sizes="(min-width: 920px) 540px, 100vw"
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                      />
                    </div>
                  )}
                </a>

                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${s.title} on mobile`}
                  className="hidden min-[560px]:block"
                  style={{ flex: "none", width: 150, padding: 7, background: "var(--st-ink)", borderRadius: 24, boxShadow: "0 14px 34px rgba(43,36,32,.18)" }}
                >
                  <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: "var(--st-surface)" }}>
                    <span style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 44, height: 5, borderRadius: 3, background: "rgba(255,255,255,.6)", zIndex: 2 }} />
                    {s.preview.kind === "iframe" ? (
                      <div className="st-vp" data-vp="phone" style={{ position: "relative", overflow: "hidden", background: "var(--st-surface)" }}>
                        <iframe
                          src={`${SAMPLES_BASE}${s.preview.file}`}
                          title={`${s.title} mobile preview`}
                          loading="lazy"
                          scrolling="no"
                          tabIndex={-1}
                          style={{ border: 0, transformOrigin: "top left", pointerEvents: "none" }}
                        />
                      </div>
                    ) : (
                      <div style={{ position: "relative", background: "var(--st-sand)", aspectRatio: `${PHONE.w} / ${PHONE.h}` }}>
                        <Image
                          src={s.preview.mobile}
                          alt={`${s.title} mobile preview`}
                          fill
                          sizes="136px"
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      </div>
                    )}
                  </div>
                </a>
              </div>

              {/* Meta */}
              <div className="flex flex-col" style={{ gap: 11, flex: "none" }}>
                <div className="min-[920px]:w-[250px]">
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--st-sage)" }}>
                    {s.kind[lang]}
                  </span>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--st-muted)", lineHeight: 1.5, marginTop: 8 }}>{s.desc[lang]}</p>
                  <div className="flex flex-wrap" style={{ gap: 7, marginTop: 12 }}>
                    {s.tags[lang].map((tag) => (
                      <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: "var(--st-ink)", background: "var(--st-sand)", border: "1px solid var(--st-line)", borderRadius: 999, padding: "4px 11px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, height: 44, padding: "0 20px", borderRadius: 999, background: "var(--st-terracotta)", color: "#fff", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}
                  >
                    {CTA[s.cta][lang]}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
