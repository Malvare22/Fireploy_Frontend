import * as React from "react";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box, useTheme } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasProyectos } from "@modules/proyectos/router";
import { AccountContext, AccountInformation } from "@modules/general/context/accountContext";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { BoxesIcon, PersonLinesFillIcon } from "../customIcons";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

/**
 * Mi perfil y cerrar sesión X
 * Portafolios (Explorar y Mi Portafolio) X
 * Proyectos (Mis Proyectos (Mis Repos y Bases de datos), explorar proyectos), solicitudes integración (GENERAL) X
 * Materias (Cursos (Mis Cursos, Explorar Cursos)), listar materias y crear materias
 * Usuarios (Solicitudes, listar usuarios, y crear usuario) X
 */
function getNavigationElements(userInformation: AccountInformation): Navigation {
  return [
    {
      title: "Perfil",
      icon: <AccountCircleIcon />,
      children: [
        {
          segment: rutasUsuarios.perfil as string,
          title: "Editar Perfil",
          icon: <ManageAccountsIcon />,
        },
        {
          segment: rutasUsuarios.logout as string,
          title: "Cerrar Sesión",
          icon: <PowerSettingsNewIcon />,
        },
      ],
    },
    { kind: "divider" },
    {
      title: "Portfolios",
      icon: <ContactMailIcon />,
      children: [
        {
          segment: rutasUsuarios.portafolio.replace(":id", userInformation.id.toString()) as string,
          title: "Mi Portafolio",
          icon: <PersonLinesFillIcon sx={{color:'black'}}/>,
        },
        {
          segment: rutasUsuarios.explorarPortafolios as string,
          title: "Explorar Portafolios",
          icon: <PersonSearchIcon />,
        },
      ],
    },
    ...(userInformation.tipo == "A"
      ? [
          {
            title: "Usuarios",
            icon: <SupervisedUserCircleIcon />,
            children: [
              {
                segment: rutasUsuarios.listarUsuarios as string,
                title: "Listar Usuarios",
                icon: <PeopleIcon />,
              },
              {
                segment: rutasUsuarios.agregarUsuario as string,
                title: "Agregar Usuarios",
                icon: <GroupAddIcon />,
              },
              {
                segment: rutasUsuarios.solicitudes as string,
                title: "Solicitudes de promover rol",
                icon: <CastForEducationIcon />,
              },
            ],
          },
        ]
      : []),
    { kind: "divider" },
    {
      title: "Proyectos",
      icon: <AccountTreeIcon />,
      children: [
        {
          title: "Mis Proyectos",
          icon: <BoxesIcon />,
          children: [
            {
              segment: rutasProyectos.repositorios as string,
              title: "Repositorios",
              icon: <GitHubIcon />,
            },
            {
              segment: rutasProyectos.basesDeDatos as string,
              title: "Bases de Datos",
              icon: <StorageIcon />,
            },
          ],
        },
        {
          segment: rutasProyectos.listar as string,
          title: "Explorar Proyectos",
          icon: <PlagiarismIcon />,
        },
      ],
    },
    ...(userInformation.tipo != "A"
      ? [
          {
            title: "Cursos",
            icon: <MenuBookIcon />,
            children: [
              {
                segment: rutasMaterias.explorar as string,
                title: "Explorar Materias y Cursos",
                icon: <AutoStoriesIcon />,
              },
              {
                title: "Mis Cursos",
                icon: <LibraryBooksIcon />,
              },
            ],
          },
        ]
      : [
          {
            title: "Materias",
            icon: <MenuBookIcon />,
            children: [
              {
                segment: rutasMaterias.explorar as string,
                title: "Explorar Materias y Cursos",
                icon: <AutoStoriesIcon />,
              },
              {
                segment: rutasMaterias.listarMaterias as string,
                title: "Listar Materias",
                icon: <CollectionsBookmarkIcon />,
              },
              {
                segment: rutasMaterias.crearMateria as string,
                title: "Crear Materia",
                icon: <BookmarkAddIcon />,
              },
            ],
          },
        ]),
  ];
}

/**
 * Custom hook to manage the router logic for the **dashboard navigation**.
 *
 * @returns {Router} Custom router object with navigation handling.
 */
function useDemoRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Redirect to "/app" prefix if not already there
    if (location.pathname !== "/" && !location.pathname.startsWith("/app")) {
      navigate("/app" + location.pathname, { replace: true });
    }
  }, [location.pathname, navigate]);

  return {
    pathname: location.pathname.startsWith("/app") ? location.pathname : `/app${location.pathname}`,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => {
      const pathStr = String(path);
      navigate(pathStr.startsWith("/app") ? pathStr : `/app${pathStr}`);
    },
  };
}

/**
 * **Dashboard Layout Component**
 * Provides a structured layout for the dashboard, including:
 * - **Navigation** (Admin/Student based on user role)
 * - **Routing Management**
 * - **Theme Configuration**
 * - **User Authentication Context**
 *
 * @component
 * @param {any} props - Props including children components to render inside the layout.
 * @returns {JSX.Element} The structured **dashboard layout** with navigation and content.
 */
export default function DashboardLayoutBasic(props: any) {
  const router = useDemoRouter();
  const theme = useTheme();

  // Get the logged-in user data from context
  const { localUser } = React.useContext(AccountContext)!!;

  return (
    <>
      {localUser && (
        <AppProvider
          navigation={getNavigationElements(localUser)}
          router={router}
          theme={theme}
          branding={{
            logo: (
              <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                <RocketLaunchIcon sx={{ fontSize: 32 }} />
              </Box>
            ),
            title: "FIREPLOY",
            homeUrl: "/toolpad/core/introduction",
          }}
        >
          <DashboardLayout sx={{ "& .MuiListSubheader-root": { fontSize: "4rem" } }}>
            <Box marginTop={-10}>{props.children}</Box>
          </DashboardLayout>
        </AppProvider>
      )}
    </>
  );
}
