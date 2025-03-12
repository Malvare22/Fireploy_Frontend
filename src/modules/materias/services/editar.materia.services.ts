import { patchData } from "@core/services";
import { MateriaModal } from "../utils/forms/schema.materias";
import { MateriaService } from "../types/materia.service";

export const editarMateriaService = async (token: string, data: MateriaModal) => {
  const _data: Partial<Record<keyof MateriaModal, string>> = {
    estado: data.estado,
    nombre: data.nombre,
    semestre: data.semestre,
  };

  const response = await patchData<MateriaService>(
    `/MateriaModal/${data.id ?? ""}`,
    _data,
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const editarEstadoMateriaService = async (
  token: string,
  data: MateriaModal
) => {
  const _data: Partial<Record<keyof MateriaModal, string>> = {
    estado: data.estado == "A" ? "I" : "A",
    nombre: data.nombre,
    semestre: data.semestre,
  };
  const response = await patchData<MateriaService>(
    `/MateriaModal/${data.id}`,
    _data,
    {
      sessiontoken: token,
    }
  );

  return response;
};
