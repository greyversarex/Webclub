import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
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
          content: "Извините, произошла ошибка. Попробуйте ещё раз.",
        };
        return updated;
      });
    } finally {
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
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">WebClub AI</p>
              <p className="text-xs text-slate-300">IT-консультант</p>
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
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-violet-100 text-violet-600"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
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
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/30">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
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
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-slate-700 hover:bg-slate-800 rotate-0"
            : "bg-violet-600 hover:bg-violet-700"
        } ${showTeaser && !isOpen ? "animate-bounce-subtle" : ""}`}
        data-testid="button-chat-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
            {showTeaser && (
              <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-40" />
            )}
          </>
        )}
      </button>
    </>
  );
}
