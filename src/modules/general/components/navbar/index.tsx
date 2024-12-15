import { Box, Typography } from "@mui/material";
import Logo from "@modules/general/assets/LogoFireploy.png";
import React, { CSSProperties, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const hoverTypographyStyles: CSSProperties = {
  textAlign: "center",
  padding: 1,
  transition: "color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: {md: 'navbar.main', xs: "customGrey.main" },
  },
};

interface NavbarProps {
  session?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ session }: NavbarProps) => {
  const [st, setSt] = useState(false);

    // return <>{!st ? <Open setState={setSt} /> : <Close setState={setSt} />}</>;
  return (
    <>
      <Desktop session={false} />
    </>
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
        color: 'white'
      }}
    >
      <Box sx={{ width: 190, textAlign: "center", wordBreak: "break-word" }}>
        <Typography variant="titleBold" sx={{ marginRight: 1 }}>
          {nombre}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 52,
          height: 52,
          backgroundColor: "gray",
          borderRadius: 100,
          marginLeft: 1,
        }}
      ></Box>
    </Box>
  );
};

const Notificacions = () => (
  <Box
    sx={{
      ...hoverTypographyStyles,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: { md: 4 },
    }}
  >
    <Typography variant="titleBold" sx={{ marginRight: 1 }}>
      Notificaciones
    </Typography>
    <NotificationsIcon />
  </Box>
);

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import DrawerCustom from "./components/drawer";

export function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ProfilePreview nombre="Rodrigo Malaver" foto="a"/>
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
          </IconButton>
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
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: '50%',
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          
          },
          
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{width: 240}}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{width: 240}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

interface DesktopProps {
  session: boolean;
}

// Componente funcional con tipado de las props
const Desktop: React.FC<DesktopProps> = ({ session }: DesktopProps) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "navbar.main",
          height: 120,
          color: "white",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          paddingLeft: 4,
          paddingRight: 6,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
          <DrawerCustom/>

          <Box component={"img"} src={Logo} sx={{ width: 100 }} />
          <Box sx={{ ...hoverTypographyStyles, marginLeft: 4, marginRight: 10 }}>
            <Typography variant="titleBold">Inicio</Typography>
          </Box>
          <Box sx={{ ...hoverTypographyStyles, marginRight: 10 }}>
            <Typography variant="titleBold">Equipo de desarrollo</Typography>
          </Box>
          <Box sx={hoverTypographyStyles}>
            <Typography variant="titleBold">Tecnologías soportadas</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {lg: "end", xs: 'center'},
            width: "100%",
          }}
        >
          {session ? (
            <>
              <Notificacions />
              <AccountMenu/>
            </>
          ) : (
            <>
              <Box sx={{ marginRight: 10 }}>
                <Typography variant="titleBold">Iniciar Sesión</Typography>
              </Box>
              <Box>
                <Typography variant="titleBold">Registrarse</Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

// interface Props {
//   setState: React.Dispatch<boolean>;
// }

// // const Open: React.FC<Props> = ({ setState }: Props) => (
// //   <Box
// //     sx={{
// //       backgroundColor: "navbar.main",
// //       height: "auto",
// //       color: "white",
// //       display: "flex",
// //       flexDirection: "column",
// //       alignItems: "center",
// //       padding: 4,
// //       position: "relative",
// //     }}
// //   >
// //     <Box
// //       sx={{ position: "absolute", left: 20, top: 50 }}
// //       onClick={() => setState(true)}
// //     >
// //       <MenuIcon sx={{ fontSize: 40 }} />
// //     </Box>

// //     {/* Logo */}
// //     <Box
// //       component="img"
// //       src={Logo}
// //       sx={{ width: { xs: 80, md: 100 }, marginBottom: 4 }}
// //     />

// //     {/* Links */}
// //     <Box
// //       sx={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         gap: 3,
// //       }}
// //     >
// //       <Box sx={hoverTypographyStyles}>
// //         <Typography variant="titleBold" sx={hoverTypographyStyles}>
// //           Inicio
// //         </Typography>
// //       </Box>
// //       <Typography variant="titleBold" sx={hoverTypographyStyles}>
// //         Equipo de desarrollo
// //       </Typography>
// //       <Typography variant="titleBold" sx={hoverTypographyStyles}>
// //         Tecnologías soportadas
// //       </Typography>
// //       <Typography variant="titleBold" sx={hoverTypographyStyles}>
// //         Iniciar Sesión
// //       </Typography>
// //       <Typography variant="titleBold" sx={hoverTypographyStyles}>
// //         Registrarse
// //       </Typography>

// //       <ProfilePreview nombre="Jaime fgdgdfgdf Cortez" foto="" />
// //     </Box>
// //   </Box>
// // );


// const Close: React.FC<Props> = ({ setState }: Props) => (
//   <Box
//     sx={{
//       backgroundColor: "navbar.main",
//       height: "auto", // Deja que el tamaño sea dinámico basado en el contenido
//       color: "white",
//       position: "relative",
//       padding: 4,
//       display: "flex",
//       justifyContent: "center",
//     }}
//   >
//     {/* Logo */}
//     <Box
//       sx={{ position: "absolute", left: 20, top: 50 }}
//       onClick={() => setState(false)}
//     >
//       <MenuIcon sx={{ fontSize: 40 }} />
//     </Box>
//     <Box component="img" src={Logo} sx={{ width: { xs: 80, md: 100 } }} />
//   </Box>
// );


export default Navbar;
