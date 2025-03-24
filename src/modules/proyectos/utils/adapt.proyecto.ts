import { getImage } from "@modules/general/components/roundedIcon/utils";
import { ProyectoCard } from "../types/proyecto.card";
import { ProyectoService } from "../types/proyecto.service";
import { BaseDeDatosProyecto, EstadoEjecucionProyecto } from "../types/proyecto.tipo";

export function adaptaProyectoService(proyecto: ProyectoService): ProyectoCard{
    return {
        calificador: {
            foto: proyecto.tutor.foto_perfil,
            id: proyecto.tutor.id.toString(),
            nombres: proyecto.tutor.nombre + ' ' + proyecto.tutor.apellido,
            logros: [],
            rol: ''
        },
        backend: {nombre: 'Angular', imagen: 'angular'},
        frontend: {nombre: 'NodeJS', imagen: 'nodejs'},
        dataBase: {nombre: '', imagen: proyecto.base_de_datos.tipo as BaseDeDatosProyecto['tipo'] == 'N' ? 'mongodb' : 'mysql'},
        descripcion: proyecto.descripcion,
        imagen: proyecto.imagen ?? getImage['defaultProjectImage'].ruta,
        estado: proyecto.estado_proyecto as EstadoEjecucionProyecto,
        puntuacion: proyecto.calificacion,
        grupo: 'TEST',
        materia: 'TEST',
        seccion: proyecto.seccion.id.toString(),
        titulo: proyecto.titulo,
        semestre: '2025-1',
        integrantes: proyecto.estudiantes.map(element => {return {foto: element.foto_perfil, id: element.id.toString(), logros: [], nombres: element.nombre + ' ' +element.apellido, rol: element.tipo}}),

        
    }
};