import { EstadoMateria } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";


export function adaptMateriaService(materia: MateriaService): MateriaTabla{
  return {
    cantidadGruposActivos: materia.cursos?.length || 0,
    codigo: materia.id,
    estado: materia.estado as EstadoMateria,
    nombre: materia.nombre,
    semestre: materia.semestre,
  }
}