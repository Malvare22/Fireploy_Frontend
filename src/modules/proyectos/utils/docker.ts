type SelectTenology = {
  versions: string[];
  frameworks: string[];
};

export enum TECNOLOGIES {
  NodeJS = "NodeJS",
  Angular = "Angular",
  ReactJS = "React",
  NextJS = "NextJs",
  PHP = "Php",
  Laravel = "Laravel",
  Java = "Java",
  SpringBoot = "SpringBoot",
}

export const keysOfTecnologies = ["NodeJS", "Java", "PHP"] as const;

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
