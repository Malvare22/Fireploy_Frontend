import { patchData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { Materia } from "../utils/forms/schema.materias";

export const editarMateriaService = async (token: string, data: Materia) => {
  const _data: Partial<Record<keyof Materia, string>> = {
    estado: data.estado,
    nombre: data.nombre,
    semestre: data.semestre,
  };

  const response = await patchData<MateriaService>(
    `/materia/${data.id ?? ""}`,
    _data,
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const editarEstadoMateriaService = async (
  token: string,
  data: Materia
) => {
  const response = await patchData<MateriaService>(
    `/materia/${data.id}`,
    { ...data, estado: data.estado == "A" ? "I" : "A" },
    {
      sessiontoken: token,
    }
  );

  return response;
};
