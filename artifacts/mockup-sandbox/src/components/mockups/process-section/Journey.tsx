import React from 'react';
import { ClipboardList, Palette, Code2, Bug, Rocket, Headphones, Icon } from 'lucide-react';
import './_group.css';

const STEPS = [
  {
    title: "Бриф и анализ",
    description: "Изучаем задачу, ваш бизнес и аудиторию. Согласовываем цели, сроки и бюджет.",
    icon: ClipboardList,
  },
  {
    title: "Дизайн и прототип",
    description: "Создаём UX/UI-дизайн, кликабельный прототип и согласовываем визуальный стиль.",
    icon: Palette,
  },
  {
    title: "Разработка",
    description: "Пишем чистый код по спринтам. Каждую неделю показываем рабочую версию.",
    icon: Code2,
  },
  {
    title: "Тестирование",
    description: "QA-команда проверяет каждую функцию: безопасность, скорость, удобство, кросс-браузерность.",
    icon: Bug,
  },
  {
    title: "Запуск",
    description: "Деплой на серверы, настройка домена, аналитики и систем мониторинга. Передача доступов.",
    icon: Rocket,
  },
  {
    title: "Поддержка 24/7",
    description: "Гарантия, обновления, мониторинг и развитие проекта. Мы остаёмся на связи.",
    icon: Headphones,
  }
];

export default function Journey() {
  return (
    <section className="relative min-h-screen bg-[hsl(var(--cosmic-bg))] text-[hsl(var(--cosmic-text))] font-['Inter',sans-serif] overflow-hidden selection:bg-[hsl(var(--cosmic-violet))] selection:text-white pb-32">
      <style>{`
        @keyframes jr-fade-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes jr-line-grow {
          0% { height: 0; }
          100% { height: 100%; }
        }
        @keyframes jr-pulse-glow {
          0%, 100% { box-shadow: 0 0 15px 0px hsla(var(--cosmic-cyan), 0.4); }
          50% { box-shadow: 0 0 25px 5px hsla(var(--cosmic-violet-bright), 0.6); }
        }
        @keyframes jr-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .jr-animate-fade-up {
          animation: jr-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .jr-animate-line {
          animation: jr-line-grow 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .jr-bg-stars {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, hsla(var(--cosmic-text), 0.15), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, hsla(var(--cosmic-text), 0.1), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, hsla(var(--cosmic-cyan), 0.2), rgba(0,0,0,0));
          background-size: 100px 100px;
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute inset-0 jr-bg-stars pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[hsl(var(--cosmic-violet))] opacity-[0.07] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[hsl(var(--cosmic-cyan))] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-[1180px] mx-auto px-6 pt-24 md:pt-32">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto jr-animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(var(--cosmic-border))] bg-[hsl(var(--cosmic-glass))] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--cosmic-cyan-bright))] animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide uppercase text-[hsl(var(--cosmic-cyan))]">Схема работы</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--cosmic-cyan-bright))] to-[hsl(var(--cosmic-violet-bright))]">работаем</span>
          </h2>
          <p className="text-[hsl(var(--cosmic-text-muted))] text-lg md:text-xl leading-relaxed font-light">
            Прозрачный процесс от первой встречи до запуска и поддержки. Вы знаете, что происходит на каждом этапе.
          </p>
        </div>

        {/* Timeline Journey */}
        <div className="relative pb-12">
          {/* Central Spine Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[hsl(var(--cosmic-violet))] to-transparent opacity-30"></div>
          {/* Animated Glow Line over spine */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[hsl(var(--cosmic-cyan))] via-[hsl(var(--cosmic-violet-bright))] to-transparent jr-animate-line shadow-[0_0_10px_hsl(var(--cosmic-cyan))]"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const numberStr = (index + 1).toString().padStart(2, '0');

              return (
                <div 
                  key={index} 
                  className="relative flex flex-col md:flex-row w-full jr-animate-fade-up group"
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                >
                  {/* Connector Node */}
                  <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 w-5 h-5 rounded-full border-[3px] border-[hsl(var(--cosmic-bg))] bg-[hsl(var(--cosmic-cyan-bright))] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 group-hover:scale-125 group-hover:bg-[hsl(var(--cosmic-violet-bright))] shadow-[0_0_15px_hsl(var(--cosmic-cyan))]">
                    <div className="absolute inset-0 rounded-full animate-ping opacity-50 bg-[hsl(var(--cosmic-cyan))]"></div>
                  </div>

                  {/* Card Container */}
                  <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:ml-auto'}`}>
                    <div className={`relative p-8 rounded-2xl border border-[hsl(var(--cosmic-border))] bg-[hsl(var(--cosmic-glass))] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[hsl(var(--cosmic-violet-bright))] group-hover:shadow-[0_10px_40px_-10px_hsla(var(--cosmic-violet),0.3)] flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                      
                      {/* Watermark Number */}
                      <div className={`absolute top-2 ${isEven ? 'md:left-6 right-6 md:right-auto' : 'right-6'} text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:text-white/[0.04]`}>
                        {numberStr}
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col md:items-[inherit]">
                        <div className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cosmic-panel))] to-[hsl(var(--cosmic-glass))] border border-[hsl(var(--cosmic-border))] shadow-[0_0_20px_hsla(var(--cosmic-cyan),0.1)] group-hover:shadow-[0_0_30px_hsla(var(--cosmic-violet-bright),0.3)] transition-all duration-500">
                          <Icon className="w-7 h-7 text-[hsl(var(--cosmic-cyan-bright))] group-hover:text-[hsl(var(--cosmic-violet-bright))] transition-colors duration-500" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--cosmic-text))] group-hover:text-white transition-colors">
                          {step.title}
                        </h3>
                        
                        <p className="text-[hsl(var(--cosmic-text-muted))] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
