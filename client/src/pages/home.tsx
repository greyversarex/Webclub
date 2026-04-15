import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { AdvantagesSection } from "@/components/advantages-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative" style={{ zIndex: 2 }}>
        <Header />
        <main>
          <HeroSection />
          <PortfolioSection />
          <TechStackSection />
          <AdvantagesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}
