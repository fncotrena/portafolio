"use client";

import { useCallback, useEffect, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "framer-motion";
import IntroLoader from "./IntroLoader";
import { HERO_READY_EVENT, isHeroReady } from "@/lib/heroReady";

const BLIND_COUNT = 8;
const BLIND_DURATION = 0.5;
const BLIND_STAGGER = 0.045;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Intro de la primera carga: piso en pantalla (para que no sea un parpadeo)
// y tope máximo de espera (si el hero no avisa, se destapa igual).
const INTRO_MIN_MS = 450;
const INTRO_MAX_MS = 3000;

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
  // La intro se destapa una sola vez por carga de página.
  const revealedRef = useRef(false);

  const getBlinds = () =>
    blindsRef.current ? Array.from(blindsRef.current.children) : [];

  const setBlocking = (blocking: boolean) => {
    overlayRef.current?.style.setProperty(
      "pointer-events",
      blocking ? "auto" : "none"
    );
  };

  // Levanta las persianas y descubre la pantalla. Lo usan la intro y las
  // entradas. `fadeLoader` solo en la intro: en las navegaciones no queremos
  // que el nombre aparezca y desaparezca.
  const openBlinds = useCallback((done: () => void, fadeLoader = false) => {
    const blinds = getBlinds();
    const finish = once(() => {
      setBlocking(false);
      done();
    });

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

    const loader = fadeLoader
      ? animate(
          loaderRef.current,
          { opacity: [1, 0] },
          { duration: 0.3, ease: "easeIn" }
        )
      : null;

    if (blinds.length === 0) finish();

    // Red de seguridad: si requestAnimationFrame está pausado (p. ej. la
    // ventana queda oculta), no debe quedar bloqueada la pantalla.
    const safety = window.setTimeout(finish, 1500);

    return () => {
      controls.forEach((control) => control.stop());
      loader?.stop();
      window.clearTimeout(safety);
    };
  }, []);

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

    if (blinds.length === 0) done();

    const safety = window.setTimeout(done, 1400);

    return () => {
      controls.forEach((control) => control.stop());
      window.clearTimeout(safety);
    };
  }, []);

  // Entrada: las persianas se retiran y descubren la nueva pantalla.
  const enter = useCallback(
    (next: () => void) => openBlinds(next),
    [openBlinds]
  );

  // La cortina ya viene cerrada desde el HTML. Acá esperamos a que la página
  // esté cargada (y, si hay hero, a que haya pintado) para levantarla.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Desactiva el failsafe de CSS: con JS corriendo manda esta lógica.
    overlay.style.animation = "none";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      getBlinds().forEach((blind) => {
        (blind as HTMLElement).style.transform = "scaleY(0)";
      });
      if (loaderRef.current) loaderRef.current.style.opacity = "0";
      setBlocking(false);
      return;
    }

    const hasHero = Boolean(document.querySelector("[data-hero]"));
    let loaded = document.readyState === "complete";
    let heroReady = isHeroReady();

    const reveal = () => {
      // El ref evita un segundo destape (p. ej. si el tope llega después del
      // aviso del hero): volver a animar 1 → 0 produciría un parpadeo.
      if (revealedRef.current) return;
      revealedRef.current = true;
      openBlinds(() => {}, true);
    };

    const tryReveal = () => {
      if (!loaded) return;
      if (hasHero && !heroReady) return;
      reveal();
    };

    const onLoad = () => {
      loaded = true;
      tryReveal();
    };
    const onHero = () => {
      heroReady = true;
      tryReveal();
    };

    // Piso: nunca menos de INTRO_MIN_MS en pantalla.
    const minTimer = window.setTimeout(tryReveal, INTRO_MIN_MS);
    // Tope: si el hero no avisa (o algo se cuelga), se destapa igual.
    const capTimer = window.setTimeout(() => {
      loaded = true;
      reveal();
    }, INTRO_MAX_MS);

    window.addEventListener("load", onLoad, { once: true });
    window.addEventListener(HERO_READY_EVENT, onHero, { once: true });

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(capTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener(HERO_READY_EVENT, onHero);
    };
  }, [openBlinds]);

  return (
    <TransitionRouter leave={leave} enter={enter} auto>
      {children}

      {/* Cortina de persianas. Arranca cerrada (scaleY(1)) para tapar el
          arranque del sitio antes de que hidrate React. */}
      <div
        ref={overlayRef}
        aria-hidden
        data-transition-overlay
        className="fixed inset-0 z-[100] overflow-hidden"
      >
        <div ref={blindsRef} className="absolute inset-0 flex">
          {Array.from({ length: BLIND_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-full bg-foreground"
              style={{
                width: `${100 / BLIND_COUNT}%`,
                transformOrigin: "top",
                transform: "scaleY(1)",
              }}
            />
          ))}
        </div>

        <div
          ref={loaderRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <IntroLoader />
        </div>
      </div>
    </TransitionRouter>
  );
}
