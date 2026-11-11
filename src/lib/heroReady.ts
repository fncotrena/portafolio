/**
 * Señal de "el hero ya pintó su primer frame".
 *
 * El hero vive en un chunk aparte y carga las texturas en un Suspense, así que
 * `window.load` no alcanza para saber si la foto ya está en pantalla. El plano
 * avisa por acá y la cortina de carga se destapa recién en ese momento.
 */
export const HERO_READY_EVENT = "hero:ready";

type HeroWindow = Window & { __heroReady?: boolean };

export function markHeroReady() {
  if (typeof window === "undefined") return;
  (window as HeroWindow).__heroReady = true;
  window.dispatchEvent(new Event(HERO_READY_EVENT));
}

export function isHeroReady() {
  if (typeof window === "undefined") return false;
  return Boolean((window as HeroWindow).__heroReady);
}
