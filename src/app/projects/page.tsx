import type { Metadata } from "next";
import ProjectsContent from "@/components/pages/ProjectsContent";

export const metadata: Metadata = {
  title: "Proyectos — Estudio",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
