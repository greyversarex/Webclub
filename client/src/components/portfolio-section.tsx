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
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: 2,
    title: "Банковское приложение",
    category: "Финтех",
    description: "Мобильное приложение для управления финансами с высоким уровнем безопасности",
    tags: ["React Native", "TypeScript", "AWS"],
    image: bankingApp,
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    id: 3,
    title: "Корпоративный портал",
    category: "Бизнес",
    description: "Многофункциональный портал для крупной компании с системой управления документами",
    tags: ["Vue.js", "Python", "Docker"],
    image: corporatePortal,
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    id: 4,
    title: "Образовательная платформа",
    category: "EdTech",
    description: "Онлайн-платформа для дистанционного обучения с видеоконференциями",
    tags: ["Next.js", "WebRTC", "MongoDB"],
    image: educationPlatform,
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    id: 5,
    title: "Государственный сервис",
    category: "GovTech",
    description: "Цифровой сервис для государственных услуг с электронной подписью",
    tags: ["Angular", "Java", "Oracle"],
    image: govServices,
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    id: 6,
    title: "Логистическая система",
    category: "Логистика",
    description: "Система управления складом и доставкой с GPS-трекингом",
    tags: ["React", "Go", "Redis"],
    image: logisticsSystem,
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Портфолио
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Наши проекты
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Примеры успешно реализованных проектов для различных отраслей бизнеса
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-visible hover-elevate transition-all duration-300"
              data-testid={`card-project-${project.id}`}
            >
              <div className={`relative h-48 rounded-t-md ${project.bgColor} overflow-hidden`}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-background text-foreground text-sm font-medium">
                    <ExternalLink className="w-4 h-4" />
                    Смотреть проект
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
