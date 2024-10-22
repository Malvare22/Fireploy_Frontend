import Generic from "@modules/general/layouts/generic";
import Login from "@modules/general/layouts/login";
import PreLogin from "@modules/general/layouts/prelogin";
import ForgetPassword from "@modules/general/pages/forgetPassword";
import Index from "@modules/general/pages/index/index";
import Register from "@modules/general/pages/register";
import MyProjects from "@modules/projects/pages/myProjects";
import GroupSections from "@modules/subjects/pages/group/sections";
import GroupStudents from "@modules/subjects/pages/group/students";
import SubjectsList from "@modules/subjects/pages/subjects";
import ViewProfile from "@modules/users/components/viewProfiel";
import StudentList from "@modules/users/pages/students";
import TeachersList from "@modules/users/pages/teachers";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PreLogin>
        <Index></Index>
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
          <TeachersList />
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
  {
    path: "/subjects",
    element: (
      <Login>
        <Generic title="Materias">
          <SubjectsList/>
        </Generic>
      </Login>
    ),
  },
  {
    path: "/subjects/students",
    element: (
      <Login>
        <GroupStudents/>
      </Login>
    ),
  },
  {
    path: "/subjects/sections",
    element: (
      <Login>
        <GroupSections/>
      </Login>
    ),
  },
]);
