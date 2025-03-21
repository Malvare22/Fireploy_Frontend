import { Usuario } from "@modules/usuarios/types/usuario";
import { EstadoCurso } from "./materia";
import { SeccionCurso } from "./curso.seccion";

export type CursoMateria = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: EstadoCurso;
  docente: Usuario;
  estudiantes: Usuario[];
  secciones: SeccionCurso[],
  materia: string

};

