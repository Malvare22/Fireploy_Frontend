import { getData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";

export async function getProyectosAllService() {
  const response = await getData<ProyectoService[]>(
    `/proyecto`,
  );

  return response;
}