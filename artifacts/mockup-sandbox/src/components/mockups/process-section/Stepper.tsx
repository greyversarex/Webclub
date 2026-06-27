import React, { useState, useEffect, useRef } from "react";
import { ClipboardList, Palette, Code2, Bug, Rocket, Headphones, Icon } from "lucide-react";
import "./_group.css";

const steps = [
  {
    num: "1",
    title: "Бриф и анализ",
    desc: "Изучаем задачу, ваш бизнес и аудиторию. Согласовываем цели, сроки и бюджет.",
    icon: ClipboardList,
  },
  {
    num: "2",
    title: "Дизайн и прототип",
    desc: "Создаём UX/UI-дизайн, кликабельный прототип и согласовываем визуальный стиль.",
    icon: Palette,
  },
  {
    num: "3",
    title: "Разработка",
    desc: "Пишем чистый код по спринтам. Каждую неделю показываем рабочую версию.",
    icon: Code2,
  },
  {
    num: "4",
    title: "Тестирование",
    desc: "QA-команда проверяет каждую функцию: безопасность, скорость, удобство, кросс-браузерность.",
    icon: Bug,
  },
  {
    num: "5",
    title: "Запуск",
    desc: "Деплой на серверы, настройка домена, аналитики и систем мониторинга. Передача доступов.",
    icon: Rocket,
  },
  {
    num: "6",
    title: "Поддержка 24/7",
    desc: "Гарантия, обновления, мониторинг и развитие проекта. Мы остаёмся на связи.",
    icon: Headphones,
  },
];

const AUTOPLAY_DURATION_MS = 5000;

export default function Stepper() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progressInterval = useRef<number | null>(null);

  const startAutoplay = () => {
    setProgress(0);
    if (progressInterval.current) clearInterval(progressInterval.current);
    
    const startTime = Date.now();
    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_DURATION_MS) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed >= AUTOPLAY_DURATION_MS) {
        handleStepChange((activeIdx + 1) % steps.length);
      }
    }, 16);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [activeIdx]);

  const handleStepChange = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsTransitioning(false);
    }, 300);
  };

  const activeStep = steps[activeIdx];
  const ActiveIcon = activeStep.icon;

  return (
    <div className="min-h-screen font-['Inter'] w-full py-20 px-6 sm:px-12 flex items-center justify-center bg-stp-base">
      <style>{`
        .bg-stp-base {
          background-color: hsl(var(--cosmic-bg));
        }
        
        .stp-glass {
          background: linear-gradient(145deg, hsla(var(--cosmic-panel), 0.6) 0%, hsla(var(--cosmic-bg-2), 0.8) 100%);
          border: 1px solid hsla(var(--cosmic-border), 0.3);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 hsla(var(--cosmic-text), 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .stp-glow-text {
          background: linear-gradient(to right, hsl(var(--cosmic-text)), hsl(var(--cosmic-violet-bright)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stp-accent-gradient {
          background: linear-gradient(90deg, hsl(var(--cosmic-violet)) 0%, hsl(var(--cosmic-cyan)) 100%);
        }

        .stp-fade-enter {
          opacity: 0;
          transform: translateY(10px) scale(0.98);
        }
        .stp-fade-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 300ms ease-out, transform 300ms ease-out;
        }
        
        .stp-rail-item {
          transition: all 0.3s ease;
        }
        .stp-rail-item:hover {
          background: hsla(var(--cosmic-glass), 0.4);
        }
        .stp-rail-item.active {
          background: hsla(var(--cosmic-glass), 0.8);
          border-color: hsla(var(--cosmic-violet), 0.5);
          box-shadow: 0 0 20px hsla(var(--cosmic-violet), 0.15);
        }

        .stp-progress-bar {
          transition: width 16ms linear;
        }
      `}</style>

      <div className="w-full max-w-[1180px] mx-auto flex flex-col gap-12">
        
        <div className="text-center md:text-left flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--cosmic-text))]">
            Как мы работаем
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--cosmic-text-muted))] max-w-2xl leading-relaxed">
            Прозрачный процесс от первой встречи до запуска и поддержки. Вы знаете, что происходит на каждом этапе.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Rail */}
          <div className="flex flex-col gap-3 w-full lg:w-1/3 shrink-0 order-2 lg:order-1">
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              const Icon = step.icon;
              return (
                <button
                  key={step.num}
                  onClick={() => handleStepChange(idx)}
                  className={`stp-rail-item relative flex items-center gap-4 p-4 rounded-xl border border-[hsla(var(--cosmic-border),0.1)] text-left ${isActive ? 'active' : ''}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-[hsla(var(--cosmic-bg),0.8)] border ${isActive ? 'border-[hsl(var(--cosmic-cyan))] text-[hsl(var(--cosmic-cyan-bright))] shadow-[0_0_10px_hsla(var(--cosmic-cyan),0.3)]' : 'border-[hsla(var(--cosmic-border),0.4)] text-[hsl(var(--cosmic-text-dim))]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[hsl(var(--cosmic-violet-bright))] mb-0.5">
                      Этап {step.num}
                    </div>
                    <div className={`font-medium text-sm transition-colors ${isActive ? 'text-[hsl(var(--cosmic-text))]' : 'text-[hsl(var(--cosmic-text-muted))]'}`}>
                      {step.title}
                    </div>
                  </div>
                  
                  {/* Miniature progress bar for active rail item */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[hsla(var(--cosmic-border),0.2)] w-full rounded-b-xl overflow-hidden">
                      <div 
                        className="stp-progress-bar h-full stp-accent-gradient"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Featured Panel */}
          <div className="stp-glass rounded-2xl p-8 md:p-12 flex-1 relative overflow-hidden flex flex-col justify-center min-h-[420px] order-1 lg:order-2">
            
            {/* Background Glow */}
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[hsl(var(--cosmic-violet))] opacity-[0.07] blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[hsl(var(--cosmic-cyan))] opacity-[0.05] blur-[80px] pointer-events-none" />

            <div className={`flex flex-col h-full z-10 ${isTransitioning ? 'stp-fade-enter' : 'stp-fade-enter-active'}`}>
              
              <div className="flex items-center justify-between mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[hsla(var(--cosmic-panel),0.8)] border border-[hsla(var(--cosmic-border),0.5)] shadow-[0_0_30px_hsla(var(--cosmic-cyan),0.1)]">
                  <ActiveIcon className="w-8 h-8 md:w-10 md:h-10 text-[hsl(var(--cosmic-cyan-bright))]" />
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold tracking-wider text-[hsl(var(--cosmic-violet-bright))] uppercase">
                    Этап {activeStep.num} из 6
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-[hsl(var(--cosmic-text))] mb-6 tracking-tight leading-tight">
                  {activeStep.title}
                </h3>
                <p className="text-xl md:text-2xl text-[hsl(var(--cosmic-text-muted))] leading-relaxed">
                  {activeStep.desc}
                </p>
              </div>
              
              {/* Progress Indicator inside featured panel */}
              <div className="mt-12">
                <div className="flex items-center justify-between text-xs font-semibold text-[hsl(var(--cosmic-text-dim))] mb-3">
                  <span>Выполнение этапа</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[hsla(var(--cosmic-bg),0.8)] rounded-full overflow-hidden border border-[hsla(var(--cosmic-border),0.3)]">
                  <div 
                    className="stp-progress-bar h-full stp-accent-gradient rounded-full shadow-[0_0_10px_hsla(var(--cosmic-cyan),0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
