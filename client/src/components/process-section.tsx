import { useEffect, useRef, useState } from "react";
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
const AUTOPLAY_DURATION_MS = 5000;

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const steps = t.process.steps;

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeout = useRef<number | null>(null);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setIsTransitioning(true);
    if (transitionTimeout.current) window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => {
      setActiveIdx(idx);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) window.clearTimeout(transitionTimeout.current);
    };
  }, []);

  // Autoplay the active step + drive the progress bar, but only while the
  // section is on screen. Uses requestAnimationFrame so it pauses when the
  // tab is hidden and stays smooth without a tight setInterval.
  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    const start = performance.now();
    setProgress(0);
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min((elapsed / AUTOPLAY_DURATION_MS) * 100, 100));
      if (elapsed >= AUTOPLAY_DURATION_MS) {
        goTo((activeIdx + 1) % steps.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, activeIdx, steps.length]);

  const activeStep = steps[activeIdx];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="process"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-testid="text-process-title"
          >
            {t.process.title}
          </h2>
          <p
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.process.subtitle}
          </p>
        </div>

        <div
          className={`flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Rail */}
          <div className="flex flex-col gap-3 w-full lg:w-1/3 shrink-0 order-2 lg:order-1">
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              const Icon = stepIcons[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-current={isActive ? "step" : undefined}
                  aria-pressed={isActive}
                  data-testid={`button-process-step-${idx}`}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border transition-all duration-300 ${
                      isActive
                        ? "border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        : "border-white/20 text-white/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-violet-300 mb-0.5">
                      {t.process.stageLabel} {idx + 1}
                    </div>
                    <div
                      className={`font-medium text-sm transition-colors ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-b-xl overflow-hidden bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Featured panel */}
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center min-h-[420px] order-1 lg:order-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Ambient glows */}
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-violet-500 opacity-[0.10] blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-400 opacity-[0.08] blur-[80px] pointer-events-none" />

            <div
              className={`relative z-10 flex flex-col h-full transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-2 scale-[0.98]"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              <div className="flex items-center justify-end mb-10">
                <div
                  className="text-sm font-semibold tracking-wider text-violet-300 uppercase"
                  data-testid="text-process-active-stage"
                >
                  {t.process.stageLabel} {activeIdx + 1} {t.process.ofLabel}{" "}
                  {steps.length}
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight"
                  data-testid="text-process-active-title"
                >
                  {activeStep.title}
                </h3>
                <p
                  className="text-lg md:text-2xl text-white/70 leading-relaxed"
                  data-testid="text-process-active-desc"
                >
                  {activeStep.description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mt-12">
                <div className="flex items-center justify-between text-xs font-semibold text-white/40 mb-3">
                  <span>{t.process.progressLabel}</span>
                  <span data-testid="text-process-progress">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
