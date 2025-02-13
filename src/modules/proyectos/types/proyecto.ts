import { ArchivoLog } from "./archivoLog.tipo";
import { BaseDeDatosProyecto } from "./proyecto.baseDeDatos";
import { EstadoProyecto } from "./proyecto.estado";
import { EstadoEjecucionProyecto } from "./proyecto.estadoEjecucion";
import { RepositorioProyecto } from "./proyecto.repositorio";

type MateriaInformacion = {
    materia: number,
    curso: string,
    seccion: string
};

export type Proyecto = {
    id: number,
    titulo: string,
    descripcion: string,
    calificacion: number,
    imagen: string,
    url: string,
    estadoDeEjecucion: EstadoEjecucionProyecto,
    estadoDeProyecto: EstadoProyecto,
    baseDeDatos: BaseDeDatosProyecto,
    repositorios: RepositorioProyecto[],

    numeroDeCapas: number;
    archivosLogs: ArchivoLog[],
    materiaInformacion: MateriaInformacion,
    fechaUltimaModificacion: string;

};
