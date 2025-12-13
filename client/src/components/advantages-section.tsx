import { Zap, Sparkles, HeadphonesIcon, Clock, Users, Award } from "lucide-react";

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

const stats = [
  { icon: Users, value: "876+", label: "Довольных клиентов" },
  { icon: Award, value: "99%", label: "Успешных проектов" },
  { icon: Clock, value: "48ч", label: "Среднее время ответа" },
];

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Почему мы
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800 dark:text-slate-200">
              Наши преимущества
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Работаем качественно, быстро и с полной отдачей для достижения
            лучших результатов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {advantages.map((advantage, index) => {
            const colorClasses = {
              violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
              cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
              purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
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
                <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-violet-400 transition-colors">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.2),transparent_50%)]" />
          
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-advantage-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm md:text-base">
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
