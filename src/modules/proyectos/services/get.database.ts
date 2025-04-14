import { getData } from "@core/services";
import { DataBaseService } from "../types/dabase.service";

export const getDataBaseById = async (id: number, token: string) => {
  const response = await getData<DataBaseService | null>(
    `/base-de-datos/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
