import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Интернет-магазины",
  "Сайты для Бизнеса/Обучения/Компании",
  "Приложения Android/iOS/Windows",
  "Банковские и Государственные IT-проекты",
];

const stats = [
  { value: "100+", label: "Проектов" },
  { value: "5+", label: "Лет опыта" },
  { value: "24/7", label: "Поддержка" },
];

export function HeroSection() {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
              Компания по IT-разработкам
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Создаём{" "}
              <span className="text-blue-700 dark:text-blue-400">IT-решения</span>
              {" "}для вашего бизнеса
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Наши проекты работают быстро, выглядят современно и решают любые
              бизнес-задачи. Мы с вами от идеи до полного запуска, помогая на
              каждом этапе и оказывая поддержку после завершения проекта.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground"
                  data-testid={`text-feature-${index}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={scrollToContact}
                data-testid="button-discuss-project"
              >
                Обсудить проект
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToServices}
                data-testid="button-our-services"
              >
                Наши услуги
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} data-testid={`stat-${index}`}>
                  <div className="font-display text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/10 rounded-3xl transform rotate-3" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-violet-500/20 rounded-3xl p-8 shadow-lg shadow-violet-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <span className="text-white font-display font-bold text-2xl">
                      WC
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      WEBCLUB
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      IT-разработка
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-md shadow-violet-500/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-violet-400/40 rounded-full w-3/4" />
                      <div className="h-2 bg-muted rounded-full w-1/2 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md shadow-cyan-500/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-cyan-400/40 rounded-full w-2/3" />
                      <div className="h-2 bg-muted rounded-full w-2/5 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-purple-400/40 rounded-full w-4/5" />
                      <div className="h-2 bg-muted rounded-full w-3/5 mt-2" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="flex-1 h-12 rounded-lg bg-foreground/5 dark:bg-white/5 flex items-center justify-center px-3">
                    <svg viewBox="0 0 120 40" className="h-8 w-auto opacity-80">
                      <rect fill="currentColor" opacity="0.1" width="120" height="40" rx="6"/>
                      <text x="60" y="25" textAnchor="middle" className="fill-current text-xs font-medium">App Store</text>
                    </svg>
                  </div>
                  <div className="flex-1 h-12 rounded-lg bg-foreground/5 dark:bg-white/5 flex items-center justify-center px-3">
                    <svg viewBox="0 0 135 40" className="h-8 w-auto opacity-80">
                      <rect fill="currentColor" opacity="0.1" width="135" height="40" rx="6"/>
                      <text x="67" y="25" textAnchor="middle" className="fill-current text-xs font-medium">Google Play</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
