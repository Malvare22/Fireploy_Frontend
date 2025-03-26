import Footer from "@modules/general/components/footer";
import DashboardLayoutBasic from "@modules/general/components/toolMenu";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

function LayoutAuthenticated() {

  return (
    <Box>
      <DashboardLayoutBasic>
      <Box
        sx={{
          backgroundColor: "#fafafa",
          paddingY: 2,
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
          minHeight: "100vh",
          paddingX: 2
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
  );
}

export default LayoutAuthenticated;
