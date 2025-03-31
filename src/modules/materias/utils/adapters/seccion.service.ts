import { adaptarFechaBackend } from "@modules/general/utils/fechas";
import { EstadoMateria } from "@modules/materias/types/materia";
import { SeccionCurso } from "@modules/materias/types/seccion";
import { SeccionService } from "@modules/materias/types/seccion.services";

export function adaptarSeccionServiceASeccion(
  seccion: SeccionService
): SeccionCurso {
  return {
    cursoId: seccion.cursoId,
    descripcion: seccion.descripcion,
    estado: seccion.estado as EstadoMateria,
    fechaDeCierre: adaptarFechaBackend(seccion.fecha_fin),
    id: seccion.id,
    fechaDeInicio: adaptarFechaBackend(seccion.fecha_inicio),
    titulo: seccion.titulo,
  };
}

export function adaptarSeccionASeccionService(
  seccion: SeccionCurso
): SeccionService {
  return {
    cursoId: seccion.cursoId,
    descripcion: seccion.descripcion,
    estado: seccion.estado,
    fecha_fin: seccion.fechaDeCierre,
    id: seccion.id,
    fecha_inicio: seccion.fechaDeInicio,
    titulo: seccion.titulo,
  };
}
