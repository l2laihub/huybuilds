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
  title: "Huy Duong — Senior Full-Stack & AI Engineer",
  description:
    "I take AI research prototypes into production. 15+ years of production engineering — C#/.NET and Azure, increasingly Python and TypeScript.",
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
    title: "Huy Duong — Senior Full-Stack & AI Engineer",
    description:
      "I take AI research prototypes into production. 15+ years of production engineering — C#/.NET and Azure, increasingly Python and TypeScript.",
    url: "https://huybuilds.app",
    siteName: "huybuilds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huy Duong — Senior Full-Stack & AI Engineer",
    description:
      "I take AI research prototypes into production. 15+ years of production engineering — C#/.NET and Azure, increasingly Python and TypeScript.",
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
