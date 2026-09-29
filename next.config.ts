/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo aplica el basePath en producción (GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-jose' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-jose/' : '',
  
  // Si estás exportando a HTML estático (obligatorio para GitHub Pages clásico)
  output: 'export', 
  
  // Desactiva la optimización de imágenes nativa de Next.js, ya que GitHub Pages no tiene un servidor Node.js para procesarlas
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
