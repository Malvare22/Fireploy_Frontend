import { Seccion } from "./seccion";

type UsuarioCurso = {
  id:string,
  nombre: string,
  correo: string
}

export type Curso = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: 'A' | 'I';
  docente: UsuarioCurso | null;
  estudiantes?: UsuarioCurso[];
  secciones: Seccion[] | null,
  materia?: {
    id: number | null,
    nombre: string,
    semestre: string,
    estado: string
  }

};

export const exampleCursos: Curso[] = [
  {
    id: "1",
    grupo: "A",
    semestre: "2024-1",
    descripcion: "Curso de Matemáticas Avanzadas",
    estado: "A",
    docente: {
      id: "101",
      nombre: "Juan Pérez",
      correo: "juan.perez@example.com"
    },
    estudiantes: [
      { id: "201", nombre: "María Gómez", correo: "maria.gomez@example.com" },
      { id: "202", nombre: "Carlos Ruiz", correo: "carlos.ruiz@example.com" }
    ],
    secciones: [],
    materia: {
      id: 1,
      nombre: "Matemáticas",
      semestre: "2024-1",
      estado: "Activo"
    }
  },
  {
    id: "2",
    grupo: "B",
    semestre: "2024-1",
    descripcion: "Curso de Física Clásica",
    estado: "A",
    docente: {
      id: "102",
      nombre: "Ana López",
      correo: "ana.lopez@example.com"
    },
    estudiantes: [],
    secciones: [],
    materia: {
      id: 2,
      nombre: "Física",
      semestre: "2024-1",
      estado: "Inactivo"
    }
  }
];


