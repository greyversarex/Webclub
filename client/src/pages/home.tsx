import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { AdvantagesSection } from "@/components/advantages-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TechStackSection />
        <AdvantagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
