import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type TransitionEvent,
} from "react";
import {
  Smartphone,
  ShoppingBag,
  Globe,
  Rocket,
  Workflow,
  Terminal,
  Play,
  Star,
  Heart,
  Plus,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/* Service accent system — index aligned with t.heroShowcase.items */
const ICONS = [Smartphone, ShoppingBag, Globe, Rocket, Workflow, Terminal];

const GRADIENTS = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-sky-500 to-violet-500",
  "from-fuchsia-500 to-rose-500",
  "from-emerald-400 to-cyan-500",
  "from-indigo-500 to-cyan-400",
];

const GLOWS = [
  "rgba(168,85,247,0.55)",
  "rgba(34,211,238,0.55)",
  "rgba(96,165,250,0.55)",
  "rgba(244,114,182,0.55)",
  "rgba(52,211,153,0.55)",
  "rgba(129,140,248,0.55)",
];

const TAGS = [
  ["iOS", "Android", "App Store"],
  ["Shop", "B2B", "Pay"],
  ["Web", "SEO", "CMS"],
  ["MVP", "Demo", "Fast"],
  ["CRM", "ERP", "API"],
  ["Windows", "macOS", "Linux"],
];

/* 6 evenly spaced points on a circle (percent of the square stage),
   starting at the top and going clockwise. */
const ORBIT = [
  { x: 50, y: 9.6 },
  { x: 85, y: 29.8 },
  { x: 85, y: 70.2 },
  { x: 50, y: 90.4 },
  { x: 15, y: 70.2 },
  { x: 15, y: 29.8 },
];

/* ── Mini live "screens" — pure CSS/SVG, no images, render anywhere ── */

function ScreenApps() {
  const tiles = [
    "from-cyan-400 to-blue-500",
    "from-violet-400 to-fuchsia-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-pink-500",
    "from-sky-400 to-indigo-500",
    "from-fuchsia-400 to-purple-500",
    "from-teal-400 to-cyan-500",
  ];
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white p-2.5 flex flex-col gap-2">
      <div className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-[7px] font-bold uppercase tracking-wider text-white/80">New · Game</div>
          <div className="text-[11px] font-black text-white leading-tight">Galaxy Run</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow">
          <Play className="w-3 h-3 text-violet-600 fill-violet-600" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {tiles.map((g, i) => (
          <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${g} shadow-sm`} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 rounded-full ${i === 0 ? "w-5 bg-violet-500" : "w-3 bg-slate-200"}`} />
        ))}
      </div>
    </div>
  );
}

function ScreenCommerce() {
  return (
    <div className="w-full h-full bg-white p-2.5 flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[10px] font-black text-slate-900 tracking-tight">SHOP</div>
        <div className="relative">
          <ShoppingBag className="w-3.5 h-3.5 text-slate-700" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-500 text-white text-[6px] font-bold flex items-center justify-center">
            2
          </span>
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-cyan-100 to-violet-100 h-[44%]">
        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-rose-500 text-white text-[7px] font-black">
          −30%
        </span>
        <Heart className="absolute top-1 right-1 w-3 h-3 text-slate-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm shadow-inner" />
        </div>
      </div>
      <div className="text-[9px] font-bold text-slate-900 mt-1.5">Nova Sneakers</div>
      <div className="flex items-center gap-0.5 mt-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-[7px] text-slate-400 ml-0.5">4.9</span>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="text-[12px] font-black text-slate-900">$129</div>
        <span className="text-[8px] font-bold text-white px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center gap-1">
          <Plus className="w-2.5 h-2.5" />
          Add
        </span>
      </div>
    </div>
  );
}

function ScreenWebsite() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-100 border-b border-slate-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <div className="ml-1.5 flex-1 h-2.5 rounded-full bg-white border border-slate-200" />
      </div>
      <div className="flex-1 p-2.5 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[9px] font-black text-slate-900">brand</div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-slate-200" />
            <span className="w-3 h-1 rounded-full bg-slate-200" />
            <span className="w-6 h-3 rounded-md bg-gradient-to-r from-cyan-500 to-violet-500" />
          </div>
        </div>
        <div className="h-2 w-4/5 rounded-full bg-slate-800 mb-1.5" />
        <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 mb-2" />
        <div className="h-1.5 w-full rounded-full bg-slate-200 mb-1" />
        <div className="h-1.5 w-4/6 rounded-full bg-slate-200" />
        <div className="mt-auto relative rounded-lg h-[36%] bg-gradient-to-br from-slate-800 via-violet-900 to-cyan-900 overflow-hidden">
          <div className="absolute bottom-1.5 left-1.5 w-8 h-2.5 rounded bg-white/85" />
        </div>
      </div>
    </div>
  );
}

function ScreenMvp() {
  const stats: [string, string][] = [
    ["Users", "1.2k"],
    ["MRR", "$8k"],
    ["NPS", "72"],
  ];
  return (
    <div className="w-full h-full bg-white p-2.5 flex flex-col">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[7px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 rounded bg-gradient-to-r from-fuchsia-500 to-rose-500">
            MVP
          </span>
          <span className="text-[8px] font-bold text-slate-500">Growth</span>
        </div>
        <Rocket className="w-3.5 h-3.5 text-fuchsia-500" />
      </div>
      <svg viewBox="0 0 100 50" className="w-full h-[52%]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mvp-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="0,42 18,36 34,38 52,24 70,20 88,9 100,5 100,50 0,50" fill="url(#mvp-fill)" />
        <polyline
          points="0,42 18,36 34,38 52,24 70,20 88,9 100,5"
          fill="none"
          stroke="#ec4899"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="grid grid-cols-3 gap-1.5 mt-auto">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-md bg-slate-50 border border-slate-100 px-1.5 py-1">
            <div className="text-[6px] uppercase tracking-wider text-slate-400 font-bold">{k}</div>
            <div className="text-[9px] font-black text-slate-900">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenAutomation() {
  const kpis: [string, string][] = [
    ["Deals", "48"],
    ["Revenue", "$112k"],
    ["Auto", "37"],
  ];
  const bars = [40, 65, 50, 80, 60, 92, 72];
  const flow = ["Lead", "CRM", "Pay"];
  return (
    <div className="w-full h-full bg-white p-2.5 flex flex-col">
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {kpis.map(([k, v]) => (
          <div key={k} className="rounded-md bg-slate-50 border border-slate-100 px-1.5 py-1">
            <div className="text-[6px] uppercase tracking-wide text-slate-400 font-bold">{k}</div>
            <div className="text-[9px] font-black text-slate-900">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1 h-[38%] mb-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-emerald-400 to-cyan-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-1">
        {flow.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <span className="text-[7px] font-bold text-slate-600 px-1.5 py-0.5 rounded bg-slate-100">{s}</span>
            {i < flow.length - 1 && <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenSystem() {
  return (
    <div className="w-full h-full bg-[#0b1020] flex flex-col">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="ml-1.5 text-[7px] font-mono text-white/40">system.sh</span>
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-emerald-400">$</span>
          <span className="h-1.5 w-2/3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-cyan-400">›</span>
          <span className="h-1.5 w-1/2 rounded-full bg-cyan-400/60" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-violet-400">›</span>
          <span className="h-1.5 w-3/5 rounded-full bg-violet-400/60" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[8px] font-mono text-white/40">·</span>
          <span className="h-1.5 w-2/5 rounded-full bg-white/20" />
        </div>
        <div className="mt-auto flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-cyan-400" />
          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[62%] bg-gradient-to-r from-cyan-400 to-violet-500" />
          </div>
          <span className="text-[7px] font-mono text-white/50">62%</span>
        </div>
      </div>
    </div>
  );
}

const SCREENS: ComponentType[] = [
  ScreenApps,
  ScreenCommerce,
  ScreenWebsite,
  ScreenMvp,
  ScreenAutomation,
  ScreenSystem,
];

export function HeroShowcase({ reduced }: { reduced: boolean }) {
  const { t } = useLanguage();
  const items = t.heroShowcase.items;
  const [active, setActive] = useState(0);
  /* continuous comet angle (deg); each service sits 60° apart */
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Rest on the active icon, then send the comet flying to the next one.
     Keyed on `rotation` so any change — auto-advance OR a manual click —
     resets this timer and no stale flight can fire (avoids overshoot). */
  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = setTimeout(() => setRotation((r) => r + 60), 3000);
    return () => clearTimeout(id);
  }, [rotation, reduced, paused, visible]);

  /* Comet reached an icon → switch the featured service to it. */
  const handleArrive = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    const idx = ((Math.round(rotation / 60) % items.length) + items.length) % items.length;
    setActive(idx);
  };

  /* Manual selection: fly the comet to the chosen icon (shortest direction). */
  const goTo = (i: number) => {
    setRotation((r) => {
      const current = ((r % 360) + 360) % 360;
      let delta = i * 60 - current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      return r + delta;
    });
  };

  const ActiveScreen = SCREENS[active];
  const ActiveIcon = ICONS[active];

  return (
    <div
      ref={stageRef}
      className="relative w-full aspect-square max-w-[440px] sm:max-w-[500px] mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-testid="hero-showcase"
    >
      {/* ambient glow that tracks the active service colour */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at 50% 46%, ${GLOWS[active]}, transparent 60%)`,
          filter: "blur(26px)",
        }}
      />

      {/* faint orbit rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ width: "80.8%", height: "80.8%" }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
        style={{ width: "99%", height: "99%" }}
      />

      {/* traveling comet riding the orbit — flies to the active icon and
          triggers the switch the moment it lands (handleArrive) */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
            transition: "transform 0.85s cubic-bezier(0.5, 0, 0.2, 1)",
          }}
          onTransitionEnd={handleArrive}
        >
          <span
            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300"
            style={{
              top: "9.6%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 12px 4px rgba(34,211,238,0.7)",
            }}
          />
        </div>
      )}

      {/* orbit chips — also the navigation */}
      {items.map((it, i) => {
        const ChipIcon = ICONS[i];
        const pos = ORBIT[i];
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-500 ${
              isActive
                ? "w-11 h-11 sm:w-12 sm:h-12 border-white/30 bg-white/10 scale-110"
                : "w-9 h-9 sm:w-10 sm:h-10 border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              boxShadow: isActive ? `0 0 22px 2px ${GLOWS[i]}` : undefined,
            }}
            data-testid={`chip-showcase-${i}`}
            aria-label={it.title}
            aria-pressed={isActive}
          >
            <span
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${GRADIENTS[i]} transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <ChipIcon className={`relative w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-white" : "text-white/70"}`} />
          </button>
        );
      })}

      {/* center featured card */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] z-10 ${
          reduced ? "" : "hero-float"
        }`}
      >
        <div className="relative rounded-[1.4rem] border border-white/12 bg-white/[0.04] backdrop-blur-xl p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div
            key={`screen-${active}`}
            aria-hidden="true"
            className="hero-card-in relative rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-[16/11] shadow-lg"
          >
            <ActiveScreen />
          </div>

          <div key={`info-${active}`} className="hero-card-in mt-3 px-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${GRADIENTS[active]} shadow`}
              >
                <ActiveIcon className="w-4 h-4 text-white" />
              </span>
              <h3
                className="font-display text-[15px] sm:text-base font-bold text-white leading-tight"
                data-testid="text-showcase-title"
              >
                {items[active].title}
              </h3>
            </div>
            <p
              className="mt-2 text-[11.5px] sm:text-xs text-white/55 leading-relaxed line-clamp-2"
              data-testid="text-showcase-desc"
            >
              {items[active].description}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {TAGS[active].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-semibold tracking-wide text-white/65 px-2 py-0.5 rounded-full border border-white/10 bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
