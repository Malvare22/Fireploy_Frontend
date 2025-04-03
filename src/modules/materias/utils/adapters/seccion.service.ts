import { adaptarFechaBackend } from "@modules/general/utils/fechas";
import { SeccionesService } from "@modules/materias/types/curso.service";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";

export function adaptSeccionService(
  seccion: SeccionesService
): Seccion {
  return {
    descripcion: seccion.descripcion,
    estado: seccion.estado as Materia['estado'],
    fechaDeCierre: adaptarFechaBackend(seccion.fecha_fin),
    id: seccion.id,
    fechaDeInicio: adaptarFechaBackend(seccion.fecha_inicio),
    titulo: seccion.titulo,
  };
}

