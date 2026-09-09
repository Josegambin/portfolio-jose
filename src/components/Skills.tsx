"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const skillIcons: Record<string, string> = {
  "Java 21": "☕",
  "Spring Boot": "🌱",
  "Spring MVC": "🍃",
  "Hibernate": "🐘",
  "JPA": "💾",
  "Microservicios": "�",
  "React": "⚛️",
  "TypeScript": "📘",
  "JavaScript ES6+": "📜",
  "Thymeleaf": "🌿",
  "HTML5": "🌐",
  "CSS3": "🎨",
  "PostgreSQL": "🐘",
  "Oracle SQL": "🗃️",
  "MySQL": "🐬",
  "Diseño relacional": "📊",
  "Optimización": "⚡",
  "Git": "�",
  "SVN": "📂",
  "Jenkins": "🔧",
  "Maven": "📦",
  "SonarQube": "🔍",
  "JasperReports": "📈",
  "Agile/Scrum": "�",
  "Jira": "🎯",
  "Testing Unitario": "🧪",
  "Mockito": "🎭",
  "JUnit": "✅",
};

const categoryIcons: Record<string, string> = {
  backend: "⚙️",
  frontend: "🎨",
  database: "🗄️",
  devops: "🔧",
  methodologies: "�",
};

const categoryColors: Record<string, string> = {
  backend: "blue",
  frontend: "purple",
  database: "green",
  devops: "orange",
  methodologies: "pink",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stack <span className="gradient-text">Tecnológico</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(portfolio.skillCategories).map(([category, data], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 rounded-2xl card-hover"
            >
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl bg-${categoryColors[category]}-500/10 flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{categoryIcons[category]}</span>
                </div>
                <h3 className="font-bold text-xl text-white">
                  {data.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-zinc-800/50 rounded-lg text-sm font-medium flex items-center gap-2 border border-zinc-700/50 hover:border-blue-500/50 transition-colors"
                  >
                    <span className="text-lg">{skillIcons[skill] || "🔹"}</span>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}