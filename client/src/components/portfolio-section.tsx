import { useState, useEffect, useRef } from "react";
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

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const projects = t.portfolio.projects;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((current + 1) % projects.length, "right");
  const prev = () => goTo((current - 1 + projects.length) % projects.length, "left");

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const project = projects[current];
  const slideOut = direction === "right" ? "-40px" : "40px";
  const slideIn = direction === "right" ? "40px" : "-40px";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="portfolio"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* Section heading */}
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

        {/* Slideshow */}
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
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: animating ? 0 : 1,
                transform: animating ? `translateX(${slideOut})` : "translateX(0)",
              }}
              data-testid="text-portfolio-slide-title"
            >
              {project.title}
            </h3>
          </div>

          {/* Main image area */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-100" style={{ height: "460px" }}>
            <img
              src={projectImages[current]}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `scale(1.04) translateX(${slideOut})`
                  : "scale(1) translateX(0)",
              }}
              data-testid={`img-portfolio-slide-${current}`}
            />

            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Category badge overlay */}
            <div
              className="absolute bottom-4 left-4"
              style={{
                transition: "opacity 0.35s ease",
                opacity: animating ? 0 : 1,
              }}
            >
              <Badge
                variant="secondary"
                className={`text-xs border backdrop-blur-sm ${accentColors[current]}`}
              >
                {project.category}
              </Badge>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {current + 1} / {projects.length}
            </div>

            {/* Arrow buttons */}
            <button
              onClick={() => { prev(); resetTimer(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
              data-testid="button-portfolio-prev"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={() => { next(); resetTimer(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
              data-testid="button-portfolio-next"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          {/* Description + tags below image */}
          <div
            className="mt-5"
            style={{
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: animating ? 0 : 1,
              transform: animating ? `translateX(${slideIn})` : "translateX(0)",
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
                onClick={() => { goTo(i, i > current ? "right" : "left"); resetTimer(); }}
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
