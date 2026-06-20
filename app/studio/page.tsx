import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { WhatIDo } from "./components/WhatIDo";
import { Sample } from "./components/Sample";
import { WhyMe } from "./components/WhyMe";
import { Pricing } from "./components/Pricing";

export default function StudioPage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatIDo />
      <Sample />
      <WhyMe />
      <Pricing />
    </>
  );
}
