import { ShoppingCart, Globe, Smartphone, Landmark } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const icons = [ShoppingCart, Globe, Smartphone, Landmark];

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const total = t.whatWeBuild.items.length;

  return (
    <section ref={ref} className="py-16 md:py-24" data-testid="section-what-we-build">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12 md:mb-14 max-w-3xl">
          <div
            className={`font-mono text-[11px] tracking-[0.28em] text-cyan-700/80 uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            — Направления разработки
          </div>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight transition-all duration-700 delay-75 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            data-testid="heading-what-we-build"
          >
            {t.whatWeBuild.title}
          </h2>
          <p
            className={`text-slate-700 text-base md:text-lg max-w-2xl transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        {/* Spec-sheet grid: 1px hairlines via gap + bg trick */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-300/60 border border-slate-300/60 transition-opacity duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.whatWeBuild.items.map((item, index) => {
            const Icon = icons[index] ?? ShoppingCart;
            return (
              <div
                key={index}
                className="group relative bg-white/85 backdrop-blur-sm p-7 md:p-9 transition-colors duration-300 hover:bg-white"
                data-testid={`card-direction-${index}`}
              >
                {/* Top meta row: index marker + monochrome icon */}
                <div className="flex items-start justify-between mb-7">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-slate-500">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <Icon
                    className="w-5 h-5 text-slate-700 transition-colors duration-300 group-hover:text-cyan-700"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight"
                  data-testid={`text-direction-title-${index}`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom hairline accent (slides in on hover) */}
                <div className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-600 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
