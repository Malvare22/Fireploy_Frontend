import { adaptarFechaBackend } from "@modules/general/utils/fechas";
import { SolicitudPromover } from "../types/solicitud.promover";
import { SolicitudService } from "../types/solicitud.service";

export function adaptSolicitudService(x: SolicitudService): SolicitudPromover {
  return {
    aprobadoPor: (x.aprobado_by?.nombre || -1).toString(),
    estado: x.estado,
    id: x.id,
    usuario: {
      fechaRecepcion: adaptarFechaBackend(x.fecha_solicitud),
      id: x.usuario.id.toString(),
      nombres: x.usuario.nombre,
      fechaAceptacion:
        x.fecha_respuesta != null
          ? adaptarFechaBackend(x.fecha_respuesta)
          : null,
    },
  };
}
