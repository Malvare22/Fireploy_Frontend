import { RouteObject } from "react-router-dom";
import VerInformacionCurso from "../pages/explorar/grupos/id";
import ExplorarMaterias from "../pages/explorar";
import VerCursosMateria from "../pages/explorar/grupos";
import ListarMaterias from "../pages/listarMaterias";
import ListarCursos from "../pages/listarCursos";
import VistaCrearMateria from "../pages/crearMateria";
import EditCourseView from "../pages/editarCurso";
import CreateCourseView from "../pages/crearCurso";
import ListarMisCursos from "../pages/misCursos";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  //verInformacionCursos = rutaBase + "/:id",
  listarMaterias = rutaBase + "/listar",
  listarCursos = rutaBase + '/:idMateria/cursos/listar',
  listarMisCursos = rutaBase + '/misCursos',
  verCurso = rutaBase + "/cursos/:idCurso",
  crearCurso = rutaBase + "/cursos/crear/:idMateria",
  editarCurso = rutaBase + "/cursos/editar/:idCurso",
  crearMateria = rutaBase + '/crear',
  editarMateria = rutaBase + '/editar/:idMateria',
  explorarCursos = rutaBase + '/explorar/:idMateria/cursos',
}

export const routerMaterias: RouteObject[] = [
  {
    path: rutasMaterias.explorar,
    element: <ExplorarMaterias />,
  },
  {
    path: rutasMaterias.listarMaterias,
    element: <ListarMaterias/>
  },
  {
    path: rutasMaterias.listarCursos,
    element: <ListarCursos/>
  },
  {
    path: rutasMaterias.listarMisCursos,
    element: <ListarMisCursos/>
  },
  {
    path: rutasMaterias.verCurso,
    element: <VerInformacionCurso />,
  },
  {
    path: rutasMaterias.editarCurso,
    element: <EditCourseView />,
  },
  {
    path: rutasMaterias.crearCurso,
    element: <CreateCourseView />,
  },
  {
    path: rutasMaterias.explorarCursos,
    element: <VerCursosMateria />,
  },

  {
    path: rutasMaterias.crearMateria,
    element: <VistaCrearMateria />,
  },
 

];
