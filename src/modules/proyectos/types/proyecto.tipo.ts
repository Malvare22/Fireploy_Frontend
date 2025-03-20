import { Imagenes } from "@modules/general/components/roundedIcon/utils";

export type EstadoEjecucionProyecto = "F" | "N" | "E" | "L";
export type EstadoProyecto = "A" | "I"; // Ejemplo, ajusta según tus necesidades
export type ArchivoLog = { id: number; nombre: string; url: string };
export type MateriaInformacion = { id: number; nombre: string, seccionId: string, materiaId: string, cursoId: string };

export type TipoRepositorio = 'B' | 'F' | 'I'

export type BaseDeDatosProyecto = {
    id: number;
    usuario: string;
    url: string;
    contrasenia: string;
    tipo: 'S' | 'N';
  };

export type TecnologiaRepositorio = {
  id: number;
  nombre: string;
  versiones: string[];
  logo: keyof typeof Imagenes;
  tipo: 'F' | 'B' | 'I';
};

export type RepositorioProyecto = {
  id: number;
  url: string;
  tipo: TipoRepositorio;
  versionDeTecnologia: string;
  variablesDeEntorno: string;
  tecnologia: TecnologiaRepositorio;
};

export type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  calificacion: number;
  imagen: string;
  url: string;
  estadoDeEjecucion: EstadoEjecucionProyecto;
  estadoDeProyecto: EstadoProyecto;
  baseDeDatos: BaseDeDatosProyecto;
  repositorios: RepositorioProyecto[];
  archivosLogs: ArchivoLog[];
  materiaInformacion: MateriaInformacion;
  fechaUltimaModificacion: string;
};

export const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "Mi Proyecto 1",
    descripcion: "Descripción del proyecto 1",
    calificacion: 5,
    imagen: "imagen1.jpg",
    url: "https://example.com/proyecto1",
    estadoDeEjecucion: "F",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 1,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password",
      tipo: "S",
    },
    repositorios: [
      {
        id: 1,
        url: "https://github.com/mi-repositorio-1",
        tipo: "B",
        versionDeTecnologia: "1.0.0",
        variablesDeEntorno: "API_KEY=123456",
        tecnologia: {
          id: 1,
          nombre: "Node.js",
          versiones: ["14.x", "16.x"],
          logo: "nodejs",
          tipo: "B",
        },
      },
    ],
    archivosLogs: [
      {
        id: 1,
        nombre: "error.log",
        url: "https://logs.example.com/error.log",
      },
    ],
    materiaInformacion: {
      id: 1,
      nombre: "Informática",
      seccionId: "S001",
      materiaId: "M001",
      cursoId: "C001",
    },
    fechaUltimaModificacion: "2023-10-01",
  },
  {
    id: 2,
    titulo: "Mi Proyecto 2",
    descripcion: "Descripción del proyecto 2",
    calificacion: 4,
    imagen: "imagen2.jpg",
    url: "https://example.com/proyecto2",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "I",
    baseDeDatos: {
      id: 2,
      usuario: "admin",
      url: "https://db.example.com",
      contrasenia: "password",
      tipo: "N",
    },
    repositorios: [
      {
        id: 2,
        url: "https://github.com/mi-repositorio-2",
        tipo: "F",
        versionDeTecnologia: "2.0.0",
        variablesDeEntorno: "API_KEY=654321",
        tecnologia: {
          id: 2,
          nombre: "React",
          versiones: ["17.x", "18.x"],
          logo: "react",
          tipo: "F",
        },
      },
    ],
    archivosLogs: [
      {
        id: 2,
        nombre: "access.log",
        url: "https://logs.example.com/access.log",
      },
    ],
    materiaInformacion: {
      id: 2,
      nombre: "Matemáticas",
      seccionId: "S002",
      materiaId: "M002",
      cursoId: "C002",
    },
    fechaUltimaModificacion: "2023-10-02",
  },
];