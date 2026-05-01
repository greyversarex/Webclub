import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  Package,
  Wifi,
  BatteryFull,
  Flame,
  Clock,
  Home,
  BarChart3,
  User,
  Lock,
  ArrowUpRight,
  Receipt,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

/* ───────── Mini browser chrome (reused) ───────── */
function BrowserChrome({ url, secure = false }: { url: string; secure?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/70">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex-1 h-6 rounded-md bg-slate-100 ml-3 flex items-center gap-1.5 px-3 text-[10px] text-slate-500 font-mono">
        {secure && <Lock className="w-2.5 h-2.5 text-emerald-600" />}
        {url}
      </div>
    </div>
  );
}

/* ───────── 01. E-commerce ───────── */
function EcomMockup() {
  return (
    <div className="p-5">
      <BrowserChrome url="shop.example.com" />

      {/* Mini shop nav */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-bold text-sm text-slate-900 tracking-tight">SHOP</span>
        <div className="flex items-center gap-3 text-slate-500">
          <Search className="w-3.5 h-3.5" />
          <Heart className="w-3.5 h-3.5" />
          <div className="relative">
            <ShoppingCart className="w-3.5 h-3.5 text-slate-700" />
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-cyan-500 to-violet-500 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold leading-none">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Product card */}
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <div className="relative rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 aspect-square flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
          <Package className="w-12 h-12 text-slate-400" strokeWidth={1.25} />
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-rose-500 text-white text-[8px] font-bold rounded">
            -20%
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[11px] font-semibold text-slate-900 leading-snug mb-1.5">
            Кроссовки Nike Air Max
          </div>
          <div className="flex items-center gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${i <= 4 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
              />
            ))}
            <span className="text-[9px] text-slate-500 ml-1">4.8</span>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-base font-bold text-slate-900 tabular-nums">15 990 ₽</span>
            <span className="text-[9px] text-slate-400 line-through">19 990</span>
          </div>
          <button className="mt-auto w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-[10px] font-semibold py-1.5 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-cyan-500/30">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── 02. Business / corporate / education ───────── */
function BusinessMockup() {
  return (
    <div className="p-5">
      <BrowserChrome url="company.ru" />

      {/* Top nav */}
      <div className="flex items-center justify-between mb-5 text-[10px]">
        <span className="font-display font-bold text-slate-900 tracking-tight">ACME Corp</span>
        <div className="flex gap-3 text-slate-500">
          <span>Услуги</span>
          <span>Кейсы</span>
          <span>Цены</span>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-2">
        <div className="inline-block px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-[8px] font-semibold tracking-wider mb-2.5">
          КОМПАНИЯ ГОДА 2025
        </div>
        <div className="font-display font-bold text-[15px] text-slate-900 mb-1.5 leading-tight">
          Решения для вашего бизнеса
        </div>
        <div className="text-[10px] text-slate-500 mb-3 leading-snug">
          Профессиональный подход и результат под ключ
        </div>
        <div className="flex justify-center gap-2">
          <button className="bg-slate-900 text-white text-[10px] font-semibold px-3 py-1.5 rounded-md transition-colors duration-300 group-hover:bg-cyan-600">
            Связаться
          </button>
          <button className="border border-slate-300 text-slate-700 text-[10px] font-semibold px-3 py-1.5 rounded-md">
            Подробнее
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
        {[
          { v: "500+", l: "клиентов" },
          { v: "12", l: "лет опыта" },
          { v: "98%", l: "довольных" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-sm font-bold bg-gradient-to-br from-cyan-600 to-violet-600 bg-clip-text text-transparent tabular-nums">
              {s.v}
            </div>
            <div className="text-[8px] text-slate-500 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 03. Mobile app (phone frame) ───────── */
function AppMockup() {
  return (
    <div className="p-5 flex items-center justify-center min-h-[320px]">
      <div className="relative w-[180px] h-[300px] bg-slate-950 rounded-[32px] p-2 shadow-2xl transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.04]">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-b-2xl z-10" />
        {/* Side button hints */}
        <div className="absolute -left-[3px] top-16 w-[3px] h-8 bg-slate-800 rounded-l" />
        <div className="absolute -right-[3px] top-20 w-[3px] h-12 bg-slate-800 rounded-r" />

        {/* Screen */}
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-[24px] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-4 pt-2 pb-1 text-[8px] font-semibold text-slate-700">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <Wifi className="w-2.5 h-2.5" strokeWidth={2.5} />
              <BatteryFull className="w-3 h-3" strokeWidth={2.5} />
            </div>
          </div>

          {/* Content */}
          <div className="px-3 py-2 flex-1">
            <div className="text-[8px] text-slate-500 mb-0.5">Сегодня</div>
            <div className="text-sm font-bold text-slate-900 mb-2.5 leading-none">Активность</div>

            {/* Big metric card */}
            <div className="bg-gradient-to-br from-cyan-500 to-violet-500 rounded-xl p-2.5 text-white mb-2 shadow-md">
              <div className="text-[8px] opacity-80 mb-0.5">Цель: 10 000 шагов</div>
              <div className="text-xl font-black leading-none tabular-nums">8 432</div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-[84%] bg-white rounded-full" />
              </div>
            </div>

            {/* Small cards */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-white rounded-lg p-1.5 shadow-sm">
                <Flame className="w-3 h-3 text-orange-500 mb-0.5" />
                <div className="text-[7px] text-slate-500">Калории</div>
                <div className="text-[11px] font-bold text-slate-900 leading-none tabular-nums">412</div>
              </div>
              <div className="bg-white rounded-lg p-1.5 shadow-sm">
                <Clock className="w-3 h-3 text-emerald-500 mb-0.5" />
                <div className="text-[7px] text-slate-500">Время</div>
                <div className="text-[11px] font-bold text-slate-900 leading-none">52 м</div>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex justify-around items-center bg-white border-t border-slate-100 py-2">
            <Home className="w-3.5 h-3.5 text-cyan-600" strokeWidth={2.5} />
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            <User className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 04. Banking / government IT ───────── */
function BankMockup() {
  return (
    <div className="p-5">
      <BrowserChrome url="bank.example.com" secure />

      {/* Bank card */}
      <div className="relative rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-white shadow-lg mb-4 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Decorative cyber gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 50%, rgba(6,182,212,0.6) 0, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 100%, rgba(167,139,250,0.6) 0, transparent 50%)",
          }}
        />

        <div className="relative flex justify-between items-start mb-6">
          <div>
            <div className="text-[8px] uppercase opacity-60 tracking-widest mb-1">Баланс</div>
            <div className="text-xl font-bold tabular-nums leading-none">248 500 ₽</div>
          </div>
          <div className="w-8 h-6 rounded bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-inner" />
        </div>
        <div className="relative flex justify-between items-end">
          <div className="font-mono text-xs tracking-[0.2em]">•••• 4521</div>
          <div className="text-[8px] opacity-60 font-mono">12/28</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        <button className="bg-gradient-to-br from-cyan-500 to-violet-500 text-white text-[10px] font-semibold py-2 rounded-lg flex flex-col items-center gap-1 shadow-sm transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-cyan-500/30">
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          Перевод
        </button>
        <button className="bg-slate-100 text-slate-700 text-[10px] font-semibold py-2 rounded-lg flex flex-col items-center gap-1 hover:bg-slate-200 transition-colors">
          <Receipt className="w-3.5 h-3.5" strokeWidth={2} />
          Платёж
        </button>
        <button className="bg-slate-100 text-slate-700 text-[10px] font-semibold py-2 rounded-lg flex flex-col items-center gap-1 hover:bg-slate-200 transition-colors">
          <PiggyBank className="w-3.5 h-3.5" strokeWidth={2} />
          Вклад
        </button>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-2 text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2.5 py-1.5">
        <ShieldCheck className="w-3 h-3" strokeWidth={2.5} />
        <span className="font-semibold tracking-wide">Защищено · ФЗ-152 · PCI DSS</span>
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

        {/* Cards: type label above, interactive mockup below */}
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
                {/* Type label above the card */}
                <div className="flex items-center gap-3 mb-4 px-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-600 font-semibold">
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

                {/* Interactive mockup card */}
                <div className="relative rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.35)] hover:border-cyan-400/50">
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
