// src/components/Contact.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  CheckCircle, 
  AlertCircle,
  Mail
} from "lucide-react";

// Schema de validación con Zod
const contactSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
  email: z.string()
    .email("Email inválido")
    .min(5, "El email debe tener al menos 5 caracteres"),
  message: z.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje es demasiado largo (máximo 500 caracteres)")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No se pudo enviar el mensaje.");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="container mx-auto px-6 pt-10 pb-24 relative">
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Hablamos?
          </h2>
          <div className="mx-auto mb-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
            Si quieres compartir feedback sobre este portfolio, comentar alguna de mis aplicaciones o hablar sobre un proyecto, escríbeme. Estaré encantado de leerte.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-2xl shadow-blue-950/10 backdrop-blur-sm md:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative mb-8 flex items-center justify-between border-b border-zinc-800/80 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Contacto</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Envíame un mensaje</h3>
            </div>
            <div className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 sm:block">
              Respondo por email
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
            {/* Nombre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre <span className="text-red-400">*</span>
              </label>
              <Input
                {...register("name")}
                placeholder="Cómo te llamas"
                className={`w-full bg-zinc-900/50 border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-blue-500"
                } text-white placeholder:text-zinc-500 transition`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className={`w-full bg-zinc-900/50 border ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-blue-500"
                } text-white placeholder:text-zinc-500 transition`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Mensaje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Mensaje <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register("message")}
                placeholder="Escribe tu comentario, sugerencia o pregunta..."
                className={`w-full p-3 bg-zinc-900/50 border rounded-lg focus:outline-none text-white placeholder:text-zinc-500 h-32 resize-none transition ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-blue-500"
                }`}
              />
              <div className="flex justify-between items-center mt-1.5">
                {errors.message ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.message.message}
                  </motion.p>
                ) : (
                  <span className="text-sm text-zinc-500">
                    Mensaje listo para enviar
                  </span>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Button
                type="submit"
                disabled={loading || !isDirty}
                className={`w-full py-6 rounded-full text-base font-medium transition-all ${
                  isDirty && isValid
                    ? "btn-primary shadow-lg shadow-blue-500/25"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                    Enviando...
                  </span>
                ) : submitStatus === "success" ? (
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    ¡Mensaje enviado!
                  </span>
                ) : submitStatus === "error" ? (
                  <span className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    Error al enviar
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar mensaje <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </motion.div>

            {/* Mensaje de error general */}
            <AnimatePresence>
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 md:col-span-2"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Error al enviar</p>
                    <p className="text-sm text-red-400/80">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Campos requeridos */}
            <p className="text-xs text-zinc-500 text-center md:col-span-2">
              Los campos marcados con <span className="text-red-400">*</span> son obligatorios
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
}