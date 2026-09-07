"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center container mx-auto px-6 pt-20"
    >
      <div className="text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
          Disponible para proyectos
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Hola, soy <span className="text-primary">José Gambín</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Full Stack Developer · Especializado en Java, Spring Boot y aplicaciones web modernas.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="#projects"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Ver proyectos →
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 border border-border rounded-full font-semibold hover:border-primary hover:bg-primary/5 transition-all inline-flex items-center gap-2"
          >
            Contactar
          </Link>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16"
        >
          <span className="text-2xl text-muted-foreground">↓</span>
        </motion.div>
      </div>
    </motion.section>
  );
}