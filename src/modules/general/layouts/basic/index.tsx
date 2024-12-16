import Footer from "@modules/general/components/footer";
import Navbar from "@modules/general/components/navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function LayoutBasic() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          minHeight: {md: "70vh", xs: '80vh'},
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: "backgroundX.secondary",
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
      <Footer/>
    </div>
  );
}

export default LayoutBasic;
