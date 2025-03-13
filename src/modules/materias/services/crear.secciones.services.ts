import { postData } from "@core/services";
import { SeccionCurso } from "../types/curso.seccion";

export const crearSeccionService = async (
  token: string,
  data: SeccionCurso,
  cursoId: number
) => {
  const response = await postData<SeccionCurso>(
    `/seccion`,
    { ...data, cursoId: cursoId },
    {
      sessiontoken: token,
    }
  );

  return response;
};
