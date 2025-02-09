import { Box, Typography, ListItemButton, IconButton } from "@mui/material";
import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DrawerCustom from "./components/drawer";
import { AccountMenu } from "./components/accountMenu";
import Notificacions from "./components/notifications";
import Logo from "@modules/general/assets/LogoFireploy.png";
import { rutasGeneral } from "@modules/general/router/router";

const hoverTypographyStyles: CSSProperties = {
  textAlign: "center",
  transition: "color 0.3s ease",
  cursor: "pointer",
};

const Navbar: React.FC<{sesion: boolean}> = ({sesion}) => {
  const [open, setOpen] = useState(true);

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
          gap: { lg: 4, xs: 2 },
          padding: {xs: 2, xl: 0},
          justifyContent: {
            xs: "center",
            xl: "space-between",
          },
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
            gap: { lg: 4, xs: 2 },
            paddingX: 4,
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
              gap: { lg: 4, xs: 2 },
              paddingX: 4,
            }}
          >
            <SecondContent sesion={sesion} />
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
  const navigate = useNavigate();

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
          <ListItemButton onClick={() => navigate(rutasGeneral.home)}>
            <Typography variant="h5Bold" sx={hoverTypographyStyles}>
              Inicio
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/team")}>
            <Typography variant="h5Bold" sx={hoverTypographyStyles}>
              Equipo de desarrollo
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/technologies")}>
            <Typography variant="h5Bold" sx={hoverTypographyStyles}>
              Tecnologías soportadas
            </Typography>
          </ListItemButton>
        </>
      )}
    </>
  );
};

interface SecondContentProps {
  sesion: boolean;
}
const SecondContent: React.FC<SecondContentProps> = ({
  sesion,
}: SecondContentProps) => {
  const navigate = useNavigate();

  return (
    <>
      {sesion ? (
        <>
          <Notificacions />
          <AccountMenu />
        </>
      ) : (
        <>
          <ListItemButton onClick={() => navigate(rutasGeneral.login)}>
            <Typography variant="h5Bold">Iniciar Sesión</Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate(rutasGeneral.registrar)}>
            <Typography variant="h5Bold">Registrarse</Typography>
          </ListItemButton>
        </>
      )}
    </>
  );
};

export default Navbar;
