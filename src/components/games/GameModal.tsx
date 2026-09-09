"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Trophy, Gamepad2 } from "lucide-react";
import { Game } from "@/data/games";
import { soundFX } from "./soundEffects";
import FlappyBirdGame from "./FlappyBirdGame";
import SnakeGame from "./SnakeGame";
import PongGame from "./PongGame";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

function ModalContent({ game, onClose }: { game: Game; onClose: () => void }) {
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem(`${game.id}_high_score`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Lock body scroll and handle ESC key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const handleScoreChange = (score: number, best: number) => {
    setCurrentScore(score);
    if (best > highScore) {
      setHighScore(best);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-xl glass-card border border-zinc-700/60 rounded-2xl shadow-2xl bg-zinc-950/95 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-zinc-700/50 flex items-center justify-center text-2xl shadow-inner">
              {game.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
                  {game.title}
                </h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  {game.category}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{game.subtitle}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Score badge */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
              <div className="flex items-center gap-1 text-zinc-300 font-mono">
                <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentScore}</span>
              </div>
              <div className="w-px h-3 bg-zinc-700" />
              <div className="flex items-center gap-1 text-amber-400 font-mono font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{highScore}</span>
              </div>
            </div>

            {/* Mute toggle button */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Cerrar juego"
              className="p-2 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors group"
              title="Cerrar (Esc)"
            >
              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-radial from-zinc-900/50 to-zinc-950">
          {game.id === "flappy" && (
            <FlappyBirdGame onScoreChange={handleScoreChange} />
          )}
          {game.id === "snake" && (
            <SnakeGame onScoreChange={handleScoreChange} />
          )}
          {game.id === "pong" && (
            <PongGame onScoreChange={handleScoreChange} />
          )}
        </div>

        {/* Window Footer / Controls Bar */}
        <div className="px-5 py-3 border-t border-zinc-800/80 bg-zinc-900/70 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Controles:</span>
            <span>{game.controls}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] border border-zinc-700 font-mono text-zinc-300">
              ESC
            </kbd>
            <span>para salir</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function GameModal({ game, onClose }: GameModalProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {game && <ModalContent key={game.id} game={game} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

