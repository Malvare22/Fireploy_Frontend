import LayoutStandard from "@modules/general/layouts/standard";
import { RouteObject } from "react-router-dom";
// import ListarMaterias from "../pages/listar";
import EditarMateria from "../pages/editar";
import CrearMateria from "../pages/ver";

export const rutaBase = "/materias";

export enum rutasMaterias {
  listar = rutaBase + "/listar",
  crear = rutaBase + '/crear',
  editar = rutaBase + '/editar/:id'
}

export const routerMaterias: RouteObject = {
  path: rutaBase,
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    // {
    //   path: rutasMaterias.listar,
    //   element: <ListarMaterias/>, // Página principal
    // },
    {
      path: rutasMaterias.editar,
      element: <EditarMateria/>
    },
    {
      path: rutasMaterias.crear,
      element: <CrearMateria/>
    },
  ],
};
