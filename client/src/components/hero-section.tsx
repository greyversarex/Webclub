import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import onlineStoreImg from "@assets/generated_images/online_store_illustration.png";
import corporateWebsiteImg from "@assets/generated_images/corporate_website_illustration.png";
import mobileAppsImg from "@assets/generated_images/mobile_apps_illustration.png";
import bankingSecurityImg from "@assets/generated_images/banking_security_illustration.png";

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

const miniServices = [
  { image: onlineStoreImg, title: "Интернет-магазины" },
  { image: corporateWebsiteImg, title: "Корпоративные сайты" },
  { image: mobileAppsImg, title: "Мобильные приложения" },
  { image: bankingSecurityImg, title: "Банковские проекты" },
  { image: corporateWebsiteImg, title: "CRM системы" },
  { image: onlineStoreImg, title: "Автоматизация бизнеса" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-700 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shadow-lg shadow-violet-500/50" />
              Компания по IT-разработкам
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              Создаём{" "}
              <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 bg-clip-text text-transparent">IT-решения</span>
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
                  <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
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

            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-400/30">
              {stats.map((stat, index) => (
                <div key={index} data-testid={`stat-${index}`}>
                  <div className="font-display text-3xl font-bold bg-gradient-to-r from-slate-700 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
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
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {miniServices.map((service, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden bg-white/90 backdrop-blur-sm border-slate-200 hover:border-violet-400 hover:shadow-xl transition-all duration-300"
                  data-testid={`hero-mini-card-${index}`}
                >
                  <div className="h-32 sm:h-36 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-display font-semibold text-sm sm:text-base text-slate-800 leading-tight text-center">
                      {service.title}
                    </h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
