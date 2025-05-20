/**
 * Base route path of the application.
 * This path is used as the root path for all routes in the app.
 *
 * @constant {string} rutaBase - The root path for the application.
 *
 * @example
 * const homeRoute = rutaBase; // '/'
 */
export const rutaBase = "/";

/**
 * Enum defining the general public routes of the application.
 * These routes are accessible without authentication and include paths for login, registration, password recovery, etc.
 *
 * @enum {string}
 */
export enum rutasGeneral {
  home = rutaBase,
  login = rutaBase + "login",
  recuperar = rutaBase + "recuperar",
  registrar = rutaBase + "registrar",
  cambiarContrasenia = rutaBase + "reset-password/:token",
  developTeam = rutaBase + "developTeam",
  tecnologias = rutaBase + "tecnologias",
  detectAnomaly = rutaBase + "detectAnomaly",
  explorarPortafolios = rutaBase + "portafolios",
  portafolioPorUsuario = rutaBase + "portafolios/:id",
   explorarProyectos = rutaBase + "proyectos",
}