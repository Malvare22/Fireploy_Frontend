import { CursoMateria } from "./materia.curso";
import { EstadoMateria } from "./materia.estado";

export type Materia = {
    estado: EstadoMateria;
    nombre: string;
    semestre: string;
    id: number;
    cursos?: CursoMateria[];
  };
  