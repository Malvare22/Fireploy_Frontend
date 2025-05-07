import * as React from "react";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout, SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import { Box, Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";
import { rutasMaterias } from "@modules/materias/router/router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasProyectos } from "@modules/proyectos/router";
import { AccountInformation, useAuth } from "@modules/general/context/accountContext";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { BoxesIcon, JournalPlus, PersonLinesFillIcon } from "../customIcons";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Account, AccountPreview, AccountPreviewProps } from "@toolpad/core/Account";
import type { Session } from "@toolpad/core/AppProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import LoaderElement from "../loaderElement";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


function getNavigationElements(userInformation: AccountInformation): Navigation {
  return [
    {
      title: "Portfolios",
      icon: <ContactMailIcon />,
      children: [
        {
          segment: rutasUsuarios.portafolio.replace(":id", userInformation.id.toString()) as string,
          title: "Mi Portafolio",
          icon: <PersonLinesFillIcon sx={{ color: "black" }} />,
        },
        {
          segment: rutasUsuarios.explorarPortafolios as string,
          title: "Explorar Portafolios",
          icon: <PersonSearchIcon />,
        },
      ],
    },
    ...(userInformation.tipo === "A"
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
          segment: rutasProyectos.misProyectos as string,
        },
        {
          segment: rutasProyectos.listar as string,
          title: "Explorar Proyectos",
          icon: <PlagiarismIcon />,
        },
      ],
    },
    ...(userInformation.tipo !== "A"
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
                segment: rutasMaterias.listarMisCursos as string,
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
                icon: <JournalPlus />,
              },
              {
                segment: rutasMaterias.solicitudes as string,
                title: "Solicitudes",
                icon: <HistoryEduIcon/>,
              },
            ],
          },
        ]),
  ];
}


function useDemoRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
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


function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}


function SidebarFooterAccountPopover() {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={1} sx={{ padding: 2 }}>
      <Button
        variant="outlined"
        startIcon={<ManageAccountsIcon />}
        onClick={() => navigate(rutasUsuarios.perfil)}
      >
        Configurar Cuenta
      </Button>
      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={() => navigate(rutasUsuarios.logout)}
      >
        Cerrar Sesión
      </Button>
    </Stack>
  );
}


const createPreviewComponent = (mini: boolean) => {
  return function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  };
};


function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{ preview: PreviewComponent, popoverContent: SidebarFooterAccountPopover }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"
                  })`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

/**
 * `DashboardLayoutBasic` wraps the entire application with `AppProvider` from Toolpad,
 * dynamically configuring navigation, theming, and authentication based on the current user (`accountInformation`).
 *
 * It acts as the top-level layout for authenticated app sections, rendering the sidebar, toolbar,
 * and dynamic routes depending on the user's role and current location.
 *
 * If the user has not yet been authenticated (`id === -1`), a full-page loader is shown.
 *
 * @component
 * @example
 * ```tsx
 * <DashboardLayoutBasic>
 *   <YourPageComponent />
 * </DashboardLayoutBasic>
 * ```
 *
 * @param {any} props - React children to be rendered within the layout body.
 * @returns {JSX.Element} A fully responsive and role-aware dashboard layout.
 */
export default function DashboardLayoutBasic(props: any) {
  const router = useDemoRouter();
  const theme = useTheme();
  const { accountInformation } = useAuth();

  const currentSession: Session = {
    user: {
      email: accountInformation?.correo ?? "",
      id: accountInformation?.id.toString() ?? "",
      image: accountInformation?.foto ?? "",
      name: accountInformation?.nombre ?? "",
    },
  };

  const authentication = React.useMemo(
    () => ({
      signIn: () => {},
      signOut: () => {},
    }),
    []
  );

  return (
    <>
      {accountInformation.id !== -1 ? (
        <AppProvider
          navigation={getNavigationElements(accountInformation)}
          router={router}
          theme={theme}
          authentication={authentication}
          session={currentSession}
          branding={{
            homeUrl: rutasProyectos.listar,
            logo: (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  gap: 1,
                  color: theme.palette.primary.main,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  FIREPLOY
                </Typography>
                <RocketLaunchIcon sx={{ fontSize: 32 }} />
              </Box>
            ),
            title: "",
          }}
        >
          <DashboardLayout
            sx={{ "& .MuiListSubheader-root": { fontSize: "4rem" } }}
            slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}
          >
            <Box marginTop={-10}>{props.children}</Box>
          </DashboardLayout>
        </AppProvider>
      ) : (
        <Box sx={{ height: "100vh" }}>
          <LoaderElement />
        </Box>
      )}
    </>
  );
}
