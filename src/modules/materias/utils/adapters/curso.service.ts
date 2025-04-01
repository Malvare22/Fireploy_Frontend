import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";

export function adaptCursoService(curso: CursoService): Curso {
  return {
    descripcion: curso.descripcion,
    docente:
      curso.docente != null && curso.docente != undefined
        ? {
            id: curso.docente.id.toString(),
            nombre: curso.docente.nombre,
            correo: curso.docente.correo,
          }
        : null,
    estado: curso.estado,
    estudiantes: [],
    id: curso.id,
    grupo: curso.grupo,
    semestre: curso.semestre,
    materia: {
      estado: curso.materia.estado,
      id: curso.materia.id,
      nombre: curso.materia.nombre,
      semestre: curso.materia.semestre,
    },
  };
}
