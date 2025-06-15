import { assetImages } from "@modules/general/utils/getImage";
import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { BaseDeDatos } from "./baseDeDatos";
import { Repositorio } from "./repositorio";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";

/**
 * EstadoEjecucionProyecto type – defines the execution status of a project.
 * 
 * @type
 * 
 * @value "F" Offline – the project is offline.
 * @value "N" started – the project is online.
 * @value "E" Error – the project is currently in state of error.
 * @value "L" Loading – the project has been submitted to deployment process.
 */

export type EstadoEjecucionProyecto = "F" | "N" | "E" | "L";

/**
 * EstadoProyecto type – defines the general status of a project.
 * 
 * @type
 * 
 * @value "A" Active – the project is currently active.
 * @value "I" Inactive – the project is currently inactive.
 */
export type EstadoProyecto = "A" | "I";

/**
 * ArchivoLog type – represents a log or file attached to a project.
 * 
 * @type
 * 
 * @property id A numeric identifier for the file.
 * @property nombre The name of the file.
 * @property url The URL where the file can be accessed or downloaded.
 */
export type ArchivoLog = { id: number; nombre: string; url: string };

/**
 * MateriaInformacion type – holds reference IDs related to subject, course, and section
 * for associating a project with academic context.
 * 
 * @type
 * 
 * @property seccionId Identifier for the section related to the project; can be null.
 * @property materiaId Identifier for the subject or course material; can be null.
 * @property nombre Optional name of the subject or section.
 * @property cursoId Identifier for the academic course the project belongs to; can be null.
 */
export type MateriaInformacion = {
  seccionId: Seccion["id"] | null;
  materiaId: Materia["id"] | null;
  nombre?: string | undefined;
  cursoId: Curso["id"] | null;
};

/**
 * TipoRepositorio type – defines the kind of repository within a project.
 * 
 * @type
 * 
 * @value "B" Backend – the backend repository.
 * @value "F" Frontend – the frontend repository.
 * @value "I" Integrated – the full-stack or integrated repository.
 */
export type TipoRepositorio = "B" | "F" | "I";

/**
 * TecnologiaRepositorio type – represents a technology used in a repository,
 * including its ID, name, and associated logo key.
 * 
 * @type
 * 
 * @property id Numeric identifier for the technology.
 * @property nombre The name of the technology (e.g., React, Node.js).
 * @property logo A key corresponding to the logo asset for the technology.
 */
export type TecnologiaRepositorio = {
  id: number;
  nombre: string;
  logo: keyof typeof assetImages;
};

/**
 * RepositorioProyecto type – describes a single repository used in a project,
 * including its URL, technology version, environment variables, and associated technology.
 * 
 * @type
 * 
 * @property id Optional numeric identifier of the repository.
 * @property url The full URL to the repository source.
 * @property versionDeTecnologia The version of the technology used in this repository.
 * @property variablesDeEntorno A string representation of required environment variables.
 * @property tecnologia Optional object representing the technology used in this repository.
 */
export type RepositorioProyecto = {
  id?: number;
  url: string;
  versionDeTecnologia: string;
  variablesDeEntorno: string;
  tecnologia?: TecnologiaRepositorio;
};

/**
 * Proyecto type – represents the complete project entity with metadata,
 * repositories, ownership, and associations to academic context.
 * 
 * @type
 * 
 * @property id Optional numeric identifier of the project.
 * @property titulo The title or name of the project.
 * @property descripcion Optional description or summary of the project content.
 * @property fav_usuarios An array of user IDs who marked this project as a favorite.
 * @property imagen Optional URL or path to the project's image or thumbnail.
 * @property url The public or internal URL to access the deployed project.
 * @property estadoDeEjecucion Optional execution status of the project (e.g., finished, in progress).
 * @property estadoDeProyecto Optional general state of the project (e.g., active, inactive).
 * @property baseDeDatos Optional object describing the database used in the project.
 * @property tipo Indicates whether the project is simple ("S") or modular ("M").
 * @property backend Optional object containing backend repository data.
 * @property frontend Optional object containing frontend repository data.
 * @property integrado Optional object containing integrated repository data.
 * @property materiaInformacion Object with details about the academic subject and course associations.
 * @property fechaUltimaModificacion Optional ISO date string indicating the last update timestamp.
 * @property integrantes List of user objects representing project members.
 * @property propietario Optional object representing the user who owns or leads the project.
 */
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