import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./studio.css";
import { LangProvider } from "./i18n";
import { StudioNav } from "./components/StudioNav";
import { StudioFooter } from "./components/StudioFooter";

const hanken = Hanken_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-studio",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HuyBuilds Studio — Websites for local businesses",
  description:
    "I build your website, run your social media automatically, and handle it all — in English or Vietnamese. Serving Vietnamese-American businesses in Seattle.",
  openGraph: {
    title: "HuyBuilds Studio — Websites for local businesses",
    description:
      "Websites & online help for local businesses, done for you, in your language.",
    url: "https://studio.huybuilds.app",
    siteName: "HuyBuilds Studio",
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`studio-theme min-h-screen ${hanken.variable}`}>
      <LangProvider>
        <StudioNav />
        <main>{children}</main>
        <StudioFooter />
      </LangProvider>
    </div>
  );
}
