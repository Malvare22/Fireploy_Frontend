import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { AuthProvider } from "@modules/general/context/accountContext";
import { NotificationProvider } from "@modules/general/context/notificationContext";
import { SocketProvider } from "@modules/general/context/socketContext";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";


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
          </NotificationProvider>
        </SocketProvider>
        <Footer />
      </Box>
    </AuthProvider>
  );
}

export default LayoutAuthenticated;
