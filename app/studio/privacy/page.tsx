import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { PRIVACY } from "../lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy — HuyBuilds Studio",
  description:
    "How HuyBuilds Studio (LTH Apps LLC) collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
