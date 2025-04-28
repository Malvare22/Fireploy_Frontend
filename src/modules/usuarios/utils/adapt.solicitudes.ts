import { adaptDateBackend } from "@modules/general/utils/fechas";
import { SolicitudService } from "../types/solicitud.service";
import { Solicitud } from "../types/solicitud.promover";

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
