import * as React from "react";
import { AppProvider, type Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout, SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useLocation } from "react-router-dom";
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
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { useNotificationContext } from "@modules/general/context/notificationContext";
import { rutasMaterias } from "@modules/materias/router/routes";

function getNavigationElements(userInformation: AccountInformation): Navigation {
  return [
    {
      title: "Portfolios",
      icon: <ContactMailIcon sx={{ fill: "white" }} />,
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
            icon: <SupervisedUserCircleIcon sx={{ fill: "white" }} />,
            children: [
              {
                segment: rutasUsuarios.listarUsuarios as string,
                title: "Listar Usuarios",
                icon: <PeopleIcon sx={{ fill: "white" }} />,
              },
              {
                segment: rutasUsuarios.agregarUsuario as string,
                title: "Agregar Usuarios",
                icon: <GroupAddIcon sx={{ fill: "white" }} />,
              },
              {
                segment: rutasUsuarios.solicitudes as string,
                title: "Solicitudes de promover rol",
                icon: <CastForEducationIcon sx={{ fill: "white" }} />,
              },
            ],
          },
        ]
      : []),
    {
      title: "Proyectos",
      icon: <AccountTreeIcon sx={{ fill: "white" }} />,
      children: [
        {
          title: "Mis Proyectos",
          icon: <BoxesIcon sx={{ fill: "white" }} />,
          segment: rutasProyectos.misProyectos as string,
        },
        {
          segment: rutasProyectos.explorar as string,
          title: "Explorar Proyectos",
          icon: <PlagiarismIcon sx={{ fill: "white" }} />,
        },
        {
          segment: rutasProyectos.crear as string,
          title: "Crear Proyectos",
          icon: <NoteAddIcon sx={{ fill: "white" }} />,
        },
      ],
    },
    ...(userInformation.tipo !== "A"
      ? [
          {
            title: "Cursos",
            icon: <MenuBookIcon sx={{ fill: "white" }} />,
            children: [
              {
                segment: rutasMaterias.explorar as string,
                title: "Explorar Materias y Cursos",
                icon: <AutoStoriesIcon sx={{ fill: "white" }} />,
              },
              {
                title: "Mis Cursos",
                icon: <LibraryBooksIcon sx={{ fill: "white" }} />,
                segment: rutasMaterias.listarMisCursos as string,
              },
            ],
          },
        ]
      : [
          {
            title: "Materias",
            icon: <MenuBookIcon sx={{ fill: "white" }} />,
            children: [
              {
                segment: rutasMaterias.explorar as string,
                title: "Explorar Materias y Cursos",
                icon: <AutoStoriesIcon sx={{ fill: "white" }} />,
              },
              {
                segment: rutasMaterias.listarMaterias as string,
                title: "Listar Materias",
                icon: <CollectionsBookmarkIcon sx={{ fill: "white" }} />,
              },
              {
                segment: rutasMaterias.crearMateria as string,
                title: "Crear Materia",
                icon: <JournalPlus sx={{ fill: "white" }} />,
              },
              {
                segment: rutasMaterias.solicitudes as string,
                title: "Solicitudes",
                icon: <HistoryEduIcon sx={{ fill: "white" }} />,
              },
            ],
          },
        ]),
  ];
}

function ToolbarActions({
  count,
  notificaciones,
}: {
  count: string;
  notificaciones: NotificationMessage[];
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useNavigate();

  function handleNav() {
    router(rutasUsuarios.notificaciones);
  }

  const theme = useTheme();

  return (
    <Box sx={{ paddingRight: "14px" }}>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={count}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          color="primary"
        >
          <NotificationsIcon sx={{ fontSize: 32 }} />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root, .MuiList-root": {
            padding: 0,
          },
        }}
      >
        <Stack
          spacing={1}
          sx={{
            backgroundColor: theme.palette.email.main,
            width: {
              xs: "100%",
              sm: 400,
            },
            padding: 2,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5" paddingTop={1} textAlign={"center"}>
              Notificación
            </Typography>
            <Divider />
            <Box sx={{ overflowY: "scroll", width: '100%', height: 400 }}>
              {notificaciones.length > 0 ? (
                notificaciones.slice(0, 5).map((notificacion) => (
                  <>
                    <Box sx={{ paddingY: 1 }}>
                      <Typography sx={{ fontWeight: 700 }} variant="subtitle2">
                        {notificacion.titulo}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {notificacion.mensaje}
                      </Typography>
                    </Box>
                    <Divider />
                  </>
                ))
              ) : (
                <Alert severity="info">No se encontraron notificaciones nuevas</Alert>
              )}
            </Box>
          </Stack>
          <Stack alignItems={"center"} paddingY={1}>
            <Box>
              <Button size="small" variant="outlined" color="info" onClick={handleNav}>
                Ver Más
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Menu>
    </Box>
  );
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
    <Stack>
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
    </Stack>
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

  const notifications =
    useNotificationContext().notificaciones?.filter((notification) => !notification.visto) ?? [];

  const getNotificationsLabel = (n: number) => {
    return n > 99 ? "+99" : n.toString();
  };

  return (
    <>
      {accountInformation.id != -1 ? (
        <AppProvider
          navigation={getNavigationElements(accountInformation)}
          router={router}
          theme={theme}
          authentication={authentication}
          session={currentSession}
          branding={{
            homeUrl: rutasProyectos.menu,
            logo: (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  gap: 1,
                  color: "white",
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
            sx={{
              "& .MuiListSubheader-root": {
                fontSize: "4rem",
                color: "white",
              },
              "& .MuiDrawer-paper": {
                backgroundColor: "#1e1e2f",
                fill: "white", // Texto blanco
                "& .MuiSvgIcon-root": {
                  // Iconos blancos
                  fill: "white",
                },
                "& .MuiListItemButton-root": {
                  // Flechas y elementos interactivos
                  fill: "white",
                  "& .MuiSvgIcon-root": {
                    fill: "white",
                  },
                },
                "& .MuiTypography-root": {
                  color: "white",
                },
              },
              "& .MuiDrawer-root": {
                fill: "white",
                "& .MuiPaper-root": {
                  backgroundColor: "#2a2a3c", // Fondo del menú desplegable
                },
                "& .MuiBox-root": {
                  backgroundColor: "#2a2a3c", // Fondo del menú desplegable
                },
                backgroundColor: "#2a2a3c", // Fondo del menú desplegable
              },
              "& .MuiAppBar-root": {
                backgroundColor: "#1e1e2f",
                fill: "white",
                "& .MuiSvgIcon-root": {
                  // Iconos en la AppBar
                  fill: "white",
                },
                "& .MuiTypography-root": {
                  color: "white",
                },
                "& .MuiPaper-root": {
                  backgroundColor: "#2a2a3c", // Fondo del menú desplegable
                  color: "white", // Color del texto
                },
              },
            }}
            slots={{
              toolbarAccount: () => null,
              sidebarFooter: SidebarFooterAccount,
              toolbarActions: () => (
                <ToolbarActions
                  count={getNotificationsLabel(notifications ? notifications.length : 0)}
                  notificaciones={notifications ?? []}
                />
              ),
            }}
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
