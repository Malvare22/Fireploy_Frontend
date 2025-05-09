import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { AuthProvider } from "@modules/general/context/accountContext";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutAuthenticated is the main layout wrapper for authenticated routes.
 * It provides context for authentication, a consistent dashboard layout,
 * and global styling such as spacing and background color.
 *
 * This layout ensures that the authenticated user experience is consistent
 * across different routes, encapsulating shared components like the sidebar,
 * content area, and footer.
 *
 * @component
 * @returns {JSX.Element} The authenticated layout structure including a dashboard and footer.
 *
 * Structure:
 * - Wraps the entire content with `AuthProvider` for managing authentication context.
 * - Uses `DashboardLayoutBasic` for a sidebar/tool menu layout.
 * - Contains a central content area rendered via `<Outlet />` to display nested routes.
 * - Displays a consistent footer at the bottom of the layout.
 *
 * Usage:
 * The `LayoutAuthenticated` component should be used as a wrapper for routes
 * that require authentication. It ensures that the appropriate layout
 * and context are available to child components.
 */
function LayoutAuthenticated() {
  const theme = useTheme();

  return (
    <AuthProvider>
      <Box sx={{ overflowX: "hidden" }}>
        <DashboardLayoutBasic>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              paddingY: 6,
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              "> div": { width: "100%" },
              minHeight: "110vh",
              paddingX: 2,
            }}
          >
            <Outlet />
          </Box>
        </DashboardLayoutBasic>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default LayoutAuthenticated;
