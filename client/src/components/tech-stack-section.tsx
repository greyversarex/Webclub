import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiPostgresql, SiMongodb, SiDocker, SiAmazon, SiVuedotjs, SiAngular, SiGo, SiKubernetes } from "react-icons/si";

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

export function TechStackSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Технологии
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Наш стек технологий
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Используем современные и проверенные технологии для создания надёжных решений
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center p-4 md:p-6 rounded-xl bg-card border border-card-border hover-elevate transition-all duration-300"
              data-testid={`tech-${tech.name.toLowerCase().replace(/\./g, '')}`}
            >
              <tech.icon
                className="w-10 h-10 md:w-12 md:h-12 mb-3"
                style={{ color: tech.color }}
              />
              <span className="text-xs md:text-sm font-medium text-muted-foreground text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
