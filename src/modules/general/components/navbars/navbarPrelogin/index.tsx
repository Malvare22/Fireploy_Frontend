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
import GeneralButton from "../../button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "@modules/general/router/router";

/** List of navigation options available before logging in. */
const pages = ["Inicio", "Iniciar Sesión", "Registrarse"];

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

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl" sx={{ paddingY: 1 }}>
        <Toolbar disableGutters>
          {/* Brand title (shown only on larger screens) */}
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

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Brand title (shown only on smaller screens) */}
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

          {/* Navigation buttons (visible on larger screens) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Login button aligned to the right */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <GeneralButton
              mode={buttonTypes.login}
              color={"secondary"}
              onClick={() => navigate(rutasGeneral.login)}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarPrelogin;
