import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { AdvantagesSection } from "@/components/advantages-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import videoBg from "@assets/Пин_на_доске_Quick_saves_1768768732798.mp4";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Видео-фон */}
      <video 
        src={videoBg} 
        autoPlay 
        loop 
        muted 
        playsInline
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
