import { Curso } from "./curso";

export type Materia = {
  estado: "A" | "I";
  nombre: string;
  semestre: number;
  id?: number | undefined;
  cursos?: Curso[] | null;
};
