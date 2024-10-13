import { createBrowserRouter } from "react-router-dom";
import Test from "../../modules/general/pages/index/index";
import PreLogin from "../../modules/general/layouts/prelogin";
import Register from "../../modules/general/pages/register";
import Generic from "../../modules/general/layouts/generic";
import ForgetPassword from "../../modules/general/pages/forgetPassword";
import Login from "../../modules/general/layouts/login";
import MyProjects from "../../modules/projects/pages/myProjects";
import StudentList from "../../modules/users/pages/students";
import TeacherList from "../../modules/users/pages/teachers";
import ViewProfile from "../../modules/users/components/viewProfiel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PreLogin>
        <Test></Test>
      </PreLogin>
    ),
  },
  {
    path: "/register",
    element: (
      <PreLogin>
        <Register></Register>
      </PreLogin>
    ),
  },
  {
    path: "/forgetPassword",
    element: (
      <PreLogin>
        <Generic title="Recuperar Contraseña">
          <ForgetPassword />
        </Generic>
      </PreLogin>
    ),
  },
  {
    path: "/myProjects",
    element: (
      <Login>
        <Generic title="Mis Proyectos Desplegados">
          <MyProjects />
        </Generic>
      </Login>
    ),
  },
  {
    path: "/myProfile",
    element: <Login><Generic title="Mi Perfil"><ViewProfile isMine={true}/></Generic></Login>,

  },
  {
    path: "/students",
    element: (
      <Login>
        <Generic title="Estudiantes">
          <StudentList />
        </Generic>
      </Login>
    ),
  },
  {
    path: "/students/view",
    element: (
      <Login>
        <Generic title="Estudiante">
          <ViewProfile/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/students/edit",
    element: (
      <Login>
        <Generic title="Estudiante">
          <ViewProfile initEditing={true}/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/students/register",
    element: (
      <Login>
        <Generic title="Registrar Usuario">
          <ViewProfile toRegister={true} initEditing={true} rol={"E"}/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/teachers",
    element: (
      <Login>
        <Generic title="Docentes">
          <TeacherList />
        </Generic>
      </Login>
    ),
  },
  {
    path: "/teachers/view",
    element: (
      <Login>
        <Generic title="Docente">
          <ViewProfile/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/teachers/edit",
    element: (
      <Login>
        <Generic title="Docente">
          <ViewProfile initEditing={true}/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/teachers/register",
    element: (
      <Login>
        <Generic title="Registrar Usuario">
          <ViewProfile toRegister={true} initEditing={true} rol={"D"}/>
        </Generic>
      </Login>
    ),
  },
]);
