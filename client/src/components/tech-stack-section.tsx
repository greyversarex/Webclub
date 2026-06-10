import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiPostgresql, SiMongodb, SiDocker, SiAmazon, SiVuedotjs, SiAngular, SiGo, SiKubernetes } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
];

const PULSE_INTERVAL = 600;

export function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setActiveIndex(null);
      return;
    }

    let current = 0;
    const id = setInterval(() => {
      setActiveIndex(current);
      current = (current + 1) % technologies.length;
    }, PULSE_INTERVAL);

    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.techStack.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.techStack.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={tech.name}
                className={`flex flex-col items-center p-4 md:p-6 transition-all duration-500 group ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-90"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
                data-testid={`tech-${tech.name.toLowerCase().replace(/\./g, "")}`}
              >
                <tech.icon
                  className="w-12 h-12 md:w-16 md:h-16 mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: tech.color,
                    transform: isActive ? "scale(1.35)" : "scale(1)",
                    filter: isActive
                      ? `drop-shadow(0 0 8px ${tech.color}99)`
                      : "none",
                    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
                  }}
                />
                <span
                  className="text-xs md:text-sm font-medium text-center transition-all duration-300"
                  style={{
                    color: isActive ? tech.color : undefined,
                    fontWeight: isActive ? 700 : undefined,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
