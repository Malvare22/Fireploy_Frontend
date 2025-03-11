import { MateriaService } from "@modules/materias/types/materia.service";
import { Materia } from "../forms/schema.materias";
import { EstadoMateria } from "@modules/materias/types/materia.estado";
import { SemestreMateria } from "@modules/materias/types/materia.semestre";
import { MateriaTabla } from "@modules/materias/types/materia";

export const adaptarMateriaServiceAMateria = (materia: MateriaService) => {
    const _materia: Materia = {
        estado: materia.estado as EstadoMateria,
        nombre: materia.nombre,
        semestre: materia.semestre as SemestreMateria,
        id: materia.id
    };

    return _materia;
};

export const adaptarMateriaServiceAMateriaTabla = (materia: MateriaService) => {
    const _materia: MateriaTabla = {
        estado: materia.estado as EstadoMateria,
        nombre: materia.nombre,
        semestre: materia.semestre as SemestreMateria,
        id: materia.id as number,
        cantidadDeCursos: 2,
        cursos: ['A', 'B']
    };

    return _materia;
};

export const adaptarMateriaTablaAMateriaService = (materia: MateriaTabla) => {

    const semestre = materia.semestre as SemestreMateria;

    const _materia: Materia = {
        estado: materia.estado,
        nombre: materia.nombre,
        semestre: semestre,
        id: materia.id,
    };

    return _materia;
};


