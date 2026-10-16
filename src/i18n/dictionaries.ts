export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

export type EducationEntry = {
  institution: string;
  degree: string;
  status?: string;
  period?: string;
  details?: string;
  logo?: string;
};

export type StackGroup = { label: string; items: string[] };
export type ProjectLink = { label: string; url: string };
export type ProjectEntry = {
  title: string;
  description: string;
  architecture: string;
  status?: string;
  stack: StackGroup[];
  links: ProjectLink[];
};

export type Responsibility = { title: string; detail: string };

export type ExperienceEntry = {
  role: string;
  company: string;
  employmentType: string;
  period: string;
  duration: string;
  location: string;
  workMode: string;
  subtitle: string;
  summary: string;
  stack: string[];
  responsibilities: Responsibility[];
  logo?: string;
};

const NAME = "Federico Cotrena";
const ROLE = "Software Engineer (Front End)";

const es = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    theme: "Cambiar tema",
    language: "Cambiar idioma",
  },
  common: {
    openToWork: "( Disponible para trabajar )",
  },
  home: {
    role: ROLE,
    greeting: "Hola, soy",
    name: NAME,
    intro:
      "Más de 3 años construyendo aplicaciones web con Angular y TypeScript, con foco en interfaces modulares y mantenibles. Ahora también integro IA (LLM APIs) en el frontend. Analista y Programador graduado de la UNPSJB.",
    cta: "Ver proyectos",
    cv: "Ver CV",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  about: {
    heading: "Quién soy",
    lead: "Software Engineer con más de 3 años de experiencia profesional, orientado a Frontend con Angular y Node.js. Graduado como Analista y Programador Universitario y estudiante avanzado de la Licenciatura en Informática, ambas en la UNPSJB. Me interesa el trabajo en equipo y el desarrollo de soluciones adaptadas a las necesidades del negocio. Buscando una oportunidad remota o híbrida donde seguir aportando mi experiencia y seguir creciendo como desarrollador.",
    location: "Puerto Madryn, Chubut · Argentina",
    photoPrev: "Foto anterior",
    photoNext: "Foto siguiente",
    photoDot: "Ir a la foto",
    skillsHeading: "Tecnologías y herramientas",
    skillGroups: [
      {
        label: "Frontend",
        items: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "RxJS",
          "Angular Material",
          "Bootstrap",
          "SCSS",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "NestJS", "Express.js", "Java", "Spring Boot"],
      },
      {
        label: "Bases de datos",
        items: ["MySQL", "PostgreSQL", "Sequelize"],
      },
      {
        label: "APIs y comunicación",
        items: ["REST APIs", "JWT", "WebSockets"],
      },
      {
        label: "Testing",
        items: ["Playwright", "Jasmine", "Karma"],
      },
      {
        label: "Herramientas",
        items: ["Docker", "Git", "GitHub", "GitLab"],
      },
      {
        label: "Metodologías",
        items: ["Scrum", "Kanban"],
      },
    ],
    educationHeading: "Educación",
    education: [
      {
        institution: "Universidad Nacional de la Patagonia San Juan Bosco",
        degree: "Licenciatura en Informática",
        status: "Estudiante",
        details: "70% Finales aprobados",
        logo: "/images/education/unpsjb.png",
      },
      {
        institution: "Universidad Nacional de la Patagonia San Juan Bosco",
        degree: "Analista Programador Universitario (APU)",
        status: "Graduado",
        logo: "/images/education/unpsjb.png",
      },
      {
        institution: "EducacionIT",
        degree: "Digitalers Front End Developer",
        period: "jul. 2026 – nov. 2026",
        logo: "/images/education/educacionit.png",
      },
    ] as EducationEntry[],
  },
  projects: {
    heading: "Proyectos destacados",
    lead: "Una selección de trabajos donde combiné arquitectura, producto ,código limpio y trabajo colaborativo" ,
    items: [
      {
        title: "Sale Partido",
        description:
          "Plataforma para la gestión y reserva de espacios deportivos con participación comunitaria. Conecta jugadores, propietarios de espacios y organizadores de eventos: permite descubrir espacios, reservarlos y participar en eventos.",
        architecture: "Monolito modular",
        stack: [
          { label: "Backend", items: ["Java 21", "Spring Boot 4.0.6", "Maven"] },
          {
            label: "Frontend",
            items: ["TypeScript 5.9", "Angular 20.3", "Bootstrap 5"],
          },
          { label: "Base de datos", items: ["PostgreSQL 15+"] },
          { label: "Cache", items: ["Redis 7+"] },
          { label: "Auth", items: ["JWT (HS256)", "Spring Security"] },
          {
            label: "Testing",
            items: ["JUnit 5", "Mockito", "Jasmine", "Playwright"],
          },
          { label: "CI/CD", items: ["GitHub Actions"] },
          {
            label: "Infra",
            items: ["Docker", "Kubernetes 1.31.14", "containerd"],
          },
        ],
        links: [
          { label: "Código", url: "https://github.com/cozakoo/sale_partido" },
        ],
      },
      {
        title: "Traxpet",
        description:
          "Aplicación para la búsqueda de mascotas perdidas a partir de sus características físicas. Las mascotas vistas se publican para que su dueño/a pueda saber dónde fue vista y poder buscarla. Proyecto final de la carrera de Analista Programador, desarrollado en equipo de 3 integrantes y planificado con metodologías ágiles.",
        architecture: "Monolito modular",
        stack: [
          { label: "Mobile", items: ["React Native", "Expo", "Tailwind CSS"] },
          { label: "Backend", items: ["Java", "Python"] },
          { label: "Base de datos", items: ["DerbySQL"] },
          { label: "Infra", items: ["Docker"] },
        ],
        links: [
          {
            label: "Código (app)",
            url: "https://github.com/fepa0110/traxpet-app-new",
          },
          {
            label: "Código (server)",
            url: "https://github.com/fepa0110/traxpet-server",
          },
        ],
      },
      {
        title: "NestReserve",
        description:
          "Sistema de reservas construido con NestJS y arquitectura de microservicios. Va más allá de la documentación de NestJS: acepta pagos, envía notificaciones por correo electrónico y persiste datos en MongoDB, PostgreSQL y MySQL.",
        architecture: "Microservicios",
        status: "En desarrollo",
        stack: [
          { label: "Backend", items: ["NestJS", "Microservicios", "gRPC"] },
          {
            label: "Bases de datos",
            items: ["MongoDB", "PostgreSQL", "MySQL"],
          },
          {
            label: "Funcionalidades",
            items: ["Pagos", "Notificaciones por email"],
          },
        ],
        links: [],
      },
    ] as ProjectEntry[],
  },
  experience: {
    heading: "Experiencia",
    lead: "Desarrollo de interfaces web con Angular y TypeScript, enfocadas en usabilidad, mantenibilidad y experiencia de usuario",
    contactText:
      "Actualmente estoy buscando una oportunidad remota o híbrida donde seguir aportando mi experiencia y seguir creciendo como profesional.",
    contactCta: "Enviar un mail",
    contactCv: "Ver CV",
    items: [
      {
        role: ROLE + " | Angular | Node.js",
        company: "Intermares",
        employmentType: "Jornada completa",
        period: "ene. 2023 - abr. 2026",
        duration: "3 años 4 meses",
        location: "Puerto Madryn, Provincia del Chubut, Argentina",
        workMode: "Híbrido",
        subtitle: " Software Engineer Front End",
        summary:
          "Desarrollé y mantuve un sistema de gestión interno, desde las interfaces de usuario hasta las APIs y la integración con la base de datos. Entre las principales funcionalidades que implementé se encuentran:",
        stack: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "RxJS",
          "Angular Material",
          "Bootstrap",
          "REST APIs",
          "Node.js",
          "Express",
          "JWT",
          "MySQL",
          "Sequelize",
          "WebSockets",
          "jsPDF",
          "GitHub",
          "Jira",
          "Scrum",
          "Kanban",
        ],
        responsibilities: [
          {
            title: "Arquitectura",
            detail:
              "desarrollo dentro de un monolito modular (Angular + Node.js), con separación clara de dominios y responsabilidades por módulo.",
          },
          {
            title: "Frontend",
            detail:
              "desarrollo y mantenimiento de una SPA empresarial con Angular (v8–v15): lazy loading, routing avanzado, guards e interceptors.",
          },
          {
            title: "Backend",
            detail:
              "diseño e implementación de APIs REST con Node.js y Express, con autenticación JWT y control de acceso por roles, sobre bases de datos MySQL modeladas con Sequelize ORM.",
          },
          {
            title: "Tiempo real",
            detail:
              "dashboard de notificaciones con historial, filtros por estado y tipo, y actualizaciones en vivo mediante WebSockets.",
          },
          {
            title: "Reportes y visualización",
            detail:
              "dashboards interactivos, gráficos estadísticos y exportación de reportes dinámicos con jsPDF.",
          },
          {
            title: "Trabajo en equipo",
            detail:
              "coordinación de tareas con Jira, control de versiones con GitHub, bajo metodologías Scrum y Kanban.",
          },
          {
            title: "Órdenes de trabajo",
            detail:
              "interfaces para el seguimiento de órdenes, carga de horas, documentación, estados de entrega y novedades.",
          },
          {
            title: "Compras",
            detail:
              "desarrollo del flujo de solicitudes, cotizaciones y órdenes de compra, con historial por proveedor.",
          },
          {
            title: "Producción y mecanizado",
            detail:
              "formularios para partes diarios y control de horas por empleado y orden de trabajo, con validaciones reactivas.",
          },
          {
            title: "Recursos Humanos",
            detail:
              "vistas para la gestión de legajos, ausencias, vacaciones y capacitaciones.",
          },
          {
            title: "Administración y ventas",
            detail:
              "interfaces para documentación, facturación, seguimiento de cobros, presupuestos y pedidos de clientes.",
          },
          {
            title: "Planificación y logística",
            detail:
              "paneles de seguimiento de flota, vencimientos de vehículos y programación de servicios.",
          },
          {
            title: "Mantenimiento y evolución",
            detail:
              "incorporación de funcionalidades, reutilización de componentes y mejoras continuas de usabilidad.",
          },
          {
            title: "Trabajo con usuarios",
            detail:
              "relevamiento de requerimientos e iteración sobre las interfaces junto con las distintas áreas de la empresa.",
          },
        ],
        logo: "/images/experience/intermares.png",
      },
    ] as ExperienceEntry[],
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    theme: "Toggle theme",
    language: "Toggle language",
  },
  common: {
    openToWork: "( Open to work )",
  },
  home: {
    role: ROLE,
    greeting: "Hey, I'm",
    name: NAME,
    intro:
      "3+ years building web applications with Angular and TypeScript, focused on modular, maintainable interfaces. I also bring AI (LLM APIs) into the frontend. Analyst and Programmer graduate from UNPSJB.",
    cta: "See projects",
    cv: "View CV",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  about: {
    heading: "Who I am",
    lead: "Software Engineer with over 3 years of professional experience, frontend-oriented with Angular and Node.js. Graduated as a University Analyst and Programmer and an advanced student of the Bachelor's degree in Computer Science, both at UNPSJB. I'm interested in teamwork and building solutions tailored to business needs. Looking for a remote or hybrid opportunity where I can keep contributing my experience and keep growing as a developer.",
    location: "Puerto Madryn, Chubut · Argentina",
    photoPrev: "Previous photo",
    photoNext: "Next photo",
    photoDot: "Go to photo",
    skillsHeading: "Technologies & tools",
    skillGroups: [
      {
        label: "Frontend",
        items: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "RxJS",
          "Angular Material",
          "Bootstrap",
          "SCSS",
        ],
      },
      {
        label: "Backend",
        items: ["Node.js", "NestJS", "Express.js", "Java", "Spring Boot"],
      },
      {
        label: "Databases",
        items: ["MySQL", "PostgreSQL", "Sequelize"],
      },
      {
        label: "APIs & communication",
        items: ["REST APIs", "JWT", "WebSockets"],
      },
      {
        label: "Testing",
        items: ["Playwright", "Jasmine", "Karma"],
      },
      {
        label: "Tools",
        items: ["Docker", "Git", "GitHub", "GitLab"],
      },
      {
        label: "Methodologies",
        items: ["Scrum", "Kanban"],
      },
    ],
    educationHeading: "Education",
    education: [
      {
        institution: "Universidad Nacional de la Patagonia San Juan Bosco",
        degree: "Bachelor's Degree in Computer Science",
        status: "Student",
        details: "70% of final exams passed",
        logo: "/images/education/unpsjb.png",
      },
      {
        institution: "Universidad Nacional de la Patagonia San Juan Bosco",
        degree: "University Analyst and Programmer (APU)",
        status: "Graduate",
        logo: "/images/education/unpsjb.png",
      },
      {
        institution: "EducacionIT",
        degree: "Digitalers Front End Developer",
        period: "Jul 2026 – Nov 2026",
        logo: "/images/education/educacionit.png",
      },
    ] as EducationEntry[],
  },
  projects: {
    heading: "Featured projects",
    lead: "A selection of work where I combined architecture, product and clean code.",
    items: [
      {
        title: "Sale Partido",
        description:
          "Platform for managing and booking sports spaces with community participation. It connects players, space owners and event organizers: discover spaces, book them and join events.",
        architecture: "Modular monolith",
        stack: [
          { label: "Backend", items: ["Java 21", "Spring Boot 4.0.6", "Maven"] },
          {
            label: "Frontend",
            items: ["TypeScript 5.9", "Angular 20.3", "Bootstrap 5"],
          },
          { label: "Database", items: ["PostgreSQL 15+"] },
          { label: "Cache", items: ["Redis 7+"] },
          { label: "Auth", items: ["JWT (HS256)", "Spring Security"] },
          {
            label: "Testing",
            items: ["JUnit 5", "Mockito", "Jasmine", "Playwright"],
          },
          { label: "CI/CD", items: ["GitHub Actions"] },
          {
            label: "Infra",
            items: ["Docker", "Kubernetes 1.31.14", "containerd"],
          },
        ],
        links: [
          { label: "Code", url: "https://github.com/cozakoo/sale_partido" },
        ],
      },
      {
        title: "Traxpet",
        description:
          "App to find lost pets based on their physical characteristics. Spotted pets are published so their owner can know where they were seen and look for them. Final project for the University Analyst and Programmer degree, built by a team of 3 and planned with agile methodologies.",
        architecture: "Modular monolith",
        stack: [
          { label: "Mobile", items: ["React Native", "Expo", "Tailwind CSS"] },
          { label: "Backend", items: ["Java", "Python"] },
          { label: "Database", items: ["DerbySQL"] },
          { label: "Infra", items: ["Docker"] },
        ],
        links: [
          {
            label: "Code (app)",
            url: "https://github.com/fepa0110/traxpet-app-new",
          },
          {
            label: "Code (server)",
            url: "https://github.com/fepa0110/traxpet-server",
          },
        ],
      },
      {
        title: "NestReserve",
        description:
          "Booking system built with NestJS and a microservices architecture. It goes beyond the NestJS docs: it accepts payments, sends email notifications and persists data in MongoDB, PostgreSQL and MySQL.",
        architecture: "Microservices",
        status: "In development",
        stack: [
          { label: "Backend", items: ["NestJS", "Microservices", "gRPC"] },
          {
            label: "Databases",
            items: ["MongoDB", "PostgreSQL", "MySQL"],
          },
          {
            label: "Features",
            items: ["Payments", "Email notifications"],
          },
        ],
        links: [],
      },
    ] as ProjectEntry[],
  },
  experience: {
    heading: "Experience",
    lead: "Development of web interfaces with Angular and TypeScript, focused on usability, maintainability, and user experience.",
    contactText:
      "I'm currently looking for a remote or hybrid opportunity where I can keep contributing my experience and keep growing as a professional.",
    contactCta: "Send an email",
    contactCv: "View CV",
    items: [
      {
        role: ROLE +" | Angular | Node.js",
        company: "Intermares",
        employmentType: "Full-time",
        period: "Jan 2023 - Apr 2026",
        duration: "3 yrs 4 mos",
        location: "Puerto Madryn, Chubut Province, Argentina",
        workMode: "Hybrid",
        subtitle: ROLE+" — Internal management system",
        summary:
          "I built and maintained an internal management system end to end: interfaces, APIs and database. These were my main responsibilities and features:",
        stack: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "RxJS",
          "Angular Material",
          "Bootstrap",
          "REST APIs",
          "Node.js",
          "Express",
          "JWT",
          "MySQL",
          "Sequelize",
          "WebSockets",
          "jsPDF",
          "GitHub",
          "Jira",
          "Scrum",
          "Kanban",
        ],
        responsibilities: [
          {
            title: "Architecture",
            detail:
              "development inside a modular monolith (Angular + Node.js), with a clear separation of domains and responsibilities per module.",
          },
          {
            title: "Frontend",
            detail:
              "development and maintenance of an enterprise SPA with Angular (v8–v15): lazy loading, advanced routing, guards and interceptors.",
          },
          {
            title: "Backend",
            detail:
              "design and implementation of REST APIs with Node.js and Express, with JWT authentication and role-based access control, on MySQL databases modeled with Sequelize ORM.",
          },
          {
            title: "Real-time",
            detail:
              "notification dashboard with history, status and type filters, and live updates over WebSockets.",
          },
          {
            title: "Reporting & visualization",
            detail:
              "interactive dashboards, statistical charts and dynamic report export with jsPDF.",
          },
          {
            title: "Teamwork",
            detail:
              "task coordination with Jira, version control with GitHub, under Scrum and Kanban methodologies.",
          },
          {
            title: "Work orders",
            detail:
              "interfaces for tracking orders, logging hours, documentation, delivery stages and updates.",
          },
          {
            title: "Purchasing",
            detail:
              "request, quotation and purchase-order flow, with per-supplier history.",
          },
          {
            title: "Production & machining",
            detail:
              "forms for daily reports and hour tracking by employee and work order, with reactive validations.",
          },
          {
            title: "Human Resources",
            detail:
              "views for managing employee records, absences, vacations and training.",
          },
          {
            title: "Administration & sales",
            detail:
              "interfaces for documentation, invoicing, collection tracking, quotes and customer orders.",
          },
          {
            title: "Planning & logistics",
            detail:
              "panels for fleet tracking, vehicle due dates and service scheduling.",
          },
          {
            title: "Maintenance & evolution",
            detail:
              "adding features, reusing components and continuously improving usability.",
          },
          {
            title: "Working with users",
            detail:
              "gathering requirements and iterating on the interfaces together with the company's different areas.",
          },
        ],
        logo: "/images/experience/intermares.png",
      },
    ] as ExperienceEntry[],
  },
};

export const dictionaries: Record<Language, Dictionary> = { es, en };
