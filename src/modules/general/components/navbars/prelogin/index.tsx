import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import React, { useContext, useEffect, useState } from "react";
import GeneralButton from "../../buttons";
import { buttonTypes } from "@modules/general/types/buttons";
import { Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "@modules/general/router/router";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModeContext } from "@modules/general/context/modeContext";
import { obtenerImagen } from "../../RoundedIcon/utils";
import DrawerCustom from "./drawer";
import AccountMenu from "./accountMenu";
import { AccountContext } from "@modules/general/context/accountContext";

const pages = ["Inicio", "Iniciar Sesión", "Registrarse"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavbarPrelogin() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [session, setSession] = useState<boolean | undefined>(undefined);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const localUser = useContext(AccountContext)?.localUser

  useEffect(()=> {
    if(localUser) setSession(true)
      else setSession(false)
  }, [localUser])

  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl" sx={{paddingY: 1}}>
        <Toolbar disableGutters>
          {/* <Box component={'img'} src={obtenerImagen['logo_fireploy'].ruta} alt={obtenerImagen['logo_fireploy'].nombre} sx={{width: 48, height: 48}}/> */}
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          {session && <DrawerCustom/>}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FIREPLOY
          </Typography>

          {!session &&<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FIREPLOY
          </Typography>
        {!session && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: "end",
            }}
          >
             <Box>

             {session ? <AccountMenu/> : <GeneralButton
                mode={buttonTypes.login}
                color={"secondary"}
                onClick={() => navigate(rutasGeneral.login)}
              />}
          </Box>
           
          </Box>
         
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
         
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarPrelogin;
