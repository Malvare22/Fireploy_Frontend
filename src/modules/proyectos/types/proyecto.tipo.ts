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
  descripcion?: string | null | undefined;
  fav_usuarios: number[];
  imagen?: string | undefined | null;
  url: string;
  estadoDeEjecucion?: EstadoEjecucionProyecto;
  estadoDeProyecto?: EstadoProyecto;
  baseDeDatos?: BaseDeDatos;
  tipo: "S" | "M";
  backend?: Repositorio;
  frontend?: Repositorio;
  integrado?: Repositorio;
  materiaInformacion: MateriaInformacion;
  fechaUltimaModificacion?: string;
  integrantes: UsuarioCurso[];
  propietario?: UsuarioCurso;
};

export type ProjectModal = {
  title: string;
  technologies: string[];
  description: string | null;
  repositories: string[];
  rating: number;
  members: UsuarioCurso[];
  status: EstadoEjecucionProyecto;
  url: null | string;
  subject: string;
  group: string;
  img: string;
};

export const exampleProjectsModal: ProjectModal[] = [
  {
    title: "Plataforma de Tutorías Online",
    technologies: ["React", "Node.js", "MongoDB"],
    description: "Una plataforma que conecta estudiantes con tutores certificados en tiempo real.",
    rating: 4.5,
    members: [
      {
        id: 1,
        nombre: "Ana Gómez",
        imagen: "https://randomuser.me/api/portraits/women/1.jpg",
        estado: "A",
      },
      {
        id: 2,
        nombre: "Carlos Pérez",
        imagen: "https://randomuser.me/api/portraits/men/2.jpg",
        estado: "A",
      },
    ],
    status: "E",
    url: "https://tutorias.example.com",
    subject: "Programación Web",
    group: "Grupo 1",
    img: "https://source.unsplash.com/featured/?education,technology",
    repositories: ["github.com", "gitlab.com"],
  },
  {
    title: "Gestor de Tareas Ágil",
    technologies: ["Vue", "Firebase"],
    description: "Aplicación para gestión de tareas con enfoque en metodologías ágiles.",
    rating: 4.2,
    members: [
      {
        id: 3,
        nombre: "Luis Martínez",
        imagen: "https://randomuser.me/api/portraits/men/3.jpg",
        estado: "A",
      },
    ],
    status: "F",
    url: "https://tareasagil.example.com",
    subject: "Ingeniería de Software",
    group: "Grupo 2",
    img: "https://source.unsplash.com/featured/?productivity,app",
    repositories: ["github.com", "gitlab.com"],
  },
  {
    title: "App de Bienestar Estudiantil",
    technologies: ["Flutter", "Supabase"],
    description: "Promueve hábitos saludables entre estudiantes universitarios.",
    rating: 4.7,
    members: [
      {
        id: 4,
        nombre: "María López",
        imagen: "https://randomuser.me/api/portraits/women/4.jpg",
        estado: "A",
      },
      {
        id: 5,
        nombre: "Jorge Ramírez",
        imagen: "https://randomuser.me/api/portraits/men/5.jpg",
        estado: "A",
      },
    ],
    status: "L",
    url: null,
    subject: "Desarrollo Móvil",
    group: "Grupo 3",
    img: "https://source.unsplash.com/featured/?health,students",
    repositories: ["github.com", "gitlab.com"],
  },
  {
    title: "Sistema de Reservas de Laboratorio",
    technologies: ["Django", "PostgreSQL"],
    description: "Facilita la reserva y control de uso de laboratorios en la universidad.",
    rating: 4.0,
    members: [
      {
        id: 6,
        nombre: "Andrea Torres",
        imagen: "https://randomuser.me/api/portraits/women/6.jpg",
        estado: "A",
      },
    ],
    status: "N",
    url: "https://reservaslab.example.com",
    subject: "Bases de Datos",
    group: "Grupo 4",
    img: "https://source.unsplash.com/featured/?lab,booking",
    repositories: ["github.com", "gitlab.com"],
  },
];
