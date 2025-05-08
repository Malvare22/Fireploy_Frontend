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
import { Stack, useMediaQuery, useTheme } from "@mui/material";

export enum labelsNavbarPrelogin {
  home = "Inicio",
  team = "Equipo de Desarrollo",
  signUp = "Iniciar Sesión",
  register = "Registrarse",
  technologies = 'Tecnologías'
}

/**
 * NavbarPrelogin Component
 * 
 * A responsive navigation bar component that is displayed before user login.
 * It contains menu items for navigating between pages such as "Home", "Team", 
 * and "Technologies", and provides login and registration buttons. 
 * The navigation bar adapts to screen sizes, displaying a menu on smaller screens 
 * and direct buttons on larger screens.
 *
 * @component
 * 
 * @returns {JSX.Element} A responsive navigation bar with menu and navigation options.
 * 
 * @example
 * ```tsx
 * <NavbarPrelogin />
 * ```
 */
function NavbarPrelogin(): JSX.Element {
  /** List of navigation options available before logging in. */
  const pages = [
    [labelsNavbarPrelogin.home, rutasGeneral.home],
    [labelsNavbarPrelogin.team, rutasGeneral.developTeam],
    [labelsNavbarPrelogin.technologies, rutasGeneral.tecnologias],
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

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  function Title() {
    return (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          variant="h5"
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
        <RocketLaunchIcon sx={{ fontSize: 32 }} />
      </Stack>
    );
  }

  return (
    <AppBar position="fixed" color={'transparent'} sx={{boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
      <Container maxWidth="xl" sx={{color: 'white'}}>
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
                  <Typography sx={{ textAlign: "center"}}>
                    {labelsNavbarPrelogin.signUp}
                  </Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Stack direction={"row"} spacing={3}>
            <Title />
            <>
              {!matches &&
                pages.map(([text, link]) => (
                  <Button
                    onClick={() => navigate(link)}
                    variant="text"
                    color="info"
                    sx={{
                      my: 2,
                      display: "block",
                      minWidth: 100,
                    }}
                    size="small"
                  >
                    <Typography sx={{ textAlign: "center" }} variant="subtitle1">
                      {text}
                    </Typography>
                  </Button>
                ))}
            </>
          </Stack>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate(rutasGeneral.login)}
            >
              <Typography variant="body1">
                {labelsNavbarPrelogin.signUp}
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate(rutasGeneral.registrar)}
            >
              <Typography variant="body1">
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
