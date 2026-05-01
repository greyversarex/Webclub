import { ShoppingCart, Globe, Smartphone, Landmark } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const icons = [ShoppingCart, Globe, Smartphone, Landmark];

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const total = t.whatWeBuild.items.length;

  return (
    <section ref={ref} className="relative py-20 md:py-28" data-testid="section-what-we-build">
      {/* Dark cyberpunk band — breaks the light page background */}
      <div className="absolute inset-x-0 top-6 bottom-6 bg-slate-950/90 backdrop-blur-md border-y border-cyan-500/25 shadow-[inset_0_0_120px_rgba(6,182,212,0.08)]" />

      {/* Subtle tech grid overlay */}
      <div
        className="absolute inset-x-0 top-6 bottom-6 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div
            className={`font-mono text-[11px] tracking-[0.32em] text-cyan-400 uppercase mb-5 flex items-center gap-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-8 h-px bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            Направления разработки
          </div>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transition-all duration-700 delay-75 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            data-testid="heading-what-we-build"
          >
            {t.whatWeBuild.title}
          </h2>
          <p
            className={`text-slate-400 text-base md:text-lg max-w-2xl transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {t.whatWeBuild.items.map((item, index) => {
            const Icon = icons[index] ?? ShoppingCart;
            return (
              <div
                key={index}
                className={`
                  group relative overflow-hidden rounded-md
                  bg-slate-900/70 backdrop-blur-md
                  border border-cyan-500/25
                  p-7 md:p-9
                  transition-all duration-500
                  hover:border-cyan-400/70 hover:bg-slate-900/85
                  hover:shadow-[0_0_45px_rgba(6,182,212,0.25)]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
                data-testid={`card-direction-${index}`}
              >
                {/* Tech corner brackets */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400/70 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-cyan-300" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400/70 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-cyan-300" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-400/70 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-cyan-300" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400/70 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-cyan-300" />

                {/* Top meta row: index marker + glowing icon */}
                <div className="relative flex items-start justify-between mb-7">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-cyan-400/90">
                    [ {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
                  </span>
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-cyan-400/35 group-hover:bg-cyan-300/60 transition-all duration-500" />
                    <Icon
                      className="relative w-6 h-6 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-xl md:text-2xl font-bold text-white mb-3 leading-tight"
                  data-testid={`text-direction-title-${index}`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom neon scan line */}
                <div
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
