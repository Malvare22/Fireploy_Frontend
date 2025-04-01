import { Curso } from "@modules/materias/types/curso";
import { CursoTabla } from "@modules/materias/types/curso.tabla";

export function adaptCursoToCursoTabla(x: Curso): CursoTabla {
  return {
    cantidadEstudiantes: x.estudiantes?.length || 0,
    docente: x.docente
      ? { id: parseInt(x.docente?.id), nombre: x.docente?.nombre }
      : null,
    estado: x.estado,
    grupo: x.grupo,
    id: x.id,
    semestre: x.semestre,
  };
};