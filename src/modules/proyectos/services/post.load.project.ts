import { postData } from "@core/services";
import { DataBaseService } from "../types/dabase.service";

export const postLoadProject = async (id: number, token: string) => {
  const response = await postData<DataBaseService | null>(
    `/proyecto/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
