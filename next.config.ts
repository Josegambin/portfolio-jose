/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Le dice a Next.js que añada '/portfolio-jose' a todas las rutas (incluyendo <Image />)
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-jose' : '',

  // 2. Le indica dónde buscar los assets estáticos como JS y CSS
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-jose/' : '',

  // 3. Obligatorio para exportar tu web como HTML estático para GitHub Pages
  output: 'export',

  // 4. GitHub Pages es un servidor estático y no soporta la optimización dinámica de imágenes de Next.js
  images: {
    unoptimized: true,
  },
};


export default nextConfig;
