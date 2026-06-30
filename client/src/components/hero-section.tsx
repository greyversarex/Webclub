import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { HeroCardStack } from "./hero-card-stack";

const TECH_BADGES = ["AI", "CRM", "ERP", "Web", "Mobile", "Automation"];

export function HeroSection() {
  const { t } = useLanguage();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () =>
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* ── Deep blue atmospheric background (covers the galaxy in the hero) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(70% 55% at 72% 40%, rgba(56,86,180,0.20), transparent 68%),
            radial-gradient(60% 50% at 18% 22%, rgba(40,60,130,0.12), transparent 70%),
            linear-gradient(180deg, #04060f 0%, #070b1a 50%, #04060f 100%)
          `,
          WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
        }}
      />
      {/* soft volumetric fog near the showcase */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "26%",
          left: "52%",
          width: "52%",
          height: "55%",
          background: "radial-gradient(circle, rgba(90,120,220,0.16), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* ── Left: copy ─────────────────────────────────────── */}
          <div className="order-2 lg:order-1 self-center">
            <div
              className="hero-rise inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm"
              data-testid="hero-eyebrow"
            >
              <span className="hero-eyebrow-dot" />
              <span className="text-xs font-medium tracking-[0.2em] text-white/70">
                WEBCOREX
              </span>
            </div>

            <h1
              className="hero-rise font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ animationDelay: "0.06s" }}
              data-testid="text-hero-title"
            >
              {t.hero.title1}{" "}
              <span className="it-shimmer-text bg-gradient-to-r from-violet-300 via-white to-cyan-200 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
              {" "}
              {t.hero.title2}
            </h1>

            <p
              className="hero-rise text-lg text-white/65 mb-8 max-w-xl leading-relaxed"
              style={{ animationDelay: "0.12s" }}
              data-testid="text-hero-description"
            >
              {t.hero.description}
            </p>

            <div
              className="hero-rise flex flex-wrap gap-2.5 mb-10"
              style={{ animationDelay: "0.18s" }}
            >
              {TECH_BADGES.map((badge, i) => (
                <span
                  key={badge}
                  className="hero-badge"
                  style={{ animationDelay: `${0.24 + i * 0.06}s` }}
                  data-testid={`badge-tech-${badge.toLowerCase()}`}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div
              className="hero-rise flex flex-wrap gap-4"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-0 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
                data-testid="button-discuss-project"
              >
                {t.hero.discussProject}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToServices}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                data-testid="button-our-services"
              >
                {t.hero.ourServices}
              </Button>
            </div>
          </div>

          {/* ── Right: swapping solution cards ──────────────── */}
          <div className="order-1 lg:order-2 w-full">
            <HeroCardStack reduced={reduced} />
          </div>

        </div>
      </div>
    </section>
  );
}
