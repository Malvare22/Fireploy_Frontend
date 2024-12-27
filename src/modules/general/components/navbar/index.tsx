import { Box, Typography } from "@mui/material";
import Logo from "@modules/general/assets/LogoFireploy.png";
import React, { CSSProperties, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const hoverTypographyStyles: CSSProperties = {
  textAlign: "center",
  transition: "color 0.3s ease",
  cursor: "pointer",
  // "&:hover": {
  //   backgroundColor: { md: "navbar.main", xs: "customGrey.main" },
  // },
};

const Navbar = () => {
  const [session, _setSession] = useState(true);

  const [open, setOpen] = useState(true);

  // return <>{!st ? <Open setState={setSt} /> : <Close setState={setSt} />}</>;
  return (
    <>
      <Box
        sx={{
          backgroundColor: "navbar.main",
          height: { xl: 120, xs: "auto" },
          color: "white",
          display: "flex",
          flexDirection: {
            xs: "column",
            xl: "row",
          },
          alignContent: "center",
          justifyContent: "center",
          paddingLeft: { lg: 4 },
          paddingRight: { lg: 6 },
          paddingY: { xs: 2, xl: 0 },
        }}
      >
        {/* Primera Parte */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            alignItems: "center",
            justifyContent: "center",
            gap: { lg: 10, xs: 4 },
            paddingX: { xs: 4, lg: 0 },
          }}
        >
          <FirstContent open={open} setOpen={setOpen} />
        </Box>

        {/* Segunda Parte */}
        {open && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
              justifyContent: { xl: "end", xs: "center" },
              width: "100%",
              gap: { lg: 4, xs: 4 },
              marginTop: { xs: 4, lg: 0 },
            }}
          >
            <SecondContent session={session} />
          </Box>
        )}
      </Box>
    </>
  );
};

interface FirstContentProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
const FirstContent: React.FC<FirstContentProps> = ({
  open,
  setOpen,
}: FirstContentProps) => {
  const handleButton = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", lg: "auto" },
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between" },
        }}
      >
        <Box>
          <DrawerCustom />
        </Box>
        <Box component={"img"} src={Logo} sx={{ width: 100 }} />
        <Box sx={{ visibility: { lg: "hidden" } }}>
          <IconButton onClick={handleButton}>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 32,
                color: "white",
                rotate: open ? "180deg" : "",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {open && (
        <>
          {" "}
          <Box sx={hoverTypographyStyles}>
            <Typography variant="h5Bold">Inicio</Typography>
          </Box>
          <Box sx={{ ...hoverTypographyStyles, minWidth: 160 }}>
            <Typography variant="h5Bold">Equipo de desarrollo</Typography>
          </Box>
          <Box sx={hoverTypographyStyles}>
            <Typography variant="h5Bold">Tecnologías soportadas</Typography>
          </Box>
        </>
      )}
    </>
  );
};

interface SecondContentProps {
  session: boolean;
}
const SecondContent: React.FC<SecondContentProps> = ({
  session,
}: SecondContentProps) => (
  <>
    {session ? (
      <>
        <Notificacions />
        <AccountMenu />
      </>
    ) : (
      <>
        <Box>
          <Typography variant="h5Bold">Iniciar Sesión</Typography>
        </Box>
        <Box>
          <Typography variant="h5Bold">Registrarse</Typography>
        </Box>
      </>
    )}
  </>
);

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
          border: '1px solid black'
        }}
      >
        <Typography variant="h5Bold" sx={{ marginRight: 1 }}>
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
      marginRight: { lg: 4 },
    }}
  >
    <Typography variant="h5Bold" sx={{ marginRight: 1 }}>
      Notificaciones
    </Typography>
    <NotificationsIcon />
  </Box>
);

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ProfilePreview nombre="Rodrigo Malaver" foto="a" />
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
        <MenuItem onClick={handleClose} sx={{ width: 240 }}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ width: 240 }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Navbar;
