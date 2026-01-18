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
      className={`header-shimmer fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-slate-800 via-slate-700 via-50% to-slate-800 backdrop-blur-xl border-b border-slate-600/50 shadow-lg shadow-black/30"
          : "bg-gradient-to-r from-slate-800/95 via-slate-700/95 via-50% to-slate-800/95 backdrop-blur-md border-b border-transparent"
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
            <span className="font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-md hover:bg-slate-800"
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
                className="px-2 text-xs font-medium text-white hover:bg-slate-800"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
              <span className="text-slate-500">/</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
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
              className="md:hidden text-slate-300 hover:bg-slate-800"
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
        <div className="md:hidden bg-gradient-to-r from-slate-800 via-slate-700 via-50% to-slate-800 backdrop-blur-xl border-b border-slate-600/50">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
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
