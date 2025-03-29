import axios from "axios";

export async function getDockerRepositories(query: string): Promise<string[]> {
  try {
    const response = await axios.get("/api/docker/search/repositories/", {
      params: { query: query },
    });

    return response.data.results.map((repo: any) => repo.repo_name);
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
    return [];
  }
}

export async function getDockerTags(repository: string): Promise<string[]> {
  let data = repository;
  if (!repository.includes("/")) {
    data = `/library/${data}`;
  }
  try {
    const response = await axios.get(`/api/docker/repositories/${data}/tags`);

    const tags = response.data.results.map((tag: any) => tag.name);

    return tags;
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
    return [];
  }
}
