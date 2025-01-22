export interface TypeTecnologia{
    id: number, text: string, type: "backend" | "frontend" | "database", imagen: string
};
export const tecnologiasDummy: TypeTecnologia[] = [
  {
    id: 1,
    text: "JavaScript",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    id: 2,
    text: "TypeScript",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    id: 3,
    text: "React",
    type: "frontend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    id: 4,
    text: "Node.js",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    id: 5,
    text: "Angular",
    type: "frontend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    id: 6,
    text: "Spring Boot",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    id: 7,
    text: "Vue.js",
    type: "frontend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    id: 8,
    text: "Laravel",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  },
  {
    id: 9,
    text: "Python",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    id: 10,
    text: "Django",
    type: "backend",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    id: 11,
    text: "MongoDB",
    type: "database",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    id: 12,
    text: "MySQL",
    type: "database",
    imagen: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
];
