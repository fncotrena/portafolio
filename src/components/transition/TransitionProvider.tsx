"use client";

import { useCallback, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "framer-motion";

const BLIND_COUNT = 8;
const BLIND_DURATION = 0.5;
const BLIND_STAGGER = 0.045;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Garantiza que el callback se ejecute una sola vez.
function once(fn: () => void) {
  let called = false;
  return () => {
    if (called) return;
    called = true;
    fn();
  };
}

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const blindsRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const getBlinds = () =>
    blindsRef.current ? Array.from(blindsRef.current.children) : [];

  const setBlocking = (blocking: boolean) => {
    overlayRef.current?.style.setProperty(
      "pointer-events",
      blocking ? "auto" : "none"
    );
  };

  // Salida: las persianas bajan y cubren la pantalla; después navega.
  const leave = useCallback((next: () => void) => {
    const blinds = getBlinds();
    const done = once(next);
    setBlocking(true);

    const controls = blinds.map((blind, i) =>
      animate(
        blind,
        { scaleY: [0, 1] },
        {
          duration: BLIND_DURATION,
          delay: i * BLIND_STAGGER,
          ease: EASE,
          ...(i === blinds.length - 1 ? { onComplete: done } : {}),
        }
      )
    );

    const loader = animate(
      loaderRef.current,
      { opacity: [0, 1] },
      { duration: 0.35, ease: "easeOut" }
    );

    if (blinds.length === 0) done();

    // Red de seguridad: si requestAnimationFrame está pausado (p. ej. la
    // ventana queda oculta), la navegación no debe quedar bloqueada.
    const safety = window.setTimeout(done, 1400);

    return () => {
      controls.forEach((control) => control.stop());
      loader.stop();
      window.clearTimeout(safety);
    };
  }, []);

  // Entrada: las persianas se retiran y descubren la nueva pantalla.
  const enter = useCallback((next: () => void) => {
    const blinds = getBlinds();
    const done = once(next);

    const finish = () => {
      setBlocking(false);
      done();
    };

    const controls = blinds.map((blind, i) =>
      animate(
        blind,
        { scaleY: [1, 0] },
        {
          duration: BLIND_DURATION,
          delay: i * BLIND_STAGGER,
          ease: EASE,
          ...(i === blinds.length - 1 ? { onComplete: finish } : {}),
        }
      )
    );

    const loader = animate(
      loaderRef.current,
      { opacity: [1, 0] },
      { duration: 0.3, ease: "easeIn" }
    );

    if (blinds.length === 0) finish();

    const safety = window.setTimeout(finish, 1500);

    return () => {
      controls.forEach((control) => control.stop());
      loader.stop();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <TransitionRouter leave={leave} enter={enter} auto>
      {children}

      {/* Cortina de persianas + loader */}
      <div
        ref={overlayRef}
        aria-hidden
        data-transition-overlay
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      >
        <div ref={blindsRef} className="absolute inset-0 flex">
          {Array.from({ length: BLIND_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-full bg-foreground"
              style={{
                width: `${100 / BLIND_COUNT}%`,
                transformOrigin: "top",
                transform: "scaleY(0)",
              }}
            />
          ))}
        </div>

        <div
          ref={loaderRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0"
        >
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-background/20 border-t-background" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-background">
            Estudio
          </span>
        </div>
      </div>
    </TransitionRouter>
  );
}
