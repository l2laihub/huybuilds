import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { WhyOnline } from "./components/WhyOnline";
import { WhatIDo } from "./components/WhatIDo";
import { Sample } from "./components/Sample";
import { WhyMe } from "./components/WhyMe";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";

export default function StudioPage() {
  return (
    <>
      <Hero />
      <Problem />
      <WhyOnline />
      <WhatIDo />
      <Sample />
      <WhyMe />
      <Pricing />
      <Contact />
    </>
  );
}
