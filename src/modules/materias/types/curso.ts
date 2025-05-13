import { Seccion } from "./seccion";

/**
 * UsuarioCurso type – represents a user enrolled in a course.
 * It contains the user's personal details and their enrollment status.
 * 
 * @type
 * 
 * @property {number} id - The unique identifier of the user.
 * @property {string} nombre - The name of the user.
 * @property {string} [correo] - Optional email of the user.
 * @property {string} imagen - The URL or path to the user's profile image.
 * @property {'A' | 'I'} estado - The enrollment status of the user, either "A" for active or "I" for inactive.
 */
export type UsuarioCurso = {
  id: number;
  nombre: string;
  correo?: string | undefined;
  imagen: string;
  estado: 'A' | 'I'
};

/**
 * Curso type – represents a course offered at the institution.
 * It contains details such as the course's group, semester, description, status,
 * and related sections, students, and instructors.
 * 
 * @type
 * 
 * @property {string} [id] - Optional unique identifier of the course.
 * @property {string} grupo - The group identifier for the course.
 * @property {string} semestre - The semester in which the course is offered.
 * @property {string} descripcion - A description of the course content.
 * @property {'A' | 'I'} estado - The status of the course, either "A" for active or "I" for inactive.
 * @property {UsuarioCurso | null} [docente] - The instructor for the course, excluding the 'estado' field from UsuarioCurso.
 * @property {UsuarioCurso[]} [estudiantes] - A list of students enrolled in the course.
 * @property {Seccion[] | null} [secciones] - A list of sections for the course, or null if there are no sections.
 * @property {Object} [materia] - An object representing the subject associated with the course.
 * @property {number | null} [materia.id] - The unique identifier of the subject, or null.
 * @property {string} materia.nombre - The name of the subject.
 * @property {string} materia.semestre - The semester in which the subject is taught.
 * @property {string} materia.estado - The status of the subject, e.g., "Activo" or "Inactivo".
 */
export type Curso = {
  id?: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: "A" | "I";
  docente?: Omit<UsuarioCurso, 'estado'> | null;
  estudiantes?: UsuarioCurso[];
  secciones?: Seccion[] | null;
  materia?: {
    id: number | null;
    nombre: string;
    semestre: string;
    estado: string;
  };
};

export const cursoTemplate: Curso = {
  id: "-1",
  grupo: "",
  semestre: "2025-1",
  descripcion: " ",
  estado: "A",
};

/**
 * Example list of courses. These courses serve as sample data 
 * to demonstrate the structure and usage of the `Curso` type.
 * 
 * @constant
 * @type {Curso[]}
 * 
 * @example
 * // Example of accessing the first course
 * const firstCourse = exampleCursos[0];
 * console.log(firstCourse.descripcion); // "Curso de Matemáticas Avanzadas"
 */
export const exampleCursos: Curso[] = [
  {
    id: "0",
    grupo: "A",
    semestre: "2024-1",
    descripcion: "Curso de Matemáticas Avanzadas",
    estado: "A",
    docente: {
      id: 10,
      nombre: "Jorge Ivan Gelvez Quintero",
      correo: "juan.perez@example.com",
      imagen: ''
    },
    estudiantes: [],
    secciones: [],
    materia: {
      id: 1,
      nombre: "Matemáticas",
      semestre: "2024-1",
      estado: "Activo",
    },
  },
  {
    id: "1",
    grupo: "B",
    semestre: "2024-1",
    descripcion: "Curso de Física Clásica",
    estado: "A",
    docente: {
      id: 102,
      nombre: "Margarita Rosa de Francisco Toro",
      correo: "ana.lopez@example.com",
      imagen: ''
    },
    estudiantes: [],
    secciones: [],
    materia: {
      id: 2,
      nombre: "Física",
      semestre: "2024-1",
      estado: "Inactivo",
    },
  },
];
