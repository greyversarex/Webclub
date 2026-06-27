import React, { useState, useEffect } from "react";
import { ClipboardList, Palette, Code2, Bug, Rocket, Headphones } from "lucide-react";
import "./_group.css";

const steps = [
  {
    id: 1,
    title: "Бриф и анализ",
    desc: "Изучаем задачу, ваш бизнес и аудиторию. Согласовываем цели, сроки и бюджет.",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Дизайн и прототип",
    desc: "Создаём UX/UI-дизайн, кликабельный прототип и согласовываем визуальный стиль.",
    icon: Palette,
  },
  {
    id: 3,
    title: "Разработка",
    desc: "Пишем чистый код по спринтам. Каждую неделю показываем рабочую версию.",
    icon: Code2,
  },
  {
    id: 4,
    title: "Тестирование",
    desc: "QA-команда проверяет каждую функцию: безопасность, скорость, удобство, кросс-браузерность.",
    icon: Bug,
  },
  {
    id: 5,
    title: "Запуск",
    desc: "Деплой на серверы, настройка домена, аналитики и систем мониторинга. Передача доступов.",
    icon: Rocket,
  },
  {
    id: 6,
    title: "Поддержка 24/7",
    desc: "Гарантия, обновления, мониторинг и развитие проекта. Мы остаёмся на связи.",
    icon: Headphones,
  },
];

export default function Orbital() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full font-['Inter'] flex flex-col items-center py-24 overflow-hidden" style={{ backgroundColor: "hsl(var(--cosmic-bg))", color: "hsl(var(--cosmic-text))" }}>
      <style>{`
        .ob-gradient-text {
          background: linear-gradient(to right, hsl(var(--cosmic-violet-bright)), hsl(var(--cosmic-cyan-bright)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ob-core-glow {
          box-shadow: 0 0 60px 10px hsla(var(--cosmic-violet), 0.3), inset 0 0 40px hsla(var(--cosmic-cyan), 0.2);
          animation: ob-pulse 4s ease-in-out infinite alternate;
        }

        .ob-node {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes ob-pulse {
          0% { opacity: 0.8; transform: scale(0.98); box-shadow: 0 0 60px 10px hsla(var(--cosmic-violet), 0.2), inset 0 0 40px hsla(var(--cosmic-cyan), 0.1); }
          100% { opacity: 1; transform: scale(1.02); box-shadow: 0 0 80px 20px hsla(var(--cosmic-violet), 0.4), inset 0 0 60px hsla(var(--cosmic-cyan), 0.3); }
        }

        @keyframes ob-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ob-counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .ob-orbit-container {
          animation: ob-rotate 60s linear infinite;
        }

        .ob-orbit-node {
          animation: ob-counter-rotate 60s linear infinite;
        }
      `}</style>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(var(--cosmic-violet),0.15)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(var(--cosmic-cyan),0.15)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1180px] w-full px-6 flex flex-col items-center">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Как мы <span className="ob-gradient-text">работаем</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(var(--cosmic-text-muted))" }}>
            Прозрачный процесс от первой встречи до запуска и поддержки. Вы знаете, что происходит на каждом этапе.
          </p>
        </div>

        {/* Desktop Radial View */}
        <div className="hidden lg:flex relative w-[800px] h-[800px] items-center justify-center">
          
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[hsla(var(--cosmic-border),0.5)] opacity-50" style={{ transform: "scale(0.85)" }} />
          <div className="absolute inset-0 rounded-full border border-[hsla(var(--cosmic-border),0.3)] opacity-30" style={{ transform: "scale(0.6)" }} />

          {/* Orbiting Container */}
          <div className="absolute inset-0 ob-orbit-container">
            {steps.map((step, i) => {
              const angle = (i * 360) / steps.length - 90; // Start at top
              const radius = 340;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              const isActive = i === activeIndex;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="absolute left-1/2 top-1/2 -ml-8 -mt-8 ob-node cursor-pointer z-20 group"
                  style={{ 
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div className="ob-orbit-node relative">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-md border ${
                        isActive 
                          ? "bg-[hsla(var(--cosmic-violet),0.2)] border-[hsl(var(--cosmic-violet-bright))] shadow-[0_0_20px_hsla(var(--cosmic-violet),0.5)] scale-110" 
                          : "bg-[hsla(var(--cosmic-glass),0.5)] border-[hsl(var(--cosmic-border))] hover:border-[hsla(var(--cosmic-cyan),0.5)] text-[hsl(var(--cosmic-text-muted))]"
                      }`}
                      style={{ color: isActive ? "hsl(var(--cosmic-cyan-bright))" : "" }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Tooltip-like label attached to node for context */}
                    <div 
                      className={`absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                      style={{ color: "hsl(var(--cosmic-text))" }}
                    >
                      {step.id}. {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Core */}
          <div 
            className="absolute z-10 w-[400px] h-[400px] rounded-full ob-core-glow flex flex-col items-center justify-center p-12 text-center border border-[hsla(var(--cosmic-border),0.8)] backdrop-blur-xl bg-[hsla(var(--cosmic-panel),0.6)]"
            style={{ 
              background: "radial-gradient(circle at center, hsla(var(--cosmic-violet),0.1) 0%, hsla(var(--cosmic-panel),0.8) 100%)"
            }}
          >
            <div className="text-[hsl(var(--cosmic-cyan-bright))] text-sm font-bold tracking-widest uppercase mb-4 opacity-80">
              Этап {steps[activeIndex].id}
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--cosmic-text))" }}>
              {steps[activeIndex].title}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "hsl(var(--cosmic-text-muted))" }}>
              {steps[activeIndex].desc}
            </p>
          </div>
        </div>

        {/* Mobile / Narrow View */}
        <div className="lg:hidden w-full max-w-2xl flex flex-col gap-6 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--cosmic-violet))] via-[hsl(var(--cosmic-cyan))] to-transparent opacity-50" />
          
          {steps.map((step, i) => {
            const isActive = i === activeIndex;
            const Icon = step.icon;
            
            return (
              <div 
                key={step.id}
                className={`relative pl-24 pr-6 py-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  isActive 
                    ? "bg-[hsla(var(--cosmic-violet),0.1)] border-[hsla(var(--cosmic-violet),0.4)]" 
                    : "bg-[hsla(var(--cosmic-glass),0.3)] border-[hsla(var(--cosmic-border),0.5)]"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <div 
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-[hsla(var(--cosmic-panel),1)] border-[hsl(var(--cosmic-cyan))] shadow-[0_0_15px_hsla(var(--cosmic-cyan),0.4)] text-[hsl(var(--cosmic-cyan-bright))]"
                      : "bg-[hsla(var(--cosmic-panel),1)] border-[hsl(var(--cosmic-border))] text-[hsl(var(--cosmic-text-muted))]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[hsl(var(--cosmic-violet-bright))] font-mono text-sm font-bold opacity-80">
                      0{step.id}
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: "hsl(var(--cosmic-text))" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--cosmic-text-muted))" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
