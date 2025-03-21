// import { RouteObject } from "react-router-dom";
// import ListarUsuarios from "../pages/listar";
// import Perfil from "../pages/perfil";
// import PerfilPorId from "../pages/id";
// import VerPortafolioPorId from "../pages/portafolio";
// import LayoutStandard from "@modules/general/layouts/standard";
// import BuscarPortafolio from "../pages/buscarPortafolio";

import { RouteObject } from "react-router-dom";
import VistaPerfil from "../pages/perfil";

const rutaBase = "/app/usuarios";

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
  children: [
    {
      path: rutasUsuarios.perfil,
      element: <VistaPerfil />, // Página principal
    },
    
  ]
};

