import { BASE_PATH } from "@modules/general/router/basePath";

const rutaBase = BASE_PATH.AUTH + "/usuarios";

/**
 * `rutasUsuarios` – Enum that defines all the route paths used in the Usuarios module.
 *
 * These constants represent URL paths related to user operations such as profile viewing, editing,
 * portfolio management, user administration, and notifications.
 *
 * @enum
 * @property {string} perfil - Route for the user's personal profile.
 * @property {string} explorarPortafolios - Route for exploring user portfolios.
 * @property {string} portafolio - Route for viewing a specific portfolio (uses dynamic `:id`).
 * @property {string} listarUsuarios - Route for listing all users.
 * @property {string} modificarPerfil - Admin route for modifying a user's profile (uses dynamic `:id`).
 * @property {string} agregarUsuario - Admin route for creating a new user.
 * @property {string} logout - Route to trigger user logout.
 * @property {string} solicitudes - Route for viewing user requests.
 * @property {string} newEntries - Route for viewing new user entries.
 * @property {string} notificaciones - Route for accessing user notifications.
 */
export enum rutasUsuarios {
  perfil = rutaBase + "/perfil",
  explorarPortafolios = rutaBase + "/explorar",
  portafolio = rutaBase + "/portafolio/:id",
  listarUsuarios = rutaBase + "/listar",
  modificarPerfil = rutaBase + "/perfil/:id",
  agregarUsuario = rutaBase + '/agregar',
  logout = rutaBase + '/logout',
  solicitudes = rutaBase + '/solicitudes',
  newEntries = rutaBase + '/newEntries',
  notificaciones = rutaBase + '/notificaciones'
}