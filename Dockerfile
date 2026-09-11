# --- ETAPA 1: INSTALACIÓN DE DEPENDENCIAS ---
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiamos apuntando a la subcarpeta del repositorio
COPY portfolio-jose/package*.json ./
RUN npm install

# --- ETAPA 2: COMPILACIÓN (BUILD) ---
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
# Copiamos todo el contenido de la subcarpeta del proyecto
COPY portfolio-jose/ .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- ETAPA 3: PRODUCCIÓN ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
