import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat-face",
  display: "swap",
});

// URL pública del sitio. Next la usa para armar URLs absolutas (og:image, canonical).
// Si algún día pasás a un dominio propio, cambiá solo esta constante.
const SITE_URL = "https://portafolio-4g6.pages.dev";

const SITE_TITLE = "Federico Cotrena — Software Engineer";
const SITE_DESCRIPTION =
  "Portafolio de Federico Cotrena: Software Engineer con más de 3 años construyendo aplicaciones web con Angular, TypeScript y Node.js. Analista y Programador graduado de la UNPSJB.";

const AUTHOR = "Federico Cotrena";
const AUTHOR_ROLE = "Software Engineer (Front End)";
const GITHUB_URL = "https://github.com/fncotrena";
const LINKEDIN_URL = "https://www.linkedin.com/in/federico-nicolas-cotrena/";

// Datos estructurados (schema.org/Person): es lo que leen Google y LinkedIn
// para saber quién está detrás del sitio. No se ve en pantalla.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  givenName: "Federico",
  familyName: "Cotrena",
  jobTitle: AUTHOR_ROLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puerto Madryn",
    addressRegion: "Chubut",
    addressCountry: "AR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Nacional de la Patagonia San Juan Bosco",
  },
  knowsAbout: [
    "Angular",
    "TypeScript",
    "JavaScript",
    "RxJS",
    "Node.js",
    "Express",
    "MySQL",
    "Sequelize",
    "REST APIs",
    "WebSockets",
    "React",
    "Next.js",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Estudio — Portafolio",
  description: SITE_DESCRIPTION,
  applicationName: "Portafolio — Federico Cotrena",
  authors: [{ name: AUTHOR, url: GITHUB_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  keywords: [
    "Federico Cotrena",
    "Software Engineer",
    "Frontend Developer",
    "Angular",
    "TypeScript",
    "Node.js",
    "Portafolio",
    "Puerto Madryn",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Federico Cotrena",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "es_AR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Federico Cotrena — Software Engineer (Front End), Angular y Node.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Si el JS no corre, la cortina de carga se esconde desde el arranque. */}
        <noscript>
          <style>{`[data-transition-overlay]{display:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
