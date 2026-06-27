import React, { useState, useEffect } from "react";
import { ClipboardList, Palette, Code2, Bug, Rocket, Headphones } from "lucide-react";
import "./_group.css";

const steps = [
  {
    num: "01",
    title: "Бриф и анализ",
    desc: "Изучаем задачу, ваш бизнес и аудиторию. Согласовываем цели, сроки и бюджет.",
    Icon: ClipboardList,
  },
  {
    num: "02",
    title: "Дизайн и прототип",
    desc: "Создаём UX/UI-дизайн, кликабельный прототип и согласовываем визуальный стиль.",
    Icon: Palette,
  },
  {
    num: "03",
    title: "Разработка",
    desc: "Пишем чистый код по спринтам. Каждую неделю показываем рабочую версию.",
    Icon: Code2,
  },
  {
    num: "04",
    title: "Тестирование",
    desc: "QA-команда проверяет каждую функцию: безопасность, скорость, удобство, кросс-браузерность.",
    Icon: Bug,
  },
  {
    num: "05",
    title: "Запуск",
    desc: "Деплой на серверы, настройка домена, аналитики и систем мониторинга. Передача доступов.",
    Icon: Rocket,
  },
  {
    num: "06",
    title: "Поддержка 24/7",
    desc: "Гарантия, обновления, мониторинг и развитие проекта. Мы остаёмся на связи.",
    Icon: Headphones,
  },
];

export default function Pipeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // If hovering, pause auto-advance
    if (hoveredIndex !== null) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hoveredIndex]);

  const currentIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section className="min-h-screen w-full font-['Inter',sans-serif] relative overflow-hidden flex flex-col items-center py-24"
      style={{ backgroundColor: "hsl(var(--cosmic-bg))", color: "hsl(var(--cosmic-text))" }}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen pl-bg-glow opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full mix-blend-screen pl-bg-glow-2 opacity-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1180px] px-6 mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--cosmic-violet-bright))] to-[hsl(var(--cosmic-cyan))]">работаем</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[hsl(var(--cosmic-text-muted))]">
            Прозрачный процесс от первой встречи до запуска и поддержки. Вы знаете, что происходит на каждом этапе.
          </p>
        </div>

        {/* Pipeline Container */}
        <div className="relative w-full lg:min-h-[520px] lg:flex lg:items-center">
          {/* Desktop Rail (Horizontal) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-[hsl(var(--cosmic-border))] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-out bg-gradient-to-r from-[hsl(var(--cosmic-violet))] to-[hsl(var(--cosmic-cyan-bright))] shadow-[0_0_15px_hsl(var(--cosmic-cyan))]"
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />
            {/* The traveling pulse */}
            <div 
              className="absolute top-0 bottom-0 w-32 -ml-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 mix-blend-overlay transition-all duration-1000 ease-out"
              style={{ left: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Mobile Rail (Vertical) */}
          <div className="block lg:hidden absolute top-0 bottom-0 left-[31px] w-1 bg-[hsl(var(--cosmic-border))] rounded-full overflow-hidden">
             <div 
              className="absolute top-0 left-0 right-0 transition-all duration-1000 ease-out bg-gradient-to-b from-[hsl(var(--cosmic-violet))] to-[hsl(var(--cosmic-cyan-bright))] shadow-[0_0_15px_hsl(var(--cosmic-cyan))]"
              style={{ height: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Nodes Grid / Flex */}
          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center relative gap-8 lg:gap-0 w-full">
            {steps.map((step, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx <= currentIndex;
              const isTop = idx % 2 === 0;

              return (
                <div 
                  key={step.num}
                  className={`relative flex lg:flex-col items-start lg:items-center w-full lg:w-[180px] group`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Connection line for mobile */}
                  <div className="lg:hidden absolute left-[33px] top-[32px] w-8 h-[2px] bg-[hsl(var(--cosmic-border))]">
                    <div 
                      className="absolute inset-0 bg-[hsl(var(--cosmic-cyan))] transition-transform duration-700 origin-left"
                      style={{ transform: isPast ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </div>

                  {/* Node Dot */}
                  <div className={`
                    relative z-10 flex-shrink-0 w-16 h-16 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center
                    transition-all duration-500 ease-out mt-0 lg:mt-0
                    ${isPast ? 'border-[hsl(var(--cosmic-cyan))] bg-[hsl(var(--cosmic-bg))]' : 'border-[hsl(var(--cosmic-border))] bg-[hsl(var(--cosmic-panel))]'}
                  `}>
                    {/* Active Halo Effect */}
                    {isActive && (
                      <div className="absolute -inset-4 rounded-full border border-[hsl(var(--cosmic-cyan-bright))] opacity-50 pl-spin" />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-[hsl(var(--cosmic-cyan))] opacity-20 pl-pulse" />
                    )}
                    
                    <step.Icon className={`
                      w-6 h-6 lg:w-5 lg:h-5 transition-colors duration-500
                      ${isActive ? 'text-[hsl(var(--cosmic-cyan-bright))]' : isPast ? 'text-[hsl(var(--cosmic-cyan))]' : 'text-[hsl(var(--cosmic-text-dim))]'}
                    `} />
                  </div>

                  {/* Desktop connector line */}
                  <div className={`
                    hidden lg:block absolute w-[2px] h-8 bg-[hsl(var(--cosmic-border))]
                    ${isTop ? 'bottom-[calc(50%+24px)]' : 'top-[calc(50%+24px)]'}
                  `}>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-${isTop ? 't' : 'b'} from-[hsl(var(--cosmic-cyan))] to-transparent transition-opacity duration-700`}
                      style={{ opacity: isPast ? 1 : 0 }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className={`
                    flex-grow ml-12 lg:ml-0 lg:absolute w-full lg:w-[240px]
                    transition-all duration-500 ease-out
                    ${isTop ? 'lg:bottom-[calc(50%+64px)] lg:origin-bottom' : 'lg:top-[calc(50%+64px)] lg:origin-top'}
                    ${isActive ? 'lg:scale-105 opacity-100' : 'opacity-70 group-hover:opacity-100'}
                  `}>
                    <div className={`
                      p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500
                      ${isActive 
                        ? 'border-[hsl(var(--cosmic-cyan-bright))/40] bg-[hsl(var(--cosmic-panel))/80] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_hsl(var(--cosmic-cyan))/10]' 
                        : 'border-[hsl(var(--cosmic-border))] bg-[hsl(var(--cosmic-glass))/40] hover:bg-[hsl(var(--cosmic-panel))/60]'}
                    `}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-mono font-bold tracking-wider ${isActive ? 'text-[hsl(var(--cosmic-cyan-bright))]' : 'text-[hsl(var(--cosmic-text-dim))]'}`}>
                          {step.num}
                        </span>
                        <h3 className={`text-lg font-semibold leading-tight ${isActive ? 'text-white' : 'text-[hsl(var(--cosmic-text))]'}`}>
                          {step.title}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-[hsl(var(--cosmic-text-muted))]' : 'text-[hsl(var(--cosmic-text-dim))]'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pl-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes pl-spin {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes pl-bg-glow {
          0%, 100% { transform: translate(0, 0) scale(1); background: radial-gradient(circle, hsl(var(--cosmic-violet)) 0%, transparent 70%); }
          50% { transform: translate(2%, 2%) scale(1.05); background: radial-gradient(circle, hsl(var(--cosmic-indigo)) 0%, transparent 70%); }
        }
        @keyframes pl-bg-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(1); background: radial-gradient(circle, hsl(var(--cosmic-cyan)) 0%, transparent 70%); }
          50% { transform: translate(-2%, -2%) scale(1.05); background: radial-gradient(circle, hsl(var(--cosmic-violet-bright)) 0%, transparent 70%); }
        }
        .pl-pulse { animation: pl-pulse 2s infinite ease-in-out; }
        .pl-spin { animation: pl-spin 8s linear infinite; }
        .pl-bg-glow { animation: pl-bg-glow 15s ease-in-out infinite; }
        .pl-bg-glow-2 { animation: pl-bg-glow-2 18s ease-in-out infinite reverse; }
      `}</style>
    </section>
  );
}
