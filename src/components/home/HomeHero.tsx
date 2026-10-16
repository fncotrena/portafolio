"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import FrontLayerContent from "./FrontLayerContent";

// El revelado fluido necesita WebGL, así que solo se monta en el cliente.
const FluidReveal = dynamic(() => import("./FluidReveal"), {
  ssr: false,
  loading: () => null,
});

// Proporción (ancho / alto) de reserva del marco, mientras carga la foto.
// `FluidReveal` la reemplaza automáticamente por la proporción real de la
// imagen, así que normalmente no hace falta tocarla.
const HERO_RATIO = 4 / 3;

export default function HomeHero() {
  return (
    // La sección reserva el alto de la ventana y centra el marco, que tiene su
    // propio alto en `.hero-frame` (globals.css). El aire de arriba y abajo
    // sale de ahí, así que la sección no lleva padding vertical.
    <section className="flex min-h-[100svh] w-full items-center justify-center px-3 sm:px-5 lg:px-8">
      <div
        className="hero-frame relative overflow-hidden rounded-[22px] sm:rounded-[30px]"
        style={{ "--hero-ratio": HERO_RATIO } as CSSProperties}
      >
        <FluidReveal />
        <FrontLayerContent />
      </div>
    </section>
  );
}
