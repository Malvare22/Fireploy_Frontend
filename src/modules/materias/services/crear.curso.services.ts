import { postData } from "@core/services";
import { CursoService } from "../types/curso.service";
import { CursoModal } from "../utils/forms/schema.curso";

export const crearCursoService = async (
  token: string,
  data: CursoModal
) => {
  const response = await postData<CursoService>(
    `/curso`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};