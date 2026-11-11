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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Estudio — Portafolio",
  description: SITE_DESCRIPTION,
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
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
