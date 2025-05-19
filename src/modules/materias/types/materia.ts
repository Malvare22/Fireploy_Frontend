import { Curso } from "./curso";

/**
 * Materia type – represents a subject offered by the institution.
 * It contains details such as the subject's name, semester, and its current status,
 * along with an optional list of courses related to that subject.
 * 
 * @type
 * 
 * @property {'A' | 'I'} estado - The status of the subject, either "A" for active or "I" for inactive.
 * @property {string} nombre - The name of the subject.
 * @property {number} semestre - The semester in which the subject is offered.
 * @property {number | undefined} [id] - An optional unique identifier for the subject.
 * @property {Curso[] | null} [cursos] - An optional list of courses associated with the subject. It can be null if no courses are associated.
 */
export type Materia = {
  estado: "A" | "I";
  nombre: string;
  semestre: number;
  id?: number | undefined;
  cursos?: Curso[] | null;
};

export const materiasDePrueba: Materia[] = [
  {
    id: 1,
    nombre: "Matemáticas I",
    semestre: 1,
    estado: "A",
    cursos: [
      {
        id: "C101",
        grupo: "A1",
        semestre: "2025-1",
        descripcion: "Curso básico de matemáticas para ingeniería",
        estado: "A",
        estudiantes: [],
        secciones: null,
        materia: {
          id: 1,
          nombre: "Matemáticas I",
          semestre: "1",
          estado: "A"
        }
      }
    ]
  },
  {
    id: 2,
    nombre: "Programación I",
    semestre: 1,
    estado: "A",
    cursos: null
  },
  {
    id: 3,
    nombre: "Análisis y diseño de los sistemas de información",
    semestre: 2,
    estado: "I",
    cursos: [
      {
        id: "C202",
        grupo: "B1",
        semestre: "2025-1",
        descripcion: "Introducción a la física clásica",
        estado: "I",
        docente: null,
        estudiantes: [],
        secciones: null,
        materia: {
          id: 3,
          nombre: "Física General",
          semestre: "2",
          estado: "I"
        }
      }
    ]
  },
  {
    id: 4,
    nombre: "Álgebra Lineal",
    semestre: 2,
    estado: "A",
    cursos: []
  }
];
