import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";

// import { postData } from "@core/services";
export const obtenerMateriasService = async (token: string) => {
  const response = await getData<MateriaService[]>(
    `/materia`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
