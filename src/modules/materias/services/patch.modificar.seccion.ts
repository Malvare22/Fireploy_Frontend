import { patchData } from "@core/services";
import { Seccion } from "../types/seccion";
import { SeccionesService } from "../types/curso.service";

export const patchEditSeccion = async (token: string, seccion: Seccion) => {
  type Body = {
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: "A" | "I";
  };

  const body: Body = {
    titulo: seccion.titulo,
    descripcion: seccion.descripcion,
    fecha_inicio: seccion.fechaDeInicio,
    fecha_fin: seccion.fechaDeCierre,
    estado: seccion.estado,
  };

  const response = await patchData<SeccionesService>(`/seccion/${seccion.id}`, body, {
    sessiontoken: token,
  });

  return response;
};
