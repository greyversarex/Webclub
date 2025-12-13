import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
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
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          <a
            href="#"
            className="flex items-center gap-2 flex-shrink-0"
            data-testid="link-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">
                WC
              </span>
            </div>
            <span className="font-display font-bold text-lg md:text-xl text-foreground">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover-elevate active-elevate-2 rounded-md"
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
                className="px-2 text-xs font-medium"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
              <span className="text-muted-foreground">/</span>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium text-muted-foreground"
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
              <Button variant="outline" size="default">
                <Phone className="w-4 h-4 mr-2" />
                876-220-100
              </Button>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-foreground hover-elevate active-elevate-2 rounded-md"
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
              <Button variant="default" className="w-full">
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
