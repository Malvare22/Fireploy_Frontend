import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { AuthProvider } from "@modules/general/context/accountContext";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

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
