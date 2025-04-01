import { patchData } from "@core/services";
import { MateriaModal } from "../types/materia";
import { MateriaService } from "../types/materia.service";

export const postMateriaService = async (token: string, data: MateriaModal) => {
  const _data: Partial<Record<keyof MateriaModal, string>> = {
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

export const postEstadoMateriaService = async (
  token: string,
  data: {
    nombre: string,
    semestre: string,
    estado: string
  },
  id: number
) => {
  const response = await patchData<MateriaService>(
    `/materia/${id}`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};
