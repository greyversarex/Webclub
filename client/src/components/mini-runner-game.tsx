import { useEffect, useRef, useState, useCallback } from "react";

type GameState = "idle" | "running" | "dead";

const W = 480;
const H = 120;
const GROUND = H - 20;
const GRAVITY = 0.6;
const JUMP_V = -11;
const BASE_SPEED = 4;

interface Obstacle {
  x: number;
  w: number;
  h: number;
}

interface Player {
  x: number;
  y: number;
  vy: number;
  onGround: boolean;
}

export function MiniRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const playerRef = useRef<Player>({ x: 60, y: GROUND, vy: 0, onGround: true });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const tickRef = useRef(0);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const jump = useCallback(() => {
    const p = playerRef.current;
    if (p.onGround && stateRef.current === "running") {
      p.vy = JUMP_V;
      p.onGround = false;
    }
  }, []);

  const startGame = useCallback(() => {
    playerRef.current = { x: 60, y: GROUND, vy: 0, onGround: true };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    frameRef.current = 0;
    tickRef.current = 0;
    stateRef.current = "running";
    setGameState("running");
    setScore(0);
  }, []);

  const endGame = useCallback(() => {
    stateRef.current = "dead";
    setGameState("dead");
    setBest((b) => Math.max(b, scoreRef.current));
    cancelAnimationFrame(rafRef.current);
  }, []);

  // Keyboard listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (stateRef.current === "running") jump();
        else if (stateRef.current === "dead") startGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, startGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const spawnInterval = () => Math.floor(60 + Math.random() * 60);
    let nextSpawn = spawnInterval();

    const draw = () => {
      if (stateRef.current !== "running") return;

      frameRef.current++;
      tickRef.current++;
      const speed = BASE_SPEED + Math.floor(scoreRef.current / 300) * 0.5;

      // Update player
      const p = playerRef.current;
      p.vy += GRAVITY;
      p.y += p.vy;
      if (p.y >= GROUND) {
        p.y = GROUND;
        p.vy = 0;
        p.onGround = true;
      }

      // Spawn obstacles
      if (tickRef.current >= nextSpawn) {
        tickRef.current = 0;
        nextSpawn = spawnInterval();
        const h = 14 + Math.floor(Math.random() * 14);
        obstaclesRef.current.push({ x: W + 10, w: 10, h });
      }

      // Move obstacles
      obstaclesRef.current = obstaclesRef.current
        .map((o) => ({ ...o, x: o.x - speed }))
        .filter((o) => o.x + o.w > 0);

      // Collision
      const px = p.x, py = p.y, pw = 20, ph = 22;
      for (const o of obstaclesRef.current) {
        const oy = GROUND - o.h + 20;
        if (
          px + pw - 4 > o.x + 2 &&
          px + 4 < o.x + o.w - 2 &&
          py + ph - 2 > oy
        ) {
          endGame();
          return;
        }
      }

      // Score
      scoreRef.current++;
      if (frameRef.current % 6 === 0) setScore(Math.floor(scoreRef.current / 6));

      // Draw
      ctx.clearRect(0, 0, W, H);

      // Ground
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 22);
      ctx.lineTo(W, GROUND + 22);
      ctx.stroke();

      // Ground dashes
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      for (let i = (frameRef.current * speed) % 40; i < W; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, GROUND + 22);
        ctx.lineTo(i + 20, GROUND + 22);
        ctx.stroke();
      }

      // Draw robot (player)
      const rx = p.x, ry = p.y;
      // Body
      ctx.fillStyle = "#7c3aed";
      ctx.beginPath();
      ctx.roundRect(rx + 2, ry + 8, 16, 14, 3);
      ctx.fill();
      // Head
      ctx.fillStyle = "#8b5cf6";
      ctx.beginPath();
      ctx.roundRect(rx + 3, ry, 14, 11, 3);
      ctx.fill();
      // Eyes
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(rx + 7, ry + 5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rx + 13, ry + 5, 2, 0, Math.PI * 2);
      ctx.fill();
      // Legs (animated)
      const legSwing = p.onGround ? Math.sin(frameRef.current * 0.3) * 3 : 0;
      ctx.fillStyle = "#6d28d9";
      ctx.fillRect(rx + 4, ry + 21, 5, 5 + legSwing);
      ctx.fillRect(rx + 11, ry + 21, 5, 5 - legSwing);
      // Antenna
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx + 10, ry);
      ctx.lineTo(rx + 10, ry - 4);
      ctx.stroke();
      ctx.fillStyle = "#f0abfc";
      ctx.beginPath();
      ctx.arc(rx + 10, ry - 5, 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw obstacles (bugs 🐛)
      for (const o of obstaclesRef.current) {
        const oy = GROUND + 22 - o.h;
        // Bug body
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.roundRect(o.x, oy, o.w, o.h, 2);
        ctx.fill();
        // Bug stripes
        ctx.fillStyle = "#b91c1c";
        for (let s = 4; s < o.h; s += 6) {
          ctx.fillRect(o.x, oy + s, o.w, 2);
        }
        // Bug eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(o.x + 3, oy + 2, 1.5, 0, Math.PI * 2);
        ctx.arc(o.x + o.w - 3, oy + 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Score
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.floor(scoreRef.current / 6)}`, W - 8, 16);
      ctx.textAlign = "left";

      rafRef.current = requestAnimationFrame(draw);
    };

    if (gameState === "running") {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState, endGame]);

  // Draw idle / dead screen
  useEffect(() => {
    if (gameState === "running") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);

    // Ground
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, GROUND + 22);
    ctx.lineTo(W, GROUND + 22);
    ctx.stroke();

    // Static robot
    const rx = 60, ry = GROUND;
    ctx.fillStyle = gameState === "dead" ? "#dc2626" : "#7c3aed";
    ctx.beginPath();
    ctx.roundRect(rx + 2, ry + 8, 16, 14, 3);
    ctx.fill();
    ctx.fillStyle = gameState === "dead" ? "#ef4444" : "#8b5cf6";
    ctx.beginPath();
    ctx.roundRect(rx + 3, ry, 14, 11, 3);
    ctx.fill();
    // Eyes (X if dead)
    if (gameState === "dead") {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx + 5, ry + 3); ctx.lineTo(rx + 9, ry + 7);
      ctx.moveTo(rx + 9, ry + 3); ctx.lineTo(rx + 5, ry + 7);
      ctx.moveTo(rx + 11, ry + 3); ctx.lineTo(rx + 15, ry + 7);
      ctx.moveTo(rx + 15, ry + 3); ctx.lineTo(rx + 11, ry + 7);
      ctx.stroke();
    } else {
      ctx.fillStyle = "#22d3ee";
      ctx.beginPath();
      ctx.arc(rx + 7, ry + 5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rx + 13, ry + 5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#6d28d9";
    ctx.fillRect(rx + 4, ry + 21, 5, 5);
    ctx.fillRect(rx + 11, ry + 21, 5, 5);
  }, [gameState]);

  return (
    <div className="mt-5 rounded-xl overflow-hidden border border-slate-200/80 bg-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/60 bg-slate-50/60">
        <span className="text-[11px] font-mono text-slate-400 select-none">
          {gameState === "running" ? "▶ running..." : gameState === "dead" ? "💀 game over" : "🤖 robot_runner.exe"}
        </span>
        <div className="flex items-center gap-3">
          {best > 0 && (
            <span className="text-[11px] font-mono text-slate-400">best: {best}</span>
          )}
          {gameState === "running" && (
            <span className="text-[11px] font-mono text-violet-600 font-bold">{score}</span>
          )}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full block cursor-pointer"
        style={{ imageRendering: "pixelated", maxHeight: 120 }}
        onClick={() => {
          if (gameState === "running") jump();
          else startGame();
        }}
        data-testid="canvas-mini-game"
      />

      <div className="px-3 py-2 flex items-center justify-between border-t border-slate-200/60 bg-slate-50/60">
        {gameState === "idle" && (
          <button
            onClick={startGame}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
            data-testid="button-game-play"
          >
            ▶ Play
          </button>
        )}
        {gameState === "dead" && (
          <button
            onClick={startGame}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
            data-testid="button-game-restart"
          >
            ↺ Restart
          </button>
        )}
        {gameState === "running" && (
          <span className="text-[11px] text-slate-400 select-none">пробел / клик — прыжок</span>
        )}
        <span className="text-[11px] text-slate-400 select-none ml-auto">прыгай через баги 🐛</span>
      </div>
    </div>
  );
}
