"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Contenido de la cortina de carga inicial.
 *
 * El nombre usa el mismo formato que la home (Caveat, tracking amplio); los
 * colores van invertidos porque acá el fondo es `foreground`.
 *
 * Está aislado a propósito: cuando esté el diseño definitivo, se cambia solo
 * este archivo (el timing vive en TransitionProvider).
 */
export default function IntroLoader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4 text-background">
      <span className="font-caveat text-3xl tracking-wide md:text-4xl">
        {t.home.name}
      </span>

      <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-background/70">
        {t.common.loading}
      </span>

      <span className="relative mt-1 block h-px w-44 overflow-hidden bg-background/20">
        <span className="intro-bar absolute inset-0 block bg-background" />
      </span>
    </div>
  );
}
