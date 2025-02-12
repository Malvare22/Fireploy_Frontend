import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano"
import { SeccionCurso } from "./curso.seccion"

export type CursoMateria = {
    id: string,
    descripcion: string,
    grupo: string,
    estudiantes: UsuarioPlano[],
    docente: UsuarioPlano,
    secciones: SeccionCurso[]
}