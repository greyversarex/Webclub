import {
  Smartphone,
  ShoppingBag,
  Globe,
  Rocket,
  Workflow,
  MonitorCog,
  type LucideIcon,
} from "lucide-react";
import { CardSwap, type CardSwapItem } from "./card-swap";

interface SolutionCard {
  key: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
}

const SOLUTIONS: SolutionCard[] = [
  {
    key: "apps",
    title: "Приложения и игры",
    tag: "iOS / Android",
    icon: Smartphone,
    gradient: "from-violet-500 to-fuchsia-500",
    image: "/solutions/apps.png",
  },
  {
    key: "ecommerce",
    title: "Коммерция и продажи",
    tag: "E-commerce",
    icon: ShoppingBag,
    gradient: "from-rose-500 to-amber-500",
    image: "/solutions/ecommerce.png",
  },
  {
    key: "websites",
    title: "Сайты и лендинги",
    tag: "Web",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-500",
    image: "/solutions/websites.png",
  },
  {
    key: "automation",
    title: "Автоматизация",
    tag: "CRM / ERP",
    icon: Workflow,
    gradient: "from-indigo-500 to-violet-600",
    image: "/solutions/automation.png",
  },
  {
    key: "startup",
    title: "Стартапы и MVP",
    tag: "Startup / MVP",
    icon: Rocket,
    gradient: "from-sky-500 to-indigo-500",
    image: "/solutions/startup.png",
  },
  {
    key: "systems",
    title: "Системное ПО",
    tag: "Desktop",
    icon: MonitorCog,
    gradient: "from-purple-500 to-indigo-600",
    image: "/solutions/systems.png",
  },
];

function CardFace({ s }: { s: SolutionCard }) {
  const Icon = s.icon;
  return (
    <div className="relative h-full w-full flex flex-col">
      {/* top bar — browser/laptop chrome */}
      <div className="flex items-center gap-1.5 px-4 h-8 border-b border-white/10 bg-white/[0.04] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex items-center gap-1.5 text-[10px] text-white/55 font-medium">
          <span className={`inline-flex items-center justify-center w-4 h-4 rounded bg-gradient-to-br ${s.gradient}`}>
            <Icon className="w-2.5 h-2.5 text-white" />
          </span>
          {s.tag}
        </div>
      </div>

      {/* screenshot */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* title overlay */}
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/90 via-black/45 to-transparent">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br ${s.gradient} shadow`}>
              <Icon className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="font-display font-bold text-base text-white drop-shadow">
              {s.title}
            </span>
          </div>
        </div>
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
