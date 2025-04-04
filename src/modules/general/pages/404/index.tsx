import { Box, Button, Stack, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import { labelErrorPage } from "@modules/general/enums/labelErrorPage";
import { useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();

  function handleButton() {
    navigate("/");
  }

  return (
    <Stack sx={{ height: "80vh" }} spacing={3}>
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
      <Typography textAlign={"center"} variant="h2" fontWeight={"500"}>
        {labelErrorPage.titulo}
      </Typography>
      <Typography textAlign={"center"} variant="h6">
        {labelErrorPage.parrafo}
      </Typography>
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
