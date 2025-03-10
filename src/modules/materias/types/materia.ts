import { CursoMateria } from "./materia.curso";
import { EstadoMateria } from "./materia.estado";

export type MateriaTabla = {
    id: number,
    nombre: string,
    semestre: string,
    cursos: CursoMateria[],
    cantidadDeCursos: number,
    estado: EstadoMateria
};