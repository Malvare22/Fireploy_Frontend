import { getData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";

export async function getProjectById(token: string, id: number) {
  const response = await getData<ProyectoService>(
    `/proyecto/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}
