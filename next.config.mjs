/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',   // Genera HTML estático en la carpeta /out
  distDir: 'out',     // Firebase Hosting usará esta carpeta
  images: {
    unoptimized: true, // Requerido para export estático (sin servidor Next.js)
  },
};

export default nextConfig;
