import { createBrowserRouter } from "react-router-dom";
import Test from "../../modules/general/pages/index/index";
import PreLogin from "../../modules/general/layouts/prelogin";
import Register from "../../modules/general/pages/register";
import Generic from "../../modules/general/layouts/generic";
import ForgetPassword from "../../modules/general/pages/forgetPassword";
import Login from "../../modules/general/layouts/login";
import MyProjects from "../../modules/projects/pages/myProjects";
import Profile from "../../modules/users/pages/profile";
import StudentList from "../../modules/users/pages/students";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <PreLogin><Test></Test></PreLogin>,
      
    },
    {
      path: "/register",
      element: <PreLogin><Register></Register></PreLogin>,
      
    },
    {
      path: "/forgetPassword",
      element: <PreLogin><Generic title="Recuperar Contraseña"><ForgetPassword/></Generic></PreLogin>,
      
    },
    {
      path: "/myProjects",
      element: <Login><Generic title="Mis Proyectos Desplegados"><MyProjects/></Generic></Login>,
      
    },
    {
      path: "/myProfile",
      element: <Login><Generic title="Mi Perfil"><Profile ableToEdit={true}/></Generic></Login>,
      
    },
    {
      path: "/students",
      element: <Login><Generic title="Estudiantes"><StudentList/></Generic></Login>,
      
    },
    
  ]);