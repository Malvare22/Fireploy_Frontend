import RouterBreadcrumbs from "@modules/general/components/breadcrumbs";
import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/prelogin";
import { ModeContext } from "@modules/general/context/modeContext";
import { Box, Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function LayoutAuthenticated() {
  const theme = useTheme();

  const { mode } = useContext(ModeContext);
  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          paddingX: { md: 2, xs: 4 },
          backgroundColor:
            mode == "light" ? "#fafafa" : theme.palette.background.default,
          paddingY: 2,
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
        }}
      >
        <Stack spacing={3}>
        <RouterBreadcrumbs/>
        <Outlet />
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutAuthenticated;
