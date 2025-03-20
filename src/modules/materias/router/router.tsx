import LayoutStandard from "@modules/general/layouts/auth";
import { RouteObject } from "react-router-dom";
// import ListarMaterias from "../pages/listar";
import ListarMaterias from "../pages/listar";
import ListarCursos from "../pages/listar/id";

export const rutaBase = "/app/materias";

export enum rutasMaterias {
  listar = rutaBase + "/listar",
  crear = rutaBase + '/crear',
  verCursos = rutaBase + '/listar/:id'
};

export const routerMaterias: RouteObject = {
  path: rutaBase,
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: rutasMaterias.listar,
      element: <ListarMaterias/>
    },
    {
      path: rutasMaterias.verCursos,
      element: <ListarCursos/>
    },

  ],
};
