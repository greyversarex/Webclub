import { Zap, Sparkles, HeadphonesIcon, Clock, Users, Award } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Быстрая работа",
    description:
      "Оперативная разработка проектов с соблюдением всех сроков. Используем современные технологии для ускорения процессов.",
  },
  {
    icon: Sparkles,
    title: "Современный подход",
    description:
      "Применяем актуальные технологии и лучшие практики разработки для создания инновационных решений.",
  },
  {
    icon: HeadphonesIcon,
    title: "Полная поддержка",
    description:
      "Сопровождаем проект на всех этапах: от идеи до запуска и дальнейшей технической поддержки.",
  },
];

const stats = [
  { icon: Users, value: "876+", label: "Довольных клиентов" },
  { icon: Award, value: "99%", label: "Успешных проектов" },
  { icon: Clock, value: "48ч", label: "Среднее время ответа" },
];

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Почему мы
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Наши преимущества
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Работаем качественно, быстро и с полной отдачей для достижения
            лучших результатов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="text-center"
              data-testid={`advantage-${index}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <advantage.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-2xl p-8 md:p-12">
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-advantage-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
