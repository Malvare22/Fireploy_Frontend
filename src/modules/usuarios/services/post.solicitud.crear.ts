import { postData } from "@core/services";

export const postCreateSolicitudRolDocenteService = async (usuarioId: number, token: string) => {
  const response = await postData<unknown>(
    `/solicitud`,
    {
      usuario: usuarioId,
      tipo_solicitud: 1
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
