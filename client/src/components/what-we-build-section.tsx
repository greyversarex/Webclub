import { ShoppingCart, Globe, Smartphone, Landmark } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

const icons = [ShoppingCart, Globe, Smartphone, Landmark];

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28"
      data-testid="section-what-we-build"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/25 backdrop-blur-sm mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-gradient-to-r from-cyan-700 to-violet-700 bg-clip-text text-transparent font-semibold">
              Направления разработки
            </span>
          </div>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 leading-[1.05] tracking-tight transition-all duration-700 delay-75 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            data-testid="heading-what-we-build"
          >
            {t.whatWeBuild.title}
          </h2>
          <p
            className={`text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {t.whatWeBuild.items.map((item, index) => {
            const Icon = icons[index] ?? ShoppingCart;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-2xl border border-slate-200/70 p-8 lg:p-10 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.35)] hover:border-transparent ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
                data-testid={`card-direction-${index}`}
              >
                {/* Animated rotating gradient border (on hover) */}
                <div
                  className="animated-gradient-border absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    padding: "1.5px",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Soft glow halo on hover */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/0 to-violet-500/0 group-hover:from-cyan-400/25 group-hover:to-violet-500/15 blur-3xl transition-all duration-700 pointer-events-none" />

                {/* Huge outlined index — outline default, gradient-fill on hover */}
                <div
                  className="absolute -top-6 -right-2 font-display font-black leading-none select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    fontSize: "clamp(110px, 14vw, 170px)",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(15,23,42,0.10)",
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div
                  className="absolute -top-6 -right-2 font-display font-black leading-none select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    fontSize: "clamp(110px, 14vw, 170px)",
                    backgroundImage:
                      "linear-gradient(135deg, #06b6d4 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon pill — gradient with deep glow */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/30 mb-8 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-cyan-500/50 group-hover:scale-105">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
                  <Icon
                    className="relative w-7 h-7 text-white"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  className="relative font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight tracking-tight"
                  data-testid={`text-direction-title-${index}`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative text-slate-600 text-base md:text-[17px] leading-relaxed max-w-md">
                  {item.description}
                </p>

                {/* Bottom hover scan line */}
                <div className="absolute left-0 right-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-cyan-500 to-violet-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
