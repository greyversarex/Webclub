import { Phone, Globe, Mail } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

const services = [
  { label: "Интернет-магазины", href: "#services" },
  { label: "Корпоративные сайты", href: "#services" },
  { label: "Мобильные приложения", href: "#services" },
  { label: "Банковские проекты", href: "#services" },
];

const links = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-t border-slate-400/50 dark:border-slate-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => scrollToSection("#")}
              className="flex items-center gap-3 mb-4"
              data-testid="link-footer-logo"
            >
              <img 
                src="/logo.png" 
                alt="WEBCLUB Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                WEBCLUB
              </span>
            </button>
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">
              Компания по IT-разработкам. Создаём современные решения для вашего
              бизнеса.
            </p>
            <div className="flex gap-2">
              <a
                href="https://t.me/webclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
                aria-label="Telegram"
                data-testid="link-footer-telegram"
              >
                <SiTelegram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/876220100"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-slate-700 flex items-center justify-center hover:bg-slate-600 transition-colors"
                aria-label="WhatsApp"
                data-testid="link-footer-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Навигация</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Услуги</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                    data-testid={`link-footer-service-${index}`}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:876-220-100"
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  data-testid="link-footer-phone"
                >
                  <Phone className="w-4 h-4" />
                  876-220-100
                </a>
              </li>
              <li>
                <a
                  href="https://webclub.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  data-testid="link-footer-website"
                >
                  <Globe className="w-4 h-4" />
                  webclub.ink
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@webclub.ink"
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  data-testid="link-footer-email"
                >
                  <Mail className="w-4 h-4" />
                  info@webclub.ink
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-400/50 dark:border-slate-600/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-500">
              © {currentYear} WEBCLUB. Все права защищены.
            </p>
            <div className="flex gap-6">
              <button
                className="text-sm text-slate-600 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
                data-testid="link-privacy"
              >
                Политика конфиденциальности
              </button>
              <button
                className="text-sm text-slate-600 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
                data-testid="link-terms"
              >
                Условия использования
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
