import axios from "axios";

export const postDeployProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};

export const postStartProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/start/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};

export const postStopProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/stop/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};
