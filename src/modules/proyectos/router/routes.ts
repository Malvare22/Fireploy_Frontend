import { BASE_PATH } from "@modules/general/router/basePath";

/**
 * Base route for project-related pages.
 * This is the root path for the project section.
 */
const rutaBase = BASE_PATH.AUTH + "/proyectos";

export const rutasProyectos = {
  menu: rutaBase + "/menu",
  misProyectos: rutaBase + '/misProyectos',
  ver: rutaBase + "/ver/:id",
  crear: rutaBase + "/crear",
  explorar: rutaBase + "/explorar",
  repositorios: rutaBase + "/repositorios",
  basesDeDatos: rutaBase + "/basesDeDatos",
  adminProyectos: rutaBase + "/administrar/proyectos",
  plantillas: rutaBase + "/plantillas"
};