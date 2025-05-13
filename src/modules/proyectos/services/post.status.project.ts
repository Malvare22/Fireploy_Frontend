import { postData } from "@core/services";
import { DataBaseService } from "../types/dabase.service";


export const postDeployProject = async (id: number, token: string) => {
  const response = await postData<DataBaseService | null>(
    `/proyecto/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const postStartProject = async (id: number, token: string) => {
  const response = await postData<DataBaseService | null>(
    `/proyecto/start/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const postStopProject = async (id: number, token: string) => {
  const response = await postData<DataBaseService | null>(
    `/proyecto/stop/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
