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
import { ElectricPulses } from "@/components/electric-pulses";
import { SectionRobot } from "@/components/section-robot";
import geometricBg from "@assets/Визитки_Personal_(1)_1765668694348.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Base geometric texture */}
      <img
        src={geometricBg}
        alt=""
        className="fixed inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />

      {/* Aurora atmospheric depth glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
      </div>

      {/* Radial vignette for edge depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 42%, transparent 50%, rgba(10,15,35,0.05) 100%)",
          zIndex: 1,
        }}
      />

      <CircuitBackground />
      <ElectricPulses />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <div className="relative">
            <AppsShowcaseSection />
            <SectionRobot
              message="Каждое приложение — интерактивный прототип! Наведите курсор, чтобы попробовать: переводы, чаты, CRM-панели работают прямо здесь."
              side="right"
            />
          </div>
          <div className="relative">
            <WhatWeBuildSection />
            <SectionRobot
              message="Три направления, три рабочих демо. E-commerce, бизнес-сайты и банковские системы — все переключаются автоматически!"
              side="left"
            />
          </div>
          <div className="relative">
            <PortfolioSection />
            <SectionRobot
              message="Реальные проекты из туризма, финтеха, госсектора и ритейла. Все запущены и работают в продакшне."
              side="right"
            />
          </div>
          <div className="relative">
            <TechStackSection />
            <SectionRobot
              message="React, TypeScript, Node.js, PostgreSQL — основной стек. Также работаем с Python, Flutter и облачными платформами."
              side="left"
            />
          </div>
          <div className="relative">
            <ProcessSection />
            <SectionRobot
              message="6 чётких этапов от брифа до запуска. Средний срок MVP — 4-6 недель. На каждом шаге вы видите прогресс."
              side="right"
            />
          </div>
          <div className="relative">
            <ContactSection />
            <SectionRobot
              message="Первая консультация бесплатно! Оставьте заявку — перезвоним в течение часа и оценим ваш проект."
              side="left"
            />
          </div>
        </main>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}
