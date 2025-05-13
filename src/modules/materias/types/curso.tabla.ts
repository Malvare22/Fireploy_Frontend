/**
 * Represents the structure of a course for display in a table format.
 * 
 * This type includes details about the course such as its ID, semester, group, assigned instructor,
 * number of students, course status, and related subject (Materia).
 * 
 * @typedef {Object} CursoTabla
 * @property {string} id - The unique identifier for the course.
 * @property {string} semestre - The semester in which the course is offered (e.g., "2024-1").
 * @property {string} grupo - The group or class section associated with the course (e.g., "A").
 * @property {Object|null} docente - An optional object containing the instructor's ID and name, or null if no instructor is assigned.
 * @property {number} cantidadEstudiantes - The total number of students enrolled in the course.
 * @property {string} estado - The state of the course (either "A" for active or "I" for inactive).
 * @property {Object} materia - The subject related to the course.
 * @property {string} materia.nombre - The name of the subject.
 * @property {string} materia.semestre - The semester of the subject.
 */
export type CursoTabla = {
  id: string;
  semestre: string;
  grupo: string;
  docente?: {id: number, nombre: string} | null;
  cantidadEstudiantes: number;
  estado: "A" | "I";
  materia: {nombre: string, semestre: string};
};

/**
 * Example data for courses displayed in the table format.
 * 
 * This array contains sample courses, each including information such as the course ID, semester, group,
 * instructor, number of students, status, and related subject.
 * 
 * @type {CursoTabla[]}
 */
export const exampleCursosTabla: CursoTabla[] = [
  {
    id: "curso-001",
    semestre: "2024-1",
    grupo: "A",
    docente: {nombre: "Prof. Peréz", id: 2},
    cantidadEstudiantes: 30,
    estado: "I",
    materia: {nombre: 'X', semestre: '5'}
  },
  {
    id: "curso-002",
    semestre: "2024-1",
    grupo: "B",
    docente: {nombre: "Prof. García", id: 1},
    cantidadEstudiantes: 25,
    estado: "I",
    materia: {nombre: 'X', semestre: '5'}
  },
];
