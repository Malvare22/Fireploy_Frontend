import { BASE_PATH } from "@modules/general/router/basePath";

/**
 * Base route for project-related pages.
 * This is the root path for the project section.
 */
const rutaBase = BASE_PATH.AUTH + "/proyectos";

/**
 * Object containing all the routes for the project pages.
 * 
 * Each property in this object is a route path that corresponds to a specific page or feature of the projects section.
 * - menu: Path for listing projects.
 * - misProyectos: Path for viewing the user's own projects.
 * - ver: Path for viewing a specific project by its ID.
 * - crear: Path for creating a new project.
 * - explorar: Path for exploring all projects.
 * - repositorios: (Commented-out route) Path for viewing repositories.
 * - basesDeDatos: Path for viewing databases associated with projects.
 */
export const rutasProyectos = {
  menu: rutaBase + "/menu",
  misProyectos: rutaBase + '/misProyectos',
  ver: rutaBase + "/ver/:id",
  crear: rutaBase + "/crear",
  explorar: rutaBase + "/explorar",
  repositorios: rutaBase + "/repositorios",
  basesDeDatos: rutaBase + "/basesDeDatos",
};