import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export function HeroSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const projects = t.portfolio.projects;

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % projects.length, "right");

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const stats = [
    { value: "100+", label: t.hero.stats.projects },
    { value: "8+", label: t.hero.stats.experience },
    { value: "24/7", label: t.hero.stats.support },
  ];

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const project = projects[current];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text content */}
          <div className="order-1 lg:order-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              {t.hero.title1}{" "}
              <span className="it-shimmer-text bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
              {" "}{t.hero.title2}
            </h1>

            <p className="text-lg text-slate-900 mb-8 max-w-xl">{t.hero.description}</p>

            <ul className="space-y-3 mb-8">
              {t.hero.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground" data-testid={`text-feature-${index}`}>
                  <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

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

            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-400/30">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="font-display text-3xl font-bold text-cyan-800">{stat.value}</div>
                  <div className="text-sm text-slate-900">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: slideshow */}
          <div className="order-2 lg:order-2 w-full">

            {/* Project title above */}
            <div className="mb-3 h-10 overflow-hidden">
              <h2
                className="font-display font-bold text-2xl text-slate-800 transition-all duration-300"
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating
                    ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                    : "translateX(0)",
                }}
                data-testid="text-slide-title"
              >
                {project.title}
              </h2>
            </div>

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100" style={{ height: "420px" }}>
              <img
                src={projectImages[current]}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating
                    ? `scale(1.03) translateX(${direction === "right" ? "-12px" : "12px"})`
                    : "scale(1) translateX(0)",
                }}
                data-testid={`img-slide-${current}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Description + tags below */}
            <div
              className="mt-4 transition-all duration-300"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(6px)" : "translateY(0)",
              }}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className={`text-xs border ${accentColors[current]}`}>
                  {project.category}
                </Badge>
                {projectTags[current].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded bg-slate-200/80 text-slate-600 border border-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? "right" : "left")}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
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
