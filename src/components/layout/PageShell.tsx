"use client";

import { motion } from "framer-motion";

type PageShellProps = {
  title: string;
  lead?: string;
  /** Contenido extra dentro del encabezado, debajo del lead. */
  intro?: React.ReactNode;
  /** Bloque opcional al costado del encabezado (por ejemplo, una foto). En
      pantallas chicas se ubica arriba del título. */
  aside?: React.ReactNode;
  /** Capa decorativa opcional que se pinta detrás del contenido de la sección. */
  background?: React.ReactNode;
  children: React.ReactNode;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PageShell({
  title,
  lead,
  intro,
  aside,
  background,
  children,
}: PageShellProps) {
  return (
    <section className="relative isolate mx-auto min-h-[100svh] w-full max-w-5xl px-6 pb-44 pt-28 sm:px-10 md:px-16 md:pt-36">
      {background}
      <motion.header
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={
          aside
            ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-14"
            : undefined
        }
      >
        {aside && (
          <div className="w-full max-w-[18rem] lg:order-2">{aside}</div>
        )}

        <div className={aside ? "lg:order-1" : undefined}>
          {/* Misma tipografía que el h1 del home: así todas las secciones se
              leen igual. Si cambiás una, cambiá la otra. */}
          <h1 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-foreground/80 sm:text-base">
              {lead}
            </p>
          )}
          {intro}
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        className="mt-12"
      >
        {children}
      </motion.div>
    </section>
  );
}
