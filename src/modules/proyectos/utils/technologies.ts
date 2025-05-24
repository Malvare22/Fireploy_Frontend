/**
 * SelectTenology – Represents the structure of a technology's versions and frameworks.
 *
 * @property {string[]} versions - The available versions of the technology.
 * @property {string[]} frameworks - The available frameworks associated with the technology.
 */
type SelectTecnlogy = {
  frameworks: string[];
};

export function isTechnologyKey(key: string | null): key is keyof typeof TECNOLOGIES {
  if (key == null) return false;
  return key in TECNOLOGIES;
}

/**
 * TECNOLOGIES – Enum representing a list of technology names.
 *
 * Each entry corresponds to a specific technology used in the project, such as NodeJS, Angular, ReactJS, etc.
 */
export enum TECNOLOGIES {
  Nodejs = "NodeJS",
  Angular = "Angular",
  React = "React",
  Nextjs = "NextJS",
  Php = "PHP",
  Laravel = "Laravel",
  Java = "Java",
  Springboot = "SpringBoot",
  Expressjs = "ExpressJS",
  Symfony = "Symfony",
  Html = 'HTML',
  Python = 'Python',
  Django = 'Django',
  Fastapi = 'FastAPI'
}

/**
 * keysOfTecnologies – A tuple of selected technology keys.
 *
 * This array defines a subset of technologies that are currently supported or being used in the project.
 */
export const keyOfTechnologies = [TECNOLOGIES.Java, TECNOLOGIES.Nodejs, TECNOLOGIES.Php, TECNOLOGIES.Html, TECNOLOGIES.Python] as const;

export const keyOfTechnologiesForAlert: string[] = [TECNOLOGIES.React] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 *
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectFramework: Record<(typeof keyOfTechnologies)[number], SelectTecnlogy> = {
  Java: {
    frameworks: [TECNOLOGIES.Springboot],
  },
  PHP: {
    frameworks: [TECNOLOGIES.Laravel, TECNOLOGIES.Symfony],
  },
  NodeJS: {
    frameworks: [
      TECNOLOGIES.Nextjs,
      TECNOLOGIES.Expressjs,
      TECNOLOGIES.Nodejs,
      TECNOLOGIES.React,
      TECNOLOGIES.Angular,
    ],
  },
  HTML: {
    frameworks: [
      TECNOLOGIES.Html
    ]
  },
  Python: {
    frameworks: [
      TECNOLOGIES.Django,
      TECNOLOGIES.Fastapi
    ]
  }
} as const;

export const getFrameworkEnvAlert: Record<
  (typeof keyOfTechnologiesForAlert)[number],
  { message: string; myDocUrl: string }
> = {
  React: { message: "Debido a que usas React, se requiere que uses el prefijo `VITE` en tus variables de entorno", myDocUrl: "https://vite.dev/guide/env-and-mode" },
};

export const reservedVariables = {
  SQL: ["DB_DATABASE", "DB_PORT", "DB_HOST", "DB_USER", "DB_PASSWORD"],
  NO_SQL: ["DB_CONNECTION_URI"],
  GENERAL: ["PORT", "HOST", "BASE_PATH", "URL_FRONTEND", "URL_BACKEND"],
} as const;
