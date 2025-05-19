import { Materia } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";

/**
 * adaptMateriaService function – transforms a `MateriaService` object into a `MateriaTabla` object,
 * adapting the properties to fit the structure required for table representation of the subject.
 * This function maps the subject's active course count, code, state, name, and semester.
 * 
 * @function
 * 
 * @param {MateriaService} materia - The `MateriaService` object to be adapted into a `MateriaTabla`.
 * 
 * @returns {MateriaTabla} A new `MateriaTabla` object with the adapted properties.
 * 
 * @example
 * const materiaService: MateriaService = { ... }; // Example input
 * const materiaTabla: MateriaTabla = adaptMateriaService(materiaService); // Example output
 */
export function adaptMateriaService(materia: MateriaService): MateriaTabla {
  return {
    cantidadGruposActivos: materia.cursos?.length || 0,
    codigo: materia.id,
    estado: materia.estado as Materia["estado"],
    nombre: materia.nombre,
    semestre: parseInt(materia.semestre) || 0,
  };
}

/**
 * adaptMateriaServiceToMateria function – transforms a `MateriaService` object into a `Materia` object,
 * adapting the properties to fit the structure for managing the subject's details.
 * This function maps the subject's ID, name, semester, courses, and state,
 * along with each course's details like instructor, course state, group, and semester.
 * 
 * @function
 * 
 * @param {MateriaService} materia - The `MateriaService` object to be adapted into a `Materia`.
 * 
 * @returns {Materia} A new `Materia` object with the adapted properties.
 * 
 * @example
 * const materiaService: MateriaService = { ... }; // Example input
 * const materia: Materia = adaptMateriaServiceToMateria(materiaService); // Example output
 */
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
            nombre: curso.docente.nombre + ' ' + curso.docente.apellido,
            correo: curso.docente.correo,
            imagen: curso.docente.foto_perfil ? curso.docente.foto_perfil : "",
            id: curso.docente.id,
          }
        : null,
    })),
    estado: materia.estado as Materia["estado"],
  };
}
