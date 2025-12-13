import { ShoppingCart, Building2, Smartphone, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: ShoppingCart,
    title: "Интернет-магазины",
    description:
      "Создаём современные интернет-магазины с удобным каталогом, корзиной, оплатой и интеграцией с CRM-системами. Адаптивный дизайн для всех устройств.",
  },
  {
    icon: Building2,
    title: "Корпоративные сайты",
    description:
      "Разрабатываем сайты для бизнеса, образовательных учреждений и компаний любого масштаба. От лендингов до многостраничных порталов.",
  },
  {
    icon: Smartphone,
    title: "Мобильные приложения",
    description:
      "Нативные и кроссплатформенные приложения для Android, iOS и Windows. Публикация в App Store и Google Play.",
  },
  {
    icon: Shield,
    title: "Банковские и госпроекты",
    description:
      "Разработка защищённых IT-систем для банков и государственных организаций с соблюдением всех стандартов безопасности.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Наши услуги
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Что мы делаем
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Полный спектр IT-услуг для вашего бизнеса: от разработки сайтов до
            создания сложных корпоративных систем
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group p-6 hover-elevate transition-all duration-300"
              data-testid={`card-service-${index}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-card border border-card-border">
            <div className="w-10 h-10 rounded-md bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-foreground" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <div className="text-sm">
              <div className="text-xs text-muted-foreground">Скачать в</div>
              <div className="font-semibold text-foreground">App Store</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-card border border-card-border">
            <div className="w-10 h-10 rounded-md bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-foreground" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
              </svg>
            </div>
            <div className="text-sm">
              <div className="text-xs text-muted-foreground">Доступно в</div>
              <div className="font-semibold text-foreground">Google Play</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
