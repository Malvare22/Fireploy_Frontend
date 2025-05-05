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

export const seccionTemplate: Seccion = {
  titulo: "",
  descripcion: "",
  fechaDeCierre: "",
  fechaDeInicio: "",
  estado: "A" as Seccion['estado'],
  cursoId: "-1",
  id: undefined

};

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
