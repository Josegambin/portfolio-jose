# Portfolio de José Gambín

Portfolio personal de José Manuel Gambín Manresa, desarrollador Full Stack especializado en Java, Spring Boot, microservicios, React y TypeScript.

## Stack

- Next.js 16 con App Router
- React 19 y TypeScript
- Tailwind CSS 4
- Framer Motion
- React Hook Form + Zod
- Nodemailer para el formulario de contacto

## Requisitos

- Node.js 20 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
EMAIL_USER=tu-cuenta@gmail.com
EMAIL_PASSWORD=tu-app-password
```

`EMAIL_PASSWORD` debe ser una contraseña de aplicación de Gmail, no la contraseña habitual de la cuenta.

## Comandos

```bash
npm run dev     # Servidor de desarrollo
npm run lint    # Comprobación ESLint
npm run build   # Build de producción
npm run start   # Servidor de producción
```

## Estructura

```text
src/
├── app/          # Layout, página, SEO y API de contacto
├── components/  # Secciones y componentes reutilizables
├── data/         # Contenido del portfolio
└── lib/          # Utilidades compartidas
public/           # Recursos estáticos y manifest
```

## Despliegue

El proyecto está preparado para desplegarse en Vercel u otra plataforma compatible con Next.js. Configura las variables de entorno antes de publicar para activar el formulario de contacto.
