import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/prelogin";
import { ModeContext } from "@modules/general/context/modeContext";
import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function LayoutPrelogin() {
  const theme = useTheme();

  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          paddingX: { md: 10, xs: 4 },
          backgroundColor:
             theme.palette.background.default,
          paddingY: 5,
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;
