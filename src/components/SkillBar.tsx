// src/components/SkillBar.tsx
"use client";

import { useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  icon?: string;
  index: number;
}

export default function SkillBar({ name, level, icon, index }: SkillBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">
            {name}
          </span>
        </div>
        <span className={`text-sm font-medium transition ${
          isHovered ? 'text-blue-400' : 'text-zinc-500'
        }`}>
          {level}%
        </span>
      </div>
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, 
              ${level > 70 ? '#3b82f6' : level > 40 ? '#8b5cf6' : '#ec4899'}, 
              ${level > 70 ? '#8b5cf6' : level > 40 ? '#ec4899' : '#f43f5e'}
            )`,
            boxShadow: isHovered ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        />
        {/* Efecto shimmer al hacer hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
      </div>
    </div>
  );
}