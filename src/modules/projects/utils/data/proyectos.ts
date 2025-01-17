import { TypeProyecto } from "../type/typeProyecto";

export const proyectosDummy: TypeProyecto[] = [
  {
    id: 1,
    titulo: "Gestor de Tareas",
    estado: "online",
    ultimaModificacion: "2025-01-07T14:30:00Z",
    colaboradores: [
      { id: 1, nombre: "user-001" },
      { id: 2, nombre: "user-002" },
      { id: 3, nombre: "user-003" },
    ],
    repositorioFrontend: {
      url: "https://github.com/example/task-manager-frontend",
      id: 3,  // Reemplazado 'tecnologia' por 'id'
    },
    repositorioBackend: {
      url: "https://github.com/example/task-manager-backend",
      id: 4,  // Reemplazado 'tecnologia' por 'id'
    },
    variablesEntorno: {
      API_URL: "https://api.taskmanager.com",
      NODE_ENV: "production",
    },
    baseDeDatos: {
      id: 11,  // Se refiere a MongoDB en tecnologiasDummy
      url: "https://mongodb.example.com",  // Agregado campo URL
    },
  },
  {
    id: 2,
    titulo: "E-commerce",
    estado: "offline",
    ultimaModificacion: "2024-12-15T09:15:00Z",
    colaboradores: [
      { id: 4, nombre: "user-004" },
      { id: 5, nombre: "user-005" },
    ],
    repositorioFrontend: {
      url: "https://github.com/example/ecommerce-frontend",
      id: 5,  // Reemplazado 'tecnologia' por 'id'
    },
    repositorioBackend: {
      url: "https://github.com/example/ecommerce-backend",
      id: 6,  // Reemplazado 'tecnologia' por 'id'
    },
    variablesEntorno: {
      PAYMENT_GATEWAY: "https://payments.example.com",
      NODE_ENV: "staging",
    },
    baseDeDatos: {
      id: 12,  // Se refiere a MySQL en tecnologiasDummy
      url: "https://sql.example.com",  // Agregado campo URL
    },
  },
  {
    id: 3,
    titulo: "Blog Personal",
    estado: "pausado",
    ultimaModificacion: "2024-11-20T19:45:00Z",
    colaboradores: [
      { id: 6, nombre: "user-006" },
      { id: 7, nombre: "user-007" },
    ],
    repositorioFrontend: {
      url: "https://github.com/example/blog-frontend",
      id: 7,  // Reemplazado 'tecnologia' por 'id'
    },
    repositorioBackend: {
      url: "https://github.com/example/blog-backend",
      id: 8,  // Reemplazado 'tecnologia' por 'id'
    },
    variablesEntorno: {
      DB_HOST: "127.0.0.1",
      DB_USER: "blog_user",
    },
    baseDeDatos: {
      id: 12,  // Se refiere a MySQL en tecnologiasDummy
      url: "https://mysql.example.com",  // Agregado campo URL
    },
  },
  {
    id: 4,
    titulo: "Aplicación de Finanzas",
    estado: "cargando",
    ultimaModificacion: "2025-01-01T08:00:00Z",
    colaboradores: [
      { id: 8, nombre: "user-008" },
      { id: 9, nombre: "user-009" },
      { id: 10, nombre: "user-010" },
    ],
    repositorioFrontend: {
      url: "https://github.com/example/finance-frontend",
      id: 3,  // Reemplazado 'tecnologia' por 'id'
    },
    repositorioBackend: {
      url: "https://github.com/example/finance-backend",
      id: 10,  // Reemplazado 'tecnologia' por 'id'
    },
    variablesEntorno: {
      SECRET_KEY: "s3cr3t_k3y",
      DEBUG: "false",
    },
    baseDeDatos: {
      id: 11,  // Se refiere a MongoDB en tecnologiasDummy
      url: "https://postgres.example.com",  // Agregado campo URL
    },
  },
];
