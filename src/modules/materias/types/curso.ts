import { Seccion } from "./seccion";
import { EstudianteCurso } from "../utils/forms/form.schema";

export type UsuarioCurso = {
  id: number;
  nombre: string;
  correo?: string | undefined;
  imagen: string;
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
  id: "-1",
  grupo: "",
  semestre: "2025-1",
  descripcion: " ",
  estado: "A",
};

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
