import { postData } from "@core/services";

export const postCreateSolicitudCurso = async (token: string, usuarioId: number, cursoId: string) => {
  const response = await postData<unknown>(
    `/solicitud`,
    {
      usuario: usuarioId,
      tipo_solicitud: 2,
      cursoId: cursoId
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
