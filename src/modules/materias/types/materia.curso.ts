import { Usuario } from "@modules/usuarios/types/usuario";
import { EstadoCurso } from "./materia";
import { SeccionCurso } from "./seccion";

export type CursoMateria = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: EstadoCurso;
  docente?: Usuario | undefined;
  estudiantes?: Usuario[];
  secciones?: SeccionCurso[],
  materia?: {
    id?: number,
    nombre: string,
    semestre: string,
    estado: string
  }

};

