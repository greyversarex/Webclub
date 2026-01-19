import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallingNumbers } from "@/components/falling-numbers";
import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.advantages, href: "#advantages" },
    { label: t.nav.contacts, href: "#contact" },
  ];

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

  const languages: { code: Language; label: string }[] = [
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
    { code: "tj", label: "TJ" },
  ];

  return (
    <header
      className={`header-shimmer fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-slate-200 via-slate-100 via-50% to-slate-200 backdrop-blur-xl border-b border-slate-300/50 shadow-lg shadow-slate-300/20"
          : "bg-gradient-to-r from-slate-200/95 via-slate-100/95 via-50% to-slate-200/95 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <FallingNumbers direction="down" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
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
            <span className="font-display font-bold text-xl md:text-2xl text-cyan-800">
              WEBCLUB
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-300/50"
                data-testid={`link-nav-${item.href.replace('#', '')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 mr-2">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center">
                  {index > 0 && <span className="text-slate-500 mx-0.5">/</span>}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 text-xs font-medium hover:bg-slate-300/50 ${
                      language === lang.code
                        ? "text-slate-800"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    data-testid={`button-lang-${lang.code}`}
                  >
                    {lang.label}
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 hover:bg-slate-300/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
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
        <div className="md:hidden bg-gradient-to-r from-slate-200 via-slate-100 via-50% to-slate-200 backdrop-blur-xl border-b border-slate-300/50">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-300/50 rounded-md transition-colors"
                data-testid={`link-mobile-nav-${item.href.replace('#', '')}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 text-sm font-medium ${
                    language === lang.code
                      ? "bg-slate-300/50 text-slate-800"
                      : "text-slate-500"
                  }`}
                  data-testid={`button-mobile-lang-${lang.code}`}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
