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
import { AccountContext } from "@modules/general/context/accountContext";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

/**
 * Navigation menu configuration for **Student users**.
 */
const navigationStudent: Navigation = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    children: [
      { segment: rutasUsuarios.perfil as string, title: "Edit Profile", icon: <ManageAccountsIcon /> },
      { segment: rutasUsuarios.logout as string, title: "Logout", icon: <PowerSettingsNewIcon /> },
    ],
  },
  { kind: "divider" },
  { segment: rutasMaterias.explorar as string, title: "Subjects", icon: <MenuBookIcon /> },
  { segment: rutasProyectos.listar as string, title: "Projects", icon: <AccountTreeIcon /> },
  { segment: rutasUsuarios.explorarPortafolios as string, title: "Portfolios", icon: <ContactMailIcon /> },
];

/**
 * Navigation menu configuration for **Admin users**.
 */
const navigationAdmin: Navigation = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    children: [
      { segment: rutasUsuarios.perfil as string, title: "Edit Profile", icon: <ManageAccountsIcon /> },
      { segment: rutasUsuarios.logout as string, title: "Logout", icon: <PowerSettingsNewIcon /> },
    ],
  },
  { kind: "divider" },
  { segment: rutasUsuarios.explorarPortafolios as string, title: "Portfolios", icon: <ContactMailIcon /> },
  { kind: "divider" },
  {
    title: "Users",
    icon: <SupervisedUserCircleIcon />,
    children: [
      { segment: rutasUsuarios.listarUsuarios as string, title: "List Users", icon: <PeopleIcon /> },
      { segment: rutasUsuarios.agregarUsuario as string, title: "Add User", icon: <GroupAddIcon /> },
      { segment: rutasUsuarios.solicitudes as string, title: "Teacher Role Requests", icon: <CastForEducationIcon /> },
    ],
  },
  {
    title: "Projects",
    icon: <AccountTreeIcon />,
    children: [
      { segment: rutasProyectos.listar as string, title: "Explore Projects", icon: <AccountTreeIcon /> },
      { segment: rutasProyectos.repositorios as string, title: "Repositories", icon: <GitHubIcon /> },
      { segment: rutasProyectos.basesDeDatos as string, title: "Databases", icon: <StorageIcon /> },
    ],
  },
  {
    title: "Subjects",
    icon: <MenuBookIcon />,
    children: [
      { segment: rutasMaterias.explorar as string, title: "Explore", icon: <AutoStoriesIcon /> },
      { segment: rutasMaterias.listarMaterias as string, title: "List", icon: <CollectionsBookmarkIcon /> },
      { segment: rutasMaterias.crearMateria as string, title: "Create", icon: <BookmarkAddIcon /> },
    ],
  },
];

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
      {localUser?.tipo && (
        <AppProvider
          navigation={localUser.tipo == "A" ? navigationAdmin : navigationStudent}
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
