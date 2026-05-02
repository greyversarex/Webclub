import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { AppsShowcaseSection } from "@/components/apps-showcase-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { CircuitBackground } from "@/components/circuit-background";
import geometricBg from "@assets/Визитки_Personal_(1)_1765668694348.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <img
        src={geometricBg}
        alt=""
        className="fixed inset-0 w-full h-full object-cover pointer-events-none opacity-40"
      />
      <CircuitBackground />

      <div className="relative">
        <Header />
        <main>
          <HeroSection />
          <AppsShowcaseSection />
          <WhatWeBuildSection />
          <PortfolioSection />
          <TechStackSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}
