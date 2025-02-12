import { Proyecto } from "@modules/proyectos/types/proyecto";
import { EdicionProyectoSchema } from "./proyecto.edicion.schema";

export const adaptarProyectoAEdicion = (
  proyecto: Proyecto
): EdicionProyectoSchema => {
  return {
    baseDeDatos: {
      tipo: proyecto.baseDeDatos.tipo,
    },
    calificacion: proyecto.calificacion,
    descripcion: proyecto.descripcion,
    estadoDeEjecucion: proyecto.estadoDeEjecucion,
    estadoDeProyecto: proyecto.estadoDeProyecto,
    id: proyecto.id,
    numeroCapas: proyecto.numeroDeCapas,
    repositorios: proyecto.repositorios.map((repo) => ({
      tecnologia: {
        nombre: repo.tecnologia.nombre,
        tipo: repo.tecnologia.tipo,
        version: repo.versionDeTecnologia,
        nombreVersion: `${repo.tecnologia.nombre} ${repo.versionDeTecnologia}`
      },
      tipo: repo.tipo,
      url: repo.url,
      variablesDeEntorno: repo.variablesDeEntorno,
    })),
    titulo: proyecto.titulo,
    url: proyecto.url,
    imagen: proyecto.imagen,
  };
};
