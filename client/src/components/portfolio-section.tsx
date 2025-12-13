import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-Commerce платформа",
    category: "Интернет-магазин",
    description: "Современная платформа электронной коммерции с интеграцией платежных систем и CRM",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Банковское приложение",
    category: "Финтех",
    description: "Мобильное приложение для управления финансами с высоким уровнем безопасности",
    tags: ["React Native", "TypeScript", "AWS"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    title: "Корпоративный портал",
    category: "Бизнес",
    description: "Многофункциональный портал для крупной компании с системой управления документами",
    tags: ["Vue.js", "Python", "Docker"],
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 4,
    title: "Образовательная платформа",
    category: "EdTech",
    description: "Онлайн-платформа для дистанционного обучения с видеоконференциями",
    tags: ["Next.js", "WebRTC", "MongoDB"],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Государственный сервис",
    category: "GovTech",
    description: "Цифровой сервис для государственных услуг с электронной подписью",
    tags: ["Angular", "Java", "Oracle"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: 6,
    title: "Логистическая система",
    category: "Логистика",
    description: "Система управления складом и доставкой с GPS-трекингом",
    tags: ["React", "Go", "Redis"],
    gradient: "from-sky-500/20 to-indigo-500/20",
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
              <div className={`h-40 rounded-t-md bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center">
                  <span className="font-display font-bold text-2xl text-primary">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Смотреть проект"
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </button>
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
