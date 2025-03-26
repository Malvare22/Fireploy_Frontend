import { RouteObject } from "react-router-dom";
import VerInformacionCurso from "../pages/explorar/id/id";
import ExplorarMaterias from "../pages/explorar";
import VerCursosMateria from "../pages/explorar/id";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  explorar = rutaBase + "/explorar",
  // verCursos = rutaBase + "/:id",
  // verInformacionCursos = rutaBase + "/:id",
}

export const routerMaterias: RouteObject[] = [
  {
    path: rutasMaterias.explorar,
    element: <ExplorarMaterias />,
  },
  // {
  //   path: rutasMaterias.verCursos,
  //   element: <VerCursosMateria />,
  // },
  // {
  //   path: rutasMaterias.verInformacionCursos,
  //   element: <VerInformacionCurso />,
  // },
];
