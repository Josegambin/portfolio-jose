// src/data/portfolio.ts
export const portfolio = {
  name: "José Gambín",
  role: "Full Stack Developer",
  description:
    "Desarrollador especializado en Java, Spring Boot y aplicaciones web modernas.",
  skills: [
    { name: "Java", level: 90, icon: "☕" },
    { name: "Spring Boot", level: 85, icon: "🌱" },
    { name: "TypeScript", level: 80, icon: "📘" },
    { name: "React", level: 85, icon: "⚛️" },
    { name: "Next.js", level: 75, icon: "▲" },
    { name: "SQL", level: 80, icon: "🗄️" },
    { name: "Docker", level: 70, icon: "🐳" },
    { name: "Git", level: 85, icon: "📝" },
  ],
  skillCategories: {
    backend: {
      title: "Backend",
      icon: "⚙️",
      skills: ["Java 21", "Spring Boot", "Node.js", "Python"]
    },
    frontend: {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    database: {
      title: "Base de Datos",
      icon: "🗄️",
      skills: ["PostgreSQL", "MySQL", "MongoDB"]
    },
    tools: {
      title: "Herramientas",
      icon: "🔧",
      skills: ["Docker", "Git", "AWS", "Kubernetes"]
    }
  }
};