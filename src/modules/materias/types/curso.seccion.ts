import { Proyecto } from "@modules/proyectos/types/proyecto";

export type SeccionCurso = {
    id: string,
    titulo: string,
    descripcion: string,
    fechaDeCierre: string,
    fechaDeInicio: string,
    proyectos: Proyecto  
};