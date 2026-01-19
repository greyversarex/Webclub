import { Card } from "@/components/ui/card";
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
const projectAccents = ["violet", "emerald", "violet", "emerald", "violet", "emerald"] as const;

const accentStyles = {
  violet: {
    card: "hover:border-violet-300 hover:shadow-xl hover:shadow-slate-300/30",
    badge: "bg-violet-100 text-violet-700 border border-violet-200",
  },
  emerald: {
    card: "hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-300/30",
    badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
};

export function PortfolioSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="portfolio" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.portfolio.title}
          </h2>
          <p 
            className={`text-muted-foreground text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.portfolio.projects.map((project, index) => {
            const accent = projectAccents[index];
            const styles = accentStyles[accent];
            
            return (
              <Card
                key={index}
                className={`group overflow-visible hover-elevate transition-all duration-500 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 backdrop-blur-sm border-slate-300 ${styles.card} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 80}ms` : '0ms' }}
                data-testid={`card-project-${index}`}
              >
                <div className="relative h-48 rounded-t-md bg-gradient-to-br from-slate-200 to-slate-100 overflow-hidden">
                  <img 
                    src={projectImages[index]} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-200 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${styles.badge}`}
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-700 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {projectTags[index].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-slate-300/50 text-slate-700 border border-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
