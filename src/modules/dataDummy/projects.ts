import { TypeProject } from "@modules/projects/utils/TypeProject";

export const projectsDummies: TypeProject[] = [
    {
      titulo: "Gestor de Tareas",
      estado: "online",
      ultimaModificacion: "2025-01-07T14:30:00Z",
      tecnologias: [
        { imagen: "https://example.com/react-logo.png", nombre: "React" },
        { imagen: "https://example.com/nodejs-logo.png", nombre: "Node.js" },
      ],
    },
    {
      titulo: "E-commerce",
      estado: "offline",
      ultimaModificacion: "2024-12-15T09:15:00Z",
      tecnologias: [
        { imagen: "https://example.com/angular-logo.png", nombre: "Angular" },
        { imagen: "https://example.com/spring-logo.png", nombre: "Spring Boot" },
      ],
    },
    {
      titulo: "Blog Personal",
      estado: "pausado",
      ultimaModificacion: "2024-11-20T19:45:00Z",
      tecnologias: [
        { imagen: "https://example.com/vue-logo.png", nombre: "Vue.js" },
        { imagen: "https://example.com/laravel-logo.png", nombre: "Laravel" },
      ],
    },
    {
      titulo: "Aplicación de Finanzas",
      estado: "cargando",
      ultimaModificacion: "2025-01-01T08:00:00Z",
      tecnologias: [
        { imagen: "https://example.com/python-logo.png", nombre: "Python" },
        { imagen: "https://example.com/django-logo.png", nombre: "Django" },
      ],
    },
  ];
  