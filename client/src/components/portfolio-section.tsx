import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";
import { AdaptiveVideo, type AdaptiveVideoHandle, type VideoSources } from "@/components/adaptive-video";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

import tourism480 from "@assets/encoded/tourism_480p.mp4";
import tourism720 from "@assets/encoded/tourism_720p.mp4";
import tourism1080 from "@assets/encoded/tourism_1080p.mp4";
import crm480 from "@assets/encoded/crm_480p.mp4";
import crm720 from "@assets/encoded/crm_720p.mp4";
import crm1080 from "@assets/encoded/crm_1080p.mp4";
import analytics480 from "@assets/encoded/analytics_480p.mp4";
import analytics720 from "@assets/encoded/analytics_720p.mp4";
import analytics1080 from "@assets/encoded/analytics_1080p.mp4";
import landing480 from "@assets/encoded/landing_480p.mp4";
import landing720 from "@assets/encoded/landing_720p.mp4";
import landing1080 from "@assets/encoded/landing_1080p.mp4";
import govDoc480 from "@assets/encoded/gov_docflow_480p.mp4";
import govDoc720 from "@assets/encoded/gov_docflow_720p.mp4";
import govDoc1080 from "@assets/encoded/gov_docflow_1080p.mp4";
import logistics480 from "@assets/encoded/logistics_480p.mp4";
import logistics720 from "@assets/encoded/logistics_720p.mp4";
import logistics1080 from "@assets/encoded/logistics_1080p.mp4";
import corporate480 from "@assets/encoded/corporate_480p.mp4";
import corporate720 from "@assets/encoded/corporate_720p.mp4";
import corporate1080 from "@assets/encoded/corporate_1080p.mp4";
import finance480 from "@assets/encoded/finance_480p.mp4";
import finance720 from "@assets/encoded/finance_720p.mp4";
import finance1080 from "@assets/encoded/finance_1080p.mp4";

const projectPosters = [
  ecommercePlatform, bankingApp, corporatePortal,
  educationPlatform, govServices, logisticsSystem,
  corporatePortal, bankingApp,
];

const projectVideoSources: (VideoSources | null)[] = [
  { "480p": tourism480, "720p": tourism720, "1080p": tourism1080 },
  { "480p": crm480, "720p": crm720, "1080p": crm1080 },
  { "480p": analytics480, "720p": analytics720, "1080p": analytics1080 },
  { "480p": landing480, "720p": landing720, "1080p": landing1080 },
  { "480p": govDoc480, "720p": govDoc720, "1080p": govDoc1080 },
  { "480p": logistics480, "720p": logistics720, "1080p": logistics1080 },
  { "480p": corporate480, "720p": corporate720, "1080p": corporate1080 },
  { "480p": finance480, "720p": finance720, "1080p": finance1080 },
];

const accents = [
  { from: "#a78bfa", to: "#22d3ee", text: "text-violet-200", ring: "rgba(167,139,250,0.55)", chip: "bg-violet-500/15 text-violet-200 border-violet-400/30" },
  { from: "#34d399", to: "#22d3ee", text: "text-emerald-200", ring: "rgba(52,211,153,0.5)", chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30" },
  { from: "#f0abfc", to: "#818cf8", text: "text-fuchsia-200", ring: "rgba(240,171,252,0.5)", chip: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/30" },
  { from: "#38bdf8", to: "#a78bfa", text: "text-sky-200", ring: "rgba(56,189,248,0.5)", chip: "bg-sky-500/15 text-sky-200 border-sky-400/30" },
  { from: "#a78bfa", to: "#34d399", text: "text-violet-200", ring: "rgba(167,139,250,0.5)", chip: "bg-violet-500/15 text-violet-200 border-violet-400/30" },
  { from: "#22d3ee", to: "#818cf8", text: "text-cyan-200", ring: "rgba(34,211,238,0.5)", chip: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30" },
  { from: "#818cf8", to: "#f0abfc", text: "text-indigo-200", ring: "rgba(129,140,248,0.5)", chip: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30" },
  { from: "#34d399", to: "#a78bfa", text: "text-emerald-200", ring: "rgba(52,211,153,0.5)", chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30" },
];

const AUTO_MS = 8000;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;
  const total = projects.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<AdaptiveVideoHandle>(null);

  const accent = accents[active % accents.length];
  const project = projects[active];

  const go = useCallback((next: number) => {
    setActive((prev) => ((next % total) + total) % total);
    setPlaying(false);
  }, [total]);

  const select = useCallback((i: number) => {
    setActive(i);
    setPlaying(false);
  }, []);

  // Auto-advance — paused on hover or while a video is actively playing.
  useEffect(() => {
    if (!isVisible || paused || playing) return;
    const id = window.setTimeout(() => go(active + 1), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, playing, isVisible, go]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="portfolio"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <div
            className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">Portfolio</span>
          </div>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.subtitle}
          </h2>
          <p
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.portfolio.title}
          </p>
        </div>

        {/* Stage */}
        <div
          className={`grid lg:grid-cols-[1.55fr_1fr] gap-6 lg:gap-8 items-stretch transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Featured video frame */}
          <div className="relative">
            {/* Rotating orbital glow */}
            <div
              className="absolute -inset-10 pointer-events-none opacity-60"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${accent.ring}, transparent 40%)`,
                animation: "orbital-spin 14s linear infinite",
                filter: "blur(38px)",
              }}
              aria-hidden="true"
            />
            <div
              className="relative rounded-[1.75rem] p-[1.5px] overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${accent.from}, transparent 45%, ${accent.to})` }}
            >
              <div className="relative rounded-[1.65rem] overflow-hidden bg-[#0a0a14]">
                <div key={active} className="portfolio-stage-reveal relative aspect-video bg-black">
                  {projectVideoSources[active] ? (
                    <AdaptiveVideo
                      ref={videoRef}
                      sources={projectVideoSources[active]!}
                      className="w-full h-full"
                      onPlayingChange={setPlaying}
                      data-testid={`video-portfolio-${active}`}
                    />
                  ) : (
                    <img
                      src={projectPosters[active]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-portfolio-${active}`}
                    />
                  )}
                </div>

                {/* Sci-fi corner brackets */}
                {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                  <span
                    key={c}
                    className={`absolute ${c} w-6 h-6 rounded-[3px] pointer-events-none z-20`}
                    style={{ borderColor: accent.ring }}
                    aria-hidden="true"
                  />
                ))}

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20 overflow-hidden">
                  <div
                    key={`${active}-${paused}-${playing}`}
                    className="h-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                      animation: `portfolio-progress ${AUTO_MS}ms linear forwards`,
                      animationPlayState: paused || playing ? "paused" : "running",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Counter pill */}
            <div className="absolute -top-3 left-6 z-30 px-3 py-1 rounded-full bg-[#0a0a14] border border-white/10 shadow-lg">
              <span className="font-mono text-xs text-white/80 tabular-nums">
                <span className="text-white font-bold">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
              </span>
            </div>
          </div>

          {/* Info panel */}
          <div className="relative flex flex-col justify-center rounded-[1.65rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-40"
              style={{ background: `radial-gradient(circle, ${accent.ring}, transparent 70%)`, filter: "blur(20px)" }}
              aria-hidden="true"
            />

            <div key={active} className="portfolio-info-rise relative">
              <span
                className="block font-display font-black text-6xl md:text-7xl leading-none mb-4 bg-clip-text text-transparent select-none"
                style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm mb-4 ${accent.chip}`}>
                {project.category}
              </span>

              <h3 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight mb-3" data-testid="text-portfolio-active-title">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => go(active - 1)}
                  className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
                  aria-label="Previous project"
                  data-testid="button-portfolio-prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => go(active + 1)}
                  className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
                  aria-label="Next project"
                  data-testid="button-portfolio-next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="ml-auto flex items-center gap-1.5 text-white/40 text-xs font-mono">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{String(total).padStart(2, "0")} projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail rail */}
        <div className="mt-6 md:mt-8 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto custom-scroll-dark">
          <div className="flex gap-3 md:gap-4 min-w-min pb-2">
            {projects.map((p, i) => {
              const a = accents[i % accents.length];
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`group relative flex-shrink-0 w-36 md:w-44 rounded-xl overflow-hidden transition-all duration-500 ${
                    isActive ? "scale-100" : "scale-95 opacity-55 hover:opacity-100"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 0 1.5px ${a.from}, 0 8px 30px -6px ${a.ring}` : "0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                  data-testid={`thumb-portfolio-${i}`}
                >
                  <div className="relative aspect-video bg-[#0a0a14]">
                    <img src={projectPosters[i]} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100 bg-black/40 group-hover:opacity-40"}`} />
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 to-transparent">
                      <p className={`text-[11px] font-semibold leading-tight truncate ${isActive ? "text-white" : "text-white/80"}`}>
                        {p.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
