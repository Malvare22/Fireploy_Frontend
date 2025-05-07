/**
 * MateriaTabla type – represents a subject in a table format, including details like
 * the subject's code, name, semester, the number of active groups, and its current status.
 * 
 * @type
 * 
 * @property {number} codigo - The unique code assigned to the subject.
 * @property {string} nombre - The name of the subject.
 * @property {number} semestre - The semester number in which the subject is offered.
 * @property {number} cantidadGruposActivos - The number of active groups for the subject.
 * @property {'A' | 'I'} estado - The status of the subject, either "A" for active or "I" for inactive.
 */
export type MateriaTabla = {
  codigo: number;
  nombre: string;
  semestre: number;
  cantidadGruposActivos: number;
  estado: "A" | "I";
};

/**
 * Example list of subjects (MateriaTabla). These subjects serve as sample data 
 * to demonstrate the structure and usage of the `MateriaTabla` type.
 * 
 * @constant
 * @type {MateriaTabla[]}
 * 
 * @example
 * // Example of accessing the first subject
 * const firstSubject = exampleMaterias[0];
 * console.log(firstSubject.nombre); // "Matemáticas I"
 */
export const exampleMaterias: MateriaTabla[] = [
  {
    codigo: 101,
    nombre: "Matemáticas I",
    semestre: 2,
    cantidadGruposActivos: 3,
    estado: "A",
  },
  {
    codigo: 102,
    nombre: "Física I",
    semestre: 2,
    cantidadGruposActivos: 2,
    estado: "A",
  },
  {
    codigo: 103,
    nombre: "Programación I",
    semestre: 2,
    cantidadGruposActivos: 4,
    estado: "A",
  },
  {
    codigo: 104,
    nombre: "Historia Universal",
    semestre: 2,
    cantidadGruposActivos: 1,
    estado: "I",
  },
  {
    codigo: 105,
    nombre: "Química General",
    semestre: 2,
    cantidadGruposActivos: 3,
    estado: "A",
  },
];
