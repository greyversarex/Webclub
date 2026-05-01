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

  const scrollToContact  = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  const project = projects[shown];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ─────────────────────────────────────── */}
          <div className="order-1 self-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              {t.hero.title1}{" "}
              <span className="it-shimmer-text bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
              {" "}{t.hero.title2}
            </h1>
            <p className="text-lg text-slate-900 mb-8 max-w-xl">{t.hero.description}</p>

            <div className="relative mb-10 rounded-md bg-slate-950/85 backdrop-blur-sm border border-cyan-500/25 shadow-[0_0_40px_rgba(6,182,212,0.12)] p-5 md:p-6 overflow-hidden">
              {/* Tech corner brackets */}
              <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-cyan-400/70" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-cyan-400/70" />
              <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-cyan-400/70" />
              <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-400/70" />

              {/* Header */}
              <div className="font-mono text-[10px] tracking-[0.3em] text-cyan-400/90 uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
                Ключевые преимущества
              </div>

              <div className="divide-y divide-cyan-500/15">
                {t.hero.features.map((feature, index) => {
                  const Icon = [Rocket, ShieldCheck, Award, Wallet][index] ?? Rocket;
                  return (
                    <div
                      key={index}
                      className="group flex items-center gap-4 py-3"
                      data-testid={`text-feature-${index}`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.22em] text-cyan-400/85 w-7">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        className="w-4 h-4 text-cyan-400 flex-shrink-0 transition-all duration-300 group-hover:text-cyan-300 group-hover:[filter:drop-shadow(0_0_6px_rgba(6,182,212,0.8))]"
                        strokeWidth={1.75}
                      />
                      <span className="text-sm md:text-base text-slate-100">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 text-slate-800 border-slate-300 shadow-lg shadow-slate-300/25"
                data-testid="button-discuss-project"
              >
                {t.hero.discussProject}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToServices} data-testid="button-our-services">
                {t.hero.ourServices}
              </Button>
            </div>

          </div>

          {/* ── Right: slideshow ───────────────────────────────── */}
          <div className="order-2 w-full self-start pt-2">

            <div className="mb-3 h-10 overflow-hidden">
              <h2
                key={shown}
                className="slide-text-in font-display font-bold text-2xl text-slate-800"
                data-testid="text-slide-title"
              >
                {project.title}
              </h2>
            </div>

            <div
              className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100"
              style={{ height: "420px" }}
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
                  <span key={tag} className="px-2 py-0.5 text-xs rounded bg-slate-200/80 text-slate-600 border border-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === shown
                      ? "w-6 h-2 bg-violet-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
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
