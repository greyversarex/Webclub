import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

import onlineStoreImg from "@assets/generated_images/online_store_illustration.png";
import corporateWebsiteImg from "@assets/generated_images/corporate_website_illustration.png";
import mobileAppsImg from "@assets/generated_images/mobile_apps_illustration.png";
import bankingSecurityImg from "@assets/generated_images/banking_security_illustration.png";

export function HeroSection() {
  const { t } = useLanguage();

  const stats = [
    { value: "100+", label: t.hero.stats.projects },
    { value: "8+", label: t.hero.stats.experience },
    { value: "24/7", label: t.hero.stats.support },
  ];

  const miniServices = [
    { image: onlineStoreImg, title: t.miniServices.onlineStores },
    { image: corporateWebsiteImg, title: t.miniServices.corporateWebsites },
    { image: mobileAppsImg, title: t.miniServices.mobileApps },
    { image: bankingSecurityImg, title: t.miniServices.bankingProjects },
    { image: corporateWebsiteImg, title: t.miniServices.crmSystems },
    { image: onlineStoreImg, title: t.miniServices.businessAutomation },
  ];

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
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              {t.hero.title1}{" "}
              <span className="it-shimmer-text bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
              {" "}{t.hero.title2}
            </h1>

            <p className="text-lg text-slate-900 mb-8 max-w-xl">
              {t.hero.description}
            </p>

            <ul className="space-y-3 mb-8">
              {t.hero.features.map((feature, index) => (
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
                className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 text-slate-800 border-slate-300 shadow-lg shadow-slate-300/25"
                data-testid="button-discuss-project"
              >
                {t.hero.discussProject}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToServices}
                data-testid="button-our-services"
              >
                {t.hero.ourServices}
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-slate-400/30">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className="font-display text-3xl font-bold text-cyan-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-900">
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
                  className="group overflow-hidden bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 backdrop-blur-sm border-slate-300 hover:border-violet-400 hover:shadow-xl transition-all duration-300"
                  data-testid={`hero-mini-card-${index}`}
                >
                  <div className="h-32 sm:h-36 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
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
