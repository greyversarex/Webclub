import { useState, useEffect, useCallback } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"coding" | "forming" | "complete">("coding");
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [opacity, setOpacity] = useState(1);
  
  const targetText = "WEBCLUB";
  const chars = "01アイウエオカキクケコサシスセソタチツテト0123456789";
  
  const getRandomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  useEffect(() => {
    const initialChars = Array(targetText.length).fill("").map(() => getRandomChar());
    setDisplayText(initialChars);

    const codingDuration = 1500;
    const startTime = Date.now();

    const scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / codingDuration, 1);
      
      setDisplayText(prev => {
        return prev.map((_, index) => {
          const charProgress = (index + 1) / targetText.length;
          if (progress >= charProgress * 0.8) {
            return targetText[index];
          }
          return getRandomChar();
        });
      });

      if (progress >= 1) {
        clearInterval(scrambleInterval);
        setDisplayText(targetText.split(""));
        setPhase("forming");
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [getRandomChar]);

  useEffect(() => {
    if (phase === "forming") {
      const timer = setTimeout(() => {
        setPhase("complete");
        setOpacity(0);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0f1c] transition-opacity duration-500"
      style={{ opacity }}
      data-testid="intro-animation"
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <MatrixColumn key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-1 md:gap-2">
          {displayText.map((char, index) => (
            <span
              key={index}
              className={`
                text-4xl md:text-6xl lg:text-8xl font-bold font-mono
                transition-all duration-300
                ${char === targetText[index] 
                  ? "text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" 
                  : "text-[#3B82F6]/60"
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-sm md:text-base text-gray-400 font-mono">
            IT-разработка
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MatrixColumn({ index }: { index: number }) {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const columnChars = Array.from({ length: 25 }, () => 
      Math.random() > 0.5 ? String(Math.floor(Math.random() * 10)) : ""
    );
    setChars(columnChars);

    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        const randomIndex = Math.floor(Math.random() * newChars.length);
        newChars[randomIndex] = Math.random() > 0.3 
          ? String(Math.floor(Math.random() * 10))
          : "";
        return newChars;
      });
    }, 100 + Math.random() * 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 flex flex-col items-center text-[#3B82F6]/20 font-mono text-sm"
      style={{
        left: `${(index / 20) * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="opacity-50"
          style={{
            opacity: Math.random() * 0.5 + 0.1,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
