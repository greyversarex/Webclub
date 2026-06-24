import { useState, useRef, useEffect } from "react";
import { X, Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";

function AIAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-12 h-12" : "w-9 h-9";
  const inner = size === "sm" ? 12 : size === "lg" ? 20 : 15;
  return (
    <div className={`${dims} relative flex-shrink-0`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-cyan-500 animate-pulse opacity-60 blur-[3px]" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/40">
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="8" width="16" height="12" rx="3" fill="white" fillOpacity="0.95"/>
          <rect x="9" y="4" width="6" height="5" rx="2" fill="white" fillOpacity="0.95"/>
          <circle cx="9" cy="13" r="2" fill="#7c3aed"/>
          <circle cx="15" cy="13" r="2" fill="#7c3aed"/>
          <rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="#7c3aed" fillOpacity="0.7"/>
          <line x1="12" y1="4" x2="12" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="3" r="1.2" fill="#a78bfa"/>
          <line x1="4" y1="13" x2="1.5" y2="13" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="20" y1="13" x2="22.5" y2="13" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TEASER_DELAY_MS = 8000;
const TEASER_DISMISS_KEY = "webclub-chat-teaser-dismissed";

export function ChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.chatTeaser.message,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t.chatTeaser.message }];
      }
      return prev;
    });
  }, [t.chatTeaser.message]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(TEASER_DISMISS_KEY) === "1";
    if (dismissed || isOpen) return;

    const timer = setTimeout(() => {
      if (!isOpen) setShowTeaser(true);
    }, TEASER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dismissTeaser = () => {
    setShowTeaser(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TEASER_DISMISS_KEY, "1");
    }
  };

  const openChat = () => {
    dismissTeaser();
    setIsOpen(true);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMessage]);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Request failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + data.content,
                };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Извините, сервис временно недоступен. Попробуйте позже.",
        };
        return updated;
      });
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-slate-200 bg-white flex flex-col overflow-hidden"
          style={{ height: "480px" }}
          data-testid="chat-widget-panel"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <AIAvatar size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">WebClub AI</p>
              <p className="text-xs text-violet-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                IT-консультант
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-7 w-7"
              onClick={() => setIsOpen(false)}
              data-testid="button-chat-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                data-testid={`chat-message-${i}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {msg.role === "assistant" ? (
                    <AIAvatar size="sm" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                      : "bg-violet-600 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.content || (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex gap-2 items-end">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напишите вопрос..."
                className="min-h-[40px] max-h-[120px] resize-none text-sm border-slate-200 focus-visible:ring-violet-400"
                rows={1}
                disabled={isLoading}
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                className="h-10 w-10 flex-shrink-0 bg-violet-600 hover:bg-violet-700"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                data-testid="button-chat-send"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 text-center">
              Enter — отправить · Shift+Enter — новая строка
            </p>
          </div>
        </div>
      )}

      {showTeaser && !isOpen && (
        <div
          className="fixed bottom-24 left-6 z-40 max-w-[300px] animate-in fade-in slide-in-from-bottom-3 duration-500"
          data-testid="chat-teaser"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border border-violet-100 p-4 pr-8">
            <button
              onClick={dismissTeaser}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
              data-testid="button-teaser-close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2 mb-2">
              <AIAvatar size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800">WebClub AI</p>
                <p className="text-[10px] text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  online
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-800 mb-1">{t.chatTeaser.greeting}</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">{t.chatTeaser.message}</p>
            <button
              onClick={openChat}
              className="w-full text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 transition-colors"
              data-testid="button-teaser-open"
            >
              {t.chatTeaser.cta}
            </button>
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-violet-100 rotate-45" />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          dismissTeaser();
          setIsOpen((prev) => !prev);
        }}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300
          bg-gradient-to-br from-violet-600 to-cyan-500
          shadow-[0_4px_20px_rgba(139,92,246,0.5)]
          hover:shadow-[0_6px_28px_rgba(139,92,246,0.65)]
          hover:scale-105 active:scale-95
          ${showTeaser && !isOpen ? "animate-bounce-subtle" : ""}`}
        data-testid="button-chat-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="8" width="16" height="12" rx="3" fill="white" fillOpacity="0.95"/>
              <rect x="9" y="4" width="6" height="5" rx="2" fill="white" fillOpacity="0.95"/>
              <circle cx="9" cy="13" r="2" fill="#7c3aed"/>
              <circle cx="15" cy="13" r="2" fill="#7c3aed"/>
              <rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="#7c3aed" fillOpacity="0.7"/>
              <line x1="12" y1="4" x2="12" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="3" r="1.2" fill="#a78bfa"/>
              <line x1="4" y1="13" x2="1.5" y2="13" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="20" y1="13" x2="22.5" y2="13" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
            {showTeaser && (
              <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-40" />
            )}
          </>
        )}
      </button>
    </>
  );
}
