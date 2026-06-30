import { ShoppingBag, Globe, Smartphone, Landmark, type LucideIcon } from "lucide-react";
import { CardSwap, type CardSwapItem } from "./card-swap";

interface SolutionCard {
  key: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  image?: string;
}

const SOLUTIONS: SolutionCard[] = [
  {
    key: "ecom",
    title: "Интернет-магазины",
    tag: "E-commerce",
    icon: ShoppingBag,
    gradient: "from-rose-500 to-amber-500",
    glow: "rgba(244,114,182,0.45)",
  },
  {
    key: "corporate",
    title: "Корпоративные сайты",
    tag: "Web",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-500",
    glow: "rgba(34,211,238,0.45)",
  },
  {
    key: "mobile",
    title: "Мобильные приложения",
    tag: "iOS / Android",
    icon: Smartphone,
    gradient: "from-violet-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.45)",
  },
  {
    key: "banking",
    title: "Банковские и госпроекты",
    tag: "FinTech / GovTech",
    icon: Landmark,
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(129,140,248,0.45)",
  },
];

function CardFace({ s }: { s: SolutionCard }) {
  const Icon = s.icon;
  return (
    <div className="relative h-full w-full flex flex-col" style={{ transform: "skewY(0deg)" }}>
      {/* top bar — laptop/browser chrome */}
      <div className="flex items-center gap-1.5 px-4 h-8 border-b border-white/10 bg-white/[0.03] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
          <span className={`inline-flex items-center justify-center w-4 h-4 rounded bg-gradient-to-br ${s.gradient}`}>
            <Icon className="w-2.5 h-2.5 text-white" />
          </span>
          {s.tag}
        </div>
      </div>

      {/* image / preview area */}
      <div className="relative flex-1 overflow-hidden">
        {s.image ? (
          <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{
              background: `radial-gradient(120% 90% at 50% 0%, ${s.glow}, transparent 60%)`,
            }}
          >
            <span className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </span>
            <span className="px-3 text-center font-display font-bold text-lg text-white leading-tight">
              {s.title}
            </span>
          </div>
        )}
        {/* title overlay when image present */}
        {s.image && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
            <span className="font-display font-bold text-base text-white">{s.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroCardStack({ reduced = false }: { reduced?: boolean }) {
  const cards: CardSwapItem[] = SOLUTIONS.map((s) => ({
    id: s.key,
    content: <CardFace s={s} />,
  }));

  return <CardSwap cards={cards} reduced={reduced} delay={3500} />;
}

export default HeroCardStack;
