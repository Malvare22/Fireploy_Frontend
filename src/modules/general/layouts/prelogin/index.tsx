import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/prelogin";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function LayoutPrelogin() {
  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;
