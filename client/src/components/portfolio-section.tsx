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

const projectImages = [ecommercePlatform, bankingApp, corporatePortal, educationPlatform, govServices, logisticsSystem];
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
const DELAYS = Array.from({ length: TOTAL }, () => Math.floor(Math.random() * 460));
const TOTAL_PROJECTS = 6;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(0);
  const [phase, setPhase] = useState<"idle" | "assembling">("idle");

  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goTo = (index: number) => {
    if (isAnimatingRef.current || index === currentRef.current) return;
    isAnimatingRef.current = true;
    setTarget(index);
    setPhase("assembling");
    setTimeout(() => {
      currentRef.current = index;
      setCurrent(index);
      setPhase("idle");
      isAnimatingRef.current = false;
    }, 620);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((currentRef.current + 1) % TOTAL_PROJECTS);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const project = projects[current];
  const isAnimating = phase === "assembling";

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
          {/* Slide title */}
          <div className="mb-4 h-10 overflow-hidden">
            <h3
              className="font-display font-bold text-2xl md:text-3xl text-slate-800"
              style={{
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "translateY(-8px)" : "translateY(0)",
              }}
              data-testid="text-portfolio-slide-title"
            >
              {project.title}
            </h3>
          </div>

          {/* Image area with tile mosaic */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-100"
            style={{ height: "620px" }}
          >
            {/* Base image */}
            <img
              src={projectImages[current]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              data-testid={`img-portfolio-slide-${current}`}
            />

            {/* Mosaic tiles */}
            <div
              className="absolute inset-0"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              }}
            >
              {Array.from({ length: TOTAL }, (_, i) => {
                const col = i % COLS;
                const row = Math.floor(i / COLS);
                const bgPosX = `${(col / (COLS - 1)) * 100}%`;
                const bgPosY = `${(row / (ROWS - 1)) * 100}%`;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundImage: `url(${projectImages[target]})`,
                      backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                      backgroundPosition: `${bgPosX} ${bgPosY}`,
                      transform: isAnimating ? "scale(1)" : "scale(0)",
                      transition: isAnimating
                        ? `transform 0.2s cubic-bezier(0.34,1.3,0.64,1) ${DELAYS[i]}ms`
                        : "none",
                      transformOrigin: "center",
                    }}
                  />
                );
              })}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

            {/* Category badge */}
            <div
              className="absolute bottom-4 left-4 z-20"
              style={{ transition: "opacity 0.3s ease", opacity: isAnimating ? 0 : 1 }}
            >
              <Badge
                variant="secondary"
                className={`text-xs border backdrop-blur-sm ${accentColors[current]}`}
              >
                {project.category}
              </Badge>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {current + 1} / {projects.length}
            </div>
          </div>

          {/* Description + tags */}
          <div
            className="mt-5"
            style={{
              transition: "opacity 0.3s ease, transform 0.3s ease",
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(8px)" : "translateY(0)",
            }}
          >
            <p className="text-slate-700 text-base leading-relaxed mb-3 max-w-3xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {projectTags[current].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-slate-200/80 text-slate-700 border border-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
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
