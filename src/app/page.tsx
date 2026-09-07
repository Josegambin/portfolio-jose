// src/app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { portfolio } from "@/data/portfolio";
import { projects } from "@/data/projects";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { ArrowRight, Code2, Server, Database, Layout, Award, Users, Briefcase } from "lucide-react";
// Solo usamos ArrowRight, Code2, Server, Database, Layout, Award, Users, Briefcase de lucide-react
// Estos no deberían dar problemas

import SkillBar from "@/components/SkillBar";


export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const techGroups = [
    { icon: <Server className="w-5 h-5" />, title: "Backend", items: ["Java 21", "Spring Boot", "Node.js"] },
    { icon: <Layout className="w-5 h-5" />, title: "Frontend", items: ["React", "Next.js", "TypeScript"] },
    { icon: <Database className="w-5 h-5" />, title: "Database", items: ["PostgreSQL", "MySQL", "MongoDB"] },
    { icon: <Code2 className="w-5 h-5" />, title: "Tools", items: ["Docker", "Git", "AWS"] },
  ];

  const stats = [
    { icon: <Briefcase className="w-5 h-5" />, value: "3+", label: "Años de experiencia" },
    { icon: <Users className="w-5 h-5" />, value: "12+", label: "Proyectos completados" },
    { icon: <Award className="w-5 h-5" />, value: "100%", label: "Clientes satisfechos" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent animate-gradient" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Disponible para proyectos
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="block">Hola, soy</span>
              <span className="gradient-text">José Gambín</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-blue-400">Full Stack Developer</span>
            </p>

            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {portfolio.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-full text-base"
                onClick={() => {
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver proyectos <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-zinc-700 hover:bg-zinc-900 text-white px-8 py-6 rounded-full text-base"
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contactar
              </Button>
            </div>

            {/* Social Links con iconos SVG personalizados */}
            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <a 
                href="https://github.com/Josegambin" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group"
              >
                <GithubIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group"
              >
                <LinkedinIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group"
              >
                <TwitterIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ME SECTION ===== */}
      <section 
        id="about" 
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="container mx-auto px-6 py-24 opacity-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sobre <span className="gradient-text">mí</span>
        </h2>
        <p className="text-zinc-400 mb-12 max-w-2xl">
          Conoce más sobre mi trayectoria y experiencia profesional
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              Soy desarrollador Full Stack especializado en aplicaciones empresariales, 
              con experiencia en Java, Spring Boot y desarrollo web moderno. 
              Me enfoco en construir sistemas escalables, eficientes y mantenibles.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Me gusta transformar problemas complejos en soluciones simples 
              mediante arquitectura limpia y buenas prácticas de desarrollo.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition"
                >
                  <div className="flex justify-center mb-2 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Stack Tecnológico</h3>
            <div className="grid grid-cols-2 gap-4">
              {techGroups.map((group, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-zinc-900 text-blue-400">
                      {group.icon}
                    </div>
                    <h4 className="font-medium text-sm">{group.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-zinc-900 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION MEJORADA ===== */}
<section 
  id="skills" 
  ref={(el) => { sectionRefs.current[1] = el; }}
  className="container mx-auto px-6 py-24 opacity-0"
>
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Mis <span className="gradient-text">Habilidades</span>
  </h2>
  <p className="text-zinc-400 mb-12 max-w-2xl">
    Tecnologías y herramientas con las que trabajo día a día
  </p>

  <div className="grid lg:grid-cols-2 gap-12">
    {/* Barras de habilidades */}
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-zinc-200">Nivel de experiencia</h3>
      {portfolio.skills.map((skill, index) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          icon={skill.icon}
          index={index}
        />
      ))}
    </div>

    {/* Categorías de tecnologías */}
    <div>
      <h3 className="text-lg font-semibold text-zinc-200 mb-6">Tecnologías por categoría</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(portfolio.skillCategories).map((category, index) => (
          <div
            key={category.title}
            className="p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{category.icon}</span>
              <h4 className="font-medium text-sm text-zinc-300 group-hover:text-white transition">
                {category.title}
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800/50 group-hover:border-zinc-700 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ===== PROJECTS SECTION ===== */}
      <section 
        id="projects" 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="container mx-auto px-6 py-24 opacity-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Proyectos <span className="gradient-text">destacados</span>
        </h2>
        <p className="text-zinc-400 mb-12">
          Algunos de los proyectos en los que he trabajado
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition">
                {project.title}
              </h3>

              <p className="text-zinc-400 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-zinc-900 px-2 py-1 rounded-full text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white transition flex items-center gap-1"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                  >
                    <ArrowRight className="w-4 h-4" /> Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <Contact />
    </main>
  );
}