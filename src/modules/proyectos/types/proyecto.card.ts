import { UsuarioPortafolioCard, usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";
import { Proyecto } from "./proyecto.tipo";

/**
 * ProyectoCard – Represents a detailed structure for displaying project information
 * in a card format, typically used in user interfaces or portfolio sections.
 * 
 * This type includes metadata about the project such as title, description, image,
 * technology stack, academic context, and participant details.
 * 
 * @property {number} id - The unique numeric identifier of the project.
 * @property {string} titulo - The title or name of the project.
 * @property {string} descripcion - A brief description of the project.
 * @property {string} imagen - A URL string pointing to an image that represents the project.
 * @property {Array of UsuarioPortafolioCard} integrantes - A list of users who participated in the project.
 * @property {string or null} [frontend] - Technologies used on the frontend, or null if not applicable.
 * @property {string or null} [backend] - Technologies used on the backend, or null if not applicable.
 * @property {string or null} [integrado] - Technologies used in an integrated stack, or null if not applicable.
 * @property {string} dataBase - The database technology used in the project.
 * @property {Array of numbers} fav_usuarios - A list of user IDs who have marked the project as favorite.
 * @property {string} materia - The academic subject associated with the project.
 * @property {string} grupo - The group number or identifier in which the project was developed.
 * @property {string} seccion - The section to which the group belongs.
 * @property {string} semestre - The academic term or semester in which the project was developed.
 * @property {string} estado - The current execution state of the project, based on Proyecto["estadoDeEjecucion"].
 */
export type ProyectoCard = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  integrantes: UsuarioPortafolioCard[];
  frontend?: string | null;
  backend?: string | null;
  integrado?: string | null;
  dataBase: string;
  fav_usuarios: number[];
  materia: string;
  grupo: string;
  seccion: string;
  semestre: string;
  estado: Proyecto["estadoDeEjecucion"];
};

/**
 * proyectoEjemplo – A sample instance of ProyectoCard, used for testing or display purposes.
 * This example represents a fictional academic project with realistic content.
 */
export const proyectoEjemplo: ProyectoCard = {
  id: 101,
  titulo: "Sistema de Gestión Académica",
  descripcion:
    "Aplicación web para administrar cursos, estudiantes y calificaciones en una institución educativa.",
  imagen:
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
  integrantes: [usuarioPrueba],
  frontend: "React, TypeScript, Tailwind CSS",
  backend: "Node.js, Express",
  dataBase: "PostgreSQL",
  fav_usuarios: [],
  materia: "Ingeniería de Software",
  grupo: "Grupo 3",
  seccion: "A",
  semestre: "2024-1",
  estado: "E",
};
