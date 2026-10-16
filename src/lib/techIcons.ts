import type { IconType } from "react-icons";
import {
  SiAngular,
  SiApachemaven,
  SiBootstrap,
  SiContainerd,
  SiDocker,
  SiExpo,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiJasmine,
  SiJavascript,
  SiJsonwebtokens,
  SiJunit5,
  SiKubernetes,
  SiMaterialdesign,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactivex,
  SiRedis,
  SiSass,
  SiSequelize,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava, FaListCheck } from "react-icons/fa6";
import {
  TbApi,
  TbArrowsExchange,
  TbBolt,
  TbBrowser,
  TbCloud,
  TbCreditCard,
  TbDatabase,
  TbDeviceMobile,
  TbFlask,
  TbGitBranch,
  TbLayoutKanban,
  TbLock,
  TbMail,
  TbPlugConnected,
  TbServer2,
  TbSparkles,
  TbTestPipe,
  TbTopologyStar3,
} from "react-icons/tb";

export type TechIcon = { Icon: IconType; color?: string };

// Se busca por coincidencia de subcadena (sin distinguir mayúsculas) y gana la
// coincidencia más larga, así "GitHub Actions" no cae en "Git" ni "JavaScript"
// en "Java". Si `color` es undefined, el icono hereda el color del texto
// (marcas negras como GitHub/Express que cambian con el tema claro/oscuro).
const TECH: { match: string; Icon: IconType; color?: string }[] = [
  // Lenguajes y frontend
  { match: "javascript", Icon: SiJavascript, color: "#F7DF1E" },
  { match: "typescript", Icon: SiTypescript, color: "#3178C6" },
  { match: "angular material", Icon: SiMaterialdesign, color: "#757575" },
  { match: "angular", Icon: SiAngular, color: "#DD0031" },
  { match: "rxjs", Icon: SiReactivex, color: "#B7178C" },
  { match: "bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { match: "scss", Icon: SiSass, color: "#CC6699" },
  { match: "react native", Icon: SiReact, color: "#61DAFB" },
  { match: "react", Icon: SiReact, color: "#61DAFB" },
  { match: "tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { match: "expo", Icon: SiExpo },
  // Backend
  { match: "node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { match: "nestjs", Icon: SiNestjs, color: "#E0234E" },
  { match: "express", Icon: SiExpress },
  { match: "spring security", Icon: SiSpringsecurity, color: "#6DB33F" },
  { match: "spring boot", Icon: SiSpringboot, color: "#6DB33F" },
  { match: "java", Icon: FaJava, color: "#F89820" },
  { match: "python", Icon: SiPython, color: "#3776AB" },
  { match: "maven", Icon: SiApachemaven, color: "#C71A36" },
  // Bases de datos / cache
  { match: "postgres", Icon: SiPostgresql, color: "#4169E1" },
  { match: "mysql", Icon: SiMysql, color: "#4479A1" },
  { match: "mongodb", Icon: SiMongodb, color: "#47A248" },
  { match: "redis", Icon: SiRedis, color: "#FF4438" },
  { match: "derby", Icon: TbDatabase, color: "#8A9199" },
  { match: "sequelize", Icon: SiSequelize, color: "#52B0E7" },
  // APIs, auth y mensajería
  { match: "rest apis", Icon: TbApi, color: "#22B8CF" },
  { match: "websockets", Icon: TbPlugConnected, color: "#12B886" },
  { match: "jwt", Icon: SiJsonwebtokens, color: "#D63AFF" },
  // Testing
  { match: "junit", Icon: SiJunit5, color: "#25A162" },
  { match: "mockito", Icon: TbTestPipe, color: "#8B5CF6" },
  { match: "jasmine", Icon: SiJasmine, color: "#8A4182" },
  { match: "playwright", Icon: TbTestPipe, color: "#2EAD33" },
  { match: "karma", Icon: TbFlask, color: "#0F6DDE" },
  // CI/CD, infra y herramientas
  { match: "github actions", Icon: SiGithubactions, color: "#2088FF" },
  { match: "github", Icon: SiGithub },
  { match: "gitlab", Icon: SiGitlab, color: "#FC6D26" },
  { match: "git", Icon: SiGit, color: "#F05032" },
  { match: "kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { match: "containerd", Icon: SiContainerd, color: "#8A9199" },
  { match: "docker", Icon: SiDocker, color: "#2496ED" },
  // Arquitectura / funcionalidades
  { match: "microservic", Icon: TbTopologyStar3, color: "#6366F1" },
  { match: "grpc", Icon: TbArrowsExchange, color: "#2CA5A0" },
  { match: "pago", Icon: TbCreditCard, color: "#22C55E" },
  { match: "payment", Icon: TbCreditCard, color: "#22C55E" },
  { match: "notificacion", Icon: TbMail, color: "#3B82F6" },
  { match: "email", Icon: TbMail, color: "#3B82F6" },
  // Metodologías
  { match: "scrum", Icon: FaListCheck, color: "#F0A030" },
  { match: "kanban", Icon: TbLayoutKanban, color: "#38B2AC" },
];

/** Devuelve el icono + color que corresponde a una tecnología por su nombre. */
export function getTechIcon(label: string): TechIcon | undefined {
  const value = label.toLowerCase();
  let best: (typeof TECH)[number] | undefined;
  for (const tech of TECH) {
    if (value.includes(tech.match) && (!best || tech.match.length > best.match.length)) {
      best = tech;
    }
  }
  return best ? { Icon: best.Icon, color: best.color } : undefined;
}

// Icono para las etiquetas de categoría del stack (según el nombre, en ES o EN).
const CATEGORY: Record<string, IconType> = {
  backend: TbServer2,
  frontend: TbBrowser,
  mobile: TbDeviceMobile,
  "base de datos": TbDatabase,
  "bases de datos": TbDatabase,
  database: TbDatabase,
  databases: TbDatabase,
  cache: TbBolt,
  auth: TbLock,
  testing: TbTestPipe,
  "ci/cd": TbGitBranch,
  infra: TbCloud,
  funcionalidades: TbSparkles,
  features: TbSparkles,
};

/** Devuelve el icono de una categoría del stack (o undefined si no hay). */
export function getCategoryIcon(label: string): IconType | undefined {
  return CATEGORY[label.toLowerCase()];
}
