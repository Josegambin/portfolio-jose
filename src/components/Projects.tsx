"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-8">
          <span className="text-primary">🚀</span> Proyectos destacados
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{project.icon}</div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <i className="fab fa-github"></i> Ver en GitHub →
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}