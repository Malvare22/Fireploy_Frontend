import { getData } from "@core/services";
import { SolicitudService } from "../../usuarios/types/solicitud.service";

/**
 * Parameters accepted by the solicitudes (requests) service.
 *
 * @typedef {Object} SolicitudesParams
 * @property {'A' | 'P' | 'R'} [estado] - Status of the request ('A' = Approved, 'P' = Pending, 'R' = Rejected).
 * @property {number} [usuario] - ID of the user making the request.
 * @property {1 | 2} tipo - Type of request (1 = Request teaching role, 2 = Request course).
 */
export type SolicitudesParams = {
  estado?: "A" | "P" | "R";
  usuario?: number;
  tipo: 1 | 2;
};

/**
 * Retrieves requests filtered by type.
 *
 * @param {string} token - Session token for authentication.
 * @param {SolicitudesParams} params - Parameters to filter the requests.
 * @returns {Promise<SolicitudService[]>} - A list of requests matching the specified type.
 *
 * @description
 * Calls the `/solicitud` service endpoint, passing `estado` and `usuario` as query parameters.
 * It then filters the results to include only the requests where `tipo_solicitud` matches `params.tipo`.
 *
 * Request type:
 * - 1 = Request teaching role
 * - 2 = Request course
 */
export const getSolicitudesService = async (token: string, params: SolicitudesParams) => {
  const { tipo } = params;
  const _params: Omit<SolicitudesParams, "tipo"> = {
    estado: params.estado,
    usuario: params.usuario,
  };
  const response = await getData<SolicitudService[]>(`/solicitud`, _params, {
    sessiontoken: token,
  });

  return response.filter((r) => r.tipo_solicitud == tipo);
};
