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
// Fixed random delays, pre-generated once
const DELAYS = Array.from({ length: TOTAL }, () => Math.floor(Math.random() * 450));
const TOTAL_PROJECTS = 6;
// Max tile animation time = 450 + 200 = 650ms, so we wait 700ms
const ANIM_DURATION = 700;

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goTo = (index: number) => {
    if (isAnimatingRef.current || index === currentRef.current) return;
    isAnimatingRef.current = true;
    setTarget(index);
    setIsAnimating(true);

    setTimeout(() => {
      // All in one synchronous block → React 18 batches into ONE render + ONE paint
      currentRef.current = index;
      setCurrent(index);
      setIsAnimating(false);
      isAnimatingRef.current = false;
    }, ANIM_DURATION);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((currentRef.current + 1) % TOTAL_PROJECTS);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const project = projects[current];

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
          {/* Project title */}
          <div className="mb-4 h-10 overflow-hidden">
            <h3
              className="font-display font-bold text-2xl md:text-3xl text-slate-800"
              data-testid="text-portfolio-slide-title"
            >
              {project.title}
            </h3>
          </div>

          {/* Image area */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-100"
            style={{ height: "620px" }}
          >
            {/* Layer 1 – incoming image, always rendered behind tiles */}
            <img
              src={projectImages[target]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1 }}
            />

            {/* Layer 2 – outgoing image, fades away while tiles appear */}
            <img
              src={projectImages[current]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 2,
                opacity: isAnimating ? 0 : 1,
                transition: isAnimating ? "opacity 0.6s ease" : "none",
              }}
              data-testid={`img-portfolio-slide-${current}`}
            />

            {/* Layer 3 – mosaic tiles (hidden instantly when not animating via visibility) */}
            <div
              className="absolute inset-0"
              style={{
                zIndex: 3,
                visibility: isAnimating ? "visible" : "hidden",
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

            {/* Gradient + overlays */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
              style={{ zIndex: 4 }}
            />
            <div className="absolute bottom-4 left-4" style={{ zIndex: 5 }}>
              <Badge
                variant="secondary"
                className={`text-xs border backdrop-blur-sm ${accentColors[current]}`}
              >
                {project.category}
              </Badge>
            </div>
            <div
              className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
              style={{ zIndex: 5 }}
            >
              {current + 1} / {projects.length}
            </div>
          </div>

          {/* Description + tags */}
          <div className="mt-5">
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
