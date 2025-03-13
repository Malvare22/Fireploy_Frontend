import { patchData } from "@core/services";
import { SeccionService } from "../types/seccion.services";
import { SeccionCurso } from "../types/curso.seccion";
import { adaptarSeccionASeccionService } from "../utils/adapters/adaptar.seccion";

export const editarSeccionService = async (
  token: string,
  data: SeccionCurso
) => {
  const dataToSend = adaptarSeccionASeccionService(data);
  delete dataToSend.id;

  const response = await patchData<SeccionService>(
    `/seccion/${data.id}`,
    dataToSend,
    {
      sessiontoken: token,
    }
  );

  return response;
};
