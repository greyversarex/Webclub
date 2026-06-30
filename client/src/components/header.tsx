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
    <header className="fixed top-0 left-0 right-0 z-50">
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
              alt="WEBCOREX Logo" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain brightness-125 saturate-[1.1]"
            />
            <span className="it-shimmer-text font-display font-bold text-xl md:text-2xl bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-clip-text text-transparent pl-[0px] pr-[0px] ml-[-17px] mr-[-17px]">
              WEBCOREX
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-5 py-2 text-sm font-medium text-white/80 rounded-full transition-all duration-200
                  bg-white/5 backdrop-blur-sm
                  border border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.3)]
                  hover:text-white hover:border-violet-400/50 hover:bg-white/10
                  hover:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_4px_12px_rgba(139,92,246,0.15)]
                  active:scale-[0.97] active:shadow-none"
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
                  {index > 0 && <span className="text-white/30 mx-0.5">/</span>}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 text-xs font-medium hover:bg-white/10 ${
                      language === lang.code
                        ? "text-white"
                        : "text-white/50 hover:text-white"
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
              className="md:hidden text-white/70 hover:bg-white/10"
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
        <div className="md:hidden bg-black/70 backdrop-blur-xl border-b border-white/10">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-3 text-left text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
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
                      ? "bg-white/10 text-white"
                      : "text-white/50"
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
