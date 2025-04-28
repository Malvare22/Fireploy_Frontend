import { Curso } from "@modules/materias/types/curso";
import { CursoTabla } from "@modules/materias/types/curso.tabla";

export function adaptCursoTabla(x: Curso): CursoTabla {
  return {
    cantidadEstudiantes: x.estudiantes?.length || 0,
    docente: x.docente ? { id: x.docente?.id, nombre: x.docente?.nombre } : null,
    estado: x.estado,
    grupo: x.grupo,
    id: x.id || "",
    semestre: x.semestre,
    materia: {
      nombre: x.materia?.nombre || "",
      semestre: x.materia?.semestre || "",
    },
  };
}
