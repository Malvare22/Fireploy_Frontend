import { postData } from "@core/services";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface Body {
  titulo: string;
  descripcion: string;
  seccionId: string;
  tipo_proyecto: "S" | "M";

}

export async function postCreateProject(token: string, project: ProyectoInformationSchema) {
  const body: Body = {
    titulo: project.titulo,
    descripcion: project.descripcion || '',
    seccionId: project.materiaInformacion.seccionId?.toString() ?? "-1",
    tipo_proyecto: project.tipo,
  };
  console.log(body)
  const response = await postData<{id: number}>(`/proyecto`, body, {
    sessiontoken: token,
  });

  return response;
}
