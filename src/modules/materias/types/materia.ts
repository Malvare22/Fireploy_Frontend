import { CursoMateria } from "./materia.curso";

export type Materia = {
    id: number,
    nombre: string,
    semestre: string,
    cursos: CursoMateria[],
    cantidadDeCursos: number
};