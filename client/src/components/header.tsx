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
          ? "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 backdrop-blur-md border-b border-slate-400/50 dark:border-slate-600/50 shadow-lg"
          : "bg-gradient-to-r from-slate-300/95 via-slate-200/95 to-slate-300/95 dark:from-slate-800/95 dark:via-slate-700/95 dark:to-slate-800/95 backdrop-blur-sm"
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
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <span className="font-display font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors rounded-md hover:bg-slate-400/30 dark:hover:bg-white/10"
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
                className="px-2 text-xs font-medium text-slate-800 dark:text-white hover:bg-slate-400/30 dark:hover:bg-white/10"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-400/30 dark:hover:bg-white/10"
                data-testid="button-lang-en"
              >
                EN
              </Button>
            </div>
            
            <ThemeToggle />
            
            <a
              href="tel:+992987622010"
              className="hidden sm:flex"
              data-testid="link-phone-header"
            >
              <Button 
                size="default"
                className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white border-slate-600"
              >
                <Phone className="w-4 h-4 mr-2" />
                +992 987 622 0100
              </Button>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-800 dark:text-white hover:bg-slate-400/30 dark:hover:bg-white/10"
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
        <div className="md:hidden bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-800 dark:to-slate-900 border-b border-slate-400/50 dark:border-slate-700/50">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/30 dark:hover:bg-white/10 rounded-md transition-colors"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+992987622010"
              className="mt-2"
              data-testid="link-phone-mobile"
            >
              <Button className="w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white border-slate-600">
                <Phone className="w-4 h-4 mr-2" />
                Позвонить: +992 987 622 0100
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
