import LayoutBasic from "@modules/general/layouts/basic";
import Home from "@modules/general/pages/home";
import Login from "@modules/general/pages/login";
import Register from "@modules/general/pages/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutBasic />, // Usar el Layout para rutas que necesitan el Navbar
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
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
