FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Deshabilitamos telemetría
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar archivos de configuración esenciales
COPY package*.json ./

# Forzamos la instalación de TODO (incluyendo devDependencies para Tailwind)
RUN npm install --include=dev --no-audit --no-fund

# Copiar el resto del código fuente del proyecto
COPY . .

# Establecemos la variable de producción justo antes de compilar
ENV NODE_ENV=production
RUN npm run build

# Exponer puerto y comando de arranque final
EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
