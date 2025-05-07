import { CursoService } from "./curso.service";

/**
 * MateriaService type – represents a subject or course material offered by an institution.
 * It contains the subject's details along with related courses offered for that subject.
 * 
 * @type
 * 
 * @property {string} estado - The current status of the subject, e.g., "Activo" or "Inactivo".
 * @property {string} nombre - The name of the subject.
 * @property {string} semestre - The semester in which the subject is offered.
 * @property {number} id - The unique identifier of the subject.
 * @property {Object[]} [cursos] - Optional list of courses associated with the subject.
 * @property {string} cursos.id - The unique identifier for each course.
 * @property {string} cursos.grupo - The group identifier for each course.
 * @property {string} cursos.semestre - The semester in which the course is offered.
 * @property {string} cursos.descripcion - A description of the course content.
 * @property {string} cursos.estado - The status of the course, e.g., "A" for active or "I" for inactive.
 * @property {CursoService['docente'] | null} cursos.docente - The instructor of the course, which is derived from the `CursoService` type. It can be null if no instructor is assigned.
 */
export type MateriaService = {
  estado: string;
  nombre: string;
  semestre: string;
  id: number;
  cursos?: {
    id: string;
    grupo: string;
    semestre: string;
    descripcion: string;
    estado: string;
    docente: null | CursoService['docente'];
  }[];
};
