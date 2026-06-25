import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { TERMS } from "../lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service — HuyBuilds Studio",
  description:
    "The terms that govern use of the HuyBuilds Studio website and services from LTH Apps LLC.",
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
