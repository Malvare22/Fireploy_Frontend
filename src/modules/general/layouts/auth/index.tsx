import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/prelogin";
import { Box, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

function LayoutAuthenticated() {

  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          paddingX: { md: 2, xs: 4 },
          backgroundColor: "#fafafa",
          paddingY: 2,
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
          minHeight: "100vh",
        }}
      >
        <Stack spacing={3}>
          {/* <RouterBreadcrumbs /> */}
          <Outlet />
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutAuthenticated;
