import { ProyectoCard } from "../types/proyecto.card";
import { ProyectoService, RepositorioService } from "../types/proyecto.service";
import { Proyecto } from "../types/proyecto.tipo";
import { Repositorio } from "../types/repositorio";

export function apdatProjectCard(project: Proyecto): ProyectoCard{
  return {
    
  }
}

export function adaptProject(project: ProyectoService): Proyecto {
  return {
    baseDeDatos: project.base_de_datos,
    descripcion: project.descripcion,
    integrantes: project.estudiantes,
    materiaInformacion: {
      cursoId: project.seccion.curso.id ?? "1",
      materiaId: project.seccion.curso.materia.id ?? 1,
      seccionId: project.seccion.id,
    },
    titulo: project.titulo,
    tipo: project.tipo_proyecto == "M" ? "M" : "S",
    url: project.url,
    id: project.id,
    estadoDeEjecucion: (project.estado_ejecucion as Proyecto["estadoDeEjecucion"]) ?? "E",
    estadoDeProyecto: (project.estado_proyecto as Proyecto["estadoDeProyecto"]) ?? "A",
    ...(project.tipo_proyecto == "M"
      ? { integrado: adaptRepository(project.repositorios[0]) }
      : {
          frontend: adaptRepository(project.repositorios[0]),
          backend: adaptRepository(project.repositorios[1]),
        }),
    propietario: project.creador,
  };
}

export function adaptRepository(repository: RepositorioService): Repositorio {
  console.log(repository.variables_de_entorno)
  return {
    dockerText: (repository.tecnologia ?? "") + ":" + (repository.version ?? ""),
    variables: repository.variables_de_entorno == null ? '': repository.variables_de_entorno,
    url: repository.url ?? "",
    tipo: (repository.tipo as Repositorio["tipo"]) ?? "I",
    docker: { tag: repository.version ?? "", tecnologia: repository.tecnologia ?? "" },
    proyectoId: repository.proyecto,
    id: repository.id ?? -1,
  };
}
