import { Zap, Sparkles, HeadphonesIcon } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Быстрая работа",
    description:
      "Оперативная разработка проектов с соблюдением всех сроков. Используем современные технологии для ускорения процессов.",
    color: "violet",
  },
  {
    icon: Sparkles,
    title: "Современный подход",
    description:
      "Применяем актуальные технологии и лучшие практики разработки для создания инновационных решений.",
    color: "cyan",
  },
  {
    icon: HeadphonesIcon,
    title: "Полная поддержка",
    description:
      "Сопровождаем проект на всех этапах: от идеи до запуска и дальнейшей технической поддержки.",
    color: "purple",
  },
];

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Наши преимущества
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Работаем качественно, быстро и с полной отдачей для достижения
            лучших результатов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {advantages.map((advantage, index) => {
            const colorClasses = {
              violet: "from-sky-100 to-sky-50 border-sky-200 text-sky-600",
              cyan: "from-teal-100 to-teal-50 border-teal-200 text-teal-600",
              purple: "from-indigo-100 to-indigo-50 border-indigo-200 text-indigo-600",
            };
            const colors = colorClasses[advantage.color as keyof typeof colorClasses];
            
            return (
              <div
                key={index}
                className="text-center group"
                data-testid={`advantage-${index}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors} border flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <advantage.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-xl text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
