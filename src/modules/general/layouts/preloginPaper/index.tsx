import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { Paper } from "@mui/material";
import { Outlet } from "react-router";

function LayoutPreLoginPaper() {
  return (
    <>
      <NavbarPrelogin />
      <Paper sx={{ border: "1px solid white", paddingY: "14vh", minHeight: '86vh', paddingX: { md: 10, xs: 2 } }}>
        {<Outlet />}
      </Paper>
      <Footer />
    </>
  );
}

export default LayoutPreLoginPaper;
