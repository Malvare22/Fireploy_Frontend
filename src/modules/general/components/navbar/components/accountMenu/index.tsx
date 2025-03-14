import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Fragment, useContext, useMemo, useState } from "react";
import { Box, ListItemButton, Typography } from "@mui/material";
import { breakLine } from "@modules/general/utils/breakLine";
import { readBreakLine } from "@modules/general/utils/readBreakLine";
import { useNavigate } from "react-router-dom";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { LabelNavbar } from "@modules/general/enums/labelNavbar";
import { AccountContext } from "@modules/general/context/accountContext";
import { cerrarSession } from "@modules/general/utils/cerrarSesion";

/**
 * Componente que muestra el menú de la cuenta del usuario con opciones para ver el perfil y cerrar sesión.
 * 
 * @returns {JSX.Element} Un menú desplegable con opciones de la cuenta.
 */
export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  /**
   * Maneja el clic en el botón de usuario para abrir el menú.
   * 
   * @param {React.MouseEvent<HTMLElement>} event - Evento del clic.
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cierra el menú de la cuenta.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Obtiene la información del usuario desde el contexto.
  const localUser = useContext(AccountContext)?.localUser;
  const setLocalUser = useContext(AccountContext)?.setLocalUser;

  /**
   * Obtiene la información del usuario de manera memorizada para evitar renders innecesarios.
   * 
   * @returns {object} Un objeto con el nombre y la foto del usuario.
   */
  const userInfo = useMemo((): { nombres: string; foto: string } => {
    if (!localUser) return { nombres: "", foto: "" };
    return {
      nombres: localUser.nombre,
      foto: localUser.foto,
    };
  }, [localUser]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "end", textAlign: "center" }}>
        <Tooltip title="Account settings" sx={{ border: '1px solid white', borderRadius: 4 }}>
          <ListItemButton onClick={handleClick}>
            <ProfilePreview nombre={userInfo.nombres} foto={userInfo.foto} />
          </ListItemButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "50%",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate(rutasUsuarios.perfil)} sx={{ width: 200 }}>
          <Avatar />
          <Typography variant="title2">{LabelNavbar.perfil}</Typography>
        </MenuItem>
        <Divider />
        {setLocalUser && (
          <MenuItem onClick={() => cerrarSession(navigate, setLocalUser)}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography variant="title2">{LabelNavbar.cerrarSesion}</Typography>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

/**
 * Propiedades del componente `ProfilePreview`.
 * 
 * @property {string} nombre - Nombre del usuario.
 * @property {string} foto - URL de la foto del usuario.
 */
interface ProfilePreviewProps {
  nombre: string;
  foto: string;
}

/**
 * Componente que muestra un previsualizador del perfil del usuario con su nombre y foto.
 * 
 * @param {ProfilePreviewProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento visual del perfil del usuario.
 */
const ProfilePreview: React.FC<ProfilePreviewProps> = ({ nombre, foto }) => {
  return (
    // Contenedor principal del perfil del usuario.
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: 150,
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="bodyBold" sx={{ marginRight: 1 }}>
          {readBreakLine(breakLine(nombre, 2))}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 100,
          marginLeft: 1,
        }}
        component={"img"}
        src={foto}
      ></Box>
    </Box>
  );
};
