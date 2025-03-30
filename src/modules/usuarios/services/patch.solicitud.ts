import { patchData } from "@core/services";

export const patchSolicitud = async (
  id: number,
  estado: "A" | "P" | "R",
  idOfUpdater: number,
  token: string
) => {
  const response = await patchData<unknown>(
    `/solicitud/${id}`,
    {
      estado: estado,
      aprobado_by: idOfUpdater,
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
