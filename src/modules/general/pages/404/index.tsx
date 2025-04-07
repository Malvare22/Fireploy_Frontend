import { Box, Button, Stack, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { labelErrorPage } from "@modules/general/enums/labelErrorPage";
import { useNavigate } from "react-router";

/**
 * Represents the error page displayed when a route is not found or an error occurs.
 * It includes an icon, a title, a descriptive paragraph, and a button to return to the home page.
 *
 * @component
 */
function ErrorPage() {
  const navigate = useNavigate();

  /**
   * Handles the button click event.
   * Redirects the user to the home page.
   */
  function handleButton() {
    navigate("/");
  }

  return (
    <Stack sx={{ height: "80vh" }} spacing={3}>
      {/* Icon section with layered symbols */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
      >
        <DoDisturbAltIcon
          sx={{ fontSize: 120, position: "absolute" }}
          color="error"
        />
        <RocketLaunchIcon sx={{ fontSize: 72 }} />
      </Box>

      {/* Title of the error page */}
      <Typography textAlign={"center"} variant="h2" fontWeight={"500"}>
        {labelErrorPage.titulo}
      </Typography>

      {/* Description or explanation of the error */}
      <Typography textAlign={"center"} variant="h6">
        {labelErrorPage.parrafo}
      </Typography>

      {/* Button to return to the home page */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleButton}
          variant="contained"
          color="warning"
          sx={{ color: "white" }}
        >
          {labelErrorPage.volverAlInicio}
        </Button>
      </Box>
    </Stack>
  );
}

export default ErrorPage;
