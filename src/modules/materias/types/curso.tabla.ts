export type CursoTabla = {
  id: string;
  semestre: string;
  grupo: string;
  docente?: {id: number, nombre: string} | null;
  cantidadEstudiantes: number;
  estado: "A" | "I";
};

export const exampleCursosTabla: CursoTabla[] = [
  {
    id: "curso-001",
    semestre: "2024-1",
    grupo: "A",
    docente: {nombre: "Prof. Peréz", id: 2},
    cantidadEstudiantes: 30,
    estado: "I",
  },
  {
    id: "curso-002",
    semestre: "2024-1",
    grupo: "B",
    docente: {nombre: "Prof. García", id: 1},
    cantidadEstudiantes: 25,
    estado: "I",
  },
];
