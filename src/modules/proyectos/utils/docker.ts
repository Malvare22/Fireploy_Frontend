/**
 * SelectTenology – Represents the structure of a technology's versions and frameworks.
 *
 * @property {string[]} versions - The available versions of the technology.
 * @property {string[]} frameworks - The available frameworks associated with the technology.
 */
type SelectTechnlogy = {
  technology: string;
  versions: string[];
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
  Symphony = "Symphony",
}

export enum CastTecnology {}

const nodejs: SelectTechnlogy = {
  technology: TECNOLOGIES.Nodejs,
  versions: ["23-alpine3.20"],
};

const java: SelectTechnlogy = {
  technology: TECNOLOGIES.Java,
  versions: ["1.0"],
};

const php: SelectTechnlogy = {
  technology: TECNOLOGIES.Php,
  versions: ["8.3.20-apache"],
};

/**
 * keysOfTecnologies – A tuple of selected technology keys.
 *
 * This array defines a subset of technologies that are currently supported or being used in the project.
 */
export const keysOfFrameworks = [
  TECNOLOGIES.Laravel,
  TECNOLOGIES.Angular,
  TECNOLOGIES.Reactjs,
  TECNOLOGIES.Nextjs,
  TECNOLOGIES.Springboot,
  TECNOLOGIES.Expressjs,
  TECNOLOGIES.Symphony,
  TECNOLOGIES.Nodejs,
] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 *
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectFramework: Record<(typeof keysOfFrameworks)[number], SelectTechnlogy[]> = {
  Angular: [nodejs],
  React: [nodejs],
  NextJS: [nodejs],
  ExpressJS: [nodejs],
  Laravel: [php],
  Symphony: [php],
  SpringBoot: [java],
  NodeJS: [nodejs],
} as const;
