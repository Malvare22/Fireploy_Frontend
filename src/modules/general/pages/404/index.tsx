import { Box, Button, Grid, Typography } from "@mui/material";

import { useNavigate } from "react-router";
import { getImage } from "@modules/general/utils/getImage";
import { rutasGeneral } from "@modules/general/router/routes";

/**
 * ErrorPage component – a user-friendly error screen for unknown or invalid routes.
 *
 * This component displays a 404 message with a playful theme and provides a button
 * that redirects users back to the home page. It includes text content and an illustrative image.
 *
 * @component
 *
 * @returns Returns a JSX element that renders a responsive 404 error page with
 * informative text, a call-to-action button, and an image.
 *
 * @example
 * ```tsx
 * <ErrorPage />
 * ```
 */

/**
 * Handles the click event of the "Regresar" button.
 * Navigates the user back to the home page defined in the routing module.
 */
function ErrorPage({ errorMessage }: { errorMessage?: string }) {
  const navigate = useNavigate();

  /**
   * Handles the button click event.
   * Redirects the user to the home page.
   */
  function handleButton() {
    navigate(rutasGeneral.home);
  }

  return (
    <Grid container sx={{ padding: 4 }}>
      <Grid
        size={{ md: 6, xs: 12 }}
        sx={{ display: "flex", flexDirection: "column", gap: 4, justifyContent: "center" }}
      >
        <Typography sx={{ fontSize: 92 }}>{errorMessage != undefined ? "Error Detectado" : "404"}</Typography>
        <Typography variant="h3">{"Can you hear me, Major Tom?"}</Typography>
        <Typography variant="h4">
          {errorMessage ? (
            <>{`Hemos atrapado el siguiente error: "${errorMessage}". Ten mucho cuidado!`}</>
          ) : (
            <>{"Parece que te encuentras flotando entre rutas inexistentes, ¡regresa a orbita!"}</>
          )}
        </Typography>
        <Button sx={{ fontSize: 24 }} variant="contained" onClick={handleButton}>
          {"Regresar"}
        </Button>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }} sx={{ display: "flex", alignItems: "end" }}>
        <Box
          component={"img"}
          sx={{ width: "100%", marginBottom: -6 }}
          src={getImage["not_found_404"].ruta}
        />
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
