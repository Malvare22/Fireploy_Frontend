import { validationPrefix } from "@modules/general/utils/string";

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
  Fastapi = 'FastAPI',
  Nestjs = 'NestJS'
}

/**
 * keysOfTecnologies – A tuple of selected technology keys.
 *
 * This array defines a subset of technologies that are currently supported or being used in the project.
 */
export const keyOfTechnologies = [TECNOLOGIES.Java, TECNOLOGIES.Nodejs, TECNOLOGIES.Php, TECNOLOGIES.Html, TECNOLOGIES.Python] as const;

export const keyOfTechnologiesForAlert: string[] = [TECNOLOGIES.React, TECNOLOGIES.Nextjs] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 *
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectFramework: Record<(typeof keyOfTechnologies)[number], SelectTecnlogy> = {
  Java: {
    frameworks: [TECNOLOGIES.Springboot, TECNOLOGIES.Java],
  },
  PHP: {
    frameworks: [TECNOLOGIES.Php, TECNOLOGIES.Laravel, TECNOLOGIES.Symfony],
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
      TECNOLOGIES.Fastapi,
    ]
  }
} as const;

export const getFrameworkEnvAlert: Record<
  (typeof keyOfTechnologiesForAlert)[number],
  { message: string; myDocUrl: string }
> = {
  React: { message: "Debido a que usas React, se requiere que uses el prefijo `VITE` en tus variables de entorno", myDocUrl: "https://vite.dev/guide/env-and-mode" },
  NextJS: {
    message: "Debido a que usas NextJS, se requiere que uses el prefijo `NEXT_PUBLIC` en tus variables de entorno",
    myDocUrl: 'https://nextjs.org/docs/pages/guides/environment-variables'
  }
};

export const RESERVED_VARIABLES = {
  SQL: ["DB_DATABASE", "DB_PORT", "DB_HOST", "DB_USER", "DB_PASSWORD"],
  NO_SQL: ["DB_CONNECTION_URI"],
  GENERAL: ["PORT", "HOST", "BASE_PATH", "URL_FRONTEND", "URL_BACKEND", "FIREPLOY_HOST"],
} as const;

export const RESERVED_VARIABLES_ALL = ([] as string[]).concat(
  [...RESERVED_VARIABLES.GENERAL],
  [...RESERVED_VARIABLES.NO_SQL],
  [...RESERVED_VARIABLES.SQL]
);

export const frameworkValidation = (framework: TECNOLOGIES, variables: string[]): boolean => {
  switch (framework) {
    case 'React': {
      const PREFIX = 'VITE_'
      for (const WORD of variables) {
        if (!validationPrefix(WORD, PREFIX) || RESERVED_VARIABLES_ALL.map((s) => PREFIX + s).includes(WORD)) return false;
      }
      return true;
    }

    case 'NextJS': {
      const PREFIX = 'NEXT_PUBLIC_'
      for (const WORD of variables) {
        if (!validationPrefix(WORD, PREFIX) || RESERVED_VARIABLES_ALL.map((s) => PREFIX + s).includes(WORD)) return false;
      }
      return true;
    }

    default: {
      for (const WORD of variables) {
        if (RESERVED_VARIABLES_ALL.includes(WORD)) return false;
      }
      return true;
    }

  }
}
