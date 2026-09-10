import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// In-memory rate limiting is enough for local/demo use. In production, use Redis or a managed gateway.
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora
const RATE_LIMIT_MAX_REQUESTS = 5; // máximo 5 mensajes por hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Schema de validación mejorado
const contactSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/, "El nombre solo puede contener letras y espacios"),
  email: z.string()
    .email("Email inválido")
    .max(100, "El email es demasiado largo")
    .refine((email) => {
      // Validación adicional de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, "Formato de email inválido"),
  message: z.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres")
    .refine((message) => {
      // Sanitización básica - detectar patrones sospechosos
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /onerror=/i,
        /onclick=/i,
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(message));
    }, "El mensaje contiene contenido no permitido"),
});

export async function POST(req: NextRequest) {
  try {
    // Obtener IP del cliente
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Has excedido el límite de mensajes. Por favor, espera antes de enviar otro." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validar datos con Zod
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }));
      
      return NextResponse.json(
        { error: "Error de validación", details: errors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Verificar variables de entorno
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s/g, "");

    if (!emailUser || !emailPassword) {
      console.error("Faltan credenciales de email");
      return NextResponse.json(
        { error: "El servicio de email no está configurado. Revisa EMAIL_USER y EMAIL_PASSWORD." },
        { status: 500 }
      );
    }

    // Configurar transporter con opciones de seguridad
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
      // Opciones de seguridad adicionales
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Sanitizar el mensaje para el email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const sanitizedMessage = escapeHtml(message);
    const safeIp = escapeHtml(ip);

    const mailOptions = {
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">📬 Nuevo mensaje de contacto</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Nombre:</strong> ${safeName}</p>
            <p><strong>📧 Email:</strong> ${safeEmail}</p>
            <p><strong>📝 Mensaje:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              ${sanitizedMessage}
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Mensaje enviado desde el portfolio de José Gambín<br>
            IP: ${safeIp}<br>
            Fecha: ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Mensaje enviado correctamente" 
    }, { status: 200 });

  } catch (error) {
    console.error("Error enviando email:", error);
    
    // Error específico de nodemailer
    if (
      error instanceof Error &&
      (/EAUTH|authentication|invalid login|username and password/i.test(error.message))
    ) {
      return NextResponse.json(
        { error: "Gmail ha rechazado las credenciales. Usa una contraseña de aplicación válida." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Error al enviar el mensaje. Por favor, intenta más tarde." },
      { status: 500 }
    );
  }
}