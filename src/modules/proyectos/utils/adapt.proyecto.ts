import { ProyectoCard } from "../types/proyecto.card";
import { ProyectoService, RepositorioService } from "../types/proyecto.service";
import { Proyecto } from "../types/proyecto.tipo";
import { Repositorio } from "../types/repositorio";
import { adaptDataBase } from "./adaptDataBase";
import { removeImageBuffer } from "@modules/general/utils/removeImageBuffer";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { EstadoUsuario } from "@modules/usuarios/types/usuario";
import { isTechnologyKey, TECNOLOGIES } from "./technologies";

// /**
//  * adaptUsuarioToPortafolioCard – Transforms a user object into a format compatible with a portfolio card, extracting ID, name, and photo.
//  *
//  * @param {any} usuario - The user object to transform.
//  * @returns {UsuarioPortafolioCard} The user data formatted as a portfolio card.
//  */
// const adaptUsuarioToPortafolioCard = (usuario: any): UsuarioPortafolioCard => ({
//   id: usuario.id,
//   nombres: usuario.nombre || usuario.nombres || "Usuario",
//   foto: usuario.imagen || "",
// });

/**
 * adaptProjectToCard – Transforms a project object into a format compatible with a project card, extracting essential data like title, description, image, and participant information. Also extracts frontend, backend, integrated repository frameworks, and database name.
 *
 * @param {Proyecto} proyecto - The project object to transform.
 * @returns {ProyectoCard} The project data formatted as a project card.
 */
export function adaptProjectToCard(proyecto: Proyecto): ProyectoCard {
  const integrantes = [...(proyecto.integrantes ?? [])];
  if (proyecto.propietario) integrantes.push(proyecto.propietario);
  return {
    id: proyecto.id || 0,
    titulo: proyecto.titulo,
    descripcion: proyecto.descripcion ?? "",
    imagen: proyecto.imagen ? proyecto.imagen : null,
    integrantes: integrantes,
    frontend: !proyecto.frontend ? null : proyecto.frontend?.informacion?.framework || "No especificado",
    backend: !proyecto.backend ? null : proyecto.frontend?.informacion?.framework || "No especificado",
    integrado: !proyecto.integrado
      ? null
      : proyecto.frontend?.informacion?.framework || "No especificado",
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

  const integrantes: UsuarioCurso[] = (project.estudiantes ?? []).map((x) => {
    return {
      id: x.id,
      nombre: `${x.nombre} ${x.apellido}`,
      imagen: x.foto_perfil ?? "",
      estado: x.estado as EstadoUsuario,
    };
  });

  return {
    baseDeDatos: adaptDataBase({ ...project.base_de_datos, proyecto: null }),
    descripcion: project.descripcion ?? "",
    integrantes: integrantes,
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
    imagen: !project.imagen ? null : removeImageBuffer(project.imagen),
    estadoDeEjecucion: (project.estado_ejecucion as Proyecto["estadoDeEjecucion"]) ?? "E",
    estadoDeProyecto: (project.estado_proyecto as Proyecto["estadoDeProyecto"]) ?? "A",
    propietario: {
      id: project.creador?.id ?? 0,
      nombre: `${project.creador?.nombre} ${project.creador?.apellido} `,
      imagen: project.creador?.foto_perfil ?? "",
      estado: project.creador?.estado as EstadoUsuario,
    },
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
  const tecnologia = repository.tecnologia ?? null;
  const framework = repository.framework ?? null;


  const out = {
    variables: !repository.variables_de_entorno ? "" : repository.variables_de_entorno,
    url: repository.url ?? "",
    tipo: (repository.tipo as Repositorio["tipo"]) ?? "I",
    informacion: {
      framework: isTechnologyKey(framework) ? TECNOLOGIES[framework] : null,
      tecnologia: isTechnologyKey(tecnologia) ? TECNOLOGIES[tecnologia] : null,
    },
    id: repository.id ?? -1,
  };

  return out;
}
