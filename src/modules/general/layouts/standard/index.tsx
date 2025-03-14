import { palette } from "@core/themes";
import Footer from "@modules/general/components/footer";
import Navbar from "@modules/general/components/navbar";
import { AccountContext } from "@modules/general/context/accountContext";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

/**
 * Componente de diseño que estructura la interfaz con una barra de navegación, 
 * un área de contenido y un pie de página, teniendo de fondo el color palette.backgroundX.primary
 *
 * - Utiliza `AccountContext` para obtener la información del usuario.
 * - Muestra `Navbar` con la sesión activa o inactiva según `localUser`.
 * - Renderiza un `Outlet` de React Router en el centro.
 * - Incluye `Footer` en la parte inferior.
 *
 **/
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
          backgroundColor: palette.backgroundX.primary,
          paddingY: 4,
          paddingX: {md: 10, xs: 2},
          overflowX: 'auto',
          // display: {md: 'flex'},
          // justifyContent: {md: 'center'}
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}

export default LayoutStandard;
