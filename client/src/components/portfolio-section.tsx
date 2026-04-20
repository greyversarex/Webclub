import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

import tourismVideo from "@assets/portfolio_tourism.mp4";
import crmVideo from "@assets/portfolio_crm.mp4";
import analyticsVideo from "@assets/portfolio_analytics.mp4";

const projectPosters = [
  ecommercePlatform, bankingApp, corporatePortal,
  educationPlatform, govServices, logisticsSystem,
];

const projectVideos: (string | null)[] = [
  tourismVideo, crmVideo, analyticsVideo, null, null, null,
];
const accentColors = [
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-violet-100 text-violet-700 border-violet-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

const TOTAL_PROJECTS = 6;
const FADE_MS = 280;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const goTo = (idx: number) => {
    if (idx === shown || fading) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setFading(true);
    setTimeout(() => {
      setShown(idx);
      setFading(false);
    }, FADE_MS);
  };

  const goPrev = () => goTo((shown - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS);
  const goNext = () => goTo((shown + 1) % TOTAL_PROJECTS);

  const project = projects[shown];
  const currentVideo = projectVideos[shown];

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

          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-900"
              style={{ height: "620px" }}
            >
              <div
                className="absolute inset-0 transition-opacity"
                style={{
                  opacity: fading ? 0 : 1,
                  transitionDuration: `${FADE_MS}ms`,
                }}
                key={shown}
              >
                {currentVideo ? (
                  <video
                    ref={videoRef}
                    src={currentVideo}
                    controls
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain bg-black"
                    data-testid={`video-portfolio-${shown}`}
                  />
                ) : (
                  <img
                    src={projectPosters[shown]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-portfolio-slide-${shown}`}
                  />
                )}
              </div>

              <div className="absolute top-4 left-4 pointer-events-none z-10">
                <Badge
                  variant="secondary"
                  className={`text-xs border backdrop-blur-sm ${accentColors[shown]}`}
                >
                  {project.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none z-10">
                {shown + 1} / {projects.length}
              </div>
            </div>

            {/* Side navigation arrows */}
            <button
              onClick={goPrev}
              aria-label="Previous project"
              className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-violet-600 transition-all hover:scale-110 z-20"
              data-testid="button-portfolio-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next project"
              className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-xl border border-slate-200 flex items-center justify-center text-slate-800 hover:text-violet-600 transition-all hover:scale-110 z-20"
              data-testid="button-portfolio-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div key={shown} className="slide-text-in mt-5" style={{ animationDelay: "0.08s", minHeight: "60px" }}>
            <p className="text-slate-700 text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>
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
