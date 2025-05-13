import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { adaptSeccionService } from "./seccion.service";

/**
 * adaptCursoService function – transforms a `CursoService` object into a `Curso` object,
 * adapting its properties to fit the expected format for use in the application.
 * It converts the course data, including the instructor, students, sections, and subject,
 * into a structured format with specific field mappings.
 * 
 * @function
 * 
 * @param {CursoService} curso - The `CursoService` object to be adapted.
 * 
 * @returns {Curso} A new `Curso` object with the adapted properties.
 * 
 * @example
 * const cursoService: CursoService = { ... }; // Example input
 * const curso: Curso = adaptCursoService(cursoService); // Example output
 */
export function adaptCursoService(curso: CursoService): Curso {
  return {
    descripcion: curso.descripcion,
    docente:
      curso.docente != null && curso.docente != undefined
        ? {
            id: curso.docente.id,
            nombre: curso.docente.nombre + ' ' + curso.docente.apellido,
            correo: curso.docente.correo,
            imagen: curso.docente.foto_perfil ? curso.docente.foto_perfil : ''
          }
        : null,
    estado: curso.estado,
    estudiantes: curso.estudiantes
      ? curso.estudiantes.map((user) => ({
          imagen: user.foto_perfil || "",
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
