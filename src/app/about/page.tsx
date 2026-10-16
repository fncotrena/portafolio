import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "Sobre mí — Estudio",
};

export default function AboutPage() {
  return <AboutContent />;
}
