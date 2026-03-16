import type { Metadata } from "next";
import { FAQSection } from "../components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about DaBraino — the free math bingo game for kids.",
};

const faqSections = [
  {
    title: "General",
    items: [
      {
        question: "What is DaBraino?",
        answer:
          "DaBraino is a free educational bingo game for kids. A virtual caller reads math clues (or trivia questions), and kids find the answers on their randomized bingo card. Get five in a row to win BINGO!",
      },
      {
        question: "What ages is DaBraino for?",
        answer:
          "DaBraino is designed for kids in grades K-7 (ages 5-12). Easy mode is great for younger kids just starting out, and Hard mode challenges older students with more advanced problems.",
      },
      {
        question: "Is DaBraino free?",
        answer:
          "Yes! DaBraino is completely free with no in-app purchases, no subscriptions, and no ads.",
      },
      {
        question: "What subjects does DaBraino cover?",
        answer:
          "DaBraino has 13 topics across 4 categories: Basic Math (Addition, Subtraction, Multiplication, Division), Fractions (Add, Subtract, Multiply, Divide fractions), Decimals (Add, Subtract, Multiply, Divide decimals), and Trivia (US States & Capitals).",
      },
      {
        question: "Will more subjects be added?",
        answer:
          "Yes! We plan to add more trivia topics (world geography, science, history) in future updates.",
      },
      {
        question: "What devices does DaBraino run on?",
        answer:
          "iPhone and iPad running iOS 15 or later, and Android phones and tablets running Android 10 or later.",
      },
    ],
  },
  {
    title: "Gameplay",
    items: [
      {
        question: "How do I play?",
        answer:
          "1. Pick a topic (e.g., Multiplication) and a difficulty level (Easy, Medium, or Hard). 2. A bingo card is generated with randomized answers. 3. Tap \"Start\" — the caller reads a clue. 4. Find and tap the matching answer on your card. 5. Get five marked cells in a row (horizontal, vertical, or diagonal) to win BINGO!",
      },
      {
        question: "What is the free space?",
        answer:
          'The center cell of the bingo card is a "free space" — it\'s automatically marked for you, just like in real bingo.',
      },
      {
        question: "What happens when I tap the wrong answer?",
        answer:
          "The cell gently shakes, but it still marks. DaBraino verifies your answers when you get five in a row. If any answer is wrong, you'll see a teaching moment showing the correct answer — then the game continues.",
      },
      {
        question: "What are the difficulty levels?",
        answer:
          "Each topic has three levels: Easy (simpler problems, great for beginners), Medium (moderate challenge, covers most of the topic range), and Hard (full range of problems for advanced practice).",
      },
      {
        question: "Does the app work offline?",
        answer:
          "Yes! After the first launch (which downloads the content), DaBraino works completely offline. No internet needed to play.",
      },
    ],
  },
  {
    title: "Rewards & Progress",
    items: [
      {
        question: "What are stickers?",
        answer:
          "Every time you win a bingo game, you earn a fun sticker! Collect them all in your sticker gallery. There are 30+ unique stickers to earn.",
      },
      {
        question: "How do streaks work?",
        answer:
          "DaBraino tracks consecutive wins. Your current streak is displayed on the home screen. Keep winning to build your streak!",
      },
      {
        question: "Can I see my game stats?",
        answer:
          "Yes! The Stats screen shows your total games played, wins, accuracy, and more — broken down by topic and difficulty.",
      },
      {
        question: "What happens if I uninstall the app?",
        answer:
          "All game data (stats, stickers, progress) is stored locally on your device. If you uninstall the app, this data will be lost. Cloud backup is planned for a future update.",
      },
    ],
  },
  {
    title: "Privacy & Safety",
    items: [
      {
        question: "Does DaBraino collect any data about my child?",
        answer:
          "No. DaBraino collects zero personal data. There are no accounts, no sign-ups, no analytics, and no tracking of any kind.",
      },
      {
        question: "Does DaBraino have ads?",
        answer:
          "No. DaBraino has no ads and never will show ads to children.",
      },
      {
        question: "Does DaBraino have in-app purchases?",
        answer: "No. Everything in DaBraino is free.",
      },
      {
        question: "Is DaBraino COPPA-compliant?",
        answer:
          "Yes. DaBraino fully complies with the Children's Online Privacy Protection Act. We do not collect any personal information from children (or anyone).",
      },
      {
        question: "Does the app connect to the internet?",
        answer:
          "Only on first launch to download educational content. After that, the app works fully offline. The content download is anonymous — no personal data is sent.",
      },
      {
        question: "Where is my child's game data stored?",
        answer:
          "All data (stats, stickers, settings) is stored locally on the device only. It never leaves the device and is never sent to any server.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        question: "The caller isn't speaking",
        answer:
          "Check that your device isn't on silent mode, your volume is up, and the in-app sound toggle is on (speaker icon during gameplay).",
      },
      {
        question: "The app seems slow or laggy",
        answer:
          "Try closing other apps running in the background. DaBraino is optimized to run at 60fps on most devices.",
      },
      {
        question: "I found a bug or have a suggestion",
        answer:
          "We'd love to hear from you! Email us at hello@huybuilds.app.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#9B59B6] mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-[#6B5744] mb-10">
        Everything you need to know about DaBraino.
      </p>

      {faqSections.map((section) => (
        <FAQSection key={section.title} {...section} />
      ))}
    </div>
  );
}
