import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { MateriaService } from "./materia.service";
import { Curso } from "./curso";

/**
 * Represents a course in the system.
 * 
 * This type includes details about a specific course, such as its ID, group, semester, 
 * description, state, related subject (Materia), the instructor (Docente), enrolled students, 
 * and associated sections (Secciones).
 *
 * @typedef {Object} CursoService
 * @property {string} id - The unique identifier for the course.
 * @property {string} grupo - The group or class section associated with the course.
 * @property {string} semestre - The semester in which the course is being offered.
 * @property {string} descripcion - A brief description of the course.
 * @property {string} estado - The current state of the course (e.g., active, inactive).
 * @property {MateriaService} materia - The subject (Materia) associated with the course.
 * @property {UsuarioService | null} docente - The instructor for the course (can be null if no instructor is assigned).
 * @property {UsuarioService[]} estudiantes - A list of students enrolled in the course.
 * @property {SeccionesService[]} secciones - A list of sections for this course.
 */
export type CursoService = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: Curso["estado"];
  materia: MateriaService;
  docente: UsuarioService | null;
  estudiantes: UsuarioService[];
  secciones: SeccionesService[]
};

/**
 * Represents a section within a course.
 *
 * This type includes details about a course section such as its ID, title, description, 
 * start and end dates, state, and associated projects.
 *
 * @typedef {Object} SeccionesService
 * @property {number} id - The unique identifier for the section.
 * @property {string} titulo - The title or name of the section.
 * @property {string} descripcion - A description of the section.
 * @property {string} fecha_inicio - The start date for the section.
 * @property {string} fecha_fin - The end date for the section.
 * @property {string} estado - The state of the section (e.g., active, inactive).
 * @property {number[]} proyectos - A list of project IDs associated with the section.
 */
export type SeccionesService = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  proyectos: number[];

};
