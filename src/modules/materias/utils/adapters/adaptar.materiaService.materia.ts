import { MateriaService } from "@modules/materias/types/materia.service";
import { EstadoMateria } from "@modules/materias/types/materia.estado";
import { SemestreMateria } from "@modules/materias/types/materia.semestre";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";
import { MateriaModal } from "../forms/schema.materias";
import { Materia } from "@modules/materias/types/materia";
import { CursoService } from "@modules/materias/types/curso.service";
import { estudiantesEjemplo } from "@modules/materias/types/estudiantes.ejemplo";
import { EstadoCurso } from "@modules/materias/types/estado.curso";

export const adaptarMateriaModalServiceAMateria = (materia: MateriaService) => {
  const _materia: MateriaModal = {
    estado: materia.estado as EstadoMateria,
    nombre: materia.nombre,
    semestre: materia.semestre as SemestreMateria,
    id: materia.id,
  };

  return _materia;
};

export const adaptarMateriaServiceAMateriaTabla = (materia: MateriaService) => {
  const _materia: MateriaTabla = {
    estado: materia.estado as EstadoMateria,
    nombre: materia.nombre,
    semestre: materia.semestre as SemestreMateria,
    id: materia.id as number,
  };

  return _materia;
};

export const adaptarMateriaTablaAMateriaService = (materia: MateriaTabla) => {
  const semestre = materia.semestre as SemestreMateria;

  const _materia: MateriaTabla = {
    estado: materia.estado,
    nombre: materia.nombre,
    semestre: semestre,
    id: materia.id,
  };

  return _materia;
};

export function adaptarMateriaAMateriaService(
  materia: Materia
): MateriaService {
  return {
    estado: materia.estado || "",
    nombre: materia.nombre || "",
    semestre: materia.semestre || "",
    id: materia.id ?? null,
    cursos: materia.cursos
      ? materia.cursos.map((curso) => ({
          id: curso.id || "",
          grupo: curso.grupo || "",
          semestre: curso.semestre || "",
          descripcion: curso.descripcion || "",
          estado: curso.estado || "",
        }))
      : [],
  };
}

export const unirMateriaServiceConCursoService = (
  materia: MateriaService,
  cursos: CursoService[]
): Materia => {
  return {
    estado: materia.estado as EstadoMateria,
    id: materia.id ?? 0,
    nombre: materia.nombre,
    semestre: materia.semestre,
    cursos: cursos.map((curso) => ({
      id: curso.id,
      descripcion: curso.descripcion,
      docente: curso.docente,
      estado: curso.estado as EstadoCurso,
      estudiantes: estudiantesEjemplo,
      grupo: curso.grupo,
      semestre: curso.semestre,
    })),
  };
};
