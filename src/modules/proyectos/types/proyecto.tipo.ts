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
  nombre?: string | undefined;
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