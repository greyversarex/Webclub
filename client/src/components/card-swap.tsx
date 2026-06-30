import { useEffect, useRef, useState, type ReactNode } from "react";

export interface CardSwapItem {
  id: string;
  content: ReactNode;
}

interface CardSwapProps {
  cards: CardSwapItem[];
  delay?: number;
  cardDistance?: number;
  verticalDistance?: number;
  skew?: number;
  pauseOnHover?: boolean;
  reduced?: boolean;
}

export function CardSwap({
  cards,
  delay = 4000,
  cardDistance = 56,
  verticalDistance = 64,
  skew = 6,
  pauseOnHover = true,
  reduced = false,
}: CardSwapProps) {
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setOrder(cards.map((_, i) => i));
  }, [cards.length]);

  useEffect(() => {
    if (reduced || paused || cards.length < 2) return;
    timerRef.current = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.shift();
        if (front !== undefined) next.push(front);
        return next;
      });
    }, delay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [delay, paused, reduced, cards.length]);

  const total = cards.length;

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: "1100px", height: 440 }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{ width: "min(100%, 460px)", height: 300, transform: "translateY(120px)" }}
        >
          {cards.map((card, i) => {
            const slot = order.indexOf(i);
            const isFront = slot === 0;
            const tx = slot * cardDistance;
            const ty = -slot * verticalDistance;
            const tz = -slot * 60;
            const effSkew = reduced ? 0 : skew;
            return (
              <div
                key={card.id}
                className="absolute left-0 top-0 w-full rounded-2xl overflow-hidden will-change-transform"
                style={{
                  height: 300,
                  transform: `translate3d(${tx}px, ${ty}px, ${tz}px) skewY(${effSkew}deg)`,
                  zIndex: total - slot,
                  transition: reduced
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.34, 1.4, 0.5, 1), opacity 0.6s ease",
                  opacity: slot > 3 ? 0 : 1,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background:
                    "linear-gradient(160deg, rgba(20,22,40,0.92), rgba(8,9,20,0.96))",
                  boxShadow: isFront
                    ? "0 30px 70px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(139,92,246,0.18)"
                    : "0 20px 50px -24px rgba(0,0,0,0.7)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {card.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardSwap;
