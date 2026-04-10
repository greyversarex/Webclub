import { useState } from "react";
import { Phone, X } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

const contacts = [
  {
    id: "phone",
    label: "+992 876 220 100",
    href: "tel:+992876220100",
    icon: Phone,
    bg: "bg-emerald-500 hover:bg-emerald-400",
    shadow: "shadow-emerald-500/40",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/+992876220100",
    icon: SiTelegram,
    bg: "bg-sky-500 hover:bg-sky-400",
    shadow: "shadow-sky-500/40",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://we.me/876200100",
    icon: SiWhatsapp,
    bg: "bg-green-500 hover:bg-green-400",
    shadow: "shadow-green-500/40",
  },
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.id !== "phone" ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={`link-contact-${contact.id}`}
              className="flex items-center gap-3 group"
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              <span className="bg-slate-900/80 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-lg">
                {contact.label}
              </span>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${contact.shadow} ${contact.bg} transition-all duration-200 shadow-[0_4px_14px_0] active:scale-95`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="button-floating-contact"
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300
          bg-gradient-to-br from-violet-600 to-cyan-500
          shadow-[0_4px_20px_rgba(139,92,246,0.5)]
          hover:shadow-[0_6px_28px_rgba(139,92,246,0.65)]
          hover:scale-105 active:scale-95`}
        aria-label="Связаться с нами"
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}
