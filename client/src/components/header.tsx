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
          ? "bg-gradient-to-r from-slate-100 via-gray-200 to-slate-100 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 backdrop-blur-xl border-b border-slate-300 dark:border-slate-700 shadow-lg shadow-slate-300/20 dark:shadow-slate-900/30"
          : "bg-gradient-to-r from-slate-50 via-gray-100 to-slate-50 dark:from-slate-900 dark:via-gray-950 dark:to-slate-900 backdrop-blur-md"
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
            <span className="font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
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
                className="px-2 text-xs font-medium text-slate-800 hover:bg-slate-100"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
              <span className="text-muted-foreground">/</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                data-testid="button-lang-en"
              >
                EN
              </Button>
            </div>
            
            <ThemeToggle />
            
            <a
              href="tel:+992876220100"
              className="hidden sm:flex"
              data-testid="link-phone-header"
            >
              <Button 
                size="default"
              >
                <Phone className="w-4 h-4 mr-2" />
                +992 87 622 0100
              </Button>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 hover:bg-slate-100"
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
        <div className="md:hidden bg-gradient-to-r from-slate-100 via-gray-200 to-slate-100 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 backdrop-blur-xl border-b border-slate-300 dark:border-slate-700">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+992876220100"
              className="mt-2"
              data-testid="link-phone-mobile"
            >
              <Button className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Позвонить: +992 87 622 0100
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
