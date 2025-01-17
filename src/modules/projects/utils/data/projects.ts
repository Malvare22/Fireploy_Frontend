import { TypeProject } from "../type/TypeProject";

export const projectsDummy: TypeProject[] = [
  {
    id: 1,
    titulo: "Gestor de Tareas",
    estado: "online",
    ultimaModificacion: "2025-01-07T14:30:00Z",
    tecnologias: [
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", nombre: "React" },
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", nombre: "Node.js" },
    ],
    colaboradores: [
      { id: 1, nombre: "user-001" },
      { id: 2, nombre: "user-002" },
      { id: 3, nombre: "user-003" }
    ],
    repositorioFrontend: {
      url: "https://github.com/example/task-manager-frontend",
      tecnologia: "React",
    },
    repositorioBackend: {
      url: "https://github.com/example/task-manager-backend",
      tecnologia: "Node.js",
    },
    tecnologiaRelacionada: "React",
    variablesEntorno: {
      API_URL: "https://api.taskmanager.com",
      NODE_ENV: "production",
    },
    baseDeDatos: {
      url: "https://mongodb.example.com",
      tipo: "MongoDB",
    },
  },
  {
    id: 2,
    titulo: "E-commerce",
    estado: "offline",
    ultimaModificacion: "2024-12-15T09:15:00Z",
    tecnologias: [
      { imagen: "https://angular.io/assets/images/logos/angular/angular.svg", nombre: "Angular" },
      { imagen: "https://spring.io/images/spring-initializr-4291cc0115eb104348717b82161b0f50.svg", nombre: "Spring Boot" },
    ],
    colaboradores: [
      { id: 4, nombre: "user-004" },
      { id: 5, nombre: "user-005" }
    ],
    repositorioFrontend: {
      url: "https://github.com/example/ecommerce-frontend",
      tecnologia: "Angular",
    },
    repositorioBackend: {
      url: "https://github.com/example/ecommerce-backend",
      tecnologia: "Spring Boot",
    },
    tecnologiaRelacionada: "Spring Boot",
    variablesEntorno: {
      PAYMENT_GATEWAY: "https://payments.example.com",
      NODE_ENV: "staging",
    },
    baseDeDatos: {
      url: "https://sql.example.com",
      tipo: "SQL",
    },
  },
  {
    id: 3,
    titulo: "Blog Personal",
    estado: "pausado",
    ultimaModificacion: "2024-11-20T19:45:00Z",
    tecnologias: [
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg", nombre: "Vue.js" },
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg", nombre: "Laravel" },
    ],
    colaboradores: [
      { id: 6, nombre: "user-006" },
      { id: 7, nombre: "user-007" }
    ],
    repositorioFrontend: {
      url: "https://github.com/example/blog-frontend",
      tecnologia: "Vue.js",
    },
    repositorioBackend: {
      url: "https://github.com/example/blog-backend",
      tecnologia: "Laravel",
    },
    tecnologiaRelacionada: "Vue.js",
    variablesEntorno: {
      DB_HOST: "127.0.0.1",
      DB_USER: "blog_user",
    },
    baseDeDatos: {
      url: "https://mysql.example.com",
      tipo: "MySQL",
    },
  },
  {
    id: 4,
    titulo: "Aplicación de Finanzas",
    estado: "cargando",
    ultimaModificacion: "2025-01-01T08:00:00Z",
    tecnologias: [
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", nombre: "Python" },
      { imagen: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg", nombre: "Django" },
    ],
    colaboradores: [
      { id: 8, nombre: "user-008" },
      { id: 9, nombre: "user-009" },
      { id: 10, nombre: "user-010" }
    ],
    repositorioFrontend: {
      url: "https://github.com/example/finance-frontend",
      tecnologia: "React",
    },
    repositorioBackend: {
      url: "https://github.com/example/finance-backend",
      tecnologia: "Django",
    },
    tecnologiaRelacionada: "Django",
    variablesEntorno: {
      SECRET_KEY: "s3cr3t_k3y",
      DEBUG: "false",
    },
    baseDeDatos: {
      url: "https://postgres.example.com",
      tipo: "PostgreSQL",
    },
  },
];

export type TypeTechnology = {
  id: number;
  text: string;
  type: "frontend" | "backend";
};

export const technologiesDummy: TypeTechnology[] = [
  { id: 1, text: "JavaScript", type: "backend" },
  { id: 2, text: "TypeScript", type: "backend" },
  { id: 3, text: "React", type: "frontend" },
];
