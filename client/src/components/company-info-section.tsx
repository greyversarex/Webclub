import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ShoppingCart, Smartphone, Building2 } from "lucide-react";

const compactServices = [
  {
    icon: ShoppingCart,
    title: "Интернет-магазины",
    description: "Удобные каталоги, оплата, CRM-интеграция",
    color: "bg-slate-600",
  },
  {
    icon: Smartphone,
    title: "Мобильные приложения",
    description: "Android, iOS, Windows - публикация в магазинах",
    color: "bg-violet-500",
    highlight: true,
  },
  {
    icon: Building2,
    title: "Корпоративные проекты",
    description: "Банки, госструктуры, защищённые системы",
    color: "bg-slate-500",
  },
];

export function CompanyInfoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div 
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                О компании
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                WEBCLUB — команда профессионалов в сфере IT-разработки. 
                Мы создаём современные цифровые решения для бизнеса любого масштаба: 
                от стартапов до крупных корпораций.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-slate-700 font-medium">Более 5 лет опыта разработки</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-700 font-medium">50+ успешных проектов</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-slate-700 font-medium">Команда сертифицированных специалистов</span>
              </div>
            </div>
          </div>

          <Card 
            className={`p-5 md:p-6 bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl shadow-slate-300/30 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-lg">
                WC
              </div>
              <div>
                <div className="font-display font-bold text-xl text-slate-800">WEBCLUB</div>
                <div className="text-slate-500 text-sm">IT-разработка</div>
              </div>
            </div>

            <div className="space-y-3">
              {compactServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${
                      service.highlight 
                        ? 'bg-violet-50 border-violet-200' 
                        : 'bg-slate-50 border-slate-200'
                    } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
                    data-testid={`compact-service-${index}`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 text-sm">{service.title}</div>
                      <div className={`text-xs truncate ${service.highlight ? 'text-violet-600' : 'text-slate-500'}`}>
                        {service.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 mt-5">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>App Store</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z"/>
                </svg>
                <span>Google Play</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
