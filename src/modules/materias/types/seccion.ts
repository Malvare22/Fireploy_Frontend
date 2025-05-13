/**
 * Seccion type – represents a section within a course, including details such as
 * the section's title, description, start and end dates, status, and associated course.
 * 
 * @type
 * 
 * @property {number | undefined} [id] - An optional unique identifier for the section.
 * @property {string} titulo - The title of the section.
 * @property {string} descripcion - A description of the section's content.
 * @property {string} fechaDeCierre - The date when the section closes (end date).
 * @property {string} fechaDeInicio - The date when the section starts (start date).
 * @property {'A' | 'I'} estado - The status of the section, either "A" for active or "I" for inactive.
 * @property {string | undefined} [cursoId] - An optional unique identifier for the course the section belongs to.
 * @property {number[] | undefined} [proyectos] - An optional array of project IDs related to the section.
 * @property {number | undefined} [materiaId] - An optional identifier for the subject associated with the section.
 */
export type Seccion = {
  id?: number;
  titulo: string;
  descripcion: string;
  fechaDeCierre: string;
  fechaDeInicio: string;
  estado: "A" | "I";
  cursoId?: string;
  proyectos?: number[];
  materiaId?: number;
};

/**
 * A template for the default structure of a Seccion object.
 * Used as a base for creating new section objects.
 * 
 * @constant
 * @type {Seccion}
 */
export const seccionTemplate: Seccion = {
  titulo: "",
  descripcion: "",
  fechaDeCierre: "",
  fechaDeInicio: "",
  estado: "A" as Seccion['estado'],
  cursoId: "-1",
  id: undefined,
};

/**
 * Example list of sections. These sections serve as sample data 
 * to demonstrate the structure and usage of the `Seccion` type.
 * 
 * @constant
 * @type {Seccion[]}
 * 
 * @example
 * // Example of accessing the first section
 * const firstSection = exampleSecciones[0];
 * console.log(firstSection.titulo); // "Introducción a la Programación"
 */
export const exampleSecciones: Seccion[] = [
  {
    id: 0,
    titulo: "Introducción a la Programación",
    descripcion: "Conceptos básicos de programación y lógica computacional.",
    fechaDeInicio: "2024-03-01",
    fechaDeCierre: "2024-04-01",
    estado: "A",
    cursoId: "CURSO-123",
  },
  {
    id: 1,
    titulo: "Estructuras de Datos",
    descripcion: "Estudio de listas, pilas, colas y árboles.",
    fechaDeInicio: "2024-04-02",
    fechaDeCierre: "2024-05-02",
    estado: "A",
    cursoId: "CURSO-123",
  },
  {
    id: 2,
    titulo: "Algoritmos de Ordenamiento",
    descripcion:
      "Aprendizaje de algoritmos como quicksort, mergesort y heapsort.",
    fechaDeInicio: "2024-05-03",
    fechaDeCierre: "2024-06-03",
    estado: "I",
    cursoId: "CURSO-124",
  },
  {
    id: 3,
    titulo: "Bases de Datos Relacionales",
    descripcion: "Conceptos fundamentales sobre bases de datos y SQL.",
    fechaDeInicio: "2024-06-04",
    fechaDeCierre: "2024-07-04",
    estado: "A",
    cursoId: "CURSO-125",
  },
];
