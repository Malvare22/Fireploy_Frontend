import { EstadoMateria } from "./materia.estado";
import { SemestreMateria } from "./materia.semestre";

export type MateriaTabla = {
    id: number,
    nombre: string,
    semestre: SemestreMateria,
    cursos: string[],
    cantidadDeCursos: number,
    estado: EstadoMateria
};

export const materiaTablaBase: MateriaTabla = {
    id: 0,
    cantidadDeCursos: 0,
    cursos: ['A'],
    estado: 'I',
    nombre: '',
    semestre: 'I'
}