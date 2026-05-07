import { useState, useEffect } from "react";
import {
  Wifi, BatteryFull, Home, Send, MessageCircle, User, ArrowUpRight, ArrowDownLeft,
  Search, Bell, Settings, BarChart3, Users, Package, ChevronRight, Filter,
  TrendingUp, MoreHorizontal, Plus, CreditCard, Phone as PhoneIcon,
  Star, ChevronLeft, Check, Smartphone, Monitor,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

/* ============================================================
   PHONE — interactive multi-screen app
   ============================================================ */

function InteractivePhone() {
  const [screen, setScreen] = useState<"home" | "pay" | "chat" | "profile">("home");
  const [chatOpenId, setChatOpenId] = useState<string | null>(null);

  const contacts = [
    { id: "c1", name: "Анна К.", initials: "АК", color: "from-rose-400 to-pink-500" },
    { id: "c2", name: "Иван П.", initials: "ИП", color: "from-cyan-400 to-blue-500" },
    { id: "c3", name: "Дмитрий", initials: "Д", color: "from-violet-400 to-purple-500" },
    { id: "c4", name: "Мама", initials: "М", color: "from-amber-400 to-orange-500" },
    { id: "c5", name: "Папа", initials: "П", color: "from-emerald-400 to-teal-500" },
  ];

  const chats = [
    { id: "ch1", name: "Анна К.", last: "Ок, до завтра!", time: "14:32", unread: 2, color: "from-rose-400 to-pink-500", initials: "АК", online: true },
    { id: "ch2", name: "Команда дизайна", last: "Макс: Готово ✓", time: "13:08", unread: 0, color: "from-cyan-400 to-blue-500", initials: "КД", online: false },
    { id: "ch3", name: "Иван", last: "Перевёл, проверь", time: "12:14", unread: 1, color: "from-violet-400 to-purple-500", initials: "И", online: true },
    { id: "ch4", name: "Семья", last: "Мама: Привет, родной!", time: "вчера", unread: 0, color: "from-amber-400 to-orange-500", initials: "С", online: false },
    { id: "ch5", name: "Алексей", last: "Звонил тебе", time: "вчера", unread: 0, color: "from-emerald-400 to-teal-500", initials: "А", online: false },
  ];

  const [hovered, setHovered] = useState(false);
  const [autoStep, setAutoStep] = useState(0);

  useEffect(() => {
    if (hovered) return;
    const delays = [3000, 2500, 2000, 3000, 2500];
    const cycle = autoStep % 5;
    const timer = setTimeout(() => {
      switch (cycle) {
        case 0: setScreen("pay"); setChatOpenId(null); break;
        case 1: setScreen("chat"); setChatOpenId(null); break;
        case 2: setChatOpenId("ch1"); break;
        case 3: setScreen("profile"); setChatOpenId(null); break;
        case 4: setScreen("home"); setChatOpenId(null); break;
      }
      setAutoStep(s => s + 1);
    }, delays[cycle]);
    return () => clearTimeout(timer);
  }, [hovered, autoStep]);

  return (
    <div className="relative mx-auto" style={{ width: 290 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative bg-slate-950 rounded-[42px] p-[6px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-b-2xl z-20" />
        <div className="absolute -left-[3px] top-24 w-[3px] h-12 bg-slate-800 rounded-l" />
        <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-slate-800 rounded-r" />

        <div className="relative w-full h-[600px] bg-white rounded-[36px] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center px-7 pt-3.5 pb-1 text-[10px] font-bold text-slate-900 z-10">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <Wifi className="w-3 h-3" strokeWidth={3} />
              <BatteryFull className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scroll">
            {screen === "home" && (
              <div>
                <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 px-5 pt-3 pb-12 text-white relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-violet-300/30 blur-xl" />
                  <div className="flex items-center justify-between relative">
                    <div>
                      <div className="text-[11px] opacity-80 font-medium">Доброе утро 👋</div>
                      <div className="text-lg font-black leading-tight">Алексей</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-sm font-black">А</div>
                  </div>
                </div>

                <div className="px-4 -mt-9 relative z-10">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Баланс</span>
                      <span className="text-[10px] text-emerald-600 font-bold">▲ 5.2%</span>
                    </div>
                    <div className="text-[22px] font-black text-slate-900 tabular-nums leading-none mb-3">248 500 ₽</div>
                    <svg viewBox="0 0 120 30" className="w-full h-7">
                      <defs>
                        <linearGradient id="ph-spark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,22 L15,18 L30,20 L45,12 L60,15 L75,8 L90,10 L105,4 L120,6 L120,30 L0,30 Z" fill="url(#ph-spark)" />
                      <path d="M0,22 L15,18 L30,20 L45,12 L60,15 L75,8 L90,10 L105,4 L120,6" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="105" cy="4" r="2.5" fill="#06b6d4" />
                    </svg>
                  </div>
                </div>

                <div className="px-4 mt-5">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { l: "Отправить", I: Send, c: "from-cyan-500 to-blue-500", t: "pay" as const },
                      { l: "Запросить", I: ArrowDownLeft, c: "from-violet-500 to-purple-500" },
                      { l: "Оплатить", I: CreditCard, c: "from-rose-500 to-pink-500" },
                      { l: "Ещё", I: Plus, c: "from-amber-500 to-orange-500" },
                    ].map((a, i) => (
                      <button key={i} onClick={() => a.t && setScreen(a.t)} className="flex flex-col items-center gap-1.5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.c} flex items-center justify-center shadow-md`}>
                          <a.I className="w-5 h-5 text-white" strokeWidth={2.2} />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-700">{a.l}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-4 mt-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Активность</span>
                    <span className="text-[10px] text-cyan-600 font-bold">Все →</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { n: "Анна К.", s: "Перевод", a: "+5 000 ₽", p: true, color: "bg-rose-100 text-rose-700" },
                      { n: "Spotify", s: "Подписка", a: "−299 ₽", p: false, color: "bg-emerald-100 text-emerald-700" },
                      { n: "Wildberries", s: "Покупка", a: "−2 540 ₽", p: false, color: "bg-violet-100 text-violet-700" },
                      { n: "Зарплата", s: "Технологии", a: "+85 000 ₽", p: true, color: "bg-cyan-100 text-cyan-700" },
                      { n: "АЗС Лукойл", s: "Топливо", a: "−2 200 ₽", p: false, color: "bg-amber-100 text-amber-700" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${tx.color} flex items-center justify-center text-[11px] font-black`}>
                          {tx.n[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold text-slate-900 leading-tight">{tx.n}</div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{tx.s}</div>
                        </div>
                        <div className={`text-[12px] font-black tabular-nums ${tx.p ? "text-emerald-600" : "text-slate-700"}`}>{tx.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {screen === "pay" && (
              <div className="px-5 py-4">
                <div className="font-display font-black text-[20px] text-slate-900 mb-1">Перевод</div>
                <div className="text-[11px] text-slate-500 mb-4">Выберите получателя</div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input placeholder="Поиск по контактам" className="w-full pl-9 pr-3 py-2.5 text-[12px] bg-slate-100 rounded-lg border-0 focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-cyan-500" />
                </div>

                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2.5">Часто</div>
                <div className="flex gap-3 mb-5 overflow-x-auto -mx-1 px-1 pb-1">
                  {contacts.map((c) => (
                    <button key={c.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-sm font-black shadow-md`}>{c.initials}</div>
                      <span className="text-[9px] text-slate-700 font-semibold max-w-[56px] truncate">{c.name}</span>
                    </button>
                  ))}
                </div>

                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2.5">Все контакты</div>
                <div className="space-y-1">
                  {[
                    ...contacts,
                    { id: "c6", name: "Сергей М.", initials: "СМ", color: "from-slate-500 to-slate-700" },
                    { id: "c7", name: "Ольга", initials: "О", color: "from-pink-400 to-rose-500" },
                    { id: "c8", name: "Виктория", initials: "В", color: "from-cyan-500 to-teal-500" },
                  ].map((c) => (
                    <button key={c.id} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0`}>{c.initials}</div>
                      <div className="flex-1 text-left">
                        <div className="text-[12px] font-bold text-slate-900">{c.name}</div>
                        <div className="text-[9px] text-slate-500">+7 (9••) •••-••-••</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {screen === "chat" && !chatOpenId && (
              <div>
                <div className="px-5 pt-3 pb-3">
                  <div className="font-display font-black text-[22px] text-slate-900">Чаты</div>
                </div>
                <div className="px-3 mb-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input placeholder="Поиск" className="w-full pl-9 pr-3 py-2 text-[12px] bg-slate-100 rounded-lg focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-0">
                  {chats.map((c) => (
                    <button key={c.id} onClick={() => setChatOpenId(c.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-sm font-black`}>{c.initials}</div>
                        {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <div className="text-[13px] font-bold text-slate-900">{c.name}</div>
                          <div className="text-[9px] text-slate-400">{c.time}</div>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <div className="text-[11px] text-slate-500 truncate flex-1 pr-2">{c.last}</div>
                          {c.unread > 0 && (
                            <span className="bg-cyan-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{c.unread}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {screen === "chat" && chatOpenId && (() => {
              const chat = chats.find((c) => c.id === chatOpenId)!;
              return (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200/70 bg-white">
                    <button onClick={() => setChatOpenId(null)}><ChevronLeft className="w-5 h-5 text-cyan-600" /></button>
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-white text-[12px] font-black`}>{chat.initials}</div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-slate-900 leading-tight">{chat.name}</div>
                      <div className="text-[9px] text-emerald-600 mt-0.5">{chat.online ? "online" : "был(а) недавно"}</div>
                    </div>
                    <PhoneIcon className="w-4 h-4 text-cyan-600" />
                  </div>

                  <div className="flex-1 px-3 py-3 space-y-2 bg-slate-50 overflow-y-auto">
                    <div className="text-center text-[9px] text-slate-400 my-1">Сегодня</div>
                    <div className="flex"><div className="bg-white px-3 py-1.5 rounded-2xl rounded-bl-sm text-[11px] text-slate-800 max-w-[80%] shadow-sm">Привет! Ты завтра свободен?</div></div>
                    <div className="flex justify-end"><div className="bg-cyan-500 text-white px-3 py-1.5 rounded-2xl rounded-br-sm text-[11px] max-w-[80%]">Да, после 5 могу</div></div>
                    <div className="flex"><div className="bg-white px-3 py-1.5 rounded-2xl rounded-bl-sm text-[11px] text-slate-800 max-w-[80%] shadow-sm">Окей, тогда в 18:00 в кофейне на Никольской</div></div>
                    <div className="flex justify-end"><div className="bg-cyan-500 text-white px-3 py-1.5 rounded-2xl rounded-br-sm text-[11px] max-w-[80%]">Договорились 👌</div></div>
                    <div className="flex"><div className="bg-white px-3 py-1.5 rounded-2xl rounded-bl-sm text-[11px] text-slate-800 max-w-[80%] shadow-sm">{chat.last}</div></div>
                  </div>
                  <div className="px-3 py-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
                    <input placeholder="Сообщение..." className="flex-1 text-[12px] px-3 py-2 bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                    <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {screen === "profile" && (
              <div>
                <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-rose-500 px-5 pt-4 pb-14 text-white relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/15 blur-2xl" />
                  <div className="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-1">Профиль</div>
                </div>
                <div className="px-5 -mt-10 relative">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-white text-xl font-black mx-auto -mt-10 border-4 border-white shadow-md">А</div>
                    <div className="font-display font-bold text-[16px] text-slate-900 mt-2">Алексей Иванов</div>
                    <div className="text-[10px] text-slate-500">Premium · с 2021</div>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100">
                      <div><div className="text-sm font-black text-slate-900">128</div><div className="text-[9px] text-slate-500">друзей</div></div>
                      <div><div className="text-sm font-black text-slate-900">4.9</div><div className="text-[9px] text-slate-500">★ рейтинг</div></div>
                      <div><div className="text-sm font-black text-slate-900">3</div><div className="text-[9px] text-slate-500">карты</div></div>
                    </div>
                  </div>
                </div>
                <div className="px-3 mt-4">
                  {[
                    { l: "Уведомления", I: Bell },
                    { l: "Безопасность", I: Settings },
                    { l: "Платёжные карты", I: CreditCard },
                    { l: "Тарифы и бонусы", I: Star },
                    { l: "Помощь", I: MessageCircle },
                  ].map((it, i) => (
                    <button key={i} className="w-full flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <it.I className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left text-[12px] font-semibold text-slate-800">{it.l}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex border-t border-slate-100 bg-white">
            {[
              { k: "home", l: "Главная", I: Home },
              { k: "pay", l: "Оплатить", I: Send },
              { k: "chat", l: "Чаты", I: MessageCircle },
              { k: "profile", l: "Профиль", I: User },
            ].map((tab) => (
              <button key={tab.k} onClick={() => { setScreen(tab.k as "home" | "pay" | "chat" | "profile"); setChatOpenId(null); }}
                data-testid={`phone-tab-${tab.k}`}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${
                  screen === tab.k ? "text-cyan-600" : "text-slate-400"
                }`}>
                <tab.I className="w-4 h-4" strokeWidth={screen === tab.k ? 2.5 : 2} />
                <span className="text-[9px] font-semibold">{tab.l}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center pb-1.5 bg-white">
            <div className="w-24 h-1 bg-slate-900 rounded-full opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LAPTOP — interactive desktop CRM
   ============================================================ */

function InteractiveLaptop() {
  const [view, setView] = useState<"dashboard" | "orders" | "customers" | "analytics" | "settings">("dashboard");
  const [hovered, setHovered] = useState(false);
  const [autoStep, setAutoStep] = useState(0);

  useEffect(() => {
    if (hovered) return;
    const views: ("dashboard" | "orders" | "customers" | "analytics" | "settings")[] = ["orders", "customers", "analytics", "settings", "dashboard"];
    const delays = [3000, 2500, 2500, 2500, 3500];
    const timer = setTimeout(() => {
      setView(views[autoStep % 5]);
      setAutoStep(s => s + 1);
    }, delays[autoStep % 5]);
    return () => clearTimeout(timer);
  }, [hovered, autoStep]);

  return (
    <div className="relative w-full max-w-[760px] mx-auto" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="bg-slate-900 rounded-t-2xl p-2.5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.4)]">
        <div className="flex justify-center pb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>

        <div className="bg-white rounded-md overflow-hidden flex h-[572px]">
          {/* Sidebar */}
          <div className="w-[160px] bg-slate-50 border-r border-slate-200/70 flex flex-col">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-200/70">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-violet-500" />
              <span className="font-display font-black text-[13px] text-slate-900 tracking-tight">CRM Pro</span>
            </div>
            <div className="flex-1 px-2 py-3 space-y-0.5">
              {[
                { k: "dashboard", l: "Дашборд", I: BarChart3 },
                { k: "orders", l: "Заказы", I: Package, badge: 12 },
                { k: "customers", l: "Клиенты", I: Users },
                { k: "analytics", l: "Аналитика", I: TrendingUp },
                { k: "settings", l: "Настройки", I: Settings },
              ].map((it) => (
                <button key={it.k} onClick={() => setView(it.k as "dashboard" | "orders" | "customers" | "analytics" | "settings")}
                  data-testid={`laptop-nav-${it.k}`}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-left transition-colors ${
                    view === it.k ? "bg-gradient-to-r from-cyan-500/15 to-violet-500/15 text-slate-900 border border-cyan-500/30" : "text-slate-600 hover:bg-slate-100 border border-transparent"
                  }`}>
                  <it.I className={`w-3.5 h-3.5 ${view === it.k ? "text-cyan-600" : "text-slate-500"}`} />
                  <span className="text-[11px] font-semibold flex-1">{it.l}</span>
                  {it.badge && <span className="text-[8px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full">{it.badge}</span>}
                </button>
              ))}
            </div>
            <div className="px-3 py-3 border-t border-slate-200/70 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-[10px] font-black">А</div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-slate-900 truncate">Алексей И.</div>
                <div className="text-[8px] text-slate-500">Администратор</div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-200/70 bg-white">
              <div className="text-[12px] font-bold text-slate-900">
                {view === "dashboard" && "Обзор"}
                {view === "orders" && "Заказы"}
                {view === "customers" && "Клиенты"}
                {view === "analytics" && "Аналитика"}
                {view === "settings" && "Настройки"}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  <input placeholder="Поиск..." className="text-[10px] pl-6 pr-3 py-1.5 bg-slate-100 rounded-md w-40 focus:outline-none focus:bg-slate-50 focus:ring-1 focus:ring-cyan-500" />
                </div>
                <div className="relative">
                  <Bell className="w-3.5 h-3.5 text-slate-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll p-5">
              {view === "dashboard" && (
                <div>
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {[
                      { l: "Выручка", v: "₽ 4.2M", d: "+12.5%", up: true, c: "from-cyan-500 to-blue-500" },
                      { l: "Заказы", v: "1 247", d: "+8.2%", up: true, c: "from-violet-500 to-purple-500" },
                      { l: "Клиенты", v: "2 893", d: "+15.4%", up: true, c: "from-emerald-500 to-teal-500" },
                      { l: "Конверсия", v: "3.8%", d: "−0.3%", up: false, c: "from-rose-500 to-pink-500" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-lg border border-slate-200/70 p-3">
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{s.l}</div>
                        <div className="text-[16px] font-black text-slate-900 tabular-nums leading-none mt-1">{s.v}</div>
                        <div className="flex items-center gap-1 mt-1.5">
                          <div className={`w-5 h-5 rounded bg-gradient-to-br ${s.c} flex items-center justify-center`}>
                            {s.up ? <ArrowUpRight className="w-3 h-3 text-white" /> : <ArrowDownLeft className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-[9px] font-bold ${s.up ? "text-emerald-600" : "text-rose-600"}`}>{s.d}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-lg border border-slate-200/70 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-[11px] font-bold text-slate-900">Выручка по дням</div>
                          <div className="text-[9px] text-slate-500">Последние 7 дней</div>
                        </div>
                        <div className="flex gap-1">
                          {["Неделя", "Месяц", "Год"].map((t, i) => (
                            <button key={t} className={`text-[9px] px-2 py-1 rounded font-semibold ${i === 0 ? "bg-slate-900 text-white" : "text-slate-500"}`}>{t}</button>
                          ))}
                        </div>
                      </div>
                      <svg viewBox="0 0 300 100" className="w-full h-32">
                        <defs>
                          <linearGradient id="lap-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" /><stop offset="100%" stopColor="#06b6d4" stopOpacity="0" /></linearGradient>
                          <linearGradient id="lap-stroke" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient>
                        </defs>
                        {[20, 40, 60, 80].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="2 4" />)}
                        <path d="M0,80 L43,65 L86,72 L128,45 L171,55 L214,30 L257,38 L300,15 L300,100 L0,100 Z" fill="url(#lap-fill)" />
                        <path d="M0,80 L43,65 L86,72 L128,45 L171,55 L214,30 L257,38 L300,15" fill="none" stroke="url(#lap-stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {[[0, 80], [43, 65], [86, 72], [128, 45], [171, 55], [214, 30], [257, 38], [300, 15]].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#06b6d4" strokeWidth="2" />
                        ))}
                      </svg>
                      <div className="flex justify-between text-[8px] text-slate-400 mt-2 font-semibold">
                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => <span key={d}>{d}</span>)}
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200/70 p-4">
                      <div className="text-[11px] font-bold text-slate-900 mb-3">Топ товары</div>
                      <div className="space-y-2.5">
                        {[
                          { n: "Air Max 270", v: "247 шт.", p: 92 },
                          { n: "Smart Watch", v: "189 шт.", p: 70 },
                          { n: "Кожаная куртка", v: "124 шт.", p: 46 },
                          { n: "Сумка-тоут", v: "87 шт.", p: 32 },
                        ].map((p, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-[10px] mb-1">
                              <span className="font-semibold text-slate-700 truncate pr-1">{p.n}</span>
                              <span className="text-slate-500 tabular-nums flex-shrink-0">{p.v}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" style={{ width: `${p.p}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200/70 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/70 bg-slate-50">
                      <div className="text-[11px] font-bold text-slate-900">Последние заказы</div>
                      <button className="text-[10px] text-cyan-600 font-bold">Все →</button>
                    </div>
                    <div>
                      {[
                        { n: "#10472", c: "Анна Кузнецова", a: "8 990 ₽", st: "Оплачен", color: "bg-emerald-100 text-emerald-700" },
                        { n: "#10471", c: "Иван Петров", a: "15 450 ₽", st: "В пути", color: "bg-cyan-100 text-cyan-700" },
                        { n: "#10470", c: "Дмитрий С.", a: "3 200 ₽", st: "Новый", color: "bg-violet-100 text-violet-700" },
                        { n: "#10469", c: "Ольга Новикова", a: "27 800 ₽", st: "Возврат", color: "bg-rose-100 text-rose-700" },
                      ].map((o, i) => (
                        <div key={i} className="flex items-center px-4 py-2 border-b border-slate-100 last:border-0 text-[10px] hover:bg-slate-50 transition-colors">
                          <div className="w-20 font-mono font-bold text-slate-700">{o.n}</div>
                          <div className="flex-1 font-semibold text-slate-900 truncate">{o.c}</div>
                          <div className="w-24 text-right tabular-nums font-bold text-slate-900">{o.a}</div>
                          <div className="w-24 text-right">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${o.color}`}>{o.st}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {view === "orders" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] text-slate-500">Всего: <span className="font-black text-slate-900">1 247</span></div>
                    <div className="flex gap-2">
                      <button className="text-[10px] px-2.5 py-1 rounded border border-slate-200 text-slate-600 flex items-center gap-1 hover:bg-slate-50"><Filter className="w-3 h-3" /> Фильтр</button>
                      <button className="text-[10px] px-2.5 py-1 rounded bg-slate-900 text-white flex items-center gap-1 hover:bg-cyan-600 transition-colors"><Plus className="w-3 h-3" /> Новый</button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200/70 overflow-hidden">
                    <div className="grid grid-cols-12 px-4 py-2 bg-slate-50 border-b border-slate-200/70 text-[9px] uppercase tracking-wider font-bold text-slate-500">
                      <div className="col-span-2">Заказ</div>
                      <div className="col-span-3">Клиент</div>
                      <div className="col-span-2">Дата</div>
                      <div className="col-span-2 text-right">Сумма</div>
                      <div className="col-span-2 text-center">Статус</div>
                      <div className="col-span-1"></div>
                    </div>
                    {[
                      { n: "#10472", c: "Анна Кузнецова", d: "сегодня, 14:32", a: "8 990 ₽", st: "Оплачен", color: "bg-emerald-100 text-emerald-700" },
                      { n: "#10471", c: "Иван Петров", d: "сегодня, 12:08", a: "15 450 ₽", st: "В пути", color: "bg-cyan-100 text-cyan-700" },
                      { n: "#10470", c: "Дмитрий Соколов", d: "сегодня, 10:41", a: "3 200 ₽", st: "Новый", color: "bg-violet-100 text-violet-700" },
                      { n: "#10469", c: "Ольга Новикова", d: "вчера, 19:20", a: "27 800 ₽", st: "Возврат", color: "bg-rose-100 text-rose-700" },
                      { n: "#10468", c: "Сергей Михайлов", d: "вчера, 16:55", a: "12 100 ₽", st: "Оплачен", color: "bg-emerald-100 text-emerald-700" },
                      { n: "#10467", c: "Виктория Лебедева", d: "вчера, 14:30", a: "5 670 ₽", st: "Доставлен", color: "bg-slate-100 text-slate-700" },
                      { n: "#10466", c: "Алексей Орлов", d: "29 апр, 18:11", a: "9 320 ₽", st: "Оплачен", color: "bg-emerald-100 text-emerald-700" },
                      { n: "#10465", c: "Мария Жукова", d: "29 апр, 11:42", a: "44 990 ₽", st: "В пути", color: "bg-cyan-100 text-cyan-700" },
                    ].map((o, i) => (
                      <div key={i} className="grid grid-cols-12 px-4 py-2 border-b border-slate-100 last:border-0 text-[10px] hover:bg-slate-50 items-center transition-colors">
                        <div className="col-span-2 font-mono font-bold text-slate-700">{o.n}</div>
                        <div className="col-span-3 font-semibold text-slate-900 truncate">{o.c}</div>
                        <div className="col-span-2 text-slate-500">{o.d}</div>
                        <div className="col-span-2 text-right tabular-nums font-bold text-slate-900">{o.a}</div>
                        <div className="col-span-2 text-center"><span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${o.color}`}>{o.st}</span></div>
                        <div className="col-span-1 text-right"><MoreHorizontal className="w-3 h-3 text-slate-400 inline" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "customers" && (
                <div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { l: "Всего клиентов", v: "2 893" },
                      { l: "Активные за месяц", v: "1 124" },
                      { l: "Средний чек", v: "8 740 ₽" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-lg border border-slate-200/70 p-3">
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{s.l}</div>
                        <div className="text-[16px] font-black text-slate-900 tabular-nums mt-1">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { n: "Анна Кузнецова", e: "anna@mail.ru", o: 12, sum: "84 200 ₽", c: "from-rose-400 to-pink-500", in: "АК" },
                      { n: "Иван Петров", e: "ivan.petrov@gmail.com", o: 8, sum: "67 540 ₽", c: "from-cyan-400 to-blue-500", in: "ИП" },
                      { n: "Дмитрий Соколов", e: "d.sokolov@yandex.ru", o: 5, sum: "32 100 ₽", c: "from-violet-400 to-purple-500", in: "ДС" },
                      { n: "Ольга Новикова", e: "olga.n@outlook.com", o: 21, sum: "184 800 ₽", c: "from-amber-400 to-orange-500", in: "ОН" },
                      { n: "Сергей Михайлов", e: "smikh@bk.ru", o: 3, sum: "18 100 ₽", c: "from-emerald-400 to-teal-500", in: "СМ" },
                      { n: "Виктория Л.", e: "vlebed@mail.ru", o: 7, sum: "44 670 ₽", c: "from-slate-500 to-slate-700", in: "ВЛ" },
                    ].map((u, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200/70 hover:border-cyan-400 transition-colors">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${u.c} flex items-center justify-center text-white text-[12px] font-black flex-shrink-0`}>{u.in}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold text-slate-900 truncate">{u.n}</div>
                          <div className="text-[9px] text-slate-500 truncate">{u.e}</div>
                          <div className="text-[10px] mt-1 flex items-center gap-2">
                            <span className="text-slate-700 font-semibold">{u.o} заказов</span>
                            <span className="text-slate-300">·</span>
                            <span className="font-bold text-slate-900 tabular-nums">{u.sum}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "analytics" && (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Апрель 2026</div>
                  <div className="text-[24px] font-black text-slate-900 tabular-nums leading-none mb-1">₽ 4 248 500</div>
                  <div className="text-[10px] text-emerald-600 font-bold mb-4">▲ +12.5% относительно марта</div>
                  <div className="rounded-lg border border-slate-200/70 p-4 mb-4">
                    <div className="text-[11px] font-bold text-slate-900 mb-3">Выручка по каналам</div>
                    <div className="flex items-end gap-2 h-32">
                      {[
                        { l: "Сайт", v: 90, c: "from-cyan-500 to-blue-500" },
                        { l: "Мобильное", v: 72, c: "from-violet-500 to-purple-500" },
                        { l: "Маркетплейс", v: 58, c: "from-rose-500 to-pink-500" },
                        { l: "Розница", v: 45, c: "from-amber-500 to-orange-500" },
                        { l: "Партнёры", v: 32, c: "from-emerald-500 to-teal-500" },
                        { l: "Прочее", v: 18, c: "from-slate-500 to-slate-700" },
                      ].map((b, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <div className={`w-full bg-gradient-to-t ${b.c} rounded-t-md transition-all duration-500`} style={{ height: `${b.v}%` }} />
                          <div className="text-[8px] text-slate-500 font-semibold">{b.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200/70 p-4">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Конверсия</div>
                      <div className="text-[22px] font-black text-slate-900 tabular-nums leading-none mt-1">3.8%</div>
                      <div className="text-[9px] text-rose-600 font-bold mt-1">▼ 0.3%</div>
                    </div>
                    <div className="rounded-lg border border-slate-200/70 p-4">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Возвраты</div>
                      <div className="text-[22px] font-black text-slate-900 tabular-nums leading-none mt-1">2.1%</div>
                      <div className="text-[9px] text-emerald-600 font-bold mt-1">▼ 0.4%</div>
                    </div>
                  </div>
                </div>
              )}

              {view === "settings" && (
                <div className="max-w-md">
                  <div className="text-[11px] font-bold text-slate-900 mb-3">Профиль компании</div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Название</label>
                      <input type="text" defaultValue="ООО Технологии" className="w-full mt-1 text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Email</label>
                      <input type="email" defaultValue="hello@tech.ru" className="w-full mt-1 text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-slate-500">Часовой пояс</label>
                      <input type="text" defaultValue="GMT+3 · Москва" className="w-full mt-1 text-[11px] px-3 py-2 rounded-md border border-slate-200 focus:border-cyan-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 mt-6 mb-3">Уведомления</div>
                  <div className="space-y-2.5">
                    {[
                      { l: "Новые заказы", on: true },
                      { l: "Возвраты и отмены", on: true },
                      { l: "Еженедельный отчёт", on: false },
                      { l: "Маркетинговые подсказки", on: false },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <span className="text-[11px] text-slate-800 font-medium">{s.l}</span>
                        <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${s.on ? "bg-cyan-500" : "bg-slate-300"}`}>
                          <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${s.on ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-5 bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 hover:bg-cyan-600 transition-colors">
                    Сохранить <Check className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Laptop base */}
      <div className="relative h-3 bg-gradient-to-b from-slate-300 to-slate-400 mx-[-12px] rounded-b-[14px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-slate-500 rounded-b-lg" />
      </div>
    </div>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

export function AppsShowcaseSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 md:py-24 relative" data-testid="section-apps-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} data-testid="heading-apps-showcase">
            {t.appsShowcase.title}
          </h2>
          <p className={`text-slate-900 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {t.appsShowcase.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className={`lg:col-span-4 flex flex-col items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} style={{ transitionDelay: "200ms" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-md mb-6">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2.4} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold">
                {t.appsShowcase.phoneLabel}
              </span>
            </div>
            <InteractivePhone />
          </div>

          <div className={`lg:col-span-8 flex flex-col items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} style={{ transitionDelay: "350ms" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white shadow-md mb-6">
              <Monitor className="w-3.5 h-3.5 text-violet-400" strokeWidth={2.4} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold">
                {t.appsShowcase.laptopLabel}
              </span>
            </div>
            <InteractiveLaptop />
          </div>
        </div>
      </div>
    </section>
  );
}
