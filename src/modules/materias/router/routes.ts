const rutaBase = "/app/materias";

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