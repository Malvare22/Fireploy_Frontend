import LayoutBasic from "@modules/general/layouts/basic";
import ChangePassword from "@modules/general/pages/changePassword";
import Home from "@modules/general/pages/home";
import Login from "@modules/general/pages/login";
import Register from "@modules/general/pages/register";
import MyProjects from "@modules/projects/pages/myProjects/all";
import ViewProject from "@modules/projects/pages/myProjects/test";
import React, { createContext, useContext, useState } from "react";
import { createBrowserRouter } from "react-router-dom";

const TC = createContext<{value: string, setValue: React.Dispatch<string>} | undefined>(undefined);

const Test = () => {
  const [value, setValue] = useState('');
  
  return<TC.Provider value={{value: value, setValue: setValue}}>
    <Son></Son>
    <Sibling value={value} setValue={setValue}></Sibling>
  </TC.Provider>;
};

const Son = () => {

  const context = useContext(TC);

  if(!context) return <></>;

  const { value, setValue } = context;

  return <>
        <Sibling value={value} setValue={setValue}></Sibling>

  </>;
}

const Sibling : React.FC<{value: string, setValue: React.Dispatch<string>}> = ({value, setValue}) => {


  return <>
    <input value={value} onChange={(e) => setValue(e.currentTarget.value)}>
    </input>
  </>;
}

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
      {
        path: "recovery",
        element: <ChangePassword />,
      },
      {
        path: "myProjects/all",
        element: <MyProjects />,
      },
      {
        path: "myProjects/view/:id",
        element: <ViewProject />,
      },
      {
        path: "test",
        element: <Test/>
      }
    ],
  },
]);


