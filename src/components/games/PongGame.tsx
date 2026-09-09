"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundFX } from "./soundEffects";

interface PongGameProps {
  onScoreChange?: (score: number, highScore: number) => void;
}

export default function PongGame({ onScoreChange }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");

  const gameRef = useRef({
    playerY: 120,
    aiY: 120,
    paddleW: 10,
    paddleH: 60,
    ballX: 220,
    ballY: 160,
    ballRadius: 7,
    ballVx: 3.5,
    ballVy: 2.2,
    playerScore: 0,
    aiScore: 0,
    highScore: typeof window !== "undefined" ? Number(localStorage.getItem("pong_high_score") || 0) : 0,
    state: "ready" as "ready" | "playing" | "gameover",
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string }>,
  });

  const resetBall = useCallback((towardsPlayer: boolean) => {
    const g = gameRef.current;
    g.ballX = 220;
    g.ballY = 160;
    g.ballVx = towardsPlayer ? -3.5 : 3.5;
    g.ballVy = (Math.random() - 0.5) * 4;
  }, []);

  const resetMatch = useCallback(() => {
    const g = gameRef.current;
    g.playerScore = 0;
    g.aiScore = 0;
    g.playerY = 120;
    g.aiY = 120;
    g.particles = [];
    g.state = "ready";
    setPlayerScore(0);
    setAiScore(0);
    setGameState("ready");
    resetBall(false);
    onScoreChange?.(0, g.highScore);
  }, [resetBall, onScoreChange]);

  // Handle paddle movement via mouse / touch
  const handlePointerMove = useCallback((clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleY = canvas.height / rect.height;
    const relativeY = (clientY - rect.top) * scaleY;
    const g = gameRef.current;
    g.playerY = Math.max(0, Math.min(canvas.height - g.paddleH, relativeY - g.paddleH / 2));

    if (g.state === "ready") {
      g.state = "playing";
      setGameState("playing");
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (["ArrowUp", "ArrowDown", "KeyW", "KeyS", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === "Space") {
        if (g.state === "ready") {
          g.state = "playing";
          setGameState("playing");
        } else if (g.state === "gameover") {
          resetMatch();
        }
        return;
      }

      const step = 20;
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        g.playerY = Math.max(0, g.playerY - step);
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        g.playerY = Math.min(320 - g.paddleH, g.playerY + step);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetMatch]);

  // Main Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    const loop = () => {
      const g = gameRef.current;

      // UPDATE LOGIC
      if (g.state === "playing") {
        // Move ball
        g.ballX += g.ballVx;
        g.ballY += g.ballVy;

        // Bounce top / bottom
        if (g.ballY - g.ballRadius <= 0) {
          g.ballY = g.ballRadius;
          g.ballVy = -g.ballVy;
          soundFX.playBounce(false);
        } else if (g.ballY + g.ballRadius >= height) {
          g.ballY = height - g.ballRadius;
          g.ballVy = -g.ballVy;
          soundFX.playBounce(false);
        }

        // AI Paddle Movement (Adaptive target)
        const targetY = g.ballY - g.paddleH / 2;
        const aiSpeed = 2.7;
        if (g.aiY < targetY) {
          g.aiY = Math.min(height - g.paddleH, g.aiY + aiSpeed);
        } else if (g.aiY > targetY) {
          g.aiY = Math.max(0, g.aiY - aiSpeed);
        }

        // Player Paddle Collision (Left side: x = 16)
        const playerPaddleX = 16;
        if (
          g.ballX - g.ballRadius <= playerPaddleX + g.paddleW &&
          g.ballX + g.ballRadius >= playerPaddleX &&
          g.ballY >= g.playerY &&
          g.ballY <= g.playerY + g.paddleH &&
          g.ballVx < 0
        ) {
          g.ballVx = -g.ballVx * 1.05; // accelerate slightly
          const hitOffset = (g.ballY - (g.playerY + g.paddleH / 2)) / (g.paddleH / 2);
          g.ballVy = hitOffset * 4.5;
          soundFX.playBounce(true);

          // Particles
          for (let i = 0; i < 8; i++) {
            g.particles.push({
              x: g.ballX,
              y: g.ballY,
              vx: Math.random() * 2 + 1,
              vy: (Math.random() - 0.5) * 3,
              alpha: 1,
              color: "#a855f7"
            });
          }
        }

        // AI Paddle Collision (Right side: x = width - 16 - paddleW)
        const aiPaddleX = width - 16 - g.paddleW;
        if (
          g.ballX + g.ballRadius >= aiPaddleX &&
          g.ballX - g.ballRadius <= aiPaddleX + g.paddleW &&
          g.ballY >= g.aiY &&
          g.ballY <= g.aiY + g.paddleH &&
          g.ballVx > 0
        ) {
          g.ballVx = -g.ballVx * 1.05;
          const hitOffset = (g.ballY - (g.aiY + g.paddleH / 2)) / (g.paddleH / 2);
          g.ballVy = hitOffset * 4.5;
          soundFX.playBounce(false);

          for (let i = 0; i < 8; i++) {
            g.particles.push({
              x: g.ballX,
              y: g.ballY,
              vx: -(Math.random() * 2 + 1),
              vy: (Math.random() - 0.5) * 3,
              alpha: 1,
              color: "#ec4899"
            });
          }
        }

        // Point for Player
        if (g.ballX > width) {
          g.playerScore += 1;
          setPlayerScore(g.playerScore);
          soundFX.playScore();

          if (g.playerScore > g.highScore) {
            g.highScore = g.playerScore;
            try {
              localStorage.setItem("pong_high_score", g.highScore.toString());
            } catch {}
          }
          onScoreChange?.(g.playerScore, g.highScore);

          if (g.playerScore >= 5) {
            g.state = "gameover";
            setGameState("gameover");
          } else {
            resetBall(true);
          }
        }

        // Point for AI
        if (g.ballX < 0) {
          g.aiScore += 1;
          setAiScore(g.aiScore);
          soundFX.playGameOver();

          if (g.aiScore >= 5) {
            g.state = "gameover";
            setGameState("gameover");
          } else {
            resetBall(false);
          }
        }
      }

      // RENDER
      ctx.fillStyle = "#0c0a14";
      ctx.fillRect(0, 0, width, height);

      // Center dashed net line
      ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Player Paddle (Purple)
      ctx.save();
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(16, g.playerY, g.paddleW, g.paddleH);
      ctx.restore();

      // Draw AI Paddle (Pink)
      ctx.save();
      ctx.shadowColor = "#f472b6";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#ec4899";
      ctx.fillRect(width - 16 - g.paddleW, g.aiY, g.paddleW, g.paddleH);
      ctx.restore();

      // Draw Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;
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

      // Draw Ball
      ctx.save();
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, g.ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Scoreboard numbers
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "bold 38px monospace";
      ctx.textAlign = "center";
      ctx.fillText(g.playerScore.toString(), width / 2 - 50, 50);
      ctx.fillText(g.aiScore.toString(), width / 2 + 50, 50);

      // Overlays
      if (g.state === "ready") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#c084fc";
        ctx.font = "bold 22px monospace";
        ctx.textAlign = "center";
        ctx.fillText("NEON PONG AI", width / 2, height / 2 - 35);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "13px sans-serif";
        ctx.fillText("Mueve el ratón, desliza el dedo o pulsa Espacio", width / 2, height / 2 + 5);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "11px monospace";
        ctx.fillText("Primero en llegar a 5 puntos gana", width / 2, height / 2 + 35);
      } else if (g.state === "gameover") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, width, height);

        const playerWon = g.playerScore >= 5;
        ctx.fillStyle = playerWon ? "#10b981" : "#ef4444";
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.fillText(playerWon ? "¡VICTORIA!" : "DERROTA", width / 2, height / 2 - 25);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "15px monospace";
        ctx.fillText(`Tú: ${g.playerScore} - Bot: ${g.aiScore}`, width / 2, height / 2 + 10);

        ctx.fillStyle = "#c084fc";
        ctx.font = "12px sans-serif";
        ctx.fillText("Haz clic o pulsa Espacio para jugar revancha", width / 2, height / 2 + 45);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [resetBall, onScoreChange]);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div
        onMouseMove={(e) => handlePointerMove(e.clientY)}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientY);
        }}
        onClick={() => {
          if (gameState === "ready") {
            gameRef.current.state = "playing";
            setGameState("playing");
          } else if (gameState === "gameover") {
            resetMatch();
          }
        }}
        className="relative cursor-pointer rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)] bg-slate-950"
      >
        <canvas
          ref={canvasRef}
          width={440}
          height={320}
          className="block max-w-full h-auto touch-none"
        />
      </div>

      <div className="mt-3 flex items-center justify-between w-full max-w-[440px] px-2 text-xs text-zinc-400">
        <span className="text-purple-400">Tú: {playerScore}</span>
        <span>Desliza / Ratón / W-S</span>
        <span className="text-pink-400">Bot: {aiScore}</span>
      </div>
    </div>
  );
}

