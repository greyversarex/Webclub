import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { CircuitBackground } from "@/components/circuit-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <CircuitBackground />

      <div className="relative">
        <Header />
        <main>
          <HeroSection />
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
