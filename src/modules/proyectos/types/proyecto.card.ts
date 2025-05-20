import { EstadoEjecucionProyecto } from "./proyecto.tipo";
import { UsuarioCurso } from "@modules/materias/types/curso";

export type RepositoryForCard = {
  url: string;
  framework: string;
};
export type ProyectoCard = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  integrantes: UsuarioCurso[];
  frontend?: RepositoryForCard | undefined;
  backend?: RepositoryForCard | undefined;
  integrado?: RepositoryForCard | undefined;
  dataBase: string | null | undefined;
  fav_usuarios: number[];
  materia: string | null;
  grupo: string;
  estado: EstadoEjecucionProyecto;
  url: string | null;
};
