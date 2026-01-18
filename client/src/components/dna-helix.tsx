import { useEffect, useState } from "react";

const codeSymbols = ["</>", "{}", "[]", "=>", "01", "&&", "||", "++", "==", "!=", "//", "**"];

interface HelixNode {
  id: number;
  symbol: string;
  delay: number;
}

export function DNAHelix({ side }: { side: "left" | "right" }) {
  const [nodes, setNodes] = useState<HelixNode[]>([]);

  useEffect(() => {
    const generated: HelixNode[] = [];
    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        delay: i * 0.15,
      });
    }
    setNodes(generated);
  }, []);

  return (
    <div 
      className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-16 pointer-events-none z-10 hidden xl:flex flex-col items-center justify-center overflow-hidden opacity-30`}
    >
      <div className="relative h-[600px] w-full">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: `${node.id * 30}px`,
              animation: `dnaRotate${side === "left" ? "Left" : "Right"} 4s ease-in-out infinite`,
              animationDelay: `${node.delay}s`,
            }}
          >
            <span 
              className="font-mono text-xs text-cyan-600 whitespace-nowrap"
              style={{
                animation: `dnaFade 4s ease-in-out infinite`,
                animationDelay: `${node.delay}s`,
              }}
            >
              {node.symbol}
            </span>
          </div>
        ))}
        <div 
          className={`absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent`}
          style={{
            animation: `dnaPulse 2s ease-in-out infinite`,
          }}
        />
      </div>
    </div>
  );
}
