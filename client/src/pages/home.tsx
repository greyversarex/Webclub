import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { AppsShowcaseSection } from "@/components/apps-showcase-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { PrototypesSection } from "@/components/prototypes-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProcessSection } from "@/components/process-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { PartnersStrip } from "@/components/partners-strip";
import { ChatWidget } from "@/components/chat-widget";
import { GalaxyBackground } from "@/components/galaxy-background";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Galaxy WebGL background — lighter on mobile for performance */}
      <GalaxyBackground
        mouseRepulsion={false}
        mouseInteraction={!isMobile}
        density={isMobile ? 0.8 : 1.5}
        glowIntensity={isMobile ? 0.22 : 0.4}
        saturation={0.4}
        hueShift={130}
        twinkleIntensity={isMobile ? 0.2 : 0.4}
        rotationSpeed={0.1}
        repulsionStrength={3.5}
        autoCenterRepulsion={0}
        starSpeed={isMobile ? 0.4 : 0.7}
        speed={isMobile ? 0.4 : 0.6}
        transparent={false}
      />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          {!isMobile && <AppsShowcaseSection />}
          <WhatWeBuildSection />
          <PortfolioSection />
          <PrototypesSection />
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
