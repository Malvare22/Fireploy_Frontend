import { getData } from "@core/services";
import { SolicitudService } from "../types/solicitud.service";

export const getSolicitudes = async (
  token: string,
  params?: { usuario?: number; estado?: SolicitudService['estado'] }
) => {
  let queryParams = new URLSearchParams();
  if (params) {
    if (params.estado) {
      queryParams.set("estado", params.estado);
    }
    if (params.usuario) {
      queryParams.set("usuario", params.usuario.toString());
    }
  }
  const response = await getData<SolicitudService[]>(
    `/solicitud?${queryParams.toString() ? queryParams.toString() : ""}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
