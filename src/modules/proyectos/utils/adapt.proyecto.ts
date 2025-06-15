import { ProyectoCard, RepositoryForCard } from "../types/proyecto.card";
import { ProyectoService, RepositorioService } from "../types/proyecto.service";
import { Proyecto } from "../types/proyecto.tipo";
import { Repositorio } from "../types/repositorio";
import { adaptDataBase } from "./adaptDataBase";
import { removeImageBuffer } from "@modules/general/utils/removeImageBuffer";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { EstadoUsuario } from "@modules/usuarios/types/usuario";
import { isTechnologyKey, TECNOLOGIES } from "./technologies";
import { KeysOfRepository } from "../types/keysOfRepository";
import { getDataBaseTypesMap } from "./database";
import { Fichero, FicheroService } from "../types/fichero";

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
 * Transforms a complete `Proyecto` object into a simplified `ProyectoCard` format used for UI presentation.
 *
 * Extracts basic project metadata (title, description, image), team members (including owner),
 * repository URLs/frameworks, database type (when applicable), and other display-friendly attributes.
 *
 * @param {Proyecto} proyecto - The complete project data to convert.
 * @returns {ProyectoCard} A simplified object ready to be rendered in a project card UI component.
 */
export function adaptProjectToCard(proyecto: Proyecto): ProyectoCard {
  const getRepository = (field: KeysOfRepository): RepositoryForCard | undefined => {
    const framework = proyecto[field]?.informacion?.framework;
    const url = proyecto[field]?.url;
    if (!framework || !url) return undefined;
    else return { framework, url };
  };

  const integrantes = [...(proyecto.integrantes ?? [])];
  if (proyecto.propietario) integrantes.push(proyecto.propietario);

  return {
    id: proyecto.id || 0,
    titulo: proyecto.titulo,
    descripcion: proyecto.descripcion ?? "",
    imagen: !proyecto.imagen || proyecto.imagen.trim().length == 0 ? null : proyecto.imagen,
    integrantes: integrantes,
    frontend: getRepository("frontend"),
    backend: getRepository("backend"),
    integrado: getRepository("integrado"),
    dataBase: proyecto.baseDeDatos && proyecto.baseDeDatos.tipo != 'E' ? getDataBaseTypesMap.get(proyecto.baseDeDatos.tipo) : null,
    fav_usuarios: proyecto.fav_usuarios ?? [],
    materia: proyecto.materiaInformacion.nombre || "N/A",
    grupo: proyecto.materiaInformacion?.cursoId?.toString() || "N/A",
    estado: proyecto.estadoDeEjecucion || "E",
    url: proyecto.url,
    puntuacion: (proyecto.fav_usuarios ?? []).length
  };
}

/**
 * Converts a partial `ProyectoService` object (typically from an API response) into a full `Proyecto` object.
 *
 * Handles adaptation of database, repositories (single or modular type), participants, owner,
 * academic info, and project status.
 *
 * @param {Partial<ProyectoService>} project - The incoming project data from backend or service.
 * @returns {Proyecto} A fully typed and structured `Proyecto` object for internal use.
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
      nombre: project.seccion?.curso?.materia?.nombre ?? ''
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
 * Determines the appropriate MIME type based on the file extension of the given filename.
 *
 * Used for Blob/File creation when decoding Base64 data into binary files.
 *
 * @param {string} fileName - The full filename (e.g., "report.pdf").
 * @returns {string} The corresponding MIME type (e.g., "application/pdf").
 */
function getMimeTypeFromExtension(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "json":
      return "application/json";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    default:
      return "application/octet-stream"; // binario genérico
  }
}

/**
 * Converts a `FicheroService` object (with Base64 content) into a usable `Fichero` object with a `File` instance.
 *
 * Handles Base64 decoding and MIME type inference based on file extension.
 * Returns a `null` content field if the decoding fails.
 *
 * @param {FicheroService} f - The file object with Base64 content from the backend.
 * @returns {Fichero} A front-end compatible file object with proper metadata and binary content.
 */
export function adaptFichero(f: FicheroService): Fichero {
  try {
    const binaryData = atob(f.contenido); // Decodifica Base64 a binario (string)
    const byteArray = Uint8Array.from(binaryData, c => c.charCodeAt(0)); // Convierte a array de bytes

    const fileName = f.nombre;
    const mimeType = getMimeTypeFromExtension(fileName);

    const blob = new Blob([byteArray], { type: mimeType });

    const file = new File([blob], fileName, {
      type: mimeType,
      lastModified: Date.now(),
    });

    return {
      contenido: file,
      nombre: f.nombre,
      id: f.id ?? -1,
    };
  } catch (error) {
    console.error("Error al adaptar fichero:", error);
    return {
      nombre: f.nombre,
      id: f.id ?? -1,
      contenido: null,
    };
  }
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
  return {
    variables: !repository.variables_de_entorno ? "" : repository.variables_de_entorno,
    url: repository.url ?? "",
    tipo: (repository.tipo as Repositorio["tipo"]) ?? "I",
    informacion: {
      framework: isTechnologyKey(framework) ? TECNOLOGIES[framework] : null,
      tecnologia: isTechnologyKey(tecnologia) ? TECNOLOGIES[tecnologia] : null,
    },
    id: repository.id ?? -1,
    ficheros: repository.ficheros?.map(adaptFichero)
  };

}
