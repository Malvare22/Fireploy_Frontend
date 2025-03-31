import { Curso } from "@modules/materias/types/curso";
import { CursoService } from "@modules/materias/types/curso.service";
import { adapterUsuario } from "@modules/usuarios/utils/adaptar.usuario";

export function adaptCursoService(curso: CursoService): Curso {
  return {
    descripcion: curso.descripcion,
    docente: curso.docente ? adapterUsuario(curso.docente) : null,
    estado: curso.estado,
    estudiantes: [],
    id: curso.id,
    grupo: curso.grupo,
    semestre: curso.semestre,
    materia: {
      estado: curso.materia.estado,
      id: curso.materia.id,
      nombre: curso.materia.nombre,
      semestre: curso.materia.semestre,
    },
  };
}
