import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-600/50 shadow-lg"
          : "bg-gradient-to-r from-gray-100/95 via-gray-50/95 to-gray-100/95 dark:from-gray-800/95 dark:via-gray-700/95 dark:to-gray-800/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a
            href="#"
            className="flex items-center gap-3 flex-shrink-0"
            data-testid="link-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              src="/logo.png" 
              alt="WEBCLUB Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="font-display font-bold text-lg md:text-xl text-gray-900 dark:text-white">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
                data-testid="button-lang-en"
              >
                EN
              </Button>
            </div>
            
            <ThemeToggle />
            
            <a
              href="tel:876-220-100"
              className="hidden sm:flex"
              data-testid="link-phone-header"
            >
              <Button 
                size="default"
                className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white border-slate-600"
              >
                <Phone className="w-4 h-4 mr-2" />
                876-220-100
              </Button>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Открыть меню"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700/50">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-md transition-colors"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:876-220-100"
              className="mt-2"
              data-testid="link-phone-mobile"
            >
              <Button className="w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white border-slate-600">
                <Phone className="w-4 h-4 mr-2" />
                Позвонить: 876-220-100
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
