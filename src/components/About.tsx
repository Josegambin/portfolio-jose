"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
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
            Sobre <span className="gradient-text">mí</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
              {portfolio.description}
            </p>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              {portfolio.fullDescription}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-green-400 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {portfolio.experience.years} años de experiencia
              </div>
              <div className="flex items-center gap-2 text-blue-400 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Arquitectura de microservicios
              </div>
              <div className="flex items-center gap-2 text-purple-400 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                CI/CD y DevOps
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-2xl text-center card-hover"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{portfolio.experience.years}</div>
              <div className="text-sm text-zinc-400">Años de experiencia</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-2xl text-center card-hover"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{portfolio.experience.projects}</div>
              <div className="text-sm text-zinc-400">Proyectos completados</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-2xl text-center card-hover"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{portfolio.experience.clients}</div>
              <div className="text-sm text-zinc-400">Clientes empresariales</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-2xl text-center card-hover"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{portfolio.experience.satisfaction}</div>
              <div className="text-sm text-zinc-400">Compromiso calidad</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}