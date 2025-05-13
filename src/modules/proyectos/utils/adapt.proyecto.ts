import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProyectoCard } from "../types/proyecto.card";
import { ProyectoService, RepositorioService } from "../types/proyecto.service";
import { Proyecto } from "../types/proyecto.tipo";
import { Repositorio } from "../types/repositorio";
import { adaptDataBase } from "./adaptDataBase";

/**
 * adaptUsuarioToPortafolioCard – Transforms a user object into a format compatible with a portfolio card, extracting ID, name, and photo.
 * 
 * @param {any} usuario - The user object to transform.
 * @returns {UsuarioPortafolioCard} The user data formatted as a portfolio card.
 */
const adaptUsuarioToPortafolioCard = (usuario: any): UsuarioPortafolioCard => ({
  id: usuario.id,
  nombres: usuario.nombre || usuario.nombres || "Usuario",
  foto: usuario.imagen || "",
});

/**
 * adaptProjectToCard – Transforms a project object into a format compatible with a project card, extracting essential data like title, description, image, and participant information. Also extracts frontend, backend, integrated repository frameworks, and database name.
 * 
 * @param {Proyecto} proyecto - The project object to transform.
 * @returns {ProyectoCard} The project data formatted as a project card.
 */
export function adaptProjectToCard(proyecto: Proyecto): ProyectoCard {
  return {
    id: proyecto.id || 0,
    titulo: proyecto.titulo,
    descripcion: proyecto.descripcion ?? "",
    imagen: proyecto.imagen || "",

    integrantes: [...proyecto.integrantes, proyecto.propietario].map(adaptUsuarioToPortafolioCard),

    frontend: !proyecto.frontend ? null : proyecto.frontend?.docker?.framework || "No especificado",
    backend: !proyecto.backend ? null : proyecto.frontend?.docker?.framework || "No especificado",
    integrado: !proyecto.integrado ? null : proyecto.frontend?.docker?.framework || "No especificado",
    dataBase: proyecto.baseDeDatos?.nombre || "",

    fav_usuarios: proyecto.fav_usuarios ?? [],

    materia: proyecto.materiaInformacion?.materiaId?.toString() || "N/A",
    grupo: proyecto.materiaInformacion?.cursoId?.toString() || "N/A",
    seccion: proyecto.materiaInformacion?.seccionId?.toString() || "N/A",

    semestre: "2024-1", // Puedes cambiar esto si tienes lógica real
    estado: proyecto.estadoDeEjecucion || "E",
  };
}

/**
 * adaptProject – Transforms a partial project service object into a full project object, including adapting repository, database, and other project data.
 * 
 * @param {Partial<ProyectoService>} project - The partial project service data to transform.
 * @returns {Proyecto} The full project object with repositories, database, and other project details.
 */
export function adaptProject(project: Partial<ProyectoService>): Proyecto {
  const repos = project.repositorios ?? [];

  const repositoriosAsignados =
    project.tipo_proyecto === "M"
      ? repos[0]
        ? { integrado: adaptRepository(repos[0]) }
        : undefined
      : {
          ...(repos[0] ? { frontend: adaptRepository(repos[0]) } : {}),
          ...(repos[1] ? { backend: adaptRepository(repos[1]) } : {}),
        };

  return {
    baseDeDatos: adaptDataBase({ ...project.base_de_datos, proyecto: null }),
    descripcion: project.descripcion ?? "",
    integrantes: (project.estudiantes) ?? [],
    fav_usuarios: project.fav_usuarios?.map((x) => x.id) ?? [],
    materiaInformacion: {
      cursoId: project.seccion?.curso?.id ?? "1",
      materiaId: project.seccion?.curso?.materia?.id ?? 1,
      seccionId: project.seccion?.id ?? 1,
    },
    titulo: project.titulo ?? "",
    tipo: project.tipo_proyecto === "M" ? "M" : "S",
    url: project.url ?? "",
    id: project.id,
    estadoDeEjecucion: (project.estado_ejecucion as Proyecto["estadoDeEjecucion"]) ?? "E",
    estadoDeProyecto: (project.estado_proyecto as Proyecto["estadoDeProyecto"]) ?? "A",
    propietario: project.creador,
    ...repositoriosAsignados,
  };
}

/**
 * adaptRepository – Transforms a repository service object into a full repository object, extracting information like technology, version, environment variables, and Docker data.
 * 
 * @param {RepositorioService} repository - The repository service data to transform.
 * @returns {Repositorio} The full repository object with all relevant data.
 */
export function adaptRepository(repository: RepositorioService): Repositorio {
  return {
    tecnologyToShow: (repository.tecnologia ?? "") + ":" + (repository.version ?? ""),
    variables: !repository.variables_de_entorno ? "" : repository.variables_de_entorno,
    url: repository.url ?? "",
    tipo: (repository.tipo as Repositorio["tipo"]) ?? "I",
    docker: { version: repository.version ?? "", tecnologia: repository.tecnologia ?? "", framework : repository.framework ?? ''},
    id: repository.id ?? -1,
  };
}
