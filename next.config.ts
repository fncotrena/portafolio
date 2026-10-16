import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactivado para evitar que las animaciones de transición
  // (GSAP + next-transition-router) se ejecuten dos veces en desarrollo.
  reactStrictMode: false,

  // Fija la raíz del proyecto para Turbopack (evita que busque
  // un lockfile en el directorio home del usuario).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
