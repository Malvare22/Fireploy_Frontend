import { CursoService } from "./curso.service";

export type MateriaService = {
  estado: string;
  nombre: string;
  semestre: string;
  id?: number;
  cursos?: CursoService[];
};
