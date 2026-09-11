FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Deshabilitar telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copiar archivos esenciales de configuración
COPY package*.json ./

# Instalar dependencias completas sin duplicar capas en disco
RUN npm install --no-audit --no-fund

# Copiar el código fuente
COPY . .

# Compilar la aplicación Next.js (Ahora Tailwind PostCSS funcionará)
RUN npm run build

# Exponer puerto y comando de arranque
EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
