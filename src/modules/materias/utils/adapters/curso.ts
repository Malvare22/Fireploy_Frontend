import { Curso } from "@modules/materias/types/curso";
import { CursoTabla } from "@modules/materias/types/curso.tabla";

/**
 * adaptCursoTabla function – transforms a `Curso` object into a `CursoTabla` object,
 * adapting its properties to fit the required table structure for course display.
 * This function formats the course data, including the number of students, instructor details, 
 * course state, group, and associated subject information.
 * 
 * @function
 * 
 * @param {Curso} x - The `Curso` object to be adapted into a `CursoTabla`.
 * 
 * @returns {CursoTabla} A new `CursoTabla` object with the adapted properties.
 * 
 * @example
 * const curso: Curso = { ... }; // Example input
 * const cursoTabla: CursoTabla = adaptCursoTabla(curso); // Example output
 */
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
