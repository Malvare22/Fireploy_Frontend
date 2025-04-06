import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function LayoutPrelogin() {

  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          paddingY: 5,
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
          minHeight: '70vh'
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;
