import { CursoService } from "./curso.service";

export type MateriaService = {
  estado: string;
  nombre: string;
  semestre: string;
  id: number;
  cursos?: {
    id: string;
    grupo: string;
    semestre: string;
    descripcion: string;
    estado: string;
    docente: null | CursoService['docente'];
  }[];
};
