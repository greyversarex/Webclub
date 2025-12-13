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
      {/* Холодный серебряный фон - светлый */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-200 via-slate-300 to-zinc-300 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(148,163,184,0.35),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(125,211,252,0.2),transparent)] pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-400/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-1/3 right-0 w-[400px] h-[400px] bg-cyan-300/15 rounded-full blur-[80px] pointer-events-none" />
      
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
