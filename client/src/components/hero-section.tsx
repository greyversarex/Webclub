import { useState, useEffect, useRef } from "react";
import { ArrowRight, Rocket, ShieldCheck, Award, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

const projectImages = [
  ecommercePlatform, bankingApp, corporatePortal,
  educationPlatform, govServices, logisticsSystem,
];
const projectTags = [
  ["React", "Node.js", "PostgreSQL"],
  ["React Native", "TypeScript", "AWS"],
  ["Vue.js", "Python", "Docker"],
  ["Next.js", "WebRTC", "MongoDB"],
  ["Angular", "Java", "Oracle"],
  ["React", "Go", "Redis"],
];
const accentColors = [
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

const COLS = 8;
const ROWS = 6;
const TOTAL = COLS * ROWS;
// Ripple-from-center delays: tiles near center appear first, corners last
const _cx = (COLS - 1) / 2, _cy = (ROWS - 1) / 2;
const _maxDist = Math.sqrt(_cx * _cx + _cy * _cy);
const DELAYS = Array.from({ length: TOTAL }, (_, i) => {
  const col = i % COLS, row = Math.floor(i / COLS);
  const dist = Math.sqrt((col - _cx) ** 2 + (row - _cy) ** 2);
  const base = (dist / _maxDist) * 540;
  const jitter = Math.floor(Math.random() * 70) - 35;
  return Math.max(0, Math.floor(base + jitter));
});
// max delay ≈ 540 + 35 = 575ms, tile anim = 440ms → ANIM_MS = 1060ms
const ANIM_MS = 1060;
const TOTAL_PROJECTS = 6;

export function HeroSection() {
  const { t } = useLanguage();
  const projects = t.hero.slides;

  const [shown, setShown]     = useState(0);
  const [next, setNext]       = useState(0);
  const [animId, setAnimId]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const shownRef     = useRef(0);
  const animatingRef = useRef(false);

  const goTo = (idx: number) => {
    if (animatingRef.current || idx === shownRef.current) return;
    animatingRef.current = true;
    setNext(idx);
    setAnimId(id => id + 1);
    setAnimating(true);

    setTimeout(() => {
      shownRef.current = idx;
      setShown(idx);
      setAnimating(false);
      animatingRef.current = false;
    }, ANIM_MS);
  };

  useEffect(() => {
    const id = setInterval(() => goTo((shownRef.current + 1) % TOTAL_PROJECTS), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const count = t.hero.features.length;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleFeatures(Array(count).fill(false));
          t.hero.features.forEach((_, i) => {
            setTimeout(() => {
              setVisibleFeatures(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 300 + i * 200);
          });

          const cycleStart = 300 + count * 200 + 400;
          let current = 0;
          const startCycle = setTimeout(() => {
            setActiveFeature(0);
            const id = setInterval(() => {
              current = (current + 1) % count;
              setActiveFeature(current);
            }, 1400);
            return () => clearInterval(id);
          }, cycleStart);

          observer.disconnect();
          return () => clearTimeout(startCycle);
        }
      },
      { threshold: 0.1 }
    );
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, [t.hero.features]);

  const scrollToContact  = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  const project = projects[shown];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ─────────────────────────────────────── */}
          <div className="order-1 self-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t.hero.title1}{" "}
              <span className="it-shimmer-text bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
              {" "}{t.hero.title2}
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl">{t.hero.description}</p>

            <div ref={featuresRef} className="mb-10 space-y-1">
              {t.hero.features.map((feature, index) => {
                const isActive = activeFeature === index;
                return (
                  <div
                    key={index}
                    className="group relative flex items-center gap-5 py-3 transition-all duration-500 hover:translate-x-1"
                    style={{
                      opacity: visibleFeatures[index] ? 1 : 0,
                      transform: visibleFeatures[index]
                        ? isActive ? "translateX(4px)" : "translateX(0)"
                        : "translateX(-20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                    data-testid={`text-feature-${index}`}
                  >
                    <span
                      className="font-display font-black text-[28px] leading-none w-12 transition-all duration-500"
                      style={isActive ? {
                        background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      } : { color: "rgba(255,255,255,0.35)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-base md:text-lg font-medium transition-colors duration-500 ${isActive ? "text-white font-semibold" : "text-white/70"}`}>
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>


            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-0 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                data-testid="button-discuss-project"
              >
                {t.hero.discussProject}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToServices} className="border-white/30 text-white hover:bg-white/10" data-testid="button-our-services">
                {t.hero.ourServices}
              </Button>
            </div>

          </div>

          {/* ── Right: slideshow ───────────────────────────────── */}
          <div className="order-2 w-full self-start pt-2">

            <div className="mb-3 h-10 overflow-hidden">
              <h2
                key={shown}
                className="slide-text-in font-display font-bold text-2xl text-white"
                data-testid="text-slide-title"
              >
                {project.title}
              </h2>
            </div>

            <div
              className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5 h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px]"
            >
              {/* BASE LAYER — background-size 100% 100% matches tile mosaic exactly */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${projectImages[shown]})`,
                  backgroundSize: "100% 100%",
                  zIndex: 1,
                }}
                data-testid={`img-slide-${shown}`}
              />

              {/*
               * TILE OVERLAY — only mounted while animating.
               * Conditional rendering (`animating &&`) guarantees tiles are fully
               * removed from the DOM when idle — no CSS state to "bleed through".
               * `key={animId}` forces a fresh mount each transition so @keyframes
               * always starts from the beginning, never from a stale state.
               */}
              {animating && (
                <div
                  key={animId}
                  className="absolute inset-0"
                  style={{
                    zIndex: 2,
                    display: "grid",
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                  }}
                >
                  {Array.from({ length: TOTAL }, (_, i) => {
                    const col = i % COLS;
                    const row = Math.floor(i / COLS);
                    return (
                      <div
                        key={i}
                        className="mosaic-tile"
                        style={{
                          animationDelay: `${DELAYS[i]}ms`,
                          backgroundImage: `url(${projectImages[next]})`,
                          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                          backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
                        }}
                      />
                    );
                  })}
                </div>
              )}

              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"
                style={{ zIndex: 3 }}
              />
            </div>

            <div key={shown} className="slide-text-in mt-4" style={{ animationDelay: "0.08s", minHeight: "80px" }}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className={`text-xs border ${accentColors[shown]}`}>
                  {project.category}
                </Badge>
                {projectTags[shown].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded bg-white/10 text-white/70 border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === shown
                      ? "w-6 h-2 bg-violet-400"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                  data-testid={`button-slide-dot-${i}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
