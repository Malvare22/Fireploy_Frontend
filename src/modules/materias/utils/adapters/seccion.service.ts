import { adaptDateBackend } from "@modules/general/utils/fechas";
import { SeccionesService } from "@modules/materias/types/curso.service";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";

/**
 * adaptSeccionService function – transforms a `SeccionesService` object into a `Seccion` object,
 * adapting its properties to fit the expected format for use in the application.
 * It converts the section data, including description, state, start and end dates, and title.
 * 
 * @function
 * 
 * @param {SeccionesService} seccion - The `SeccionesService` object to be adapted.
 * 
 * @returns {Seccion} A new `Seccion` object with the adapted properties.
 * 
 * @example
 * const seccionService: SeccionesService = { ... }; // Example input
 * const seccion: Seccion = adaptSeccionService(seccionService); // Example output
 */
export function adaptSeccionService(
  seccion: SeccionesService
): Seccion {
  return {
    descripcion: seccion.descripcion,
    estado: seccion.estado as Materia['estado'],
    fechaDeCierre: adaptDateBackend(seccion.fecha_fin),
    id: seccion.id,
    fechaDeInicio: adaptDateBackend(seccion.fecha_inicio),
    titulo: seccion.titulo,
  };
}

