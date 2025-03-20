import { Usuario } from "@modules/usuarios/types/usuario";
import { EstadoCurso } from "./estado.curso";

export type CursoMateria = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: EstadoCurso;
  docente: Usuario;
  estudiantes: Usuario[];
};

