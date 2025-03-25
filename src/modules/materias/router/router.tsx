import { RouteObject } from "react-router-dom";
// import ListarMaterias from "../pages/listar";
import ListarMaterias from "../pages/listar";
import ListarCursos from "../pages/listar/id";
import VerInformacionCurso from "../pages/listar/id/id";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  listar = rutaBase + "/listar",
  crear = rutaBase + "/crear",
  verCursos = rutaBase + "/:id/cursos",
  verInformacionCursos = rutaBase + "/curso/:id",
}

export const routerMaterias: RouteObject[] = [
  {
    path: rutasMaterias.listar,
    element: <ListarMaterias />,
  },
  {
    path: rutasMaterias.verCursos,
    element: <ListarCursos />,
  },
  {
    path: rutasMaterias.verInformacionCursos,
    element: <VerInformacionCurso />,
  },
];
