import { RouteObject } from "react-router-dom";
import VerInformacionCurso from "../pages/explorar/id/id";
import ExplorarMaterias from "../pages/explorar";
import VerCursosMateria from "../pages/explorar/id";
import ListarMaterias from "../pages/listarMaterias";
import ListarCursos from "../pages/listarCursos";
import VistaCrearMateria from "../pages/crearMateria";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  // verCursos = rutaBase + "/:id",
  verInformacionCursos = rutaBase + "/:id",
  listarMaterias = rutaBase + "/listar",
  listarCursos = rutaBase + '/cursos/listar',
  crearMateria = rutaBase + '/crear'
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
  // {
  //   path: rutasMaterias.verCursos,
  //   element: <VerCursosMateria />,
  // },
  {
    path: rutasMaterias.verInformacionCursos,
    element: <VerInformacionCurso />,
  },
  {
    path: rutasMaterias.crearMateria,
    element: <VistaCrearMateria />,
  },
];
