import { postData } from "@core/services";

export const postStarProject = async (idProject: number, token: string) => {
  console.log(idProject)
  const response = await postData<any>(
    `/proyecto/puntuarProyecto/${idProject}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const postUnStarProject = async (idProject: number, token: string) => {
  const response = await postData<any>(
    `/proyecto/despuntuarProyecto/${idProject}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
