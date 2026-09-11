# --- ETAPA 1: INSTALACIÓN DE DEPENDENCIAS ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalación COMPLETA (incluye devDependencies para que Tailwind funcione)
RUN npm install

# --- ETAPA 2: COMPILACIÓN (BUILD) ---
FROM node:20-alpine AS builder
WORKDIR /app

# Traer los módulos de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitar telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Compilar el proyecto de Next.js usando Turbopack
RUN npm run build

# --- ETAPA 3: PRODUCCIÓN (IMAGEN FINAL) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario del sistema por seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar única y exclusivamente lo necesario para arrancar el servidor web
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
