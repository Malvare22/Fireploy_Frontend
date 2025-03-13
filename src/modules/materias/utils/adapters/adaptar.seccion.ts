import { SeccionCurso } from "@modules/materias/types/curso.seccion";
import { EstadoMateria } from "@modules/materias/types/materia.estado";
import { SeccionService } from "@modules/materias/types/seccion.services";

export function adaptarSeccionServiceASeccion(seccion: SeccionService): SeccionCurso{
    return {
        cursoId: seccion.cursoId,
        descripcion: seccion.descripcion,
        estado: seccion.estado as EstadoMateria,
        fechaDeCierre: seccion.fecha_fin,
        id: seccion.id,
        fechaDeInicio: seccion.fecha_inicio,
        titulo: seccion.titulo
    }
};
