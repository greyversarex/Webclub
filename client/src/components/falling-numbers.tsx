import { useEffect, useState } from "react";

interface FallingNumber {
  id: number;
  char: string;
  left: number;
  delay: number;
  duration: number;
}

export function FallingNumbers({ direction }: { direction: "down" | "up" }) {
  const [numbers, setNumbers] = useState<FallingNumber[]>([]);

  useEffect(() => {
    const chars = "01";
    const generated: FallingNumber[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: (i / count) * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      });
    }
    setNumbers(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {numbers.map((num) => (
        <span
          key={num.id}
          className="absolute font-mono text-xs text-cyan-600/40"
          style={{
            left: `${num.left}%`,
            animation: `fall${direction === "down" ? "Down" : "Up"} ${num.duration}s linear infinite`,
            animationDelay: `${num.delay}s`,
            ...(direction === "down" ? { top: "-20px" } : { bottom: "-20px" }),
          }}
        >
          {num.char}
        </span>
      ))}
    </div>
  );
}
