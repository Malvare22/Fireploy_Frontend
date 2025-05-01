export type DockerElement = { repository: string; tag: string[]; label: string };

export type DockerSet = {
  node: DockerElement;
  springBoot: DockerElement;
  expressJs: DockerElement;
  php: DockerElement;
  laravel: DockerElement;
  react: DockerElement;
  angular: DockerElement;
  nextJs: DockerElement;
};
export const dockerImages: DockerSet = {
  angular: { repository: "node", tag: ["23-alpine3.20", "TARRO"], label: "Angular" },
  expressJs: { repository: "node", tag: ["23-alpine3.20"], label: "ExpressJS" },
  laravel: { repository: "bitnami/laravel", tag: ["laravel:12.0.7"], label: "Laravel" },
  nextJs: { repository: "node", tag: ["23-alpine3.20"], label: "NextJS" },
  node: { repository: "node", tag: ["23-alpine3.20"], label: "NodeJS" },
  php: { repository: "php", tag: ["8.3.20-apache"], label: "PHP" },
  react: { repository: "node", tag: ["23-alpine3.20"], label: "ReactJS" },
  springBoot: { repository: "jelastic/springboot", tag: ["temurinjdk-24.0.1-almalinux-9"], label: "SpringBoot" },
};

export const dockerImagesMap: Map<keyof DockerSet, DockerElement> = new Map(
  Object.entries(dockerImages) as [keyof DockerSet, DockerElement][]
);

export const dockerImagesArray = Array.from(dockerImagesMap, ([_key, value]) => value);
