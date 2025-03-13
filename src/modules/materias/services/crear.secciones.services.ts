import { postData } from "@core/services";
import { SeccionCurso } from "../types/curso.seccion";
import { SeccionService } from "../types/seccion.services";
import { adaptarSeccionASeccionService } from "../utils/adapters/adaptar.seccion";

export const crearSeccionService = async (
  token: string,
  seccion: SeccionCurso,
  cursoId: string
) => {
  const response = await postData<SeccionService>(
    `/seccion`,
    { ...adaptarSeccionASeccionService(seccion), cursoId: cursoId },
    {
      sessiontoken: token,
    }
  );

  return response;
};
