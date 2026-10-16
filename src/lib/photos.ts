// Fotos personales para la galería de "Sobre mí".
//
// Dejá los archivos en `public/images/photos/` y agregá una entrada por foto.
// Si la lista queda vacía, la sección de fotos no se muestra.
//
// `alt` es opcional: si no lo ponés, la imagen se trata como decorativa.
// `focus` es opcional: ajusta el encuadre del recorte circular con
// `object-position` (por ejemplo "50% 35%" para subir el encuadre).
//
// Sugerencia: subilas ya redimensionadas (lado mayor ~1000px) para que el
// sitio siga liviano.

export type Photo = {
  src: string;
  alt?: string;
  focus?: string;
};

export const PHOTOS: Photo[] = [
  {
    src: "/images/photos/01.jpg",
    alt: "Atardecer en la costanera, sentado en el paredón con la bici al lado",
  },
  {
    src: "/images/photos/02.jpg",
    alt: "En la playa, alzando a mi perra",
  },
  {
    src: "/images/photos/03.jpg",
    alt: "En la playa con mi perra y un arcoíris de fondo",
  },
  {
    src: "/images/photos/04.jpg",
    alt: "Sentado en la playa mirando el atardecer, con la mochila al hombro",
  },
  {
    src: "/images/photos/05.jpg",
    alt: "Mi gata gris descansando",
  },
  {
    src: "/images/photos/06.jpg",
    alt: "Selfie con Simur, mi gato naranja",
  },
];
