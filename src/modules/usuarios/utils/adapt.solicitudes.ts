import { adaptDateBackend } from "@modules/general/utils/fechas";
import { SolicitudService } from "../types/solicitud.service";
import { Solicitud } from "../types/solicitud.promover";

/**
 * Adapts the given `SolicitudService` object to the `Solicitud` type.
 * 
 * This function transforms a `SolicitudService` object, typically obtained from the backend, into the `Solicitud` format used in the frontend. It performs the following transformations:
 * 
 * - Converts the `aprobado_by` field to a string or `"-1"` if it is null.
 * - Maps the `fecha_solicitud` and `fecha_respuesta` to the correct date format using the `adaptDateBackend` utility.
 * - Converts the `usuario.id` to a string.
 * - Maps the `curso.id` or sets it to `null` if no course is associated.
 * 
 * @param {SolicitudService} x - The `SolicitudService` object that needs to be adapted.
 * @returns {Solicitud} A transformed `Solicitud` object with the appropriate data.
 * 
 * @example
 * const solicitudService = {
 *   aprobado_by: { nombre: "John Doe" },
 *   estado: "P",
 *   id: 123,
 *   fecha_solicitud: "2025-01-01T00:00:00.000Z",
 *   fecha_respuesta: "2025-01-02T00:00:00.000Z",
 *   usuario: { id: 456, nombre: "Jane Doe" },
 *   curso: { id: "789" }
 * };
 * 
 * const adaptedSolicitud = adaptSolicitudService(solicitudService);
 * console.log(adaptedSolicitud);
 */
export function adaptSolicitudService(x: SolicitudService): Solicitud {
  return {
    aprobadoPor: (x.aprobado_by?.nombre || -1).toString(),
    estado: x.estado,
    id: x.id,
    usuario: {
      fechaRecepcion: adaptDateBackend(x.fecha_solicitud),
      id: x.usuario.id.toString(),
      nombres: x.usuario.nombre,
      fechaAceptacion: x.fecha_respuesta != null ? adaptDateBackend(x.fecha_respuesta) : null,
    },
    curso: !x.curso ? null : x.curso?.id,
  };
}
