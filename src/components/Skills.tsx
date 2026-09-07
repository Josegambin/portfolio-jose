"use client";

import { motion } from "framer-motion";

const skillsData = {
  backend: [
    { name: "Java 21", icon: "☕" },
    { name: "Spring Boot", icon: "🌱" },
    { name: "Node.js", icon: "🟢" },
  ],
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "📘" },
  ],
  database: [
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
  ],
  tools: [
    { name: "Docker", icon: "🐳" },
    { name: "Git", icon: "🔀" },
    { name: "AWS", icon: "☁️" },
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-8">
          <span className="text-primary">⚡</span> Stack Tecnológico
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <h3 className="font-semibold text-lg mb-4 capitalize">
                {category === "backend" && "⚙️ Backend"}
                {category === "frontend" && "🎨 Frontend"}
                {category === "database" && "🗄️ Database"}
                {category === "tools" && "🔧 Tools"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium flex items-center gap-1.5"
                  >
                    {skill.icon} {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}