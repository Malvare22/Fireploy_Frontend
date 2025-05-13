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
