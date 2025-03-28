import { getData } from "@core/services";
import { SolicitudService } from "../types/solicitud.service";

export const getSolicitudService = async (id: number, token: string) => {
  const response = await getData<SolicitudService>(
    `/solicitud/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
