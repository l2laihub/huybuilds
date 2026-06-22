"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { useLang, useT } from "../i18n";

const DEMO_URL = "https://studio-huybuilds.netlify.app/";

// Temporarily hidden in favour of the live sample gallery below. Flip to true
// to bring the original seafood-market featured mockup back.
const SHOW_SEAFOOD = false;

type Localized = { en: string; vi: string };

type SampleSite = {
  slug: string;
  /** Fake browser-bar URL, just for the mockup chrome. */
  host: string;
  /** Local file served from public/studio/samples. */
  file: string;
  kind: Localized;
  title: string;
  desc: Localized;
  tags: { en: string[]; vi: string[] };
};

const SAMPLES: SampleSite[] = [
  {
    slug: "nail-spa",
    host: "orchidnailspa.com",
    file: "nail-spa-mockup-sample.html",
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
  },
  {
    slug: "viet-deli",
    host: "benthanhdeli.com",
    file: "viet-deli-mockup-sample.html",
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
  },
  {
    slug: "cafe-bakery",
    host: "lanhbakehouse.com",
    file: "cafe-bakery-mockup-sample.html",
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
  },
];

const SAMPLES_BASE = "/studio/samples/";

// Rendered preview sizes — the iframe is laid out at this size then scaled down
// to fit its frame, so the full page shows without scrollbars or cropping.
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

        {SHOW_SEAFOOD && (
          <>
            <div className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-end" style={{ marginTop: 28 }}>
              {/* Browser mockup — links to the live demo */}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: "1 1 0", background: "var(--st-surface)", borderRadius: 16, boxShadow: "0 16px 40px rgba(43,36,32,.12)", overflow: "hidden", border: "1px solid var(--st-line)", display: "block", color: "inherit", textDecoration: "none" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--st-line)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: "#E07A5F" }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-amber)" }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--st-sage)" }} />
                  <span style={{ marginLeft: 10, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--st-muted)", background: "var(--st-sand)", borderRadius: 999, padding: "3px 10px" }}>
                    studio-huybuilds.netlify.app
                  </span>
                </div>
                <div style={{ position: "relative", background: "var(--st-sand)" }} className="h-[220px] min-[920px]:h-[400px]">
                  <Image
                    src="/studio/sample-desktop.png"
                    alt="A sample mockup website designed by HuyBuilds Studio — a seafood market demo"
                    fill
                    sizes="(min-width: 920px) 700px, 100vw"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
              </a>

              {/* Phone mockup — links to the live demo */}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: "none", background: "var(--st-ink)", borderRadius: 30, padding: 10, width: 230, display: "block" }}
                className="self-center min-[920px]:self-end"
              >
                <div style={{ background: "var(--st-surface)", borderRadius: 24, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                    <span style={{ width: 60, height: 5, borderRadius: 999, background: "var(--st-line)" }} />
                  </div>
                  {/* Screen matches the screenshot's 1000:1560 ratio so the full
                      mobile page shows with no horizontal cropping. */}
                  <div style={{ position: "relative", background: "var(--st-sand)", aspectRatio: "1000 / 1560", marginTop: 8 }}>
                    <Image
                      src="/studio/sample-mobile.png"
                      alt="A sample mockup website on mobile, designed by HuyBuilds Studio — a seafood market demo"
                      fill
                      sizes="210px"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                </div>
              </a>
            </div>

            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 15, fontWeight: 700, color: "var(--st-terracotta)", textDecoration: "none" }}
            >
              {t("proofCta")}
              <span aria-hidden="true">→</span>
            </a>
          </>
        )}

        {/* Live sample gallery — each card opens its real site, served locally. */}
        <div ref={galleryRef} className="flex flex-col" style={{ gap: 24, marginTop: 28 }}>
          {SAMPLES.map((s) => {
            const href = `${SAMPLES_BASE}${s.file}`;
            return (
              <article
                key={s.slug}
                className="flex flex-col gap-6 min-[920px]:flex-row min-[920px]:items-center"
                style={{ background: "var(--st-surface)", border: "1px solid var(--st-line)", borderRadius: 20, padding: 22, boxShadow: "0 16px 40px rgba(43,36,32,.12)" }}
              >
                {/* Stage: browser + phone live previews */}
                <div className="flex items-end" style={{ gap: 16, flex: "1 1 0", minWidth: 0 }}>
                  <a
                    href={href}
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
                    <div className="st-vp" data-vp="desk" style={{ position: "relative", overflow: "hidden", background: "var(--st-surface)" }}>
                      <iframe
                        src={href}
                        title={`${s.title} desktop preview`}
                        loading="lazy"
                        scrolling="no"
                        tabIndex={-1}
                        style={{ border: 0, transformOrigin: "top left", pointerEvents: "none" }}
                      />
                    </div>
                  </a>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${s.title} on mobile`}
                    className="hidden min-[560px]:block"
                    style={{ flex: "none", width: 150, padding: 7, background: "var(--st-ink)", borderRadius: 24, boxShadow: "0 14px 34px rgba(43,36,32,.18)" }}
                  >
                    <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: "var(--st-surface)" }}>
                      <span style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 44, height: 5, borderRadius: 3, background: "rgba(255,255,255,.6)", zIndex: 2 }} />
                      <div className="st-vp" data-vp="phone" style={{ position: "relative", overflow: "hidden", background: "var(--st-surface)" }}>
                        <iframe
                          src={href}
                          title={`${s.title} mobile preview`}
                          loading="lazy"
                          scrolling="no"
                          tabIndex={-1}
                          style={{ border: 0, transformOrigin: "top left", pointerEvents: "none" }}
                        />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Meta */}
                <div className="flex flex-col" style={{ gap: 11, flex: "none" }} >
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
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, height: 44, padding: "0 20px", borderRadius: 999, background: "var(--st-terracotta)", color: "#fff", fontWeight: 700, fontSize: 14.5, textDecoration: "none" }}
                    >
                      {t("proofCta")}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
