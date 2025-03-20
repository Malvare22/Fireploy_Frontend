import { Materia } from "./materia";

export type GrupoTabla = {
  id: string;
  semestre: string;
  grupo: string;
  docente: string;
  cantidadEstudiantes: number;
};

export function adaptarGruposMateria(materia: Materia): GrupoTabla[] {
  if (!materia.cursos) return [];
  return materia.cursos.map((curso) => ({
    cantidadEstudiantes: curso.estudiantes.length,
    docente: `${curso.docente.nombres} ${curso.docente.apellidos}`,
    grupo: curso.grupo,
    id: curso.id,
    semestre: curso.semestre,
  }));
}

export enum LabelGrupoTabla{
  id = 'Id',
  semestre = 'Semestre',
  grupo = 'Grupo',
  docente = 'Docente',
  cantidad = 'Cantidad Estudiantes',
  acciones = 'Acciones'
};
