import { useState } from "react";
import {
  ShoppingCart, Search, Heart, Star, ArrowUpRight, ArrowLeft, Plus, Minus, Trash2, Check,
  Home, BarChart3, CreditCard, Bell, ArrowDownLeft, ShoppingBag, Coffee,
  Briefcase, Mail, Phone, MapPin, Users, Award, Send, ChevronRight, TrendingUp, Filter,
  Store, Building2, Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

/* ============================================================
   01 · INTERACTIVE E-COMMERCE
   ============================================================ */

type Product = {
  id: string; name: string; brand: string; price: number; oldPrice?: number;
  rating: number; reviews: number; image: string; bg: string;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Air Max 270", brand: "Nike", price: 15990, oldPrice: 19990, rating: 4.9, reviews: 1247,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    bg: "from-rose-50 to-amber-50" },
  { id: "p2", name: "Кожаная куртка", brand: "Levi's", price: 24990, rating: 4.7, reviews: 312,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
    bg: "from-slate-50 to-slate-100" },
  { id: "p3", name: "Smart Watch", brand: "Apple", price: 39990, oldPrice: 44990, rating: 4.8, reviews: 2104,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    bg: "from-cyan-50 to-blue-50" },
  { id: "p4", name: "Сумка-тоут", brand: "Coach", price: 18990, rating: 4.6, reviews: 489,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80",
    bg: "from-amber-50 to-orange-50" },
];

function EcomInteractive() {
  const [view, setView] = useState<"catalog" | "product" | "cart">("catalog");
  const [selectedId, setSelectedId] = useState<string>(PRODUCTS[0].id);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [tab, setTab] = useState<"all" | "new" | "sale">("all");
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartItems = cart.map((c) => ({ ...c, p: PRODUCTS.find((p) => p.id === c.id)! })).filter((c) => c.p);
  const total = cartItems.reduce((s, x) => s + x.p.price * x.qty, 0);
  const product = PRODUCTS.find((p) => p.id === selectedId)!;

  const addToCart = (id: string) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id);
      if (i >= 0) return c.map((x, k) => (k === i ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { id, qty: 1 }];
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="h-[640px] flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/70 bg-white z-10">
        <button onClick={() => setView("catalog")} className="flex items-center gap-2" data-testid="ecom-logo">
          {view !== "catalog" && <ArrowLeft className="w-4 h-4 text-slate-700" />}
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-violet-500" />
          <span className="font-display font-black text-sm text-slate-900 tracking-tight">SNKR</span>
        </button>
        <div className="flex items-center gap-3.5 text-slate-500">
          <Search className="w-4 h-4" />
          <Heart className="w-4 h-4" />
          <button onClick={() => setView("cart")} className="relative" data-testid="button-ecom-cart">
            <ShoppingCart className={`w-4 h-4 ${view === "cart" ? "text-cyan-600" : "text-slate-700"}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-cyan-500 to-violet-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto custom-scroll">
        {view === "catalog" && (
          <div className="p-4">
            <div className="relative rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 p-4 text-white mb-4 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">Сезонная скидка</div>
              <div className="text-xl font-black leading-tight mt-1">До −40%<br />на коллекцию</div>
              <div className="text-[10px] mt-2 opacity-80">До 31 декабря</div>
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              {[{ k: "all", l: "Всё" }, { k: "new", l: "Новинки" }, { k: "sale", l: "Распродажа" }].map((t) => (
                <button key={t.k} onClick={() => setTab(t.k as "all" | "new" | "sale")}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    tab === t.k ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}>{t.l}</button>
              ))}
              <button className="ml-auto p-1.5 rounded-full bg-slate-100 text-slate-600">
                <Filter className="w-3 h-3" />
              </button>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Популярное</div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((p) => (
                <button key={p.id} onClick={() => { setSelectedId(p.id); setView("product"); }}
                  className="text-left group/card" data-testid={`product-${p.id}`}>
                  <div className={`relative aspect-square rounded-lg bg-gradient-to-br ${p.bg} overflow-hidden`}>
                    <img src={p.image} alt={p.name} loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                    {p.oldPrice && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-black rounded">SALE</span>
                    )}
                    <Heart className="absolute top-2 right-2 w-3.5 h-3.5 text-slate-700 bg-white/90 rounded-full p-0.5" />
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1.5 uppercase tracking-wider font-semibold">{p.brand}</div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">{p.name}</div>
                  <div className="text-[11px] font-black text-slate-900 tabular-nums mt-0.5">{p.price.toLocaleString("ru")} ₽</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "product" && (
          <div>
            <div className={`relative aspect-[5/4] bg-gradient-to-br ${product.bg}`}>
              <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              {product.oldPrice && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-rose-500 text-white text-[10px] font-black rounded">−20%</span>
              )}
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{product.brand}</div>
              <h4 className="font-display font-bold text-base text-slate-900 leading-tight mt-0.5">{product.name}</h4>
              <div className="flex items-center gap-1 mt-1.5">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                <span className="text-[10px] text-slate-500 ml-1">{product.rating} · {product.reviews} отзывов</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-xl font-black text-slate-900 tabular-nums">{product.price.toLocaleString("ru")} ₽</span>
                {product.oldPrice && <span className="text-xs text-slate-400 line-through">{product.oldPrice.toLocaleString("ru")}</span>}
              </div>
              <div className="flex items-center gap-2.5 mt-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Цвет</span>
                <div className="flex gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-rose-500 ring-2 ring-rose-500 ring-offset-2 ring-offset-white" />
                  <span className="w-4 h-4 rounded-full bg-slate-900" />
                  <span className="w-4 h-4 rounded-full bg-amber-400" />
                  <span className="w-4 h-4 rounded-full bg-cyan-500" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1.5">Размер</div>
                <div className="flex flex-wrap gap-1.5">
                  {[38, 39, 40, 41, 42, 43, 44].map((s) => (
                    <button key={s} className={`w-9 h-9 rounded-md text-[11px] font-bold border ${
                      s === 41 ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-700 hover:border-slate-400"
                    }`}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(product.id)} data-testid="button-add-to-cart"
                className={`w-full mt-4 text-sm font-semibold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${
                  justAdded ? "bg-emerald-500 text-white shadow-emerald-500/40"
                            : "bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                }`}>
                {justAdded ? <><Check className="w-4 h-4" /> Добавлено в корзину</>
                           : <>В корзину · {product.price.toLocaleString("ru")} ₽</>}
              </button>
              <div className="text-[10px] text-slate-500 mt-3 leading-relaxed">
                Доставка завтра · Возврат 30 дней · Гарантия 1 год
              </div>
            </div>
          </div>
        )}

        {view === "cart" && (
          <div className="p-4">
            <div className="font-display font-bold text-base text-slate-900 mb-3">Корзина</div>
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <div className="text-xs">Корзина пуста</div>
                <button onClick={() => setView("catalog")} className="mt-4 text-[11px] font-semibold text-cyan-600">
                  К покупкам →
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {cartItems.map((it) => (
                    <div key={it.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200/70">
                      <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${it.p.bg} overflow-hidden flex-shrink-0`}>
                        <img src={it.p.image} alt={it.p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">{it.p.brand}</div>
                        <div className="text-[12px] font-bold text-slate-900 leading-tight truncate">{it.p.name}</div>
                        <div className="text-[11px] font-black text-slate-900 tabular-nums mt-0.5">{(it.p.price * it.qty).toLocaleString("ru")} ₽</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setCart((c) => c.map((x) => (x.id === it.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)))}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-600">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-bold tabular-nums w-5 text-center">{it.qty}</span>
                        <button onClick={() => setCart((c) => c.map((x) => (x.id === it.id ? { ...x, qty: x.qty + 1 } : x)))}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-600">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => setCart((c) => c.filter((x) => x.id !== it.id))} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1"><span>Товары</span><span className="tabular-nums">{total.toLocaleString("ru")} ₽</span></div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1"><span>Доставка</span><span>Бесплатно</span></div>
                  <div className="flex justify-between font-black text-sm text-slate-900 mt-2 pt-2 border-t border-slate-200/70"><span>Итого</span><span className="tabular-nums">{total.toLocaleString("ru")} ₽</span></div>
                </div>
                <button className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold py-3 rounded-lg shadow-md flex items-center justify-center gap-2">
                  Оформить заказ <ArrowUpRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   02 · INTERACTIVE BUSINESS LANDING (multi-page nav)
   ============================================================ */

function BusinessInteractive() {
  const [page, setPage] = useState<"home" | "services" | "cases" | "contact">("home");
  const nav = [
    { k: "home", l: "Главная" },
    { k: "services", l: "Услуги" },
    { k: "cases", l: "Кейсы" },
    { k: "contact", l: "Контакты" },
  ] as const;

  return (
    <div className="h-[640px] flex flex-col bg-white">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/70 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">A</span>
          </div>
          <span className="font-display font-black text-sm text-slate-900 tracking-tight">ALTITUDE</span>
        </div>
        <div className="flex gap-1">
          {nav.map((n) => (
            <button key={n.k} onClick={() => setPage(n.k)} data-testid={`nav-${n.k}`}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                page === n.k ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}>{n.l}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {page === "home" && (
          <>
            <div className="relative px-5 py-7 bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-300/35 to-violet-400/20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[9px] text-slate-700 font-semibold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Доступны для новых проектов
                </div>
                <h4 className="font-display font-black text-[22px] text-slate-900 leading-[1.1] tracking-tight mb-2.5">
                  Создаём digital,<br />который <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">влияет</span>
                </h4>
                <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                  Дизайн, разработка и продвижение для брендов, которые думают о завтра.
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage("contact")} className="bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-2 rounded-md flex items-center gap-1.5 hover:bg-cyan-600 transition-colors">
                    Начать проект <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button onClick={() => setPage("cases")} className="text-[11px] font-semibold text-slate-700 px-3.5 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50">
                    Кейсы
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-slate-200/70 bg-slate-50/60">
              <div className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-2">Нам доверяют</div>
              <div className="flex items-center justify-between text-[12px] font-black text-slate-400">
                <span>HUAWEI</span><span>KASPI</span><span>X5</span><span>YOTA</span>
              </div>
            </div>
            <div className="grid grid-cols-3 px-5 py-3 border-t border-slate-200/70">
              {[{ v: "200+", l: "проектов" }, { v: "15", l: "лет" }, { v: "★ 4.9", l: "рейтинг" }].map((s, i) => (
                <div key={i} className={`text-center ${i < 2 ? "border-r border-slate-200/70" : ""}`}>
                  <div className="text-sm font-black bg-gradient-to-br from-cyan-600 to-violet-600 bg-clip-text text-transparent tabular-nums">{s.v}</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">О нас</div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Команда из 28 человек: продуктовые дизайнеры, инженеры и маркетологи. С 2009 года помогаем компаниям расти через digital-продукты.
              </p>
            </div>
          </>
        )}

        {page === "services" && (
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Услуги</div>
            <h4 className="font-display font-black text-[20px] text-slate-900 leading-tight mb-4">Что мы делаем</h4>
            <div className="space-y-3">
              {[
                { i: Briefcase, t: "Стратегия и брендинг", d: "Позиционирование, нейминг, фирменный стиль и гайдлайны.", c: "from-cyan-500 to-blue-500" },
                { i: Award, t: "Дизайн продуктов", d: "UX/UI для веба, мобильных и десктоп-приложений.", c: "from-violet-500 to-purple-500" },
                { i: Users, t: "Разработка", d: "Frontend, backend и нативные приложения от MVP до Enterprise.", c: "from-rose-500 to-amber-500" },
                { i: TrendingUp, t: "Маркетинг и рост", d: "SEO, performance, контент и аналитика.", c: "from-emerald-500 to-teal-500" },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200/70 hover:border-slate-300 transition-colors">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.c} flex items-center justify-center flex-shrink-0`}>
                    <s.i className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-slate-900">{s.t}</div>
                    <div className="text-[10px] text-slate-600 leading-relaxed mt-0.5">{s.d}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "cases" && (
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Кейсы</div>
            <h4 className="font-display font-black text-[20px] text-slate-900 leading-tight mb-4">Избранные работы</h4>
            <div className="space-y-3">
              {[
                { t: "HUAWEI Cloud", c: "Tech", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80", r: "+47% conversion" },
                { t: "KASPI Marketplace", c: "E-commerce", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80", r: "1.2M MAU" },
                { t: "YOTA Mobile", c: "Telecom", img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80", r: "App Store · 4.8" },
              ].map((c, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-slate-200/70 group/case cursor-pointer">
                  <div className="relative aspect-[16/8] bg-slate-100 overflow-hidden">
                    <img src={c.img} alt={c.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/case:scale-105" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">{c.c}</div>
                      <div className="text-[12px] font-bold text-slate-900">{c.t}</div>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">{c.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "contact" && (
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Контакты</div>
            <h4 className="font-display font-black text-[20px] text-slate-900 leading-tight mb-4">Расскажите о проекте</h4>
            <div className="space-y-2.5">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 mb-1 block">Имя</label>
                <input type="text" placeholder="Иван Петров" className="w-full text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-600 mb-1 block">Email</label>
                <input type="email" placeholder="ivan@company.ru" className="w-full text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-600 mb-1 block">О задаче</label>
                <textarea rows={3} placeholder="Кратко опишите проект..." className="w-full text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none resize-none" />
              </div>
              <button className="w-full bg-slate-900 text-white text-[12px] font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 hover:bg-cyan-600 transition-colors">
                Отправить <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200/70 space-y-2 text-[11px] text-slate-700">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /> hello@altitude.io</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /> +7 (495) 123-45-67</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Москва, Большая Никитская 12</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   03 · INTERACTIVE BANKING DASHBOARD
   ============================================================ */

function BankInteractive() {
  const [tab, setTab] = useState<"home" | "cards" | "ops" | "stats">("home");

  return (
    <div className="h-[640px] flex flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500" />
          <span className="font-display font-black text-sm tracking-tight">SBR · PRO</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 rounded-md px-2 py-1 text-[10px] text-slate-300 border border-white/10">
            <Search className="w-3 h-3" /><span>Поиск</span>
          </div>
          <div className="relative">
            <Bell className="w-3.5 h-3.5 text-slate-300" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-[10px] font-black text-white">А</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll-dark">
        {tab === "home" && (
          <div className="px-5 py-5 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1 font-semibold">Общий баланс</div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[26px] font-black tabular-nums leading-none">1 248 500 ₽</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />+5.2%</span>
              </div>
              <div className="relative h-[72px] mb-5">
                <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="bf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" /></linearGradient>
                    <linearGradient id="bs" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient>
                  </defs>
                  {[20, 40, 60].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#fff" strokeOpacity="0.05" strokeDasharray="2 4" />)}
                  <path d="M0,62 Q30,55 50,52 T100,42 T150,46 T200,30 T240,18 T300,8 L300,80 L0,80 Z" fill="url(#bf)" />
                  <path d="M0,62 Q30,55 50,52 T100,42 T150,46 T200,30 T240,18 T300,8" fill="none" stroke="url(#bs)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="240" cy="18" r="4" fill="#22d3ee" />
                  <circle cx="240" cy="18" r="9" fill="#22d3ee" opacity="0.3" />
                </svg>
                <div className="absolute -top-1 left-[78%] -translate-x-1/2 bg-cyan-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">+124k</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[{ l: "Перевести", I: ArrowUpRight }, { l: "Пополнить", I: ArrowDownLeft }, { l: "Платежи", I: CreditCard }].map((a, i) => (
                  <button key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                      <a.I className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-200">{a.l}</span>
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Последние</div>
              <div className="space-y-2">
                {[
                  { n: "Зарплата", s: "ООО Технологии", a: "+85 000", p: true, I: ArrowDownLeft },
                  { n: "Wildberries", s: "Покупка", a: "−12 540", p: false, I: ShoppingBag },
                  { n: "Stars Coffee", s: "Кофейня", a: "−350", p: false, I: Coffee },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.p ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-slate-300 border border-white/10"}`}>
                      <tx.I className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold leading-none">{tx.n}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">{tx.s}</div>
                    </div>
                    <div className={`text-[11px] font-black tabular-nums ${tx.p ? "text-emerald-400" : "text-white"}`}>{tx.a} ₽</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "cards" && (
          <div className="p-5 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Мои карты</div>
            {[
              { name: "PLATINUM", num: "•••• 4892", bal: "248 500 ₽", grad: "from-slate-700 via-slate-800 to-slate-950" },
              { name: "TRAVEL", num: "•••• 1027", bal: "1 000 000 ₽", grad: "from-cyan-500 via-blue-600 to-violet-700" },
              { name: "CASHBACK", num: "•••• 7741", bal: "0 ₽", grad: "from-amber-400 via-orange-500 to-rose-500" },
            ].map((c, i) => (
              <div key={i} className={`relative rounded-2xl p-4 bg-gradient-to-br ${c.grad} text-white shadow-xl overflow-hidden`}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                <div className="flex justify-between items-start relative">
                  <div className="text-[10px] font-black tracking-widest uppercase opacity-80">{c.name}</div>
                  <div className="w-7 h-5 rounded bg-gradient-to-br from-amber-300 to-amber-500 opacity-90" />
                </div>
                <div className="text-[14px] font-mono mt-5 tracking-widest">{c.num}</div>
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <div className="text-[8px] uppercase opacity-60">Доступно</div>
                    <div className="text-base font-black tabular-nums leading-none mt-0.5">{c.bal}</div>
                  </div>
                  <div className="text-[10px] font-black italic">VISA</div>
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 text-[11px] font-semibold rounded-lg border border-dashed border-white/20 text-slate-400 hover:bg-white/5 transition-colors">
              + Заказать новую карту
            </button>
          </div>
        )}

        {tab === "ops" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Операции</div>
              <button className="text-[10px] text-cyan-400 font-bold flex items-center gap-1"><Filter className="w-3 h-3" />Фильтр</button>
            </div>
            {[
              { d: "Сегодня", items: [
                { n: "Зарплата", s: "ООО Технологии", a: "+85 000", p: true, I: ArrowDownLeft, t: "12:34" },
                { n: "Wildberries", s: "Маркетплейс", a: "−12 540", p: false, I: ShoppingBag, t: "10:22" },
              ]},
              { d: "Вчера", items: [
                { n: "Stars Coffee", s: "Кофейня", a: "−350", p: false, I: Coffee, t: "18:05" },
                { n: "Яндекс.Такси", s: "Транспорт", a: "−420", p: false, I: ArrowUpRight, t: "13:11" },
                { n: "Кешбэк апрель", s: "Бонус", a: "+1 240", p: true, I: ArrowDownLeft, t: "09:30" },
              ]},
              { d: "29 апреля", items: [
                { n: "Spotify", s: "Подписка", a: "−299", p: false, I: Coffee, t: "20:00" },
                { n: "Магнит", s: "Продукты", a: "−2 870", p: false, I: ShoppingBag, t: "19:14" },
                { n: "Аптека 36.6", s: "Здоровье", a: "−1 120", p: false, I: ShoppingBag, t: "11:08" },
              ]},
            ].map((g, i) => (
              <div key={i} className="mb-4">
                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold mb-2">{g.d}</div>
                <div className="space-y-1.5">
                  {g.items.map((tx, j) => (
                    <div key={j} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.p ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-300"}`}>
                        <tx.I className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold leading-none">{tx.n}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5">{tx.s} · {tx.t}</div>
                      </div>
                      <div className={`text-[11px] font-black tabular-nums ${tx.p ? "text-emerald-400" : "text-white"}`}>{tx.a} ₽</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "stats" && (
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Аналитика · Апрель</div>
            <div className="text-[24px] font-black tabular-nums leading-none mb-1">62 458 ₽</div>
            <div className="text-[10px] text-slate-500 mb-4">расходы за месяц</div>
            <div className="space-y-2.5">
              {[
                { c: "Продукты", v: 18420, p: 30, color: "from-cyan-500 to-blue-500" },
                { c: "Транспорт", v: 12100, p: 19, color: "from-violet-500 to-purple-500" },
                { c: "Кафе и рестораны", v: 9870, p: 16, color: "from-rose-500 to-pink-500" },
                { c: "Развлечения", v: 7250, p: 12, color: "from-amber-500 to-orange-500" },
                { c: "Подписки", v: 4990, p: 8, color: "from-emerald-500 to-teal-500" },
                { c: "Прочее", v: 9828, p: 15, color: "from-slate-500 to-slate-600" },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-slate-300 font-medium">{c.c}</span>
                    <span className="text-white font-bold tabular-nums">{c.v.toLocaleString("ru")} ₽</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all duration-500`} style={{ width: `${c.p * 2.8}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex border-t border-white/10 bg-slate-950">
        {[
          { k: "home", l: "Главная", I: Home },
          { k: "cards", l: "Карты", I: CreditCard },
          { k: "ops", l: "Операции", I: BarChart3 },
          { k: "stats", l: "Аналитика", I: TrendingUp },
        ].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k as "home" | "cards" | "ops" | "stats")} data-testid={`bank-tab-${t.k}`}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${
              tab === t.k ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
            }`}>
            <t.I className="w-4 h-4" strokeWidth={2.2} />
            <span className="text-[9px] font-semibold">{t.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

const mockupByOriginalIndex: Record<number, { Mockup: () => JSX.Element; Icon: LucideIcon; gradient: string }> = {
  0: { Mockup: EcomInteractive, Icon: Store, gradient: "from-rose-500 to-amber-500" },
  1: { Mockup: BusinessInteractive, Icon: Building2, gradient: "from-cyan-500 to-blue-500" },
  3: { Mockup: BankInteractive, Icon: Landmark, gradient: "from-violet-500 to-indigo-600" },
};

export function WhatWeBuildSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const visible = t.whatWeBuild.items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => i !== 2);

  return (
    <section ref={ref} className="py-16 md:py-24 relative" data-testid="section-what-we-build">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/25 backdrop-blur-sm mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase bg-gradient-to-r from-cyan-700 to-violet-700 bg-clip-text text-transparent font-semibold">
              Направления разработки
            </span>
          </div>
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} data-testid="heading-what-we-build">
            {t.whatWeBuild.title}
          </h2>
          <p className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {t.whatWeBuild.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-6 items-stretch">
          {visible.map(({ item, i }, displayIdx) => {
            const entry = mockupByOriginalIndex[i];
            if (!entry) return null;
            const { Mockup, Icon, gradient } = entry;
            return (
              <div key={i}
                className={`group flex flex-col transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: isVisible ? `${200 + displayIdx * 100}ms` : "0ms" }}
                data-testid={`card-direction-${i}`}>
                <div className="flex items-center gap-3 mb-4 px-1 min-h-[3.5rem]">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-md shadow-slate-900/10`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold text-slate-800 tracking-tight leading-tight" data-testid={`text-direction-title-${i}`}>
                    {item.title}
                  </h3>
                </div>
                <div className="relative rounded-2xl bg-white border border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-15px_rgba(6,182,212,0.4)] hover:border-cyan-400/50 flex-1 flex flex-col">
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
