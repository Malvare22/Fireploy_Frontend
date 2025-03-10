import { MateriaService } from "@modules/materias/types/materia.service";
import { Materia } from "../forms/schema.materias";
import { EstadoMateria } from "@modules/materias/types/materia.estado";
import { SemestreMateria } from "@modules/materias/types/materia.semestre";

export const adaptarMateriaServiceAMateria = (materia: MateriaService) => {
    const _materia: Materia = {
        estado: materia.estado as EstadoMateria,
        nombre: materia.nombre,
        semestre: materia.semestre as SemestreMateria,
        id: materia.id
    };

    return _materia;
};
