export type CursoTabla = {
  id: string;
  semestre: string;
  grupo: string;
  docente: string;
  cantidadEstudiantes: number;
  estado: "A" | "I";
};

export const exampleCursos: CursoTabla[] = [
  {
    id: "curso-001",
    semestre: "2024-1",
    grupo: "A",
    docente: "Dr. Pérez",
    cantidadEstudiantes: 30,
    estado: "I",
  },
  {
    id: "curso-002",
    semestre: "2024-1",
    grupo: "B",
    docente: "Prof. García",
    cantidadEstudiantes: 25,
    estado: "I",
  },
  {
    id: "curso-003",
    semestre: "2024-1",
    grupo: "C",
    docente: "Ing. Martínez",
    cantidadEstudiantes: 28,
    estado: "A",
  },
  {
    id: "curso-004",
    semestre: "2024-1",
    grupo: "D",
    docente: "Mtra. López",
    cantidadEstudiantes: 32,
    estado: "I",
  },
  {
    id: "curso-005",
    semestre: "2024-1",
    grupo: "E",
    docente: "Dr. Fernández",
    cantidadEstudiantes: 29,
    estado: "A",
  },
];
