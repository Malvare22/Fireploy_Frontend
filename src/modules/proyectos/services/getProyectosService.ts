import { getData } from "@core/services";

export async function getProyectosService(id: number, token: string) {
  const response = await getData<unknown>(
    `/proyecto/estudiante/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}
