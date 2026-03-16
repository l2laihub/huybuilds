import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./dabraino.css";
import { DaBrainoNav } from "./components/DaBrainoNav";
import { DaBrainoFooter } from "./components/DaBrainoFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DaBraino — Math Bingo for Kids | Free Educational Game",
    template: "%s — DaBraino",
  },
  description:
    "DaBraino turns math practice into an exciting bingo game! 13 topics including multiplication, fractions, decimals, and US States trivia. Free, no ads, COPPA-compliant.",
  keywords: [
    "math bingo",
    "kids math game",
    "multiplication game",
    "fractions practice",
    "educational bingo",
    "COPPA compliant kids app",
  ],
  openGraph: {
    title: "DaBraino — Math Bingo for Kids | Free Educational Game",
    description:
      "DaBraino turns math practice into an exciting bingo game! 13 topics. Free, no ads, COPPA-compliant.",
    url: "https://huybuilds.app/dabraino",
    siteName: "DaBraino",
    type: "website",
  },
};

export default function DaBrainoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`dabraino-theme min-h-screen bg-[#FFF8F0] text-[#2D1B0E] ${dmSans.variable} font-sans`}
    >
      <DaBrainoNav />
      <main className="pt-16 md:pt-18">{children}</main>
      <DaBrainoFooter />
    </div>
  );
}
