import { DaBrainoHero } from "./components/DaBrainoHero";
import { HowItWorks } from "./components/HowItWorks";
import { TopicsGrid } from "./components/TopicsGrid";
import { FeaturesHighlight } from "./components/FeaturesHighlight";
import { SafetyTrust } from "./components/SafetyTrust";
import { AboutStory } from "./components/AboutStory";
import { StoreBadges } from "./components/StoreBadges";

export default function DaBrainoLanding() {
  return (
    <>
      <DaBrainoHero />
      <HowItWorks />
      <TopicsGrid />
      <FeaturesHighlight />
      <SafetyTrust />
      <AboutStory />

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-4">
            Ready to Make Math Fun?
          </h2>
          <p className="text-lg text-[#6B5744] mb-8">
            Download DaBraino for free and watch your kids fall in love with math.
          </p>
          <StoreBadges size="lg" className="justify-center" />
        </div>
      </section>
    </>
  );
}
