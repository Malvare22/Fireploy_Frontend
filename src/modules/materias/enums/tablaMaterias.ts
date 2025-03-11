import { EstadoMateria } from "../types/materia.estado";
import { obtenerEstadoMateria } from "../utils/map.materias";

export enum labelTablaMaterias{
    idMateria = 'Id Materia',
    nombre = 'Nombre',
    cursos = 'Cursos',
    semestre = 'Semestre',
    acciones = 'Acciones',
    confirmarHabilitar = '¿Está seguro de que desea habilitar esta materia?',
    confirmarDeshabilitar = '¿Está seguro de que desea deshabilitar esta materia?',
    cambiarEstado = 'Cambiar Estado de Materia'
}

export const labelAvisoCambioEstadoMateria = (nombre: string, estado: EstadoMateria) => {
    const _estado = estado == 'A' ? obtenerEstadoMateria.get('I') : obtenerEstadoMateria.get('A');
    return `¿Está seguro de que desea modificar el estado de la materia: ${nombre} a ${_estado}?`;
}