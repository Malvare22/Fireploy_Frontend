import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "@modules/general/router/router";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Stack } from "@mui/material";

export enum labelsNavbarPrelogin {
  home = "Inicio",
  team = "Equipo de Desarrollo",
  signUp = "Iniciar Sesión",
  register = "Registrarse",
}

/**
 * **Pre-login Navigation Bar Component**
 *
 * Displays a responsive navbar with:
 * - A **brand title ("FIREPLOY")**.
 * - A **hamburger menu** (for small screens).
 * - Navigation buttons for login and registration.
 *
 * @component
 * @returns {JSX.Element} The pre-login navigation bar.
 */
function NavbarPrelogin(): JSX.Element {
  /** List of navigation options available before logging in. */
  const pages = [
    [labelsNavbarPrelogin.home, rutasGeneral.home],
    [labelsNavbarPrelogin.team, rutasGeneral.developTeam],
  ];

  // State to manage the mobile menu anchor
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  /**
   * Opens the navigation menu on mobile.
   * @param {React.MouseEvent<HTMLElement>} event - The event triggered by clicking the menu button.
   */
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  /** Closes the navigation menu. */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  function Title() {
    return (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          FIREPLOY
        </Typography>
        <RocketLaunchIcon sx={{ fontSize: 48 }} />
      </Stack>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ paddingY: 1 }}>
        <Toolbar disableGutters sx={{ justifyContent: { md: "space-between", xs: "center" } }}>
          {/* Brand title (shown only on larger screens) */}

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, position: "absolute", left: 0 }}>
            <IconButton
              size="large"
              aria-label="toggle navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile dropdown menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(([text, link]) => (
                <MenuItem key={text} onClick={handleCloseNavMenu}>
                  <Button variant="text" onClick={() => navigate(link)}>
                    <Typography sx={{ textAlign: "center" }}>{text}</Typography>
                  </Button>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Button variant="text" onClick={() => navigate(rutasGeneral.registrar)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {labelsNavbarPrelogin.register}
                  </Typography>
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button variant="text" onClick={() => navigate(rutasGeneral.login)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {labelsNavbarPrelogin.signUp}
                  </Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Title />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, marginLeft: 13   }}>
            {pages.map(([text, link]) => (
              <Button
                onClick={() => navigate(link)}
                variant="text"
                color="info"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  minWidth: 100,
                  border: "1px solid white",
                }}
                size="large"
              >
                <Typography sx={{ textAlign: "center" }} variant="subtitle1">
                  {text}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, color: "white" }}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", boxShadow: "none" }}
              color="warning"
              size="large"
              onClick={() => navigate(rutasGeneral.login)}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                {labelsNavbarPrelogin.signUp}
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none", boxShadow: "none" }}
              color="error"
              size="large"
              onClick={() => navigate(rutasGeneral.registrar)}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                {labelsNavbarPrelogin.register}
              </Typography>
            </Button>
          </Box>

          {/* Login button aligned to the right */}
          {/* <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <GeneralButton
              mode={buttonTypes.login}
              color={"secondary"}
              onClick={() => navigate(rutasGeneral.login)}
            />
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarPrelogin;
