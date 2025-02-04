import { Usuario } from "@modules/usuarios/types/usuario"

export type CursoMateria = {
    id: string,
    descripcion: string,
    grupo: string,
    estudiantes: Usuario[],
    docente: Usuario
}