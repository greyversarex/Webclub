import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { AppsShowcaseSection } from "@/components/apps-showcase-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProcessSection } from "@/components/process-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { PartnersStrip } from "@/components/partners-strip";
import { ChatWidget } from "@/components/chat-widget";
import { GalaxyBackground } from "@/components/galaxy-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Galaxy WebGL background */}
      <GalaxyBackground
        mouseRepulsion={false}
        mouseInteraction
        density={1.5}
        glowIntensity={0.4}
        saturation={0.4}
        hueShift={130}
        twinkleIntensity={0.4}
        rotationSpeed={0.1}
        repulsionStrength={3.5}
        autoCenterRepulsion={0}
        starSpeed={0.7}
        speed={0.6}
        transparent={false}
      />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AppsShowcaseSection />
          <WhatWeBuildSection />
          <PortfolioSection />
          <TechStackSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <PartnersStrip />
      </div>
      <ChatWidget />
    </div>
  );
}
