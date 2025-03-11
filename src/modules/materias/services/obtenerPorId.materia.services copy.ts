import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";

// import { postData } from "@core/services";
export const obtenerMateriaPorIdService = async (token: string, id: string) => {
  const response = await getData<MateriaService>(
    `/materia/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
