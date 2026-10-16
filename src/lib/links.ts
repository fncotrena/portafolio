// Enlaces personales del sitio. Están todos acá para que no se repitan
// hardcodeados en las pantallas: cambiás uno y se actualiza en todos lados.
export const LINKS = {
  github: "https://github.com/fncotrena",
  linkedin: "https://www.linkedin.com/in/federico-nicolas-cotrena/",
  email: "nicolascotrena@gmail.com",
  // El archivo vive en `public/cv/`. Si actualizás el CV, reemplazalo con el
  // mismo nombre o cambiá la ruta acá.
  cv: "/cv/federico-nicolas-cotrena-cv.pdf",
} as const;

/** Enlace mailto listo para usar en un href. */
export const CONTACT_URL = `mailto:${LINKS.email}`;
