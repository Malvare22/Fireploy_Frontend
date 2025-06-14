import { BASE_PATH } from "@modules/general/router/basePath";

const rutaBase = BASE_PATH.AUTH + "/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  listarMaterias = rutaBase + "/listar",
  listarCursos = rutaBase + '/:idMateria/cursos/listar',
  listarMisCursos = rutaBase + '/misCursos',
  verCurso = rutaBase + "/cursos/:idCurso",
  crearCurso = rutaBase + "/cursos/crear/:idMateria",
  editarCurso = rutaBase + "/cursos/editar/:idCurso",
  crearMateria = rutaBase + '/crear',
  editarMateria = rutaBase + '/editar/:idMateria',
  explorarCursos = rutaBase + '/explorar/:idMateria/cursos',
  solicitudes = rutaBase + '/solicitudes',
  proyectosDeMisEstudiantes = rutaBase + '/proyectosEstudiantes'
}