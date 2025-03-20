import { EstadoMateria, SemestreMateria } from "./materia";

export type MateriaTabla = {
    id: number,
    nombre: string,
    semestre: SemestreMateria,
    estado: EstadoMateria
};

export const materiaTablaBase: MateriaTabla = {
    id: 0,
    estado: 'I',
    nombre: '',
    semestre: 'I'
}