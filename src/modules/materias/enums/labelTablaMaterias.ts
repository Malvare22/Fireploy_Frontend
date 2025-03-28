import { obtenerEstadoMateria } from "../utils/map.materias";

export enum labelTablaMaterias{
    idMateria = 'Id Materia',
    nombre = 'Nombre',
    estado = 'Estado',
    cantidadCursos = 'Cursos Activos',
    semestre = 'Semestre',
    acciones = 'Acciones',
    noDispone = 'No dispone'
}

// export const labelAvisoCambioEstadoMateria = (nombre: string, estado: EstadoMateria) => {
//     const _estado = estado == 'A' ? obtenerEstadoMateria.get('I') : obtenerEstadoMateria.get('A');
//     return `¿Está seguro de que desea modificar el estado de la materia: ${nombre} a ${_estado}?`;
// };

// export const labelAvisoCambioEstadoCurso = (nombre: string, estado: EstadoCurso) => {
//     const _estado = estado == 'A' ? obtenerEstadoMateria.get('I') : obtenerEstadoMateria.get('A');
//     return `¿Está seguro de que desea modificar el estado del curso: ${nombre} a ${_estado}?`;
// };