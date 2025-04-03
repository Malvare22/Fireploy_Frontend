import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { adaptSeccionService } from "./seccion.service";

export function adaptCursoService(curso: CursoService): Curso {
  return {
    descripcion: curso.descripcion,
    docente:
      curso.docente != null && curso.docente != undefined
        ? {
            id: curso.docente.id,
            nombre: curso.docente.nombre,
            correo: curso.docente.correo,
          }
        : null,
    estado: curso.estado,
    estudiantes: curso.estudiantes
      ? curso.estudiantes.map((user) => ({
          foto: user.foto_perfil || "",
          nombre: `${user.nombre} ${user.apellido}`,
          correo: user.correo,
          estado: user.estado as "A" | "I", // Explicit type assertion
          id: user.id,
        }))
      : [],
    id: curso.id,
    grupo: curso.grupo,
    semestre: curso.semestre,
    materia: {
      estado: curso.materia.estado,
      id: curso.materia.id,
      nombre: curso.materia.nombre,
      semestre: curso.materia.semestre,
    },
    secciones: curso.secciones.map((seccion) => adaptSeccionService(seccion)),
  };
}
