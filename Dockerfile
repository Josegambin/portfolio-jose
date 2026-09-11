FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Deshabilitar telemetría
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copiar archivos esenciales
COPY package*.json ./

# Instalar dependencias limpias de producción
RUN npm install --no-audit --no-fund

# Copiar el código fuente
COPY . .

# Compilar la aplicación Next.js
RUN npm run build

# Exponer puerto y arrancar
EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
