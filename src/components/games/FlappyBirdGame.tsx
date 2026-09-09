"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { soundFX } from "./soundEffects";

interface FlappyBirdGameProps {
  onScoreChange?: (score: number, highScore: number) => void;
}

export default function FlappyBirdGame({ onScoreChange }: FlappyBirdGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem("flappy_high_score");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Game internal state ref to avoid React state lag in requestAnimationFrame loop
  const gameRef = useRef({
    birdY: 250,
    birdVelocity: 0,
    gravity: 0.38,
    jumpForce: -6.8,
    birdX: 80,
    birdRadius: 14,
    pipes: [] as Array<{ x: number; top: number; bottom: number; passed: boolean }>,
    pipeWidth: 55,
    pipeGap: 130,
    pipeSpeed: 2.3,
    frameCount: 0,
    state: "ready" as "ready" | "playing" | "gameover",
    currentScore: 0,
    highScore,
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string }>
  });

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.birdY = 240;
    g.birdVelocity = 0;
    g.pipes = [];
    g.frameCount = 0;
    g.currentScore = 0;
    g.particles = [];
    g.state = "ready";
    setGameState("ready");
    onScoreChange?.(0, g.highScore);
  }, [onScoreChange]);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.state === "ready") {
      g.state = "playing";
      setGameState("playing");
      g.birdVelocity = g.jumpForce;
      soundFX.playJump();
    } else if (g.state === "playing") {
      g.birdVelocity = g.jumpForce;
      soundFX.playJump();

      // Add jump particles
      for (let i = 0; i < 5; i++) {
        g.particles.push({
          x: g.birdX - 6,
          y: g.birdY + 6,
          vx: (Math.random() - 0.5) * 2 - 1.5,
          vy: Math.random() * 2 + 1,
          alpha: 1,
          color: "#38bdf8"
        });
      }
    } else if (g.state === "gameover") {
      resetGame();
    }
  }, [resetGame]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    const loop = () => {
      const g = gameRef.current;
      g.frameCount++;

      // Background Clear
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Background
      ctx.strokeStyle = "rgba(56, 189, 248, 0.07)";
      ctx.lineWidth = 1;
      const gridOffset = (g.frameCount * 0.8) % 30;
      for (let x = -gridOffset; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Distant Neon Skyline
      ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
      const buildings = [
        { x: 20, w: 40, h: 90 },
        { x: 80, w: 50, h: 140 },
        { x: 150, w: 35, h: 100 },
        { x: 200, w: 60, h: 160 },
        { x: 280, w: 45, h: 110 },
        { x: 340, w: 50, h: 130 },
      ];
      buildings.forEach(b => {
        ctx.fillRect(b.x, height - b.h, b.w, b.h);
      });

      // Update Logic when Playing
      if (g.state === "playing") {
        g.birdVelocity += g.gravity;
        g.birdY += g.birdVelocity;

        // Spawn Pipes
        if (g.frameCount % 90 === 0) {
          const minPipe = 60;
          const maxPipe = height - g.pipeGap - minPipe;
          const top = Math.floor(Math.random() * (maxPipe - minPipe + 1)) + minPipe;
          const bottom = height - top - g.pipeGap;
          g.pipes.push({
            x: width,
            top,
            bottom,
            passed: false
          });
        }

        // Move Pipes & Check Collision
        for (let i = g.pipes.length - 1; i >= 0; i--) {
          const p = g.pipes[i];
          p.x -= g.pipeSpeed;

          // Check pass
          if (!p.passed && p.x + g.pipeWidth < g.birdX) {
            p.passed = true;
            g.currentScore += 1;
            soundFX.playScore();

            if (g.currentScore > g.highScore) {
              g.highScore = g.currentScore;
              setHighScore(g.highScore);
              try {
                localStorage.setItem("flappy_high_score", g.highScore.toString());
              } catch {}
            }
            onScoreChange?.(g.currentScore, g.highScore);
          }

          // Check Collision with Pipes
          const birdLeft = g.birdX - g.birdRadius + 3;
          const birdRight = g.birdX + g.birdRadius - 3;
          const birdTop = g.birdY - g.birdRadius + 3;
          const birdBottom = g.birdY + g.birdRadius - 3;

          const inPipeHoriz = birdRight > p.x && birdLeft < p.x + g.pipeWidth;
          const hitTopPipe = birdTop < p.top;
          const hitBottomPipe = birdBottom > height - p.bottom;

          if (inPipeHoriz && (hitTopPipe || hitBottomPipe)) {
            triggerGameOver();
          }

          // Remove off-screen pipes
          if (p.x + g.pipeWidth < -10) {
            g.pipes.splice(i, 1);
          }
        }

        // Boundary Collision
        if (g.birdY + g.birdRadius >= height - 10 || g.birdY - g.birdRadius <= 0) {
          triggerGameOver();
        }
      }

      function triggerGameOver() {
        if (g.state === "gameover") return;
        g.state = "gameover";
        setGameState("gameover");
        soundFX.playGameOver();

        // Spawn explosion particles
        for (let j = 0; j < 25; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 1;
          g.particles.push({
            x: g.birdX,
            y: g.birdY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: j % 2 === 0 ? "#f43f5e" : "#fbbf24"
          });
        }
      }

      // Draw Pipes (Cyber Towers)
      g.pipes.forEach(p => {
        // Top Pipe
        const topGrad = ctx.createLinearGradient(p.x, 0, p.x + g.pipeWidth, 0);
        topGrad.addColorStop(0, "#0284c7");
        topGrad.addColorStop(0.5, "#38bdf8");
        topGrad.addColorStop(1, "#0369a1");
        ctx.fillStyle = topGrad;
        ctx.fillRect(p.x, 0, g.pipeWidth, p.top);

        // Top Pipe Cap
        ctx.fillStyle = "#67e8f9";
        ctx.fillRect(p.x - 3, p.top - 14, g.pipeWidth + 6, 14);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillRect(p.x - 1, p.top - 12, g.pipeWidth + 2, 2);

        // Bottom Pipe
        const botGrad = ctx.createLinearGradient(p.x, 0, p.x + g.pipeWidth, 0);
        botGrad.addColorStop(0, "#0284c7");
        botGrad.addColorStop(0.5, "#38bdf8");
        botGrad.addColorStop(1, "#0369a1");
        ctx.fillStyle = botGrad;
        ctx.fillRect(p.x, height - p.bottom, g.pipeWidth, p.bottom);

        // Bottom Pipe Cap
        ctx.fillStyle = "#67e8f9";
        ctx.fillRect(p.x - 3, height - p.bottom, g.pipeWidth + 6, 14);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillRect(p.x - 1, height - p.bottom + 2, g.pipeWidth + 2, 2);

        // Neon Glow accents
        ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, 0, g.pipeWidth, p.top);
        ctx.strokeRect(p.x, height - p.bottom, g.pipeWidth, p.bottom);
      });

      // Update and Draw Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.025;
        if (pt.alpha <= 0) {
          g.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Floor / Ground Line
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, height - 10, width, 10);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(0, height - 10, width, 2);

      // Draw Cyber Bird
      ctx.save();
      ctx.translate(g.birdX, g.birdY);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, g.birdVelocity * 0.08));
      ctx.rotate(angle);

      // Bird Glow
      const glowGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 22);
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.6)");
      glowGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fill();

      // Bird Body
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(0, 0, g.birdRadius, 0, Math.PI * 2);
      ctx.fill();

      // Belly / Wing
      const flapOffset = Math.sin(g.frameCount * 0.25) * 4;
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.ellipse(-3, flapOffset, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(6, -4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(7.5, -4, 2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.moveTo(11, -2);
      ctx.lineTo(19, 1);
      ctx.lineTo(11, 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Overlay Texts based on state
      if (g.state === "ready") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CYBER FLAPPY", width / 2, height / 2 - 50);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "14px sans-serif";
        ctx.fillText("Presiona Espacio o toca para iniciar", width / 2, height / 2);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px monospace";
        ctx.fillText(`RÉCORD: ${g.highScore}`, width / 2, height / 2 + 40);
      } else if (g.state === "gameover") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", width / 2, height / 2 - 50);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "18px monospace";
        ctx.fillText(`Puntos: ${g.currentScore}`, width / 2, height / 2 - 10);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "14px monospace";
        ctx.fillText(`Mejor Puntuación: ${g.highScore}`, width / 2, height / 2 + 20);

        ctx.fillStyle = "#38bdf8";
        ctx.font = "13px sans-serif";
        ctx.fillText("Toca o presiona Espacio para revivir", width / 2, height / 2 + 65);
      } else if (g.state === "playing") {
        // In-game score display
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.shadowBlur = 10;
        ctx.fillText(g.currentScore.toString(), width / 2, 50);
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onScoreChange]);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div 
        onClick={jump}
        className="relative cursor-pointer rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] bg-slate-950"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={520}
          className="block max-w-full h-auto touch-none"
        />
      </div>

      {/* Touch action helper button for mobile */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[400px] px-2 text-xs text-zinc-400">
        <span>🎮 Espacio / Clic</span>
        <button
          onClick={jump}
          className="px-4 py-1.5 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 active:scale-95 transition-transform md:hidden font-medium"
        >
          {gameState === "ready" ? "Iniciar" : gameState === "playing" ? "Saltar 🚀" : "Reiniciar 🔄"}
        </button>
        <span>Récord: <strong className="text-cyan-400">{highScore}</strong></span>
      </div>
    </div>
  );
}

