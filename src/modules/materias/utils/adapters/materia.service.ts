import { Materia } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";

export function adaptMateriaService(materia: MateriaService): MateriaTabla {
  return {
    cantidadGruposActivos: materia.cursos?.length || 0,
    codigo: materia.id,
    estado: materia.estado as Materia["estado"],
    nombre: materia.nombre,
    semestre: parseInt(materia.semestre) || 0,
  };
}

export function adaptMateriaServiceToMateria(materia: MateriaService): Materia {
  return {
    id: materia.id,
    nombre: materia.nombre,
    semestre: parseInt(materia.semestre),
    cursos: materia.cursos?.map((curso) => ({
      semestre: curso.semestre,
      descripcion: curso.descripcion,
      id: curso.id,
      grupo: curso.grupo,
      estado: curso.estado as Materia["estado"],
      docente: curso.docente
        ? {
            nombre: curso.docente.nombre,
            correo: curso.docente.correo,
            imagen: curso.docente.foto_perfil ? curso.docente.foto_perfil : "",
            id: curso.docente.id,
          }
        : null,
    })),
    estado: materia.estado as Materia["estado"],
  };
}
