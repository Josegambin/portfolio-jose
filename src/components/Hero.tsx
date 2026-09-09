"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center container mx-auto px-6 pt-20 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50"></div>
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-14 max-w-6xl w-full relative z-10">
        <div className="text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-light text-blue-400 text-sm font-semibold mb-8 border border-blue-500/20"
        >
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse inline-block shadow-lg shadow-green-500/50"></span>
          {portfolio.availability}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Hola, soy <span className="gradient-text glow-text">{portfolio.shortName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl text-zinc-400 mt-6 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
        >
          {portfolio.role} · Especializado en{" "}
          <span className="text-white font-semibold">Java 21</span>,{" "}
          <span className="text-white font-semibold">Spring Boot</span> y{" "}
          <span className="text-white font-semibold">Microservicios</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10"
        >
          <Link
            href="#projects"
            className="btn-primary px-8 py-4 text-white rounded-full font-semibold text-lg inline-flex items-center gap-2 shadow-lg"
          >
            Ver proyectos 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 border border-zinc-700 rounded-full font-semibold text-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all inline-flex items-center gap-2 glass-light"
          >
            Contactar
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-zinc-500 text-sm">Scroll para explorar</span>
            <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative mx-auto w-full max-w-[390px] lg:max-w-[430px]"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="relative rotate-2 overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-blue-950/40">
            <img
              src="/avatar-jose.svg"
              alt="Avatar ilustrado de José Gambín"
              className="block w-full rounded-[2rem]"
            />
          </div>
         
        </motion.div>
      </div>
    </motion.section>
  );
}