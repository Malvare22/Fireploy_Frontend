import { RouteObject } from "react-router-dom";
import VerInformacionCurso from "../pages/explorar/grupos/id";
import ExplorarMaterias from "../pages/explorar";
import VerCursosMateria from "../pages/explorar/grupos";
import ListarMaterias from "../pages/listarMaterias";
import ListarCursos from "../pages/listarCursos";
import VistaCrearMateria from "../pages/crearMateria";
import VistaEditarCurso from "../pages/editarCurso";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  //verInformacionCursos = rutaBase + "/:id",
  listarMaterias = rutaBase + "/listar",
  listarCursos = rutaBase + '/:idMateria/cursos/listar',
  verCurso = rutaBase + "/cursos/:idCurso",
  editarCurso = rutaBase + "/cursos/editar/:idCurso",
  crearMateria = rutaBase + '/crear',
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
    path: rutasMaterias.verCurso,
    element: <VerInformacionCurso />,
  },
  {
    path: rutasMaterias.editarCurso,
    element: <VistaEditarCurso />,
  },
  // {
  //   path: rutasMaterias.verCursos,
  //   element: <VerCursosMateria />,
  // },

  {
    path: rutasMaterias.crearMateria,
    element: <VistaCrearMateria />,
  },

];
