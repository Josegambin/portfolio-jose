"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundFX } from "./soundEffects";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface SnakeGameProps {
  onScoreChange?: (score: number, highScore: number) => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function SnakeGame({ onScoreChange }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [score, setScore] = useState(0);

  const GRID_SIZE = 20; // 20x20 cells
  const CELL_SIZE = 20; // 400x400 canvas

  const gameRef = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ],
    direction: "UP" as Direction,
    nextDirection: "UP" as Direction,
    food: { x: 10, y: 5 },
    score: 0,
    highScore: typeof window !== "undefined" ? Number(localStorage.getItem("snake_high_score") || 0) : 0,
    state: "ready" as "ready" | "playing" | "gameover",
    lastTickTime: 0,
    speed: 120, // ms per tick
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string }>,
  });

  const spawnFood = useCallback(() => {
    const g = gameRef.current;
    let newFood: { x: number; y: number };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = g.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    g.food = newFood;
  }, []);

  const changeDirection = useCallback((newDir: Direction) => {
    const g = gameRef.current;
    if (g.state === "ready") {
      g.state = "playing";
      setGameState("playing");
    }
    if (g.state === "gameover") return;

    const current = g.direction;
    if (newDir === "UP" && current !== "DOWN") g.nextDirection = "UP";
    if (newDir === "DOWN" && current !== "UP") g.nextDirection = "DOWN";
    if (newDir === "LEFT" && current !== "RIGHT") g.nextDirection = "LEFT";
    if (newDir === "RIGHT" && current !== "LEFT") g.nextDirection = "RIGHT";
  }, []);

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    g.direction = "UP";
    g.nextDirection = "UP";
    g.score = 0;
    g.speed = 120;
    g.particles = [];
    g.state = "ready";
    spawnFood();
    setScore(0);
    setGameState("ready");
    onScoreChange?.(0, g.highScore);
  }, [spawnFood, onScoreChange]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "KeyW", "KeyS", "KeyA", "KeyD"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === "Space") {
        if (gameRef.current.state === "ready") {
          gameRef.current.state = "playing";
          setGameState("playing");
        } else if (gameRef.current.state === "gameover") {
          resetGame();
        }
        return;
      }

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          changeDirection("UP");
          break;
        case "ArrowDown":
        case "KeyS":
          changeDirection("DOWN");
          break;
        case "ArrowLeft":
        case "KeyA":
          changeDirection("LEFT");
          break;
        case "ArrowRight":
        case "KeyD":
          changeDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, resetGame]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    const loop = (timestamp: number) => {
      const g = gameRef.current;

      // Check tick time
      if (g.state === "playing" && timestamp - g.lastTickTime > g.speed) {
        g.lastTickTime = timestamp;
        g.direction = g.nextDirection;

        // Calculate new head
        const head = { ...g.snake[0] };
        if (g.direction === "UP") head.y -= 1;
        if (g.direction === "DOWN") head.y += 1;
        if (g.direction === "LEFT") head.x -= 1;
        if (g.direction === "RIGHT") head.x += 1;

        // Collision with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          triggerGameOver();
        }
        // Collision with self
        else if (g.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
          triggerGameOver();
        } else {
          // Move snake
          g.snake.unshift(head);

          // Check food
          if (head.x === g.food.x && head.y === g.food.y) {
            g.score += 10;
            setScore(g.score);
            soundFX.playEat();

            // Spawn particles
            for (let i = 0; i < 12; i++) {
              const ang = Math.random() * Math.PI * 2;
              const spd = Math.random() * 3 + 1;
              g.particles.push({
                x: head.x * CELL_SIZE + CELL_SIZE / 2,
                y: head.y * CELL_SIZE + CELL_SIZE / 2,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                alpha: 1,
                color: "#10b981"
              });
            }

            if (g.score > g.highScore) {
              g.highScore = g.score;
              try {
                localStorage.setItem("snake_high_score", g.highScore.toString());
              } catch {}
            }
            onScoreChange?.(g.score, g.highScore);

            // Speed up slightly
            g.speed = Math.max(65, 120 - Math.floor(g.score / 30) * 5);
            spawnFood();
          } else {
            g.snake.pop();
          }
        }
      }

      function triggerGameOver() {
        g.state = "gameover";
        setGameState("gameover");
        soundFX.playGameOver();
      }

      // DRAWING
      ctx.fillStyle = "#09100d";
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Food
      const fx = g.food.x * CELL_SIZE + CELL_SIZE / 2;
      const fy = g.food.y * CELL_SIZE + CELL_SIZE / 2;
      ctx.save();
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#34d399";
      ctx.beginPath();
      ctx.arc(fx, fy, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Snake
      g.snake.forEach((seg, index) => {
        const sx = seg.x * CELL_SIZE;
        const sy = seg.y * CELL_SIZE;

        if (index === 0) {
          // Head
          ctx.save();
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#10b981";
          ctx.fillRect(sx + 1, sy + 1, CELL_SIZE - 2, CELL_SIZE - 2);

          // Eyes
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(sx + 6, sy + 6, 2, 0, Math.PI * 2);
          ctx.arc(sx + 14, sy + 6, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Body
          const alpha = Math.max(0.4, 1 - index / (g.snake.length + 5));
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.fillRect(sx + 2, sy + 2, CELL_SIZE - 4, CELL_SIZE - 4);
        }
      });

      // Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        if (p.alpha <= 0) {
          g.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // States Overlay
      if (g.state === "ready") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#34d399";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CYBER SNAKE", width / 2, height / 2 - 40);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "14px sans-serif";
        ctx.fillText("Usa las flechas o toca los controles", width / 2, height / 2);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px monospace";
        ctx.fillText(`RÉCORD: ${g.highScore}`, width / 2, height / 2 + 35);
      } else if (g.state === "gameover") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.fillText("¡COLISIÓN!", width / 2, height / 2 - 40);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "16px monospace";
        ctx.fillText(`Puntos: ${g.score}`, width / 2, height / 2);

        ctx.fillStyle = "#34d399";
        ctx.font = "13px sans-serif";
        ctx.fillText("Toca aquí o pulsa Espacio para reiniciar", width / 2, height / 2 + 45);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onScoreChange, spawnFood]);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div 
        onClick={() => {
          if (gameState === "ready") {
            gameRef.current.state = "playing";
            setGameState("playing");
          } else if (gameState === "gameover") {
            resetGame();
          }
        }}
        className="relative cursor-pointer rounded-xl overflow-hidden border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-slate-950"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block max-w-full h-auto touch-none"
        />
      </div>

      {/* D-Pad controls for Mobile & Tablet */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <button
          onClick={() => changeDirection("UP")}
          aria-label="Arriba"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-black transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-5">
          <button
            onClick={() => changeDirection("LEFT")}
            aria-label="Izquierda"
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-black transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (gameState === "gameover" || gameState === "ready") {
                resetGame();
                gameRef.current.state = "playing";
                setGameState("playing");
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
          >
            {gameState === "playing" ? `${score} pts` : "GO"}
          </button>
          <button
            onClick={() => changeDirection("RIGHT")}
            aria-label="Derecha"
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-black transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => changeDirection("DOWN")}
          aria-label="Abajo"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-800/80 border border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-black transition-all"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

