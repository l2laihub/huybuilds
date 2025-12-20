"use client";

import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { GradientOrbs } from "./components/ui/GradientOrbs";

export default function Home() {
  return (
    <main className="relative min-h-screen grain-overlay">
      {/* Background effects */}
      <GradientOrbs />
      <div className="mesh-gradient" />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
