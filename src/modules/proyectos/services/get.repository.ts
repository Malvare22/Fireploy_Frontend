import { getData } from "@core/services";
import { Repositorio } from "../types/repositorio";

export async function getRepositoryById(token: string, id: number) {
  const response = await getData<Repositorio>(
    `/repositorio/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}
