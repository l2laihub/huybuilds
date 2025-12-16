import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// DM Sans - clean, modern body font with personality
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "huybuilds — Senior Software Engineer & AI Builder",
  description:
    "15+ years crafting enterprise software. Specializing in AI/ML systems, GraphRAG, full-stack development, and turning complex technical challenges into elegant solutions.",
  keywords: [
    "Software Engineer",
    "AI Developer",
    "GraphRAG",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Seattle",
  ],
  authors: [{ name: "Huy Duong" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "huybuilds — Senior Software Engineer & AI Builder",
    description:
      "15+ years crafting enterprise software. Specializing in AI/ML systems and full-stack development.",
    url: "https://huybuilds.app",
    siteName: "huybuilds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "huybuilds — Senior Software Engineer & AI Builder",
    description:
      "15+ years crafting enterprise software. Specializing in AI/ML systems and full-stack development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
