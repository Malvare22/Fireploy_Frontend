import { ProyectoService } from "@modules/proyectos/types/proyecto.service";
import { UsuarioService } from "../types/services.usuario";
import { UsuarioPortafolio } from "../types/usuario.portafolio";
import { adaptUser } from "./adapt.usuario";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";

export function adaptUsuarioPortafolio(user: UsuarioService, projects: ProyectoService[]): UsuarioPortafolio {

    const a = adaptUser(user);
    const b = projects.map((x) => adaptProjectToCard(adaptProject(x)));

    return { ...a, proyectos: b }
}