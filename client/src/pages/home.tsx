import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { AppsShowcaseSection } from "@/components/apps-showcase-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProcessSection } from "@/components/process-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { ChatWidget } from "@/components/chat-widget";
import { CircuitBackground } from "@/components/circuit-background";
import { ElectricPulses } from "@/components/electric-pulses";
import { SectionRobot } from "@/components/section-robot";
import { GalaxyBackground } from "@/components/galaxy-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Galaxy WebGL background */}
      <GalaxyBackground
        mouseRepulsion={false}
        mouseInteraction
        density={1.5}
        glowIntensity={0.4}
        saturation={0.4}
        hueShift={130}
        twinkleIntensity={0.4}
        rotationSpeed={0.1}
        repulsionStrength={3.5}
        autoCenterRepulsion={0}
        starSpeed={0.7}
        speed={0.6}
        transparent={false}
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
              message="Хотите, чтобы ваш бизнес охватил весь мир? Мы это устроим!"
              side="right"
            />
          </div>
          <div className="relative">
            <WhatWeBuildSection />
            <SectionRobot
              message="Мы воплощаем любые идеи в жизнь. С нами у вас нет ограничений!"
              side="left"
            />
          </div>
          <div className="relative">
            <PortfolioSection />
            <SectionRobot
              message="Реальные проекты для бизнеса, финтеха, госсектора и ритейла."
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
              message="С нами вы в безопасности и постоянно в курсе дел. Работаем прозрачно, быстро и на полную мощность!"
              side="right"
            />
          </div>
          <div className="relative">
            <TestimonialsSection />
            <SectionRobot
              message="Уже 50+ компаний доверились нам. Вы следующий?"
              side="left"
            />
          </div>
          <div className="relative">
            <ContactSection />
            <SectionRobot
              message="Давайте обсудим ваш проект прямо сейчас!"
              side="left"
            />
          </div>
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
