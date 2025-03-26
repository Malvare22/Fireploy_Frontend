// import { RouteObject } from "react-router-dom";
// import ListarUsuarios from "../pages/listar";
// import Perfil from "../pages/perfil";
// import PerfilPorId from "../pages/id";
// import VerPortafolioPorId from "../pages/portafolio";
// import LayoutStandard from "@modules/general/layouts/standard";
// import BuscarPortafolio from "../pages/buscarPortafolio";

import { RouteObject } from "react-router-dom";
import VistaPerfil from "../pages/perfil";
import ListarPortafolios from "../pages/explorarPortafolios";
import Portafolio from "../components/portafolio";
import ListarUsuarios from "../pages/listar";

const rutaBase = "/app/usuarios";

export enum rutasUsuarios {
  perfil = rutaBase + "/perfil",
  explorarPortafolios = rutaBase + "/explorar",
  portafolio = rutaBase + "/portafolio/:id",
  listarUsuarios = rutaBase + "/listar"
}

export const routerUsuarios: RouteObject[] = [
  {
    path: rutasUsuarios.perfil,
    element: <VistaPerfil />,
  },
  {
    path: rutasUsuarios.explorarPortafolios,
    element: <ListarPortafolios />,
  },
  {
    path: rutasUsuarios.portafolio,
    element: <Portafolio/>
  },
  {
    path: rutasUsuarios.listarUsuarios,
    element: <ListarUsuarios/>
  }
];
