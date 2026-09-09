// src/components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Botón Volver arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="p-4 rounded-full btn-primary text-white shadow-lg shadow-blue-500/25"
            style={{ 
              position: 'fixed', 
              right: '32px', 
              bottom: '32px',
              zIndex: 9999 
            }}
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative bg-zinc-950/50 border-t border-zinc-800/50">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Columna 1: Marca */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">{portfolio.shortName}</span>
              </h3>
              <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                {portfolio.description}
              </p>
              
              {/* Redes sociales */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: GithubIcon, href: portfolio.github, label: "GitHub" },
                  { icon: LinkedinIcon, href: `https://${portfolio.linkedin}`, label: "LinkedIn" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition text-zinc-400 hover:text-white border border-zinc-800/50 hover:border-blue-500/50"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Columna 2: Navegación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                Navegación
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Sobre mí", href: "#about" },
                  { label: "Experiencia", href: "#experience" },
                  { label: "Skills", href: "#skills" },
                  { label: "Proyectos", href: "#projects" },
                  { label: "Contacto", href: "#contact" },
                ].map((item, index) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition inline-block"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 3: Contacto rápido */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                Contacto
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="text-zinc-400 hover:text-white transition inline-block"
                  >
                    {portfolio.email}
                  </a>
                </li>
                <li className="text-zinc-400">
                  {portfolio.phone}
                </li>
                <li className="text-zinc-400">
                  {portfolio.location}
                </li>
                <li className="pt-2">
                  <motion.a
                    href="#contact"
                    className="inline-block px-4 py-2 text-sm rounded-full btn-primary text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector("#contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Contactar
                  </motion.a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Barra inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-zinc-500">
              © {currentYear} {portfolio.name}. Todos los derechos reservados.
            </p>
            <p className="text-sm text-zinc-500 flex items-center gap-1">
              Hecho con 
              <span className="text-red-500">❤️</span> 
              y 
              <span className="text-blue-500">⚡</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}