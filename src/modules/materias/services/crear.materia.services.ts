import { postData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { MateriaModal } from "../types/materia";

// import { postData } from "@core/services";
export const crearMateriaService = async (
  token: string,
  data: MateriaModal
) => {
  const response = await postData<MateriaService>(
    `/materia`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};