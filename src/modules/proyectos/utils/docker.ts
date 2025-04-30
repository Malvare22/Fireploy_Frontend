export type DockerElement = { repository: string; tag: string[]; label: string };

export type DockerSet = {
  node: DockerElement;
  springBoot: DockerElement;
  expressJs: DockerElement;
  php: DockerElement;
  laravel: DockerElement;
  symphony: DockerElement;
  react: DockerElement;
  angular: DockerElement;
  nextJs: DockerElement;
};
export const dockerImages: DockerSet = {
  angular: { repository: "node", tag: ["23-alpine3.20", "TARRO"], label: "Angular" },
  expressJs: { repository: "node", tag: ["23-alpine3.20"], label: "ExpressJS" },
  laravel: { repository: "node", tag: ["23-alpine3.20"], label: "Laravel" },
  nextJs: { repository: "node", tag: ["23-alpine3.20"], label: "NextJS" },
  node: { repository: "node", tag: ["23-alpine3.20"], label: "NodeJS" },
  php: { repository: "node", tag: ["23-alpine3.20"], label: "PHP" },
  react: { repository: "node", tag: ["23-alpine3.20"], label: "ReactJS" },
  springBoot: { repository: "node", tag: ["23-alpine3.20"], label: "SpringBoot" },
  symphony: { repository: "node", tag: ["23-alpine3.20"], label: "Symphony" },
};

export const dockerImagesMap: Map<keyof DockerSet, DockerElement> = new Map(
  Object.entries(dockerImages) as [keyof DockerSet, DockerElement][]
);

export const dockerImagesArray = Array.from(dockerImagesMap, ([_key, value]) => value);
