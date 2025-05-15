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

/**
 * TECNOLOGIES – Enum representing a list of technology names.
 *
 * Each entry corresponds to a specific technology used in the project, such as NodeJS, Angular, ReactJS, etc.
 */
export enum TECNOLOGIES {
  NodeJS = "NodeJS",
  Angular = "Angular",
  ReactJS = "React",
  NextJS = "NextJs",
  PHP = "PHP",
  Laravel = "Laravel",
  Java = "Java",
  SpringBoot = "SpringBoot",
  ExpressJs = "ExpressJS",
  Symphony = "Symphony",
}

const nodejs: SelectTechnlogy = {
  technology: TECNOLOGIES.NodeJS,
  versions: ["23-alpine3.20"],
};

const java: SelectTechnlogy = {
  technology: TECNOLOGIES.Java,
  versions: ["1.0"],
};

const php: SelectTechnlogy = {
  technology: TECNOLOGIES.PHP,
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
  TECNOLOGIES.ReactJS,
  TECNOLOGIES.NextJS,
  TECNOLOGIES.SpringBoot,
  TECNOLOGIES.ExpressJs,
  TECNOLOGIES.Symphony,
] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 *
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectFramework: Record<(typeof keysOfFrameworks)[number], SelectTechnlogy[]> = {
  Angular: [nodejs],
  React: [nodejs],
  NextJs: [nodejs],
  ExpressJS: [nodejs],
  Laravel: [php],
  Symphony: [php],
  SpringBoot: [java],
} as const;
