import { useEffect, useState } from "react";
import {
  ClipboardList,
  Palette,
  Code2,
  Bug,
  Rocket,
  HeadphonesIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const stepIcons = [ClipboardList, Palette, Code2, Bug, Rocket, HeadphonesIcon];

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    setActiveStep(0);
    const interval = setInterval(() => {
      current = (current + 1) % t.process.steps.length;
      setActiveStep(current);
    }, 2200);
    return () => clearInterval(interval);
  }, [isVisible, t.process.steps.length]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="process"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-testid="text-process-title"
          >
            {t.process.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.process.subtitle}
          </p>
        </div>

        {/* Desktop / tablet — horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-200 mx-12" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-violet-400 to-emerald-500 transition-all duration-1000 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              style={{
                width: isVisible ? "100%" : "0%",
                transitionDelay: "300ms",
              }}
            />
          </div>

          <div className="grid grid-cols-6 gap-4 relative">
            {t.process.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${400 + index * 120}ms` : "0ms",
                  }}
                  data-testid={`process-step-${index}`}
                >
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-br from-violet-600 to-violet-700 border-violet-300 scale-110 shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                        : "bg-white border-slate-200 shadow-md"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-violet-600"
                      }`}
                    />
                    <span
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center border-2 transition-colors duration-500 ${
                        isActive
                          ? "bg-emerald-500 text-white border-white"
                          : "bg-white text-violet-600 border-violet-200"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3
                    className={`font-display font-semibold text-base mb-2 transition-colors duration-500 ${
                      isActive ? "text-violet-700" : "text-slate-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-snug">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="md:hidden relative">
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"
            aria-hidden="true"
          >
            <div
              className="w-full bg-gradient-to-b from-violet-500 via-violet-400 to-emerald-500 transition-all duration-1000"
              style={{
                height: isVisible ? "100%" : "0%",
                transitionDelay: "300ms",
              }}
            />
          </div>

          <div className="space-y-6">
            {t.process.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  className={`flex gap-5 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                  }}
                  data-testid={`process-step-mobile-${index}`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-violet-600 to-violet-700 border-violet-300 scale-110 shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                          : "bg-white border-slate-200 shadow-md"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 transition-colors duration-500 ${
                          isActive ? "text-white" : "text-violet-600"
                        }`}
                      />
                      <span
                        className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center border-2 transition-colors duration-500 ${
                          isActive
                            ? "bg-emerald-500 text-white border-white"
                            : "bg-white text-violet-600 border-violet-200"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3
                      className={`font-display font-semibold text-lg mb-1 transition-colors duration-500 ${
                        isActive ? "text-violet-700" : "text-slate-800"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {step.description}
                    </p>
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
