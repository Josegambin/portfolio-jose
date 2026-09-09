// src/components/Contact.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  MapPin, 
  Phone
} from "lucide-react";
import { GithubIcon as GithubIconSvg, LinkedinIcon as LinkedinIconSvg, TwitterIcon as TwitterIconSvg } from "@/components/icons";

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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "josemanuel.gambin@gmail.com",
    href: "mailto:josemanuel.gambin@gmail.com"
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+34 665 573 606",
    href: "tel:+34665573606"
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Cox - Alicante, España",
    href: "#"
  }
];

const socialLinks = [
  { icon: GithubIconSvg, href: "https://github.com/Josegambin", label: "GitHub" },
  { icon: LinkedinIconSvg, href: "https://linkedin.com/in/jose-gambin", label: "LinkedIn" },
  { icon: TwitterIconSvg, href: "#", label: "Twitter" },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const formValues = watch();

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

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="container mx-auto px-6 py-24 relative">
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      <div className="grid lg:grid-cols-4 gap-12 relative z-10">
        {/* Información de contacto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contacto <span className="gradient-text">directo</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>
          
          <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
            ¿Tienes un proyecto en mente? Hablemos y hagamos algo increíble juntos.
          </p>

          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-900/50 transition group glass-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="p-3 rounded-xl bg-zinc-900 text-blue-400 group-hover:bg-blue-500/20 transition"
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-zinc-300 group-hover:text-white transition font-medium">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Redes sociales - Mobile solo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:hidden mt-8 pt-8 border-t border-zinc-800"
          >
            <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">Sígueme en redes</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group glass-card"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="Tu nombre"
                className={`w-full bg-zinc-900/50 border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : formValues.name && !errors.name
                    ? "border-green-500 focus:border-green-500"
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
              {formValues.name && !errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-green-400 flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Nombre válido
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
                    : formValues.email && !errors.email
                    ? "border-green-500 focus:border-green-500"
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
              {formValues.email && !errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-green-400 flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Email válido
                </motion.p>
              )}
            </motion.div>

            {/* Mensaje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Mensaje <span className="text-red-400">*</span>
              </label>
              <textarea
                {...register("message")}
                placeholder="Cuéntame sobre tu proyecto..."
                className={`w-full p-3 bg-zinc-900/50 border rounded-lg focus:outline-none text-white placeholder:text-zinc-500 h-32 resize-none transition ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : formValues.message && !errors.message
                    ? "border-green-500 focus:border-green-500"
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
                ) : formValues.message && !errors.message ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-400 flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mensaje válido
                  </motion.p>
                ) : (
                  <span className="text-sm text-zinc-500">
                    {formValues.message?.length || 0}/500 caracteres
                  </span>
                )}
                {formValues.message && (
                  <span className={`text-sm ${
                    formValues.message.length > 450 
                      ? 'text-yellow-400' 
                      : 'text-zinc-500'
                  }`}>
                    {formValues.message.length}/500
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
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3"
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
            <p className="text-xs text-zinc-500 text-center">
              Los campos marcados con <span className="text-red-400">*</span> son obligatorios
            </p>
          </form>
        </motion.div>

        {/* Redes sociales - Desktop: columna derecha */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden lg:block lg:col-span-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-4">
              Sígueme en <span className="gradient-text">redes</span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group glass-card"
                aria-label={social.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/20 transition"
                >
                  <social.icon className="w-5 h-5" />
                </motion.div>
                <span className="text-sm text-zinc-300 group-hover:text-white transition font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8 p-6 rounded-xl glass-card"
          >
            <p className="text-sm text-zinc-400 mb-3">
              ¿Prefieres contacto directo?
            </p>
            <a
              href={`mailto:${contactInfo[0].value}`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Envíame un email
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}