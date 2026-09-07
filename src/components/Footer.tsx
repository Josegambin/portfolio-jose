// src/components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/40 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Volver arriba"
      >
    
      </button>

      {/* Footer */}
      <footer className="relative bg-zinc-950/50 border-t border-zinc-800/50">
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Columna 1: Marca */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">José Gambín</span>
              </h3>
              <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                Desarrollador Full Stack especializado en aplicaciones empresariales. 
                Transformo problemas complejos en soluciones simples mediante arquitectura 
                limpia y buenas prácticas de desarrollo.
              </p>
              
              {/* Redes sociales */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/Josegambin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Columna 2: Navegación */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                Navegación
              </h4>
              <ul className="space-y-2.5">
                {["Sobre mí", "Skills", "Proyectos", "Contacto"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                      className="text-sm text-zinc-400 hover:text-white transition"
                      onClick={(e) => {
                        e.preventDefault();
                        const href = item.toLowerCase().replace(/\s/g, '');
                        const element = document.querySelector(`#${href}`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Contacto rápido */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                Contacto
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="mailto:jose@example.com"
                    className="text-zinc-400 hover:text-white transition"
                  >
                    jose@example.com
                  </a>
                </li>
                <li className="text-zinc-400">
                  +34 123 456 789
                </li>
                <li className="text-zinc-400">
                  Madrid, España
                </li>
                <li className="pt-2">
                  <a
                    href="#contact"
                    className="inline-block px-4 py-2 text-sm rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition hover:scale-105"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector("#contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Contactar
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500">
              © {currentYear} José Gambín. Todos los derechos reservados.
            </p>
            <p className="text-sm text-zinc-500 flex items-center gap-1">
              Hecho con
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}