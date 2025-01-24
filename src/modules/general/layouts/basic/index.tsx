import { AccountContext } from "@core/context/accountContext";
import Footer from "@modules/general/components/footer";
import Navbar from "@modules/general/components/navbar";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function LayoutBasic() {
  const context = useContext(AccountContext);

  if (!context) {
    return <></>;
  }

  const { localUser } = context;

  return (
    <div>
      <Navbar sesion={localUser != null} />
      <Box
        sx={{
          minHeight: { md: "70vh", xs: "80vh" },
          display: "flex",
          // alignItems: 'center',
          backgroundColor: "backgroundX.secondary",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default LayoutBasic;
