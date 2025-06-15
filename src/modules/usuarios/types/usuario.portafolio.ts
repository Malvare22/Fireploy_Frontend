import { ProyectoCard } from "@modules/proyectos/types/proyecto.card"
import { Usuario } from "./usuario"

/**
 * UsuarioPortafolio – Extends the base user type with portfolio information.
 *
 * This type represents a user along with their associated portfolio projects. 
 * It is used primarily to display detailed user profiles that include project data.
 *
 * @typedef
 *
 * @property {number} id - Unique identifier of the user.
 * @property {string} nombre - Full name of the user.
 * @property {string} correo - Email address of the user.
 * @property {string} [rol] - Optional role assigned to the user (e.g., Admin, User).
 * @property {ProyectoCard[]} proyectos - Array of project cards representing the user's portfolio.
 */
export interface UsuarioPortafolio extends Usuario {
  proyectos: ProyectoCard[]
}