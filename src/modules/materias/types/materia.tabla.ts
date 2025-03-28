import { EstadoMateria } from "./materia";

export type MateriaTabla = {
  codigo: number;
  nombre: string;
  semestre: string;
  cantidadGruposActivos: number;
  estado: EstadoMateria
};
