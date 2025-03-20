import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasProyectos } from "@modules/proyectos/router";
import { rutasMaterias } from "@modules/materias/router/router";

/**
 * Tipo que representa un par de icono y etiqueta para los elementos del menú.
 *
 * @property {React.ReactNode} icon - Icono del elemento.
 * @property {string} label - Etiqueta descriptiva del elemento.
 * @property {string} url - Ruta de navegación asociada al elemento.
 */
type PairIcons = {
  icon: React.ReactNode;
  label: string;
  //url: string;
};

// Definición de las opciones del menú
const misProyectos: PairIcons = {
  icon: <AccountTreeIcon />,
  label: "Mis Proyectos",
  //url: "misProyectos",
};

const miPortafolio: PairIcons = {
  icon: <DocumentScannerIcon />,
  label: "Mi Portafolio",
  //url: "miPortafolio",
};

const usuarios: PairIcons = {
  icon: <SupervisedUserCircleIcon />,
  label: "Usuarios",
  //url: rutasUsuarios.listar,
};

const materias: PairIcons = {
  icon: <NoteAltIcon />,
  label: "Materias y Cursos",
  //url: rutasMaterias.listar,
};

const proyectos: PairIcons = {
  icon: <CloudCircleIcon />,
  label: "Proyectos",
  //url: rutasProyectos.listar,
};

const safari: PairIcons = {
  icon: <ExploreIcon />,
  label: "Explorar Portafolios",
  // url: rutasUsuarios.buscarPortafolio,
};

/**
 * Lista de elementos del menú para administradores.
 */
const admin: PairIcons[] = [
  misProyectos,
  miPortafolio,
  usuarios,
  materias,
  proyectos,
  safari,
];

/**
 * Componente `DrawerCustom` que representa un menú lateral desplegable.
 * Contiene opciones de navegación para el usuario.
 *
 * @returns {JSX.Element} Componente del drawer con opciones de navegación.
 */
export default function DrawerCustom() {
  const [open, setOpen] = React.useState(false);

  /**
   * Alterna el estado de apertura del drawer.
   *
   * @param {boolean} newOpen - Nuevo estado del drawer.
   * @returns {() => void} Función que cambia el estado del drawer.
   */
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  /**
   * Elemento que contiene la lista de opciones dentro del drawer.
   */
  const DrawerList = (
    <Box
      sx={{ width: { xs: 240, md: 280 } }}
      onClick={toggleDrawer(false)}
    >
      <List>
        {admin.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  "& svg": {
                    fontSize: 32,
                  },
                }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{option.label}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* Botón de apertura del menú */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 32, color: "white" }} />
      </IconButton>
      {/* Drawer lateral con opciones de navegación */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
