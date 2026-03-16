import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with DaBraino. Contact us, troubleshooting tips, and device requirements.",
};

const commonIssues = [
  {
    problem: "The app won't open / crashes on launch",
    steps: [
      "Make sure you're running iOS 15+ or Android 10+",
      "Try closing the app completely and reopening it",
      "If the issue persists, try uninstalling and reinstalling",
    ],
  },
  {
    problem: "No sound / caller isn't speaking",
    steps: [
      "Check that your device isn't on silent/vibrate mode",
      "Check the in-app sound toggle (speaker icon on the game screen)",
      "Make sure your device volume is turned up",
    ],
  },
  {
    problem: "My stickers / stats disappeared",
    steps: [
      "Game data is stored locally on your device. If you uninstall and reinstall the app, your progress will be reset.",
      "This is a known limitation of version 1.0 — cloud backup is planned for a future update.",
    ],
  },
  {
    problem: "The app is stuck loading content",
    steps: [
      "On first launch, DaBraino downloads educational content. Make sure you have an internet connection for the initial setup.",
      "After the first download, the app works fully offline.",
    ],
  },
  {
    problem: "How do I reset my stats?",
    steps: [
      'Go to the Stats screen and tap "Reset Stats" to clear all game data and start fresh.',
    ],
  },
  {
    problem: "Can I change the difficulty mid-game?",
    steps: [
      "Not during an active game. Finish or exit your current game, then select a new difficulty from the difficulty selection screen.",
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B59B6] mb-3">
        Support
      </h1>
      <p className="text-lg text-[#6B5744] mb-10">
        Need help with DaBraino? We&rsquo;re here for you.
      </p>

      {/* Contact */}
      <section className="mb-12 p-6 rounded-2xl bg-white border border-[#F0E6D8] shadow-sm">
        <h2 className="text-xl font-bold text-[#2D1B0E] mb-2">Contact Us</h2>
        <p className="text-[#6B5744]">
          Email:{" "}
          <a
            href="mailto:hello@huybuilds.app"
            className="text-[#9B59B6] hover:text-[#E91E8C] underline underline-offset-2 font-medium"
          >
            hello@huybuilds.app
          </a>
        </p>
        <p className="text-sm text-[#6B5744] mt-1">
          We typically respond within 24-48 hours.
        </p>
      </section>

      {/* Common Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#2D1B0E] mb-6">
          Common Issues
        </h2>
        <div className="space-y-6">
          {commonIssues.map((issue) => (
            <div
              key={issue.problem}
              className="p-5 rounded-xl bg-white border border-[#F0E6D8]"
            >
              <h3 className="font-semibold text-[#2D1B0E] mb-3">
                {issue.problem}
              </h3>
              <ul className="space-y-1.5">
                {issue.steps.map((step, i) => (
                  <li key={i} className="text-sm text-[#6B5744] flex gap-2">
                    <span className="text-[#F39C12] font-bold shrink-0">&bull;</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Device Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#2D1B0E] mb-4">
          Device Requirements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#F0E6D8]">
            <div className="text-2xl mb-2">🍎</div>
            <h3 className="font-semibold text-[#2D1B0E]">iOS</h3>
            <p className="text-sm text-[#6B5744]">
              iPhone or iPad running iOS 15 or later
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#F0E6D8]">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-[#2D1B0E]">Android</h3>
            <p className="text-sm text-[#6B5744]">
              Devices running Android 10 (API 29) or later
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#9B59B6]/5 to-[#F39C12]/5 border border-[#F0E6D8]">
        <h2 className="text-xl font-bold text-[#2D1B0E] mb-2">
          About DaBraino
        </h2>
        <p className="text-[#6B5744]">
          DaBraino is built by huybuilds — a husband-and-wife team (software
          engineer + math tutor) building educational tools for their own
          tutoring students. Version 1.0 includes 13 topics across basic math,
          fractions, decimals, and US States trivia.
        </p>
      </section>
    </div>
  );
}
