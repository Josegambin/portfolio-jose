"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Gamepad2, Play, X } from "lucide-react";
import { projects } from "@/data/projects";
import { games, Game } from "@/data/games";
import GameModal from "@/components/games/GameModal";
import { isAllowedDemoUrl } from "@/lib/demoSecurity";

export default function Projects() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [demoUrl, setDemoUrl] = useState<string | null>(null);
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  useEffect(() => {
    if (!demoUrl) {
      document.body.style.overflow = "auto";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [demoUrl]);

  const openDemo = (url: string | null | undefined) => {
    if (!url || !isAllowedDemoUrl(url)) return;
    setDemoUrl(url);
  };

  const closeDemo = () => {
    setDemoUrl(null);
  };

  return (
    <section id="projects" className="py-24 relative">
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
            Proyectos <span className="gradient-text">destacados</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 rounded-2xl card-hover group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                {project.period && (
                  <span className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">
                    {project.period}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 bg-zinc-800/50 rounded-lg text-xs font-medium border border-zinc-700/50 hover:border-blue-500/50 transition-colors text-zinc-300"
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-3 py-1.5 bg-zinc-800/30 rounded-lg text-xs font-medium text-zinc-500">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {project.github ? (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm"
                  >
                    Ver código en GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ) : (
                  <span className="text-xs text-zinc-500">
                    Proyecto profesional · código privado
                  </span>
                )}

                {project.demo && (
                  <motion.button
                    type="button"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openDemo(project.demo)}
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver demo
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-zinc-300">
              Otros proyectos relevantes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{project.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{project.title}</h4>
                      {project.period && (
                        <span className="text-xs text-zinc-500">{project.period}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs text-zinc-500 bg-zinc-800/30 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Zona de Juegos Interactivos */}
        <div id="games" className="mt-24 pt-12 border-t border-zinc-800/80 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5" /> Proyectos Interactivos & Arcade
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Zona de <span className="gradient-text">Juegos</span>
            </h3>
            <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Demos interactivas y videojuegos retro desarrollados con HTML5 Canvas, físicas en tiempo real y audio sintetizado. Haz clic en cualquiera de ellos para ejecutarlos en una ventana modal interactiva.
            </p>
          </motion.div>

          {/* Grid de Tarjetas de Juegos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-2xl border border-zinc-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow decorativo */}
                <div
                  className={`absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-bl ${game.accentGradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity pointer-events-none`}
                />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
                      {game.icon}
                    </div>
                    <span className="text-xs font-medium text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full border border-zinc-700/50">
                      {game.difficulty}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h4>
                  <p className="text-xs text-blue-400/90 font-medium mb-3">
                    {game.subtitle}
                  </p>

                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    {game.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {game.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-300 bg-zinc-800/50 border border-zinc-700/40 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGame(game)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Jugar ahora</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {demoUrl && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeDemo}
          >
            <div
              className="relative w-full max-w-6xl h-[80vh] rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDemo}
                className="absolute right-4 top-4 z-10 rounded-full bg-zinc-900/80 px-3 py-2 text-white hover:bg-zinc-800 transition"
                aria-label="Cerrar demo"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src={demoUrl}
                title="Finance Tracker"
                className="h-full w-full rounded-2xl border-0"
                allow="fullscreen"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              />
            </div>
          </div>
        )}

        {/* Modal Window para la ejecución del juego */}
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      </motion.div>
    </section>
  );
}