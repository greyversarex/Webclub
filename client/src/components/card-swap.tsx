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
  cardDistance = 64,
  verticalDistance = 72,
  skew = 3,
  pauseOnHover = true,
  reduced = false,
}: CardSwapProps) {
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const effCardDistance = isMobile ? 0 : cardDistance;
  const effVerticalDistance = isMobile ? 44 : verticalDistance;
  const containerHeight = isMobile ? 430 : 560;
  const stackHeight = isMobile ? 300 : 360;
  const stackTranslateY = isMobile ? 56 : 80;
  const stackWidth = isMobile ? "min(100%, 340px)" : "min(100%, 540px)";
  const baseSkew = isMobile ? 0 : skew;

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: "1100px", height: containerHeight }}
      onMouseEnter={() => !isMobile && pauseOnHover && setPaused(true)}
      onMouseLeave={() => !isMobile && pauseOnHover && setPaused(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{ width: stackWidth, height: stackHeight, transform: `translateY(${stackTranslateY}px)` }}
        >
          {cards.map((card, i) => {
            const slot = order.indexOf(i);
            const isFront = slot === 0;
            const tx = slot * effCardDistance;
            const ty = -slot * effVerticalDistance;
            const tz = -slot * 60;
            const effSkew = reduced ? 0 : baseSkew;
            return (
              <div
                key={card.id}
                className="absolute left-0 top-0 w-full rounded-2xl overflow-hidden"
                style={{
                  height: stackHeight,
                  transform: `translate3d(${tx}px, ${ty}px, ${tz}px) skewY(${effSkew}deg)`,
                  zIndex: total - slot,
                  transition: reduced
                    ? "none"
                    : "transform 0.9s cubic-bezier(0.34, 1.4, 0.5, 1), opacity 0.6s ease",
                  opacity: slot > 2 ? 0 : 1,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background:
                    "linear-gradient(160deg, rgba(20,22,40,0.92), rgba(8,9,20,0.96))",
                  boxShadow: isFront
                    ? "0 30px 70px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(139,92,246,0.18)"
                    : "0 20px 50px -24px rgba(0,0,0,0.7)",
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
