import { ProyectoService } from "@modules/proyectos/types/proyecto.service";
import { UsuarioService } from "../types/services.usuario";
import { UsuarioPortafolio } from "../types/usuario.portafolio";
import { adaptUser } from "./adapt.usuario";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";

/**
 * adaptUsuarioPortafolio – Adapter function to transform user and project data into a portfolio format.
 *
 * Combines a `UsuarioService` object and an array of `ProyectoService` objects into a single
 * `UsuarioPortafolio` structure. The user data is adapted using `adaptUser`, and each project is
 * first adapted with `adaptProject` and then transformed into a card format using `adaptProjectToCard`.
 *
 * @function
 *
 * @param {UsuarioService} user - Raw user data object from the service layer.
 * @param {ProyectoService[]} projects - Array of raw project data objects to be included in the user's portfolio.
 *
 * @returns {UsuarioPortafolio} An object representing the user with an array of adapted project cards.
 *
 * @example
 * ```ts
 * const userPortfolio = adaptUsuarioPortafolio(usuarioData, proyectosData);
 * ```
 */
export function adaptUsuarioPortafolio(user: UsuarioService, projects: ProyectoService[]): UsuarioPortafolio {

    const a = adaptUser(user);
    const b = projects.map((x) => adaptProjectToCard(adaptProject(x)));

    return { ...a, proyectos: b }
}