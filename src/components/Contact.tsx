// src/components/Contact.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
    value: "jose@example.com",
    href: "mailto:jose@example.com"
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+34 123 456 789",
    href: "tel:+34123456789"
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Madrid, España",
    href: "#"
  }
];

const socialLinks = [
  { icon: GithubIconSvg, href: "https://github.com/Josegambin", label: "GitHub" },
  { icon: LinkedinIconSvg, href: "#", label: "LinkedIn" },
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
    <section id="contact" className="container mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Información de contacto */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contacto <span className="gradient-text">directo</span>
          </h2>
          <p className="text-zinc-400 mb-8">
            ¿Tienes un proyecto en mente? Hablemos y hagamos algo increíble juntos.
          </p>

          <div className="space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition group"
              >
                <div className="p-2 rounded-lg bg-zinc-900 text-blue-400 group-hover:bg-zinc-800 transition">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{item.label}</p>
                  <p className="text-sm text-zinc-300 group-hover:text-white transition">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Redes sociales */}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4">Sígueme en redes</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 transition group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div>
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
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
              {formValues.name && !errors.name && (
                <p className="mt-1.5 text-sm text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Nombre válido
                </p>
              )}
            </div>

            {/* Email */}
            <div>
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
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
              {formValues.email && !errors.email && (
                <p className="mt-1.5 text-sm text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Email válido
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div>
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
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message.message}
                  </p>
                ) : formValues.message && !errors.message ? (
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Mensaje válido
                  </p>
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !isDirty}
              className={`w-full py-6 rounded-full text-base font-medium transition-all ${
                isDirty && isValid
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg shadow-blue-500/25"
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

            {/* Mensaje de error general */}
            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Error al enviar</p>
                  <p className="text-sm text-red-400/80">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Campos requeridos */}
            <p className="text-xs text-zinc-500 text-center">
              Los campos marcados con <span className="text-red-400">*</span> son obligatorios
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}