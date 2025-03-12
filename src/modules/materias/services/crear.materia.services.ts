import { postData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { MateriaModal } from "../utils/forms/schema.materias";

// import { postData } from "@core/services";
export const crearMateriaService = async (
  token: string,
  data: MateriaModal
) => {
  console.log(token, data)
  const response = await postData<MateriaService>(
    `/materia`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};