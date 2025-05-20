import Footer from "@modules/general/components/footer";
import NavbarPrelogin from "@modules/general/components/navbars/navbarPrelogin";
import { getImage } from "@modules/general/utils/getImage";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * LayoutPrelogin component – layout wrapper for unauthenticated/pre-login views.
 * 
 * Provides a consistent UI structure with a fixed background, a top navbar, and a footer.
 * Renders nested routes using React Router's `Outlet` component.
 * 
 * @component
 * 
 * @returns {JSX.Element} A layout structure with background wallpaper, navbar, routed content, and footer.
 * 
 * @example
 * ```tsx
 * <Route element={<LayoutPrelogin />}>
 *   <Route path="/login" element={<LoginPage />} />
 *   <Route path="/register" element={<RegisterPage />} />
 * </Route>
 * ```
 */
function LayoutPrelogin() {
  return (
    <Box>
      <NavbarPrelogin />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          "> div": { width: "100%" },
          minHeight: "80vh",
          paddingTop: '10vh',
          overflow: "hidden",
          backgroundImage: `url(${getImage["wallpaper_home"].ruta})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          paddingBottom: 10
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default LayoutPrelogin;
