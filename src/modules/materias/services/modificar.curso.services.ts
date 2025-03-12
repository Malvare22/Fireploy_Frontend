import { patchData } from "@core/services";
import { CursoService } from "../types/curso.service";
import { CursoModal } from "../utils/forms/schema.curso";

export const editarCursoService = async (
  token: string,
  data: CursoModal,
  idCurso: string
) => {
  const _curso: Partial<Record<keyof CursoModal, string>> = {
    descripcion: data.descripcion as string,
    estado: data.estado as string,
    docente: data.docente as string,
  };
  const response = await patchData<CursoService>(`/curso/${idCurso}`, _curso, {
    sessiontoken: token,
  });

  return response;
};
