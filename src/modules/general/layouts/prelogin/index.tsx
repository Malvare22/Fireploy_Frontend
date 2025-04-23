import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutPrelogin is the layout wrapper for public (unauthenticated) routes.
 * It displays a top navigation bar and footer, and renders nested content
 * using React Router's <Outlet /> component.
 *
 * @component
 * @returns {JSX.Element} A layout container for pre-login pages.
 *
 * Structure:
 * - Displays `NavbarPrelogin` at the top.
 * - Renders nested pages in a centered box with spacing.
 * - Shows a common `Footer` at the bottom.
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
          minHeight: '70vh',
          overflow: 'hidden',
          paddingY: 4
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;

