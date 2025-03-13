import { CursoMateria } from "@modules/materias/types/materia.curso";
import { CursoModal } from "../forms/schema.curso";

export function adaptarCursoACursoModal(curso: CursoMateria) : CursoModal{
    return {
        docente: curso.docente.id,
        estado: curso.estado,
        descripcion: curso.descripcion,
        semestre: curso.semestre,
    };
}