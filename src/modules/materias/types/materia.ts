import { Curso } from "./curso";

export type Materia = {
  estado?: 'A' |'I';
  nombre: string;
  semestre: string;
  id: number;
  cursos: Curso[] | null;
};
