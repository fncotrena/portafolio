"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Photo } from "@/lib/photos";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const INTERVAL = 5000;

const slide = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 56 : -56,
  }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -56 : 56,
  }),
};

export default function PhotoSlideshow({ photos }: { photos: Photo[] }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [[index, dir], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const count = photos.length;

  const goTo = useCallback(
    (next: number, direction: number) => {
      if (count === 0) return;
      setSlide([((next % count) + count) % count, direction]);
    },
    [count],
  );

  const step = useCallback((delta: number) => goTo(index + delta, delta), [goTo, index]);

  // Avance automático: se pausa con el mouse encima, con foco adentro o si el
  // usuario pidió menos movimiento en su sistema.
  useEffect(() => {
    if (reduced || paused || count <= 1) return;
    const id = window.setInterval(() => {
      setSlide(([i]) => [(i + 1) % count, 1]);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  if (count === 0) return null;

  const current = photos[index];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      className="group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Marco circular */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border-soft bg-surface/60 backdrop-blur-sm">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt ?? ""}
              fill
              sizes="(max-width: 640px) 20rem, 24rem"
              style={current.focus ? { objectPosition: current.focus } : undefined}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles abajo: así no le tapan la cara a la foto */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={t.about.photoPrev}
            onClick={() => step(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-base text-foreground/70 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground"
          >
            <HiChevronLeft aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`${t.about.photoDot} ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-foreground/70"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/45"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label={t.about.photoNext}
            onClick={() => step(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-soft text-base text-foreground/70 transition-colors duration-200 hover:border-foreground/25 hover:text-foreground"
          >
            <HiChevronRight aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
