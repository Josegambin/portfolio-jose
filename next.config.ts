/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Indica que exporte a HTML puro en la carpeta 'out'
  images: {
    unoptimized: true, // Requerido porque GitHub Pages no soporta la optimización dinámica de imágenes de Next.js
  },
  // OPCIONAL: Si tu URL de GitHub Pages incluye el nombre del repositorio (ej. usuario.github.io/mi-repo)
  // debes agregar la propiedad basePath: '/mi-repo'
};

module.exports = nextConfig;
