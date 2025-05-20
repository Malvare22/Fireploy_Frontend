import { ProyectoCard } from "@modules/proyectos/types/proyecto.card"
import { Usuario } from "./usuario"
export interface UsuarioPortafolio extends Usuario {
  proyectos: ProyectoCard[]
}