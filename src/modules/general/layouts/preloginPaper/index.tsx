import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { Paper } from "@mui/material";
import { Outlet } from "react-router";

/**
 * LayoutPreLoginPaper component – a layout wrapper for pre-login pages.
 * 
 * This component provides a consistent layout structure with a top navigation bar,
 * a main content area wrapped in a styled Paper component, and a footer.
 * It is designed for public-facing or unauthenticated routes.
 * 
 * @component
 * 
 * @returns Returns a JSX element that renders a layout with a pre-login navbar, 
 * a padded paper section for nested routes, and a footer.
 * 
 * @example
 * ```tsx
 * <LayoutPreLoginPaper />
 * ```
 */
function LayoutPreLoginPaper() {
  return (
    <>
      <NavbarPrelogin />
      <Paper sx={{ border: "1px solid white", paddingTop: "10vh", minHeight: '90vh', paddingX: { md: 10, xs: 2 }, paddingY: 10 }}>
        {<Outlet />}
      </Paper>
      <Footer />
    </>
  );
}

export default LayoutPreLoginPaper;
