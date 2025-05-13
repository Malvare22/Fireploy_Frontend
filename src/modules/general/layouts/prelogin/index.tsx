import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { getImage } from "@modules/general/utils/getImage";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutPrelogin is the layout wrapper for public (unauthenticated) routes.
 * It displays a top navigation bar and footer, and renders nested content
 * using React Router's <Outlet /> component.
 *
 * This layout ensures a consistent structure for pages that are available to
 * unauthenticated users. It provides a navigation bar, content area, and footer
 * for a uniform user experience across the public sections of the application.
 *
 * @component
 * @returns {JSX.Element} A layout container for pre-login pages, including a
 * navigation bar and footer, with a central area for rendering nested routes.
 *
 * Structure:
 * - Displays `NavbarPrelogin` at the top of the page.
 * - Renders nested pages or components using `<Outlet />` inside a styled container.
 * - Displays a consistent `Footer` at the bottom of the page.
 *
 * Usage:
 * The `LayoutPrelogin` component should be used as a wrapper for routes
 * that are accessible to users before they log in (e.g., sign-up, login,
 * password recovery). It provides a consistent UI for unauthenticated users.
 */
function LayoutPrelogin() {
  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
          minHeight: "80vh",
          paddingTop: '20vh',
          overflow: "hidden",
          backgroundImage: `url(${getImage["wallpaper_home"].ruta})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;
