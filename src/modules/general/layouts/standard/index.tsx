import { palette } from "@core/themes";
import Footer from "@modules/general/components/footer";
import Navbar from "@modules/general/components/navbar";
import { AccountContext } from "@modules/general/context/accountContext";
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
          // display: "flex",
          backgroundColor: palette.backgroundX.primary,
          // justifyContent: "center",
          paddingY: 4,
          paddingX: {md: 10, xs: 2},
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
