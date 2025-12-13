import { Card } from "@/components/ui/card";

import onlineStoreImg from "@assets/generated_images/online_store_illustration.png";
import corporateWebsiteImg from "@assets/generated_images/corporate_website_illustration.png";
import mobileAppsImg from "@assets/generated_images/mobile_apps_illustration.png";
import bankingSecurityImg from "@assets/generated_images/banking_security_illustration.png";

const services = [
  {
    image: onlineStoreImg,
    title: "Интернет-магазины",
    description:
      "Создаём современные интернет-магазины с удобным каталогом, корзиной, оплатой и интеграцией с CRM-системами.",
    showBadges: false,
  },
  {
    image: corporateWebsiteImg,
    title: "Корпоративные сайты",
    description:
      "Разрабатываем сайты для бизнеса, образовательных учреждений и компаний любого масштаба.",
    showBadges: false,
  },
  {
    image: mobileAppsImg,
    title: "Мобильные приложения",
    description:
      "Нативные и кроссплатформенные приложения для Android, iOS и Windows с публикацией в магазинах.",
    showBadges: true,
  },
  {
    image: bankingSecurityImg,
    title: "Банковские и госпроекты",
    description:
      "Разработка защищённых IT-систем для банков и государственных организаций.",
    showBadges: false,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-sm font-medium mb-4">
            Наши услуги
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Что мы делаем
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Полный спектр IT-услуг для вашего бизнеса: от разработки сайтов до
            создания сложных корпоративных систем
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-visible transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-sky-300 hover:shadow-xl hover:shadow-slate-300/30"
              data-testid={`card-service-${index}`}
            >
              <div className="h-56 md:h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-slate-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.showBadges && (
                  <div className="flex gap-2 mt-auto">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600 text-xs">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <span>App Store</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-sky-100 border border-sky-200 text-sky-700 text-xs">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
                      </svg>
                      <span>Google Play</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
