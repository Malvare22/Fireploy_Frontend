import { Proyecto } from "../types/proyecto.tipo";

export function getDataForSelects(projects: Proyecto[]) {

  let backends: Set<string> = new Set();
  let frontends: Set<string> = new Set();

  projects.forEach((project) => {
    if (project.backend?.tecnologia?.nombre) {
      backends.add(project.backend.tecnologia.nombre);
    }
    if (project.frontend?.tecnologia?.nombre) {
      frontends.add(project.frontend.tecnologia.nombre);
    }
  });

  return {
    backends: Array.from(backends),
    frontends: Array.from(frontends),
  };
}
