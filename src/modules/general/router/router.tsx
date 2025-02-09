import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import LayoutContentCenter from "../layouts/center";
import CambiarContrasenia from "../pages/cambiarContrasenia";
import Registrar from "../pages/registro";

export const rutaBase = "/";

export enum rutasGeneral {
  home = rutaBase,
  login = rutaBase + "login",
  recuperar = rutaBase + "recuperar",
  registrar = rutaBase + "registrar",
}

export const routerGeneral: RouteObject = {
  path: "/",
  element: <LayoutContentCenter />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: "/",
      element: <Home />, // Página principal
    },
    {
      path: "login",
      element: <Login />, // Página de login
    },
    {
      path: "recuperar",
      element: <CambiarContrasenia />, // Página de login
    },
    {
      path: "registrar",
      element: <Registrar />, // Página de login
    },
  ],
};
