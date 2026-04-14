import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
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

const COLS = 10;
const ROWS = 7;
const TOTAL = COLS * ROWS;
// Fixed random delays, pre-generated once
const DELAYS = Array.from({ length: TOTAL }, () => Math.floor(Math.random() * 450));
// max tile time = 450 delay + 200 duration = 650ms → wait 750ms
const ANIM_MS = 750;
const TOTAL_PROJECTS = 6;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  // `shown`  = project currently displayed (background div + text)
  // `next`   = project the tiles are assembling (only used while animating)
  // `animId` = increments each transition so tiles re-mount and restart animation
  const [shown, setShown] = useState(0);
  const [next, setNext]   = useState(0);
  const [animId, setAnimId] = useState(0);
  const [animating, setAnimating] = useState(false);

  const shownRef     = useRef(0);
  const animatingRef = useRef(false);

  const goTo = (idx: number) => {
    if (animatingRef.current || idx === shownRef.current) return;
    animatingRef.current = true;
    // React 18 batches these into ONE render
    setNext(idx);
    setAnimId(id => id + 1); // force tile re-mount so animation always restarts fresh
    setAnimating(true);

    setTimeout(() => {
      // React 18 batches ALL updates in one setTimeout callback → ONE render → ONE paint
      shownRef.current = idx;
      setShown(idx);
      setAnimating(false);
      animatingRef.current = false;
    }, ANIM_MS);
  };

  useEffect(() => {
    const id = setInterval(() => goTo((shownRef.current + 1) % TOTAL_PROJECTS), 5000);
    return () => clearInterval(id);
  }, []);

  const project = projects[shown];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="portfolio"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        <div className="text-center mb-10 md:mb-14">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.subtitle}
          </p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 h-10 overflow-hidden">
            <h3
              key={shown}
              className="slide-text-in font-display font-bold text-2xl md:text-3xl text-slate-800"
              data-testid="text-portfolio-slide-title"
            >
              {project.title}
            </h3>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-100"
            style={{ height: "620px" }}
          >
            {/* BASE LAYER — background-size 100% 100% matches tile mosaic exactly */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${projectImages[shown]})`,
                backgroundSize: "100% 100%",
                zIndex: 1,
              }}
              data-testid={`img-portfolio-slide-${shown}`}
            />

            {/*
             * TILE CONTAINER — visibility:hidden when idle.
             * Using visibility (not display/opacity) ensures:
             *   • tiles are hidden instantly with no CSS-transition side-effects
             *   • their layout is preserved so grid doesn't collapse
             *   • background-images remain decoded (browser still computes them)
             * Key `animId` forces a full DOM re-mount each transition so the
             * CSS @keyframes animation always fires from the beginning.
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
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
              style={{ zIndex: 3 }}
            />
            <div className="absolute bottom-4 left-4" style={{ zIndex: 4 }}>
              <Badge
                variant="secondary"
                className={`text-xs border backdrop-blur-sm ${accentColors[shown]}`}
              >
                {project.category}
              </Badge>
            </div>
            <div
              className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
              style={{ zIndex: 4 }}
            >
              {shown + 1} / {projects.length}
            </div>
          </div>

          <div key={shown} className="slide-text-in mt-5" style={{ animationDelay: "0.08s" }}>
            <p className="text-slate-700 text-base leading-relaxed mb-3 max-w-3xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {projectTags[shown].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-slate-200/80 text-slate-700 border border-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === shown
                    ? "w-8 h-2.5 bg-violet-600"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                data-testid={`button-portfolio-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
