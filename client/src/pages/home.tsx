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
    <div className="min-h-screen bg-background relative">
      {/* Единый градиентный фон для всего сайта */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900/20 via-background to-cyan-900/15 pointer-events-none" />
      <div className="fixed top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative">
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
    </div>
  );
}
