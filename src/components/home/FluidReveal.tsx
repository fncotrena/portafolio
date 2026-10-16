"use client";

/*
  Componente imperativo: dibujamos a mano en un canvas 2D y mutamos objetos de
  Three.js (texturas, uniforms) a propósito. Las reglas de inmutabilidad del
  React Compiler no aplican a este caso, así que las desactivamos solo aquí.
*/
/* eslint-disable react-hooks/immutability */

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useTheme } from "next-themes";

/**
 * Revelado fluido del hero.
 *
 * Cada tema tiene un par de imágenes:
 *   front → el "boceto" (fondo base que se ve siempre)
 *   back  → la foto terminada (aparece donde pintás con el mouse)
 *
 * La pintura se desvanece sola, así que el revelado es efímero: pasás el
 * cursor y la foto emerge del boceto, después vuelve.
 *
 * 👇 Para usar tus imágenes: dejálas en `public/images/portfolio/` y
 *    actualizá estas rutas (sirve .png, .jpg o .webp).
 */
const HERO_IMAGES = {
  dark: {
    front: "/images/portfolio/hero-night-sketch.webp",
    back: "/images/portfolio/hero-night.webp",
  },
  light: {
    front: "/images/portfolio/hero-day-sketch.webp",
    back: "/images/portfolio/hero-day.webp",
  },
} as const;

// Precarga todo para que el cambio de tema y el primer trazo sean instantáneos.
useTexture.preload([
  HERO_IMAGES.dark.front,
  HERO_IMAGES.dark.back,
  HERO_IMAGES.light.front,
  HERO_IMAGES.light.back,
]);

// Three.js emite un aviso de deprecación de THREE.Clock desde dentro de
// react-three-fiber. Filtramos solo ese mensaje para no ensuciar la consola.
type ThreeConsoleFn = (
  type: string,
  message: string,
  ...rest: unknown[]
) => void;

const threeWithConsole = THREE as unknown as {
  setConsoleFunction?: (fn: ThreeConsoleFn) => void;
};

if (typeof threeWithConsole.setConsoleFunction === "function") {
  const originalWarn = console.warn.bind(console);

  threeWithConsole.setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      typeof message === "string" &&
      message.includes("Clock: This module has been deprecated")
    ) {
      return;
    }
    if (type === "warn") originalWarn(message, ...params);
    else if (type === "error") console.error(message, ...params);
    else console.log(message, ...params);
  });
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  uniform sampler2D uTexFront;
  uniform sampler2D uTexBack;
  uniform sampler2D uDisp;

  uniform float uTime;
  uniform vec2 uPlaneRes;
  uniform vec2 uFrontRes;
  uniform vec2 uBackRes;

  // UV con comportamiento object-cover (sin deformar la imagen).
  vec2 getCoverUv(vec2 uv, vec2 planeRes, vec2 mediaRes) {
    float rs = planeRes.x / planeRes.y;
    float ri = mediaRes.x / mediaRes.y;
    vec2 st = uv;
    if (rs > ri) {
      float scale = ri / rs;
      st.y = (st.y - 0.5) * scale + 0.5;
    } else {
      float scale = rs / ri;
      st.x = (st.x - 0.5) * scale + 0.5;
    }
    return st;
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // 1. Ruido de humo
    vec2 smokeUv = vUv * 7.0;
    float n1 = fbm(smokeUv + vec2(uTime * 0.12, -uTime * 0.08));
    float n2 = fbm(smokeUv * 1.8 + vec2(-uTime * 0.08, uTime * 0.10));
    float smokeNoise = mix(n1, n2, 0.45);

    // 2. Deformamos los UV para romper la forma circular perfecta
    vec2 distortedUv = vUv + (vec2(smokeNoise) - 0.5) * 0.15;

    // 3. Leemos el trazo del cursor
    float trail = texture2D(uDisp, distortedUv).r;

    // 4. Máscara + jirones de humo
    float smokeMask = trail;
    smokeMask *= smoothstep(0.10, 0.75, smokeNoise);

    float wisps = fbm(vUv * 14.0 + vec2(uTime * 0.18, -uTime * 0.12));
    smokeMask += trail * smoothstep(0.45, 0.85, wisps) * 0.35;

    smokeMask = clamp(smokeMask, 0.0, 1.0);
    smokeMask = smoothstep(0.05, 0.55, smokeMask);

    vec2 frontUv = getCoverUv(vUv, uPlaneRes, uFrontRes);
    vec2 backUv = getCoverUv(vUv, uPlaneRes, uBackRes);

    vec4 front = texture2D(uTexFront, frontUv);
    vec4 back = texture2D(uTexBack, backUv);

    gl_FragColor = mix(front, back, smokeMask);
  }
`;

type FluidPlaneProps = {
  frontImage: string;
  backImage: string;
};

function FluidPlane({ frontImage, backImage }: FluidPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { gl, viewport } = useThree();
  const [front, back] = useTexture([frontImage, backImage]);

  // THREE.Timer reemplaza al deprecado THREE.Clock
  const timer = useMemo(() => new THREE.Timer(), []);

  useEffect(() => {
    timer.connect(document);
    return () => timer.dispose();
  }, [timer]);

  const canvas = useMemo(() => {
    const element = document.createElement("canvas");
    element.width = 256;
    element.height = 256;
    return element;
  }, []);

  const ctx = useMemo(() => canvas.getContext("2d"), [canvas]);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [canvas]);

  const lastPositions = useRef<Map<number, { x: number; y: number }>>(new Map());
  const isPointerDown = useRef(false);
  const pendingStrokes = useRef<
    { x1: number; y1: number; x2: number; y2: number; radius?: number }[]
  >([]);

  // Lienzo en negro al montar
  useEffect(() => {
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    texture.needsUpdate = true;
  }, [canvas, ctx, texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  // Re-sube las texturas a la GPU al montar / volver a la ruta
  useEffect(() => {
    if (front) front.needsUpdate = true;
    if (back) back.needsUpdate = true;
    texture.needsUpdate = true;
  }, [front, back, texture, gl]);

  const uniforms = useMemo(
    () => ({
      uTexFront: { value: front },
      uTexBack: { value: back },
      uDisp: { value: texture },
      uTime: { value: 0 },
      uPlaneRes: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uFrontRes: { value: new THREE.Vector2(1, 1) },
      uBackRes: { value: new THREE.Vector2(1, 1) },
    }),
    // Solo se recrean si cambian las texturas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [front, back, texture]
  );

  // Mantiene las texturas y resoluciones sincronizadas sin recrear uniforms
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTexFront.value = front;
    material.uniforms.uTexBack.value = back;
    material.uniforms.uDisp.value = texture;

    const frontImage = front?.image as HTMLImageElement | undefined;
    const backImage = back?.image as HTMLImageElement | undefined;

    // El marco del hero adopta la proporción de la foto, así el `object-cover`
    // del shader no recorta nada. Se actualiza solo si cambiás las imágenes.
    if (frontImage?.naturalWidth && frontImage.naturalHeight) {
      gl.domElement
        .closest<HTMLElement>(".hero-frame")
        ?.style.setProperty(
          "--hero-ratio",
          String(frontImage.naturalWidth / frontImage.naturalHeight)
        );
    }

    material.uniforms.uFrontRes.value.set(
      frontImage?.naturalWidth || frontImage?.width || 1,
      frontImage?.naturalHeight || frontImage?.height || 1
    );
    material.uniforms.uBackRes.value.set(
      backImage?.naturalWidth || backImage?.width || 1,
      backImage?.naturalHeight || backImage?.height || 1
    );

    material.needsUpdate = true;
  }, [front, back, texture, gl]);

  // --- Interacción ---------------------------------------------------------

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const rect = gl.domElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;

    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return null;

    return { x: nx * canvas.width, y: ny * canvas.height };
  };

  const addDab = (x: number, y: number, radius = 16) => {
    if (!ctx) return;
    ctx.globalCompositeOperation = "lighten";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.shadowBlur = 18;
    ctx.shadowColor = "white";
    ctx.fill();
    ctx.shadowBlur = 0;
    texture.needsUpdate = true;
  };

  const addDabRef = useRef(addDab);
  const getCoordsRef = useRef(getCanvasCoords);

  // Los listeners se registran una sola vez, así que mantenemos las versiones
  // frescas de los helpers en refs (sincronizadas fuera del render).
  useEffect(() => {
    addDabRef.current = addDab;
    getCoordsRef.current = getCanvasCoords;
  });

  useEffect(() => {
    const handlePointerEvent = (event: PointerEvent, forceDown?: boolean) => {
      const coords = getCoordsRef.current(event.clientX, event.clientY);

      if (!coords) {
        lastPositions.current.delete(event.pointerId);
        return;
      }

      const isTouch = event.pointerType === "touch" || event.pointerType === "pen";
      if (isTouch && !isPointerDown.current) return;

      const previous = lastPositions.current.get(event.pointerId);

      if (previous) {
        const distance = Math.hypot(
          coords.x - previous.x,
          coords.y - previous.y
        );

        if (distance > 0.4) {
          pendingStrokes.current.push({
            x1: previous.x,
            y1: previous.y,
            x2: coords.x,
            y2: coords.y,
            radius: isTouch ? 28 : 25,
          });
          lastPositions.current.set(event.pointerId, coords);
        }
      } else {
        lastPositions.current.set(event.pointerId, coords);
        if (isTouch || forceDown) {
          addDabRef.current(coords.x, coords.y, isTouch ? 18 : 14);
        }
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const coords = getCoordsRef.current(event.clientX, event.clientY);
      if (!coords) return;
      isPointerDown.current = true;
      lastPositions.current.set(event.pointerId, coords);
      addDabRef.current(
        coords.x,
        coords.y,
        event.pointerType === "touch" ? 18 : 14
      );
    };

    const handlePointerMove = (event: PointerEvent) =>
      handlePointerEvent(event);

    const handlePointerUp = (event: PointerEvent) => {
      lastPositions.current.delete(event.pointerId);
      if (lastPositions.current.size === 0) isPointerDown.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  // --- Render --------------------------------------------------------------

  useFrame(() => {
    timer.update();

    const material = materialRef.current;
    if (material) {
      material.uniforms.uTime.value = timer.getElapsed();
      material.uniforms.uPlaneRes.value.set(viewport.width, viewport.height);
    }

    if (!ctx) return;

    // 1. Desvanece el trazo hacia negro (el revelado es efímero)
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.055)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Dibuja los trazos acumulados del frame
    const strokes = pendingStrokes.current;
    if (strokes.length > 0) {
      ctx.globalCompositeOperation = "lighten";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const stroke of strokes) {
        ctx.lineWidth = stroke.radius || 26;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "white";
        ctx.strokeStyle = "white";

        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      pendingStrokes.current = [];
      texture.needsUpdate = true;
    }
  });

  return (
    <mesh dispose={null}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function FluidReveal() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";
  const { front, back } = HERO_IMAGES[theme];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: false }}
      >
        {/* `useTexture` suspende: el boundary evita que la suspensión suba. */}
        <Suspense fallback={null}>
          <FluidPlane frontImage={front} backImage={back} />
        </Suspense>
      </Canvas>
    </div>
  );
}
