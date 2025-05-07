/**
 * SelectTenology – Represents the structure of a technology's versions and frameworks.
 * 
 * @property {string[]} versions - The available versions of the technology.
 * @property {string[]} frameworks - The available frameworks associated with the technology.
 */
type SelectTenology = {
  versions: string[];
  frameworks: string[];
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
  PHP = "Php",
  Laravel = "Laravel",
  Java = "Java",
  SpringBoot = "SpringBoot",
  ExpressJs = 'ExpressJS',
  Symphony = 'Symphony',
}

/**
 * keysOfTecnologies – A tuple of selected technology keys.
 * 
 * This array defines a subset of technologies that are currently supported or being used in the project.
 */
export const keysOfTecnologies = ["NodeJS", "Java", "PHP"] as const;

/**
 * inputSelectTecnology – A record mapping each technology (from `keysOfTecnologies`) to its respective SelectTenology.
 * 
 * This object contains the available versions and frameworks for each supported technology.
 */
export const inputSelectTecnology: Record<(typeof keysOfTecnologies)[number], SelectTenology> = {
  Java: {
    versions: ["1.0"],
    frameworks: ["SpringBoot"],
  },

  PHP: {
    frameworks: ["Laravel"],
    versions: ["8.3.20-apache"],
  },

  NodeJS: {
    frameworks: ["Angular", "React", "NextJS"],
    versions: ["23-alpine3.20"],
  },
};
