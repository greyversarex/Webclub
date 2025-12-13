import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ecommercePlatform from "@assets/generated_images/e-commerce_platform_mockup.png";
import bankingApp from "@assets/generated_images/banking_mobile_app_interface.png";
import corporatePortal from "@assets/generated_images/corporate_portal_dashboard.png";
import educationPlatform from "@assets/generated_images/education_platform_interface.png";
import govServices from "@assets/generated_images/government_services_portal.png";
import logisticsSystem from "@assets/generated_images/logistics_system_dashboard.png";

const projects = [
  {
    id: 1,
    title: "E-Commerce платформа",
    category: "Интернет-магазин",
    description: "Современная платформа электронной коммерции с интеграцией платежных систем и CRM",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: ecommercePlatform,
    accent: "violet" as const,
  },
  {
    id: 2,
    title: "Банковское приложение",
    category: "Финтех",
    description: "Мобильное приложение для управления финансами с высоким уровнем безопасности",
    tags: ["React Native", "TypeScript", "AWS"],
    image: bankingApp,
    accent: "cyan" as const,
  },
  {
    id: 3,
    title: "Корпоративный портал",
    category: "Бизнес",
    description: "Многофункциональный портал для крупной компании с системой управления документами",
    tags: ["Vue.js", "Python", "Docker"],
    image: corporatePortal,
    accent: "violet" as const,
  },
  {
    id: 4,
    title: "Образовательная платформа",
    category: "EdTech",
    description: "Онлайн-платформа для дистанционного обучения с видеоконференциями",
    tags: ["Next.js", "WebRTC", "MongoDB"],
    image: educationPlatform,
    accent: "cyan" as const,
  },
  {
    id: 5,
    title: "Государственный сервис",
    category: "GovTech",
    description: "Цифровой сервис для государственных услуг с электронной подписью",
    tags: ["Angular", "Java", "Oracle"],
    image: govServices,
    accent: "violet" as const,
  },
  {
    id: 6,
    title: "Логистическая система",
    category: "Логистика",
    description: "Система управления складом и доставкой с GPS-трекингом",
    tags: ["React", "Go", "Redis"],
    image: logisticsSystem,
    accent: "cyan" as const,
  },
];

const accentStyles = {
  violet: {
    card: "hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10",
    badge: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  },
  cyan: {
    card: "hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10",
    badge: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  },
};

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Портфолио
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800 dark:text-slate-200">
              Наши проекты
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Примеры успешно реализованных проектов для различных отраслей бизнеса
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {
            const styles = accentStyles[project.accent];
            
            return (
              <Card
                key={project.id}
                className={`group overflow-visible hover-elevate transition-all duration-300 bg-background/50 backdrop-blur-sm border-violet-500/20 ${styles.card}`}
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative h-48 rounded-t-md bg-gradient-to-br from-violet-950/50 to-cyan-950/50 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/90 text-white text-sm font-medium shadow-lg shadow-violet-500/30">
                      <ExternalLink className="w-4 h-4" />
                      Смотреть проект
                    </div>
                  </div>
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
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-violet-500/10 text-violet-300/80 border border-violet-500/10"
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
