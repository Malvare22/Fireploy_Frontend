import {
  EstadoCurso,
  EstadoMateria,
  Materia,
} from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";

export function adaptMateriaService(materia: MateriaService): MateriaTabla {
  return {
    cantidadGruposActivos: materia.cursos?.length || 0,
    codigo: materia.id,
    estado: materia.estado as EstadoMateria,
    nombre: materia.nombre,
    semestre: parseInt(materia.semestre) || 0,
  };
}

export function adaptMateriaServiceToMateria(materia: MateriaService): Materia {
  return {
    id: materia.id,
    nombre: materia.nombre,
    semestre: materia.semestre,
    cursos: materia.cursos?.map((curso) => ({
      semestre: curso.semestre,
      descripcion: curso.descripcion,
      id: curso.id,
      grupo: curso.grupo,
      estado: curso.estado as EstadoCurso,
    })),
    estado: materia.estado as EstadoMateria,
  };
}
