"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-8">
          <span className="text-primary">🧑‍💻</span> Sobre mí
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-muted-foreground mb-4">
              Soy desarrollador Full Stack con experiencia en aplicaciones empresariales. Me apasiona construir sistemas{" "}
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">escalables</span>,{" "}
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">eficientes</span> y{" "}
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">mantenibles</span>.
            </p>
            <p className="text-lg text-muted-foreground">
              Transformo problemas complejos en soluciones simples mediante arquitectura limpia y buenas prácticas de desarrollo.
            </p>
            <div className="flex items-center gap-2 mt-4 text-primary font-semibold">
              ✅ +5 años construyendo software de calidad
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Proyectos completados</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Compromiso</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}