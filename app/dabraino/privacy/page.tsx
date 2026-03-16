import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DaBraino's privacy policy. We collect zero personal data. No ads, no tracking, COPPA-compliant.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B59B6] mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-[#6B5744] mb-10">Last Updated: March 16, 2026</p>

      <div className="space-y-8 text-[#2D1B0E] leading-relaxed">
        <p>
          DaBraino (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the app&rdquo;) is an educational
          bingo game designed for children. We are committed to protecting
          children&rsquo;s privacy.
        </p>

        <Section title="Information We Collect">
          <p>
            We do not collect any personal information. DaBraino does not require
            an account, does not ask for names, email addresses, or any other
            personal details, and does not use analytics or tracking tools.
          </p>
          <p className="mt-3">
            All game data (statistics, sticker collection, preferences) is stored
            locally on your device and is never transmitted to our servers or any
            third party.
          </p>
        </Section>

        <Section title="Children's Privacy (COPPA Compliance)">
          <p>
            DaBraino is designed for children and fully complies with the
            Children&rsquo;s Online Privacy Protection Act (COPPA). We do not
            knowingly collect personal information from children under 13 — or
            from anyone.
          </p>
        </Section>

        <Section title="Advertising">
          <p>DaBraino contains no advertising of any kind.</p>
        </Section>

        <Section title="In-App Purchases">
          <p>DaBraino contains no in-app purchases.</p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            DaBraino does not integrate with any third-party analytics,
            advertising, or tracking services.
          </p>
          <p className="mt-3">
            On first launch, the app may connect to our content server to
            download educational content (math clues and trivia questions). This
            connection is anonymous — no personal data is sent or received. After
            this initial download, the app functions fully offline.
          </p>
        </Section>

        <Section title="Data Storage and Deletion">
          <p>
            All data is stored locally on your device using standard device
            storage. To delete all app data, simply uninstall the app or use the
            &ldquo;Reset Stats&rdquo; option in the app settings.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this privacy policy from time to time. Any changes will
            be reflected on this page with an updated &ldquo;Last Updated&rdquo;
            date.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            If you have questions about this privacy policy, contact us at:{" "}
            <a
              href="mailto:hello@huybuilds.app"
              className="text-[#9B59B6] hover:text-[#E91E8C] underline underline-offset-2"
            >
              hello@huybuilds.app
            </a>
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-[#2D1B0E] mb-3">{title}</h2>
      {children}
    </section>
  );
}
