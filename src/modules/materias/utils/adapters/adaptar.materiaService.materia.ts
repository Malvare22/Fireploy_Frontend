import { Materia } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";


export function adaptarMateriaService(materia: MateriaService): Materia{
  return {
    nombre: materia.nombre,
    semestre: materia.semestre,
    id: materia.id as number,
    cursos: materia.cursos ?  materia.cursos.map(curso => ({
      id: curso.id,
      grupo: curso.grupo,
      semestre: curso.semestre,
      descripcion: curso.descripcion,
      estado: curso.estado
    })) : undefined
  }
};