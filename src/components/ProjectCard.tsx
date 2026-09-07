// src/components/ProjectCard.tsx
"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo: string;
    image: string;
    featured: boolean;
    category: string;
    details?: {
      problem: string;
      solution: string;
      results: string;
    };
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Project Card */}
      <div
        className="group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Imagen del proyecto */}
        <div className="relative h-48 bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-zinc-700">
              {project.title.charAt(0)}
            </div>
          )}
          
          {/* Badge de featured */}
          {project.featured && (
            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Destacado
            </span>
          )}
          
          {/* Overlay con acciones */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              onClick={() => setIsModalOpen(true)}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              onClick={() => window.open(project.github, "_blank")}
            >
              <GithubIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-white transition">
              {project.title}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-zinc-900 text-zinc-400 capitalize">
              {project.category}
            </span>
          </div>

          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-zinc-900/50 text-zinc-500 border border-zinc-800/50"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-zinc-900/50 text-zinc-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" /> Código
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" /> Demo
              </a>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-auto text-sm text-zinc-500 hover:text-white transition flex items-center gap-1"
            >
              Detalles <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-2xl border border-zinc-800 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                  <span className="text-sm text-zinc-400 capitalize">{project.category}</span>
                </div>
                {project.featured && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Destacado
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.details && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Problema</h4>
                    <p className="text-sm text-zinc-300">{project.details.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Solución</h4>
                    <p className="text-sm text-zinc-300">{project.details.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Resultados</h4>
                    <p className="text-sm text-zinc-300">{project.details.results}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-zinc-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-white"
                >
                  <GithubIcon className="w-4 h-4 inline mr-2" /> Ver código
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition text-white"
                  >
                    <ExternalLink className="w-4 h-4 inline mr-2" /> Ver demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}