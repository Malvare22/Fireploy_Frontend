import { getImage } from "@modules/general/utils/getImage";
import { ProyectoCard } from "../types/proyecto.card";
import { ProyectoService, RepositorioService } from "../types/proyecto.service";
import { EstadoEjecucionProyecto, Proyecto } from "../types/proyecto.tipo";
import { Repositorio, VariableDeEntorno } from "../types/repositorio";

// export function adaptaProyectoService(proyecto: ProyectoService): ProyectoCard {
//   return {
//     calificador: {
//       foto: proyecto.tutor.foto_perfil ?? "",
//       id: proyecto.tutor.id.toString(),
//       nombres: proyecto.tutor.nombre + " " + proyecto.tutor.apellido,
//       logros: [],
//       rol: "",
//     },
//     backend: { nombre: "Angular", imagen: "angular" },
//     frontend: { nombre: "NodeJS", imagen: "nodejs" },
//     dataBase: {
//       nombre: "",
//       imagen:
//         (proyecto.base_de_datos.tipo as BaseDeDatosProyecto["tipo"]) == "N" ? "mongodb" : "mysql",
//     },
//     descripcion: proyecto.descripcion,
//     imagen: proyecto.imagen ?? getImage["defaultProjectImage"].ruta,
//     estado: proyecto.estado_proyecto as EstadoEjecucionProyecto,
//     puntuacion: proyecto.calificacion,
//     grupo: "TEST",
//     materia: "TEST",
//     seccion: proyecto.seccion.id.toString(),
//     titulo: proyecto.titulo,
//     semestre: "2025-1",
//     integrantes: proyecto.estudiantes.map((element) => {
//       return {
//         foto: element.foto_perfil || "",
//         id: element.id.toString(),
//         logros: [],
//         nombres: element.nombre + " " + element.apellido,
//         rol: element.tipo ?? "E",
//       };
//     }),
//   };
// }

export function adaptProject(project: ProyectoService): Proyecto {
  console.log(project)
  return {
    baseDeDatos: project.base_de_datos,
    descripcion: project.descripcion,
    integrantes: project.estudiantes,
    materiaInformacion: {
      cursoId: project.seccion.curso.id,
      materiaId: project.seccion.curso.materia.id,
      seccionId: project.seccion.id,
    },
    titulo: project.titulo,
    tipo: project.tipo_proyecto != "M" ? "M" : "D",
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
  };
}

export function adaptRepository(repository: RepositorioService): Repositorio {
  return {
    dockerText: repository.tecnologia + ":" + repository.version,
    variables: JSON.parse(repository.variables_de_entorno ?? '{}') as VariableDeEntorno[] ?? {},
    url: repository.url ?? "",
    tipo: (repository.tipo as Repositorio["tipo"]) ?? "I",
    docker: { tag: repository.version ?? "", tecnologia: repository.tecnologia ?? "" },
    proyectoId: repository.proyecto,
  };
}
