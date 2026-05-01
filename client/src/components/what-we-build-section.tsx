import { ShoppingCart, Globe, Smartphone, Landmark } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const accents = [
  { icon: ShoppingCart, color: "#06b6d4", glow: "rgba(6,182,212,0.35)"  },
  { icon: Globe,        color: "#8b5cf6", glow: "rgba(139,92,246,0.35)" },
  { icon: Smartphone,   color: "#10b981", glow: "rgba(16,185,129,0.35)" },
  { icon: Landmark,     color: "#f59e0b", glow: "rgba(245,158,11,0.35)" },
];

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 md:py-24" data-testid="section-what-we-build">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-testid="heading-what-we-build"
          >
            {t.whatWeBuild.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {t.whatWeBuild.items.map((item, index) => {
            const accent = accents[index] ?? accents[0];
            const Icon = accent.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-slate-300/40 bg-white/40 backdrop-blur-md p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-slate-400/60 hover:bg-white/55 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
                data-testid={`card-direction-${index}`}
              >
                {/* Decorative corner glow */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                  style={{ background: accent.glow }}
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ring-1 ring-white/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${accent.color}1a`,
                      boxShadow: `0 0 28px ${accent.glow}`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: accent.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-display text-lg md:text-xl font-bold text-slate-800 mb-1.5 leading-tight"
                      data-testid={`text-direction-title-${index}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute left-0 right-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
