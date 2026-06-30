import { useRef, useState, useEffect, type ComponentType } from "react";
import {
  ShoppingCart,
  Truck,
  Building2,
  Hotel,
  Stethoscope,
  Sofa,
  Smartphone,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";
import { useIsMobile } from "@/hooks/use-mobile";

const BASE_W = 1280;
const BASE_H = 800;

type Accent = {
  from: string;
  to: string;
  ring: string;
  chip: string;
  icon: string;
};

type Proto = {
  slug: string;
  download: string;
  icon: ComponentType<{ className?: string }>;
  accent: Accent;
};

const prototypeMeta: Proto[] = [
  { slug: "ecommerce", download: "Webcorex-Commerce-OS.html", icon: ShoppingCart, accent: { from: "#a78bfa", to: "#22d3ee", ring: "rgba(167,139,250,0.5)", chip: "bg-violet-500/15 text-violet-200 border-violet-400/30", icon: "text-violet-300" } },
  { slug: "logistics", download: "Webcorex-Logistics-OS.html", icon: Truck, accent: { from: "#34d399", to: "#22d3ee", ring: "rgba(52,211,153,0.5)", chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30", icon: "text-emerald-300" } },
  { slug: "real-estate", download: "Webcorex-Estate-OS.html", icon: Building2, accent: { from: "#38bdf8", to: "#a78bfa", ring: "rgba(56,189,248,0.5)", chip: "bg-sky-500/15 text-sky-200 border-sky-400/30", icon: "text-sky-300" } },
  { slug: "hotels", download: "Webcorex-Hotel-OS.html", icon: Hotel, accent: { from: "#f0abfc", to: "#818cf8", ring: "rgba(240,171,252,0.5)", chip: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/30", icon: "text-fuchsia-300" } },
  { slug: "clinic", download: "Webcorex-Clinic-Care-OS.html", icon: Stethoscope, accent: { from: "#22d3ee", to: "#818cf8", ring: "rgba(34,211,238,0.5)", chip: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30", icon: "text-cyan-300" } },
  { slug: "furniture", download: "Webcorex-Furniture-OS.html", icon: Sofa, accent: { from: "#fbbf24", to: "#fb7185", ring: "rgba(251,191,36,0.45)", chip: "bg-amber-500/15 text-amber-200 border-amber-400/30", icon: "text-amber-300" } },
  { slug: "mobile-apps", download: "Webcorex-Mobile-Apps-OS.html", icon: Smartphone, accent: { from: "#818cf8", to: "#f0abfc", ring: "rgba(129,140,248,0.5)", chip: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30", icon: "text-indigo-300" } },
  { slug: "websites", download: "Webcorex-Website-OS.html", icon: Globe, accent: { from: "#34d399", to: "#a78bfa", ring: "rgba(52,211,153,0.5)", chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30", icon: "text-emerald-300" } },
  { slug: "audit", download: "Webcorex-Audit-OS.html", icon: ShieldCheck, accent: { from: "#fb7185", to: "#a78bfa", ring: "rgba(251,113,133,0.45)", chip: "bg-rose-500/15 text-rose-200 border-rose-400/30", icon: "text-rose-300" } },
];

function PreviewFrame({ src, title, enableIframe }: { src: string; title: string; enableIframe: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setScale(w / BASE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mount the iframe only while it is near the viewport, and unmount it once
  // the user scrolls well past the section — this frees the running prototype
  // documents so they don't compete with the rest of the page (and the WebGL
  // background) for resources.
  useEffect(() => {
    if (!enableIframe) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        setInView(visible);
        if (!visible) setLoaded(false);
      },
      { rootMargin: "250px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enableIframe]);

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a14]">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
        aria-hidden="true"
      />
      {enableIframe && inView && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`origin-top-left border-0 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{
            width: BASE_W,
            height: BASE_H,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export function PrototypesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const items = t.prototypes.items;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="prototypes"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <div
            className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60">
              {t.prototypes.eyebrow}
            </span>
          </div>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.prototypes.title}
          </h2>
          <p
            className={`text-white/60 text-base md:text-lg max-w-3xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.prototypes.subtitle}
          </p>
          <p
            className={`mt-3 text-white/35 text-xs md:text-sm max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.prototypes.hint}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {prototypeMeta.map((meta, i) => {
            const item = items[i];
            if (!item) return null;
            const accent = meta.accent;
            const Icon = meta.icon;
            const file = `/prototypes/${meta.slug}.html`;
            return (
              <div
                key={meta.slug}
                className={`group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${150 + i * 70}ms`,
                  background: `linear-gradient(135deg, ${accent.from}, transparent 45%, ${accent.to})`,
                }}
              >
                <div className="relative rounded-[15px] bg-[#0b0b16] overflow-hidden h-full flex flex-col">
                  {/* Live preview */}
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block"
                    aria-label={`${t.prototypes.open} — ${item.title}`}
                    data-testid={`link-prototype-preview-${meta.slug}`}
                  >
                    <PreviewFrame src={file} title={item.title} enableIframe={!isMobile} />

                    {/* Static fallback for mobile (iframe disabled) */}
                    {isMobile && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: `radial-gradient(circle at 50% 40%, ${accent.ring}, transparent 70%)` }}
                        aria-hidden="true"
                      >
                        <Icon className={`w-14 h-14 ${accent.icon} opacity-80`} />
                      </div>
                    )}

                    {/* Top fade for legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b0b16] to-transparent pointer-events-none" />

                    {/* Live badge */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                        {t.prototypes.live}
                      </span>
                    </span>

                    {/* Hover open hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-sm font-medium text-white">
                        {t.prototypes.open}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex-shrink-0"
                        style={{ boxShadow: `0 0 18px -6px ${accent.ring}` }}
                      >
                        <Icon className={`w-5 h-5 ${accent.icon}`} />
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${accent.chip}`}>
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-white leading-tight" data-testid={`text-prototype-title-${meta.slug}`}>
                      {item.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto pt-2 flex items-center gap-2">
                      <a
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0b0b16] transition-all active:scale-[0.97]"
                        style={{ backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                        data-testid={`button-prototype-open-${meta.slug}`}
                      >
                        {t.prototypes.open}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <a
                        href={file}
                        download={meta.download}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all active:scale-[0.97]"
                        aria-label={`${t.prototypes.download} — ${item.title}`}
                        data-testid={`button-prototype-download-${meta.slug}`}
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.prototypes.download}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
