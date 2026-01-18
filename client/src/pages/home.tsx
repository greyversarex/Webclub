import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { AdvantagesSection } from "@/components/advantages-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import geometricBg from "@assets/Визитки_Personal_(1)_1765668694348.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Геометрический фон - картинка */}
      <img 
        src={geometricBg} 
        alt="" 
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      <div className="relative">
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
    </div>
  );
}
