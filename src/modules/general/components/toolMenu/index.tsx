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
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate, useLocation } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasProyectos } from "@modules/proyectos/router";
import { AccountContext } from "@modules/general/context/accountContext";

const navigationStudent: Navigation = [
  {
    title: "Perfil",
    icon: <AccountCircleIcon />,
    children: [
      {
        segment: rutasUsuarios.perfil as string,
        title: "Configurar Perfil",
        icon: <ManageAccountsIcon />,
      },
      {
        segment: rutasUsuarios.logout as string,
        title: "Cerrar Sesión",
        icon: <PowerSettingsNewIcon />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    segment: rutasMaterias.explorar as string,
    title: "Materias",
    icon: <MenuBookIcon />,
  },
  {
    segment: rutasProyectos.listar as string,
    title: "Proyectos",
    icon: <AccountTreeIcon />,
  },
  {
    segment: rutasUsuarios.explorarPortafolios as string,
    title: "Portafolios",
    icon: <ContactMailIcon />,
  },
];

const navigationAdmin: Navigation = [
  {
    title: "Perfil",
    icon: <AccountCircleIcon />,
    children: [
      {
        segment: rutasUsuarios.perfil as string,
        title: "Configurar Perfil",
        icon: <ManageAccountsIcon />,
      },
      {
        segment: rutasUsuarios.logout as string,
        title: "Cerrar Sesión",
        icon: <PowerSettingsNewIcon />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    segment: rutasMaterias.explorar as string,
    title: "Materias",
    icon: <MenuBookIcon />,
  },
  {
    segment: rutasProyectos.listar as string,
    title: "Proyectos",
    icon: <AccountTreeIcon />,
  },
  {
    segment: rutasUsuarios.explorarPortafolios as string,
    title: "Portafolios",
    icon: <ContactMailIcon />,
  },
  {
    kind: "divider",
  },
  {
    title: "Usuarios",
    icon: <SupervisedUserCircleIcon />,
    children: [
      {
        segment: rutasUsuarios.listarUsuarios as string,
        title: 'Listar Usuarios',
        icon: <PeopleIcon/>
      },
      {
        segment: rutasUsuarios.agregarUsuario as string,
        title: 'Agregar Usuario',
        icon: <GroupAddIcon/>
      }
    ]
  },
];

function useDemoRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Solo redirige si la ruta no comienza con /app y no es la raíz
    if (location.pathname !== "/" && !location.pathname.startsWith("/app")) {
      navigate("/app" + location.pathname, { replace: true });
    }
  }, [location.pathname, navigate]);

  return {
    pathname: location.pathname.startsWith("/app")
      ? location.pathname
      : `/app${location.pathname}`,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => {
      const pathStr = String(path);
      navigate(pathStr.startsWith("/app") ? pathStr : `/app${pathStr}`);
    },
  };
}

export default function DashboardLayoutBasic(props: any) {
  const router = useDemoRouter();

  // Remove this const when copying and pasting into your project.

  const theme = useTheme();

  const { localUser } = React.useContext(AccountContext);

  return (
    <>
      { 
        localUser?.tipo && 
        <AppProvider
          navigation={localUser.tipo == 'A' ? navigationAdmin : navigationStudent}
          router={router}
          theme={theme}
          branding={{
            logo: (
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <RocketLaunchIcon sx={{ fontSize: 32 }} />
              </Box>
            ),
            title: "FIREPLOY",
            homeUrl: "/toolpad/core/introduction",
          }}
        >
          <DashboardLayout
            sx={{
              "& .MuiListSubheader-root": {
                fontSize: "4rem",
              },
            }}
          >
            <Box marginTop={-10}>{props.children}</Box>
          </DashboardLayout>
        </AppProvider>
      }
    </>
  );
}
