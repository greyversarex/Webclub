import { useState, useEffect, useCallback, useRef } from "react";

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
        {Array.from({ length: 15 }).map((_, i) => (
          <FallingColumn key={`fall-${i}`} index={i} total={15} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <RisingColumn key={`rise-${i}`} index={i} total={15} />
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

function FallingColumn({ index, total }: { index: number; total: number }) {
  const [chars, setChars] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef(Date.now());
  const speedRef = useRef(0.4 + Math.random() * 0.8);
  const delayRef = useRef(Math.random() * 1000);

  useEffect(() => {
    const charCount = 30;
    const columnChars = Array.from({ length: charCount }, () => 
      Math.random() > 0.4 ? String(Math.floor(Math.random() * 10)) : ""
    );
    setChars(columnChars);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current - delayRef.current;
      if (elapsed > 0) {
        const newOffset = (elapsed * speedRef.current * 0.05) % 100;
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const charInterval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        const randomIndex = Math.floor(Math.random() * newChars.length);
        newChars[randomIndex] = Math.random() > 0.3 
          ? String(Math.floor(Math.random() * 10))
          : "";
        return newChars;
      });
    }, 80 + Math.random() * 120);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(charInterval);
    };
  }, []);

  const leftPosition = ((index + 0.5) / total) * 100;

  return (
    <div
      className="absolute flex flex-col items-center font-mono text-sm pointer-events-none"
      style={{
        left: `${leftPosition}%`,
        top: 0,
        transform: `translateY(${offset - 50}%)`,
        height: '150%',
      }}
    >
      {chars.map((char, i) => {
        const brightness = Math.max(0, 1 - (i / chars.length) * 0.8);
        return (
          <span
            key={i}
            className="leading-6"
            style={{
              color: `rgba(59, 130, 246, ${brightness * 0.4})`,
              textShadow: brightness > 0.7 ? '0 0 8px rgba(59, 130, 246, 0.6)' : 'none',
            }}
          >
            {char || '\u00A0'}
          </span>
        );
      })}
    </div>
  );
}

function RisingColumn({ index, total }: { index: number; total: number }) {
  const [chars, setChars] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef(Date.now());
  const speedRef = useRef(0.3 + Math.random() * 0.6);
  const delayRef = useRef(Math.random() * 800);

  useEffect(() => {
    const charCount = 30;
    const columnChars = Array.from({ length: charCount }, () => 
      Math.random() > 0.5 ? String(Math.floor(Math.random() * 10)) : ""
    );
    setChars(columnChars);

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current - delayRef.current;
      if (elapsed > 0) {
        const newOffset = (elapsed * speedRef.current * 0.04) % 100;
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const charInterval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        const randomIndex = Math.floor(Math.random() * newChars.length);
        newChars[randomIndex] = Math.random() > 0.4 
          ? String(Math.floor(Math.random() * 10))
          : "";
        return newChars;
      });
    }, 100 + Math.random() * 150);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(charInterval);
    };
  }, []);

  const leftPosition = ((index + 0.5) / total) * 100 + 3;

  return (
    <div
      className="absolute flex flex-col-reverse items-center font-mono text-sm pointer-events-none"
      style={{
        left: `${leftPosition}%`,
        bottom: 0,
        transform: `translateY(${50 - offset}%)`,
        height: '150%',
      }}
    >
      {chars.map((char, i) => {
        const brightness = Math.max(0, 1 - (i / chars.length) * 0.8);
        return (
          <span
            key={i}
            className="leading-6"
            style={{
              color: `rgba(59, 130, 246, ${brightness * 0.3})`,
              textShadow: brightness > 0.8 ? '0 0 6px rgba(59, 130, 246, 0.4)' : 'none',
            }}
          >
            {char || '\u00A0'}
          </span>
        );
      })}
    </div>
  );
}
