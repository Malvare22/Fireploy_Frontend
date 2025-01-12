import { TypeProject } from "../TypeProject";

export const projectsDummy: TypeProject[] = [
  {
    id: "proj-001",
    titulo: "Gestor de Tareas",
    estado: "online",
    ultimaModificacion: "2025-01-07T14:30:00Z",
    tecnologias: [
      { imagen: "https://example.com/react-logo.png", nombre: "React" },
      { imagen: "https://example.com/nodejs-logo.png", nombre: "Node.js" },
    ],
    colaboradores: ["user-001", "user-002", "user-003"],
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
    id: "proj-002",
    titulo: "E-commerce",
    estado: "offline",
    ultimaModificacion: "2024-12-15T09:15:00Z",
    tecnologias: [
      { imagen: "https://example.com/angular-logo.png", nombre: "Angular" },
      { imagen: "https://example.com/spring-logo.png", nombre: "Spring Boot" },
    ],
    colaboradores: ["user-004", "user-005"],
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
    id: "proj-003",
    titulo: "Blog Personal",
    estado: "pausado",
    ultimaModificacion: "2024-11-20T19:45:00Z",
    tecnologias: [
      { imagen: "https://example.com/vue-logo.png", nombre: "Vue.js" },
      { imagen: "https://example.com/laravel-logo.png", nombre: "Laravel" },
    ],
    colaboradores: ["user-006", "user-007"],
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
    id: "proj-004",
    titulo: "Aplicación de Finanzas",
    estado: "cargando",
    ultimaModificacion: "2025-01-01T08:00:00Z",
    tecnologias: [
      { imagen: "https://example.com/python-logo.png", nombre: "Python" },
      { imagen: "https://example.com/django-logo.png", nombre: "Django" },
    ],
    colaboradores: ["user-008", "user-009", "user-010"],
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
