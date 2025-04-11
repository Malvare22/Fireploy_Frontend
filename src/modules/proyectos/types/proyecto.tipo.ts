import { assetImages } from "@modules/general/utils/getImage";
import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { BaseDeDatos } from "./baseDeDatos";
import { Repositorio } from "./repositorio";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";

export type EstadoEjecucionProyecto = "F" | "N" | "E" | "L";
export type EstadoProyecto = "A" | "I"; // Ejemplo, ajusta según tus necesidades
export type ArchivoLog = { id: number; nombre: string; url: string };
export type MateriaInformacion = {
  seccionId: Seccion["id"];
  materiaId: Materia["id"];
  cursoId: Curso["id"];
};

export type TipoRepositorio = "B" | "F" | "I";

export type TecnologiaRepositorio = {
  id: number;
  nombre: string;
  logo: keyof typeof assetImages;
};

export type RepositorioProyecto = {
  id?: number;
  url: string;
  versionDeTecnologia: string;
  variablesDeEntorno: string;
  tecnologia?: TecnologiaRepositorio;
};

export type Proyecto = {
  id?: number;
  titulo: string;
  descripcion: string;
  calificacion?: number;
  imagen?: string;
  url: string;
  estadoDeEjecucion?: EstadoEjecucionProyecto;
  estadoDeProyecto?: EstadoProyecto;
  baseDeDatos?: BaseDeDatos;
  tipo: "S" | "M";
  backend?: Repositorio;
  frontend?: Repositorio;
  integrado?: Repositorio;
  archivosLogs?: ArchivoLog[];
  materiaInformacion: MateriaInformacion;
  fechaUltimaModificacion?: string;
  integrantes: UsuarioCurso[];
  propietario?: UsuarioCurso
};

export const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "Proyecto de Desarrollo Web",
    descripcion: "Un proyecto para crear una plataforma de comercio electrónico.",
    calificacion: 4.5,
    imagen: "proyecto1.jpg",
    url: "https://example.com/proyecto1",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 1,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password123",
      tipo: "S",
    },
    backend: {
      id: 1,
      url: "https://github.com/proyecto1/backend",
      versionDeTecnologia: "1.0.0",
      variablesDeEntorno: "API_KEY=123456",
      tecnologia: {
        id: 1,
        nombre: "Node.js",
        logo: "nodejs",
      },
    },
    frontend: {
      id: 2,
      url: "https://github.com/proyecto1/frontend",
      versionDeTecnologia: "2.0.0",
      variablesDeEntorno: "API_KEY=654321",
      tecnologia: {
        id: 2,
        nombre: "React",
        logo: "react",
      },
    },
    archivosLogs: [
      {
        id: 1,
        nombre: "error.log",
        url: "https://logs.example.com/error.log",
      },
    ],
    materiaInformacion: {
      id: 1,
      nombre: "Desarrollo Web",
      seccionId: "S001",
      materiaId: "M001",
      cursoId: "C001",
    },
    fechaUltimaModificacion: "2023-10-01",
  },
  {
    id: 2,
    titulo: "Proyecto de Análisis de Datos",
    descripcion: "Un proyecto para analizar grandes volúmenes de datos.",
    calificacion: 4.7,
    imagen: "proyecto2.jpg",
    url: "https://example.com/proyecto2",
    estadoDeEjecucion: "F",
    estadoDeProyecto: "I",
    baseDeDatos: {
      id: 2,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password456",
      tipo: "N",
    },
    backend: {
      id: 3,
      url: "https://github.com/proyecto2/backend",
      versionDeTecnologia: "1.2.0",
      variablesDeEntorno: "API_KEY=789012",
      tecnologia: {
        id: 3,
        nombre: "Python",
        logo: "nodejs",
      },
    },
    archivosLogs: [
      {
        id: 2,
        nombre: "access.log",
        url: "https://logs.example.com/access.log",
      },
    ],
    materiaInformacion: {
      id: 2,
      nombre: "Análisis de Datos",
      seccionId: "S002",
      materiaId: "M002",
      cursoId: "C002",
    },
    fechaUltimaModificacion: "2023-10-02",
  },
  {
    id: 3,
    titulo: "Proyecto de Machine Learning",
    descripcion: "Un proyecto para implementar modelos de aprendizaje automático.",
    calificacion: 4.8,
    imagen: "proyecto3.jpg",
    url: "https://example.com/proyecto3",
    estadoDeEjecucion: "E",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 3,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password789",
      tipo: "S",
    },
    integrado: {
      id: 4,
      url: "https://github.com/proyecto3/integrado",
      versionDeTecnologia: "1.5.0",
      variablesDeEntorno: "API_KEY=345678",
      tecnologia: {
        id: 4,
        nombre: "TensorFlow",
        logo: "springboot",
      },
    },
    archivosLogs: [
      {
        id: 3,
        nombre: "debug.log",
        url: "https://logs.example.com/debug.log",
      },
    ],
    materiaInformacion: {
      id: 3,
      nombre: "Machine Learning",
      seccionId: "S003",
      materiaId: "M003",
      cursoId: "C003",
    },
    fechaUltimaModificacion: "2023-10-03",
  },
  {
    id: 4,
    titulo: "Proyecto de Desarrollo Móvil",
    descripcion: "Un proyecto para crear una aplicación móvil multiplataforma.",
    calificacion: 4.6,
    imagen: "proyecto4.jpg",
    url: "https://example.com/proyecto4",
    estadoDeEjecucion: "L",
    estadoDeProyecto: "I",
    baseDeDatos: {
      id: 4,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password101",
      tipo: "N",
    },
    frontend: {
      id: 5,
      url: "https://github.com/proyecto4/frontend",
      versionDeTecnologia: "3.0.0",
      variablesDeEntorno: "API_KEY=901234",
      tecnologia: {
        id: 5,
        nombre: "Flutter",
        logo: "angular",
      },
    },
    archivosLogs: [
      {
        id: 4,
        nombre: "info.log",
        url: "https://logs.example.com/info.log",
      },
    ],
    materiaInformacion: {
      id: 4,
      nombre: "Desarrollo Móvil",
      seccionId: "S004",
      materiaId: "M004",
      cursoId: "C004",
    },
    fechaUltimaModificacion: "2023-10-04",
  },
  {
    id: 5,
    titulo: "Proyecto de DevOps",
    descripcion: "Un proyecto para automatizar procesos de integración y despliegue.",
    calificacion: 4.9,
    imagen: "proyecto5.jpg",
    url: "https://example.com/proyecto5",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 5,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password112",
      tipo: "S",
    },
    backend: {
      id: 6,
      url: "https://github.com/proyecto5/backend",
      versionDeTecnologia: "2.5.0",
      variablesDeEntorno: "API_KEY=567890",
      tecnologia: {
        id: 6,
        nombre: "Docker",
        logo: "nodejs",
      },
    },
    archivosLogs: [
      {
        id: 5,
        nombre: "deploy.log",
        url: "https://logs.example.com/deploy.log",
      },
    ],
    materiaInformacion: {
      id: 5,
      nombre: "DevOps",
      seccionId: "S005",
      materiaId: "M005",
      cursoId: "C005",
    },
    fechaUltimaModificacion: "2023-10-05",
  },
];
