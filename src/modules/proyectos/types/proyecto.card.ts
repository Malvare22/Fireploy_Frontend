import { EstadoEjecucionProyecto } from "./proyecto.tipo";
import { UsuarioCurso } from "@modules/materias/types/curso";

export type ProyectoCard = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  integrantes: UsuarioCurso[];
  frontend?: string | null;
  backend?: string | null;
  integrado?: string | null;
  dataBase: string;
  fav_usuarios: number[];
  materia: string;
  grupo: string;
  seccion: string;
  semestre: string;
  estado: EstadoEjecucionProyecto;
};
