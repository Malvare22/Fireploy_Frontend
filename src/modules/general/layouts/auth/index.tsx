import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { AuthProvider } from "@modules/general/context/accountContext";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutAuthenticated is the main layout wrapper for authenticated routes.
 * It provides context for authentication, a consistent dashboard layout,
 * and global styling such as spacing and background color.
 *
 * @component
 * @returns {JSX.Element} The authenticated layout structure including a dashboard and footer.
 *
 * Structure:
 * - Wraps the entire content with `AuthProvider` for context.
 * - Uses `DashboardLayoutBasic` for a sidebar/tool menu layout.
 * - Contains a central content area that renders nested routes via <Outlet />.
 * - Displays a consistent footer at the bottom.
 */
function LayoutAuthenticated() {
  return (
    <AuthProvider>
      <Box sx={{ overflowX: "hidden" }}>
        <DashboardLayoutBasic>
          <Box
            sx={{
              backgroundColor: "#fafafa",
              paddingY: 2,
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              "> div": { width: "100%" },
              minHeight: "110vh",
              paddingX: 2,
            }}
          >
            <Stack spacing={3}>
              {/* <RouterBreadcrumbs /> */}
              <Outlet />
            </Stack>
          </Box>
        </DashboardLayoutBasic>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default LayoutAuthenticated;

