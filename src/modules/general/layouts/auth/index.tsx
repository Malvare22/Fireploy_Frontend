import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { AuthProvider } from "@modules/general/context/accountContext";
import { NotificationProvider } from "@modules/general/context/notificationContext";
import { SocketProvider } from "@modules/general/context/socketContext";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutAuthenticated component – provides the main layout structure for authenticated routes,
 * wrapping children with global providers and UI components.
 * 
 * Includes authentication context, socket communication, notification handling,
 * a dashboard menu layout, and a footer. Renders nested routes using React Router's Outlet.
 * 
 * @component
 * 
 * @returns {a structured layout including authentication, notifications, and UI scaffolding for authenticated users}
 * 
 * @example
 * ```tsx
 * <Route element={<LayoutAuthenticated />}>
 *   <Route path="/dashboard" element={<DashboardPage />} />
 * </Route>
 * ```
 */
function LayoutAuthenticated() {
  const theme = useTheme();

  return (
    <AuthProvider>
      <Box sx={{ overflowX: "hidden" }}>
        <SocketProvider>
          <NotificationProvider>
            <DashboardLayoutBasic>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.default,
                  paddingY: 3,
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "center",
                  "> div": { width: "100%", marginX: 2 },
                  minHeight: "110vh",
                }}
              >
                <Outlet />
              </Box>
            </DashboardLayoutBasic>
          </NotificationProvider>
        </SocketProvider>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default LayoutAuthenticated;
