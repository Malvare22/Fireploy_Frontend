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
import { AccountContext } from "@modules/context/accountContext";
import { Usuario } from "@modules/usuarios/types/usuario";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasGeneral } from "@modules/general/router/router";

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(AccountContext);

  if (!context) return <></>;

  const { localUser, setLocalUser } = context;

  const cerrarSesion = () => {
    localStorage.clear();
    setLocalUser(null);
    navigate(rutasGeneral.home);
  };

  const userInfo = useMemo((): { nombres: string; foto: string } => {
    if (!localUser) return { nombres: "", foto: "" };

    try {
      const user: Usuario = JSON.parse(localUser) as Usuario;
      return {
        nombres: `${user.nombres} ${user.apellidos}`,
        foto: user.fotoDePerfil,
      };
    } catch (error) {
      console.error("Error al parsear el usuario:", error);
      return { nombres: "", foto: "" };
    }
  }, [localUser]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
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
        <MenuItem onClick={() => navigate(rutasUsuarios.perfil)} sx={{ width: 240 }}>
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={cerrarSesion} sx={{ width: 240 }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

interface ProfilePreviewProps {
  nombre: string;
  foto: string;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ nombre, foto }) => {
  return (
    // container
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginTop: {
          xs: -3,
          lg: 0,
        },
      }}
    >
      <Box
        sx={{
          width: { sm: 300, xs: 200 },
          textAlign: "center",
          wordBreak: "break-word",
          border: "1px solid black",
        }}
      >
        <Typography variant="titleBold" sx={{ marginRight: 1 }}>
          {readBreakLine(breakLine(nombre, 2))}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 100,
          marginLeft: 1,
        }}
        component={"img"}
        src={foto}
      ></Box>
    </Box>
  );
};
