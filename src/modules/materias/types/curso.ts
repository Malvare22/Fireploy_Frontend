import { Seccion } from "./seccion";
import { EstudianteCurso } from "../utils/forms/form.schema";

export type UsuarioCurso = {
  id: number;
  nombre: string;
  correo?: string | undefined;
};

export type Curso = {
  id?: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: "A" | "I";
  docente?: UsuarioCurso | null;
  estudiantes?: EstudianteCurso[];
  secciones?: Seccion[] | null;
  materia?: {
    id: number | null;
    nombre: string;
    semestre: string;
    estado: string;
  };
};

export const cursoTemplate: Curso = {
  id: "",
  grupo: "",
  semestre: "2025-1",
  descripcion: " ",
  estado: "A",
};

export const exampleCursos: Curso[] = [
  {
    id: "1",
    grupo: "A",
    semestre: "2024-1",
    descripcion: "Curso de Matemáticas Avanzadas",
    estado: "A",
    docente: {
      id: 10,
      nombre: "Juan Pérez",
      correo: "juan.perez@example.com",
    },
    estudiantes: [
      
    ],
    secciones: [],
    materia: {
      id: 1,
      nombre: "Matemáticas",
      semestre: "2024-1",
      estado: "Activo",
    },
  },
  {
    id: "2",
    grupo: "B",
    semestre: "2024-1",
    descripcion: "Curso de Física Clásica",
    estado: "A",
    docente: {
      id: 102,
      nombre: "Ana López",
      correo: "ana.lopez@example.com",
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
