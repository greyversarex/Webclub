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
      {/* ── Neon atmospheric background (covers the galaxy in the hero) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(55% 50% at 80% 26%, rgba(139,92,246,0.34), transparent 62%),
            radial-gradient(48% 46% at 64% 72%, rgba(217,70,239,0.22), transparent 64%),
            radial-gradient(52% 48% at 14% 30%, rgba(56,189,248,0.18), transparent 66%),
            radial-gradient(60% 55% at 40% 105%, rgba(99,102,241,0.20), transparent 60%),
            linear-gradient(180deg, #04060f 0%, #080a1c 48%, #04050d 100%)
          `,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          maskComposite: "intersect",
        }}
      />
      {/* drifting neon aurora for the WOW factor */}
      <div
        className={reduced ? "absolute inset-0 pointer-events-none" : "hero-aurora absolute inset-0 pointer-events-none"}
        style={{
          background: `
            radial-gradient(40% 38% at 72% 32%, rgba(168,85,247,0.45), transparent 60%),
            radial-gradient(34% 34% at 30% 64%, rgba(34,211,238,0.32), transparent 62%),
            radial-gradient(30% 30% at 56% 88%, rgba(236,72,153,0.30), transparent 60%)
          `,
          filter: "blur(80px)",
          opacity: 0.9,
          mixBlendMode: "screen",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          maskComposite: "intersect",
        }}
      />
      {/* fine neon grid for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139,92,246,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56,189,248,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
          WebkitMaskImage: "radial-gradient(60% 55% at 60% 40%, #000, transparent 80%)",
          maskImage: "radial-gradient(60% 55% at 60% 40%, #000, transparent 80%)",
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
              <span className="it-shimmer-text bg-clip-text text-transparent">
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
