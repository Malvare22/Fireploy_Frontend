import { Box, Typography, ListItemButton, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DrawerCustom from "./components/drawer";
import { AccountMenu } from "./components/accountMenu";
import Logo from "@modules/general/assets/LogoFireploy.png";
import { rutasGeneral } from "@modules/general/router/router";
import { LabelNavbar } from "@modules/general/enums/labelNavbar";
import { palette } from "@core/themes";


const Navbar: React.FC<{sesion: boolean}> = ({sesion}) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          backgroundColor: palette.navbar.main,
          height: { xs: "auto" },
          color: "white",
          display: "flex",
          flexDirection: {
            xs: "column",
            xl: "row",
          },
          justifyContent: {
            xs: "center",
            xl: "space-between",
          },
          paddingRight: 4,
          gap: 3,
          paddingY: {xs: 2, xl: 1}
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
            gap: 3,
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
              justifyContent: "center",
              gap: {xs: 3, xl: 1},
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
        <Box component={"img"} src={Logo} sx={{ width: 64 }} />
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
          <ListItemButton onClick={() => navigate(rutasGeneral.home)} sx={{
            display: 'flex', justifyContent: 'center'
          }}>
            <Typography variant="titleBold">
              {LabelNavbar.inicio}
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/team")} sx={{
            display: 'flex', justifyContent: 'center'
          }}>
            <Typography variant="titleBold">
             {LabelNavbar.equipo}
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/technologies")} sx={{
            display: 'flex', justifyContent: 'center'
          }}>
            <Typography variant="titleBold">
              {LabelNavbar.tecnologiasSoportadas}
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
          <AccountMenu />
        </>
      ) : (
        <>
          <ListItemButton onClick={() => navigate(rutasGeneral.login)}>
            <Typography variant="titleBold">{LabelNavbar.iniciarSesion}</Typography>
          </ListItemButton>
          <ListItemButton onClick={() => navigate(rutasGeneral.registrar)}>
            <Typography variant="titleBold">{LabelNavbar.registrarse}</Typography>
          </ListItemButton>
        </>
      )}
    </>
  );
};

export default Navbar;
