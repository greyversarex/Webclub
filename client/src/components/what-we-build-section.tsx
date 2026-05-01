import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  Wifi,
  BatteryFull,
  Home,
  BarChart3,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Coffee,
  CreditCard,
  Bell,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

/* ───────── 01 · E-commerce ───────── */
function EcomMockup() {
  return (
    <div className="flex flex-col bg-white">
      {/* Storefront header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-violet-500" />
          <span className="font-display font-black text-sm text-slate-900 tracking-tight">
            SNKR
          </span>
        </div>
        <div className="flex items-center gap-3.5 text-slate-500">
          <Search className="w-4 h-4" />
          <Heart className="w-4 h-4" />
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-slate-700" />
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-cyan-500 to-violet-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Product hero */}
      <div className="relative aspect-[5/3] bg-gradient-to-br from-slate-100 via-rose-50 to-amber-50 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
          alt="Nike Air Max"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-rose-500 text-white text-[10px] font-black tracking-wider rounded shadow-lg">
          −20%
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform hover:scale-110">
          <Heart className="w-4 h-4 text-slate-700" />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`block rounded-full transition-all ${
                i === 0 ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[10px] text-slate-500 ml-1">4.9 · 1 247 отзывов</span>
        </div>
        <h4 className="font-display font-bold text-base text-slate-900 mb-3 leading-tight tracking-tight">
          Nike Air Max 270 React
        </h4>

        {/* Color swatches */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Цвет
          </span>
          <div className="flex gap-1.5">
            <span className="w-4 h-4 rounded-full bg-rose-500 ring-2 ring-rose-500 ring-offset-2 ring-offset-white" />
            <span className="w-4 h-4 rounded-full bg-slate-900" />
            <span className="w-4 h-4 rounded-full bg-amber-400" />
            <span className="w-4 h-4 rounded-full bg-cyan-500" />
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tabular-nums">15 990 ₽</span>
            <span className="text-xs text-slate-400 line-through">19 990</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">В наличии</span>
        </div>
        <button className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold py-3 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/40 flex items-center justify-center gap-2">
          В корзину
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ───────── 02 · Business / corporate landing ───────── */
function BusinessMockup() {
  return (
    <div className="flex flex-col bg-white">
      {/* Top nav */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">A</span>
          </div>
          <span className="font-display font-black text-sm text-slate-900 tracking-tight">
            ALTITUDE
          </span>
        </div>
        <div className="flex gap-4 text-[11px] text-slate-600 font-medium">
          <span>Услуги</span>
          <span>Кейсы</span>
          <span>Команда</span>
          <span className="text-slate-900 font-semibold">Цены</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative px-5 py-7 bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-300/35 to-violet-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr from-rose-200/30 to-amber-200/20 blur-2xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[9px] text-slate-700 font-semibold mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)] animate-pulse" />
            Доступны для новых проектов
          </div>
          <h4 className="font-display font-black text-[22px] text-slate-900 leading-[1.1] tracking-tight mb-2.5">
            Создаём digital,
            <br />
            который{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              влияет
            </span>
          </h4>
          <p className="text-[11px] text-slate-600 mb-4 leading-relaxed max-w-[260px]">
            Дизайн, разработка и продвижение для брендов, которые думают о завтра.
          </p>
          <div className="flex gap-2">
            <button className="bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-2 rounded-md flex items-center gap-1.5 transition-all duration-300 group-hover:bg-cyan-600 group-hover:shadow-md group-hover:shadow-cyan-500/40">
              Начать проект
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button className="text-[11px] font-semibold text-slate-700 px-3.5 py-2 rounded-md border border-slate-300 bg-white">
              Кейсы
            </button>
          </div>
        </div>
      </div>

      {/* Trusted-by + stats */}
      <div className="px-5 py-3.5 border-t border-slate-200/70 bg-slate-50/60">
        <div className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-2">
          Нам доверяют
        </div>
        <div className="flex items-center justify-between text-[12px] font-black text-slate-400 tracking-tight">
          <span>HUAWEI</span>
          <span>KASPI</span>
          <span>X5</span>
          <span>YOTA</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-5 py-3 border-t border-slate-200/70">
        {[
          { v: "200+", l: "проектов" },
          { v: "15", l: "лет" },
          { v: "★ 4.9", l: "рейтинг" },
        ].map((s, i) => (
          <div
            key={i}
            className={`text-center ${i < 2 ? "border-r border-slate-200/70" : ""}`}
          >
            <div className="text-sm font-black bg-gradient-to-br from-cyan-600 to-violet-600 bg-clip-text text-transparent tabular-nums">
              {s.v}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 03 · Mobile app (premium fintech UI) ───────── */
function AppMockup() {
  return (
    <div className="flex items-center justify-center py-8 min-h-[480px] bg-gradient-to-br from-slate-100 via-white to-cyan-50/40">
      <div className="relative w-[210px] h-[420px] bg-slate-950 rounded-[38px] p-[6px] shadow-2xl transition-all duration-500 group-hover:-rotate-3 group-hover:scale-[1.05]">
        {/* Notch */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950 rounded-b-2xl z-10" />
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-10 bg-slate-800 rounded-l" />
        <div className="absolute -right-[3px] top-24 w-[3px] h-14 bg-slate-800 rounded-r" />

        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[9px] font-bold text-slate-900">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <Wifi className="w-2.5 h-2.5" strokeWidth={3} />
              <BatteryFull className="w-3 h-3" strokeWidth={3} />
            </div>
          </div>

          {/* Gradient header */}
          <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 px-4 pt-3 pb-9 text-white relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-violet-300/30 blur-xl" />
            <div className="flex items-center justify-between relative">
              <div>
                <div className="text-[10px] opacity-80 font-medium">Доброе утро 👋</div>
                <div className="text-base font-black leading-tight">Алексей</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xs font-black">
                А
              </div>
            </div>
          </div>

          {/* Floating balance card */}
          <div className="px-3 -mt-7 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                  Баланс
                </span>
                <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  5.2%
                </span>
              </div>
              <div className="text-[18px] font-black text-slate-900 tabular-nums leading-none mb-2.5">
                248 500 ₽
              </div>
              <svg viewBox="0 0 120 30" className="w-full h-6 overflow-visible">
                <defs>
                  <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,22 L15,18 L30,20 L45,12 L60,15 L75,8 L90,10 L105,4 L120,6 L120,30 L0,30 Z"
                  fill="url(#spark-grad)"
                />
                <path
                  d="M0,22 L15,18 L30,20 L45,12 L60,15 L75,8 L90,10 L105,4 L120,6"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="105" cy="4" r="2.5" fill="#06b6d4" />
                <circle cx="105" cy="4" r="5" fill="#06b6d4" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Activity */}
          <div className="px-4 pt-3 pb-2 flex-1">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">
                Активность
              </span>
              <span className="text-[9px] text-cyan-600 font-bold">Все →</span>
            </div>
            <div className="space-y-2">
              {[
                {
                  name: "Spotify",
                  sub: "Подписка",
                  amount: "−299 ₽",
                  Icon: Coffee,
                  bg: "bg-emerald-100",
                  fg: "text-emerald-700",
                  positive: false,
                },
                {
                  name: "Wildberries",
                  sub: "Покупка",
                  amount: "−2 540 ₽",
                  Icon: ShoppingBag,
                  bg: "bg-violet-100",
                  fg: "text-violet-700",
                  positive: false,
                },
                {
                  name: "Зарплата",
                  sub: "Технологии",
                  amount: "+85 000 ₽",
                  Icon: ArrowDownLeft,
                  bg: "bg-cyan-100",
                  fg: "text-cyan-700",
                  positive: true,
                },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full ${tx.bg} ${tx.fg} flex items-center justify-center`}
                  >
                    <tx.Icon className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-slate-900 leading-none">
                      {tx.name}
                    </div>
                    <div className="text-[8px] text-slate-500 mt-0.5">{tx.sub}</div>
                  </div>
                  <div
                    className={`text-[10px] font-black tabular-nums ${
                      tx.positive ? "text-emerald-600" : "text-slate-700"
                    }`}
                  >
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex justify-around items-center bg-white border-t border-slate-100 py-3">
            <Home className="w-4 h-4 text-cyan-600" strokeWidth={2.5} />
            <BarChart3 className="w-4 h-4 text-slate-300" strokeWidth={2} />
            <CreditCard className="w-4 h-4 text-slate-300" strokeWidth={2} />
            <User className="w-4 h-4 text-slate-300" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 04 · Banking / fintech dashboard ───────── */
function BankMockup() {
  return (
    <div className="flex flex-col">
      {/* Top app bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-gradient-to-r from-slate-950 to-slate-900 text-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500" />
          <span className="font-display font-black text-sm tracking-tight">SBR · PRO</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 rounded-md px-2 py-1 text-[10px] text-slate-300 border border-white/10">
            <Search className="w-3 h-3" />
            <span>Поиск</span>
          </div>
          <div className="relative">
            <Bell className="w-3.5 h-3.5 text-slate-300" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-[10px] font-black text-white shadow-md">
            А
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-slate-950 text-white px-5 py-5 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1 font-semibold">
            Общий баланс
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[26px] font-black tabular-nums leading-none">
              1 248 500 ₽
            </span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" />
              +5.2%
            </span>
          </div>

          {/* Chart */}
          <div className="relative h-[72px] mb-5">
            <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chart-stroke" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              {/* gridlines */}
              {[20, 40, 60].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="300"
                  y1={y}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity="0.05"
                  strokeDasharray="2 4"
                />
              ))}
              <path
                d="M0,62 Q30,55 50,52 T100,42 T150,46 T200,30 T240,18 T300,8 L300,80 L0,80 Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M0,62 Q30,55 50,52 T100,42 T150,46 T200,30 T240,18 T300,8"
                fill="none"
                stroke="url(#chart-stroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="240" cy="18" r="4" fill="#22d3ee" />
              <circle cx="240" cy="18" r="9" fill="#22d3ee" opacity="0.25" />
              <circle cx="240" cy="18" r="14" fill="#22d3ee" opacity="0.1">
                <animate
                  attributeName="r"
                  values="9;18;9"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0;0.3"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <div className="absolute -top-1 left-[78%] -translate-x-1/2 bg-cyan-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-lg shadow-cyan-500/40">
              +124k
            </div>
          </div>

          {/* Recent transactions */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              Операции
            </div>
            <div className="text-[9px] text-cyan-400 font-bold">Все →</div>
          </div>
          <div className="space-y-2">
            {[
              {
                name: "Зарплата",
                sub: "ООО Технологии",
                amount: "+85 000",
                positive: true,
                Icon: ArrowDownLeft,
              },
              {
                name: "Wildberries",
                sub: "Покупка",
                amount: "−12 540",
                positive: false,
                Icon: ShoppingBag,
              },
              {
                name: "Stars Coffee",
                sub: "Кофейня",
                amount: "−350",
                positive: false,
                Icon: Coffee,
              },
            ].map((tx, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.positive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}
                >
                  <tx.Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-white leading-none">
                    {tx.name}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{tx.sub}</div>
                </div>
                <div
                  className={`text-[11px] font-black tabular-nums ${
                    tx.positive ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {tx.amount} ₽
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mockups = [EcomMockup, BusinessMockup, AppMockup, BankMockup];

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 relative"
      data-testid="section-what-we-build"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Header — centered, standard size */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/25 backdrop-blur-sm mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-gradient-to-r from-cyan-700 to-violet-700 bg-clip-text text-transparent font-semibold">
              Направления разработки
            </span>
          </div>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-testid="heading-what-we-build"
          >
            {t.whatWeBuild.title}
          </h2>
          <p
            className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        {/* Cards: type label above, real interface below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {t.whatWeBuild.items.map((item, index) => {
            const Mockup = mockups[index] ?? EcomMockup;
            return (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
                data-testid={`card-direction-${index}`}
              >
                {/* Type label above */}
                <div className="flex items-center gap-3 mb-4 px-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-600 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="w-6 h-px bg-gradient-to-r from-cyan-500 to-violet-500" />
                  <h3
                    className="font-display text-base md:text-lg font-bold text-slate-800 tracking-tight"
                    data-testid={`text-direction-title-${index}`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Mockup card */}
                <div className="relative rounded-2xl bg-white border border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-15px_rgba(6,182,212,0.4)] hover:border-cyan-400/50">
                  <Mockup />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
