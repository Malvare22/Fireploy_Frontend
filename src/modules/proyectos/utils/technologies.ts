import { validationPrefix } from "@modules/general/utils/string";

/**
 * `SelectTecnlogy` – Represents the available frameworks associated with a given technology.
 *
 * @property frameworks - A list of framework names that can be used with the technology.
 */
type SelectTecnlogy = {
  frameworks: string[];
};

/**
 * `isTechnologyKey` – Type guard that checks if a given string is a valid technology key from the `TECNOLOGIES` enum.
 *
 * @param key - A string value that may represent a technology key.
 * @returns A boolean indicating whether the key exists in the `TECNOLOGIES` enum.
 */
export function isTechnologyKey(key: string | null): key is keyof typeof TECNOLOGIES {
  if (key == null) return false;
  return key in TECNOLOGIES;
}

/**
 * `TECNOLOGIES` – Enum listing all supported technologies and frameworks.
 *
 * Each enum member represents a distinct technology name used in the system.
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
 * `keyOfTechnologies` – A constant array of core technology enum values.
 *
 * Defines the main technologies considered as selectable for configuration.
 */
export const keyOfTechnologies = [TECNOLOGIES.Java, TECNOLOGIES.Nodejs, TECNOLOGIES.Php, TECNOLOGIES.Html, TECNOLOGIES.Python] as const;

/**
 * `keyOfTechnologiesForAlert` – A list of technologies that require special environment variable prefixes.
 *
 * Used for validating framework-specific environment variable naming conventions.
 */
export const keyOfTechnologiesForAlert: string[] = [TECNOLOGIES.React, TECNOLOGIES.Nextjs] as const;

/**
 * `inputSelectFramework` – Maps each supported core technology to its associated frameworks.
 *
 * Used to populate select components or determine valid framework options based on the technology.
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

/**
 * `getFrameworkEnvAlert` – Contains alert messages and documentation links for technologies that enforce prefix-based environment variables.
 *
 * Helps guide users to correct usage when working with frontend frameworks like React and NextJS.
 */
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

/**
 * `RESERVED_VARIABLES` – Categorized reserved environment variable names for SQL, NoSQL, and general configurations.
 *
 * Ensures that users do not override or misuse essential system-level environment variables.
 */
export const RESERVED_VARIABLES = {
  SQL: ["DB_DATABASE", "DB_PORT", "DB_HOST", "DB_USER", "DB_PASSWORD"],
  NO_SQL: ["DB_CONNECTION_URI"],
  GENERAL: ["PORT", "HOST", "BASE_PATH", "URL_FRONTEND", "URL_BACKEND", "FIREPLOY_HOST"],
} as const;

/**
 * `RESERVED_VARIABLES_ALL` – Flattened list of all reserved environment variables from all categories.
 *
 * Used during validation to ensure no conflicts with predefined variable names.
 */
export const RESERVED_VARIABLES_ALL = ([] as string[]).concat(
  [...RESERVED_VARIABLES.GENERAL],
  [...RESERVED_VARIABLES.NO_SQL],
  [...RESERVED_VARIABLES.SQL]
);

/**
 * `frameworkValidation` – Validates environment variables based on the selected framework's requirements.
 *
 * React requires variables to be prefixed with `VITE_`.
 * NextJS requires variables to be prefixed with `NEXT_PUBLIC_`.
 * Other frameworks only check for name conflicts with reserved variables.
 *
 * @param framework - The selected framework from the `TECNOLOGIES` enum.
 * @param variables - An array of environment variable names to validate.
 * @returns A boolean indicating if the given variables are valid for the selected framework.
 */
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
