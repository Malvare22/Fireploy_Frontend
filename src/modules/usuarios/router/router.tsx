import { RouteObject } from "react-router-dom";
import ListarUsuarios from "../pages/listar";
import Perfil from "../pages/perfil";
import PerfilPorId from "../pages/id";
import VerPortafolioPorId from "../pages/portafolio";
import LayoutStandard from "@modules/general/layouts/standard";
import BuscarPortafolio from "../pages/buscarPortafolio";

const rutaBase = "/usuarios";

export enum rutasUsuarios{
  perfil = rutaBase + "/perfil",
  verPerfilPorId = rutaBase + "/perfil/:id",
  listar = rutaBase + "/listar",
  verPortafolio = rutaBase + "/portafolios/:id",
  buscarPortafolio = rutaBase + "/portafolios"
};

export const routerUsuarios: RouteObject = 
{
  path: rutaBase,
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: rutasUsuarios.perfil,
      element: <Perfil />, // Página principal
    },
    // {
    //   path: rutasUsuarios.verPerfilPorId,
    //   element: <PerfilPorId />, // Ver perfil estudiante
    // },
    // {
    //   path: rutasUsuarios.listar,
    //   element: <ListarUsuarios />,
    // },
    // {
    //   path: rutasUsuarios.verPortafolio,
    //   element: <VerPortafolioPorId/>,
    // },
    // {
    //   path: rutasUsuarios.buscarPortafolio,
    //   element: <BuscarPortafolio/>,
    // }
  ]
};

