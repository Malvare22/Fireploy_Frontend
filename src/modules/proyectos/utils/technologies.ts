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
  Reactjs = "React",
  Nextjs = "NextJS",
  Php = "PHP",
  Laravel = "Laravel",
  Java = "Java",
  Springboot = "SpringBoot",
  Expressjs = "ExpressJS",
  Symfony = "Symfony",
}

/**
 * keysOfTecnologies – A tuple of selected technology keys.
 *
 * This array defines a subset of technologies that are currently supported or being used in the project.
 */
export const keyOfTechnologies = [TECNOLOGIES.Java, TECNOLOGIES.Nodejs, TECNOLOGIES.Php] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 *
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectFramework: Record<(typeof keyOfTechnologies)[number], SelectTecnlogy> = {
  Java: {
    frameworks: [
      TECNOLOGIES.Springboot,
    ],
  },
  PHP: {
    frameworks: [
      TECNOLOGIES.Laravel,
      TECNOLOGIES.Symfony,
    ],
  },
  NodeJS: {
    frameworks: [
      TECNOLOGIES.Nextjs,
      TECNOLOGIES.Expressjs,
      TECNOLOGIES.Nodejs,
      TECNOLOGIES.Reactjs,
      TECNOLOGIES.Angular,
    ],
  },
} as const;
