import { RouteObject } from "react-router-dom";
import ListarUsuarios from "../pages/listar";
import Perfil from "../pages/perfil";
import PerfilPorId from "../pages/id";
import VerPortafolioPorId from "../pages/portafolio";

const rutaBase = "/usuarios";

export const rutasUsuarios = {
  rutaBase: rutaBase + "/usuarios",
  perfil: rutaBase + "/perfil",
  verPerfilPorId: rutaBase + "/perfil/:id",
  listar: rutaBase + "/listar",
  verPortafolio: rutaBase + "/portafolio/:id"
};

export const routerUsuarios: RouteObject[] = [
  {
    path: rutasUsuarios.perfil,
    element: <Perfil />, // Página principal
  },
  {
    path: rutasUsuarios.verPerfilPorId,
    element: <PerfilPorId />, // Ver perfil estudiante
  },
  {
    path: rutasUsuarios.listar,
    element: <ListarUsuarios />,
  },
  {
    path: rutasUsuarios.verPortafolio,
    element: <VerPortafolioPorId/>,
  },
];