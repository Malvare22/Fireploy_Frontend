import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import LayoutStandard from "@modules/general/layouts/standard";

export const routerGeneral: RouteObject = {
  path: "/",
  element: <LayoutStandard />, // Usar el Layout para rutas que necesitan el Navbar
  children: [
    {
      path: "/",
      element: <Home />, // Página principal
    },
    {
      path: "login",
      element: <Login />, // Página de login
    },
  ],
};
