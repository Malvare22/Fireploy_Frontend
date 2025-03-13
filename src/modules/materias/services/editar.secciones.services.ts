import { patchData } from "@core/services";
import { SeccionService } from "../types/seccion.services";
import { SeccionCurso } from "../types/curso.seccion";

export const editarSeccionService = async (
  token: string,
  data: SeccionCurso
) => {
  const response = await patchData<SeccionService>(
    `/seccion/${data.id}`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};