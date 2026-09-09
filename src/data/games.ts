export interface Game {
  id: "flappy" | "snake" | "pong";
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon: string;
  technologies: string[];
  difficulty: "Fácil" | "Medio" | "Desafiante";
  color: string;
  accentGradient: string;
  controls: string;
}

export const games: Game[] = [
  {
    id: "flappy",
    title: "Cyber Flappy",
    subtitle: "Arcade Retro Flappy",
    description: "Esquiva los obstáculos volando al ritmo del ciberespacio. Con físicas de gravedad dinámica, colisiones precisas y efectos de sonido retro.",
    category: "Arcade / Reflejos",
    icon: "🐦",
    technologies: ["HTML5 Canvas", "TypeScript", "Web Audio API", "Physics 2D"],
    difficulty: "Medio",
    color: "#3b82f6",
    accentGradient: "from-blue-500 to-cyan-400",
    controls: "Espacio / Clic / Tocar para aletear"
  },
  {
    id: "snake",
    title: "Cyber Snake",
    subtitle: "Clásico Neón 8-Bit",
    description: "El clásico juego de la serpiente reinventado con estética retro-neón, aumento progresivo de velocidad y controles táctiles o de teclado.",
    category: "Clásico / Estrategia",
    icon: "🐍",
    technologies: ["Canvas 2D", "State Loop", "Local Storage", "Touch D-Pad"],
    difficulty: "Fácil",
    color: "#10b981",
    accentGradient: "from-emerald-500 to-green-400",
    controls: "Flechas / WASD / D-Pad táctil"
  },
  {
    id: "pong",
    title: "Neon Pong AI",
    subtitle: "Arcade Pong vs Bot",
    description: "El mítico tenis de mesa arcade enfrentándote a una IA adaptable con efectos de partículas luminosas y física de aceleración de bola.",
    category: "Deportes / IA",
    icon: "🏓",
    technologies: ["Canvas 2D", "AI Paddle Logic", "Vector Math", "Particle FX"],
    difficulty: "Desafiante",
    color: "#a855f7",
    accentGradient: "from-purple-500 to-pink-500",
    controls: "Ratón / Táctil / Flechas Arriba-Abajo"
  }
];

