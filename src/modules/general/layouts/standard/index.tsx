import { AccountContext } from "@modules/context/accountContext";
import Footer from "@modules/general/components/footer";
import Navbar from "@modules/general/components/navbar";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function LayoutStandard() {
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
          backgroundColor: "white",
          justifyContent: "center",
          marginY: 4,
          paddingX: {md: 10},
          overflowX: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default LayoutStandard;
