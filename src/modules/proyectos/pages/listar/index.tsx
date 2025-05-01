import { labelListarProyecto } from "@modules/proyectos/enum/labelListarProyectos";
import { Alert, Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";

function ListarProyectos() {
  const navigate = useNavigate();

  function CardElement(title: string, text: string, icon: ReactNode) {
    return (
      <Grid2
        container
        direction={"row"}
        sx={{
          width: { md: 400, xs: 300 },
          height: { md: 200 },
          padding: 2,
          alignItems: "center",
        }}
        component={Paper}
      >
        <Grid2
          size={{ md: 3, xs: 12 }}
          marginBottom={{ xs: 2, md: 0 }}
          display={"flex"}
          justifyContent={"center"}
        >
          {icon}
        </Grid2>
        <Grid2 size={{ md: 9, xs: 12 }} textAlign={{ xs: "center", md: "start" }}>
          <Stack spacing={3}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2">{text}</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    );
  }
  return (
    <Stack spacing={4} paddingBottom={4}>
      <Stack spacing={4} height={"100vh"}>
        <Typography variant="h3" textTransform={"uppercase"} textAlign={"center"}>
          {labelListarProyecto.proyectos}
        </Typography>
        <Stack alignItems={"center"}>
          <Alert severity="info" sx={{ maxWidth: 500 }}>
            {labelListarProyecto.notificacion}
          </Alert>
        </Stack>
        <Stack direction={{ md: "row", xs: "column" }} justifyContent={"center"} spacing={3}>
          <Button
            sx={{ textTransform: "none", textAlign: "start" }}
            onClick={() => navigate(rutasProyectos.crear)}
          >
            {CardElement(
              labelListarProyecto.nuevoProyecto,
              labelListarProyecto.nuevoProyectoParrafo,
              <NoteAddIcon sx={{ fontSize: 64 }} />
            )}
          </Button>
          <Button
            sx={{ textTransform: "none", textAlign: "start" }}
            onClick={() => navigate(rutasProyectos.explorar)}
          >
            {CardElement(
              labelListarProyecto.explorarProyectos,
              labelListarProyecto.explorarProyectosParrafo,
              <TravelExploreIcon sx={{ fontSize: 64 }} />
            )}
          </Button>
        </Stack>
        <Stack alignItems={"center"}>
          <Box>
            <Button
              onClick={() => navigate(rutasProyectos.misProyectos)}
              variant="contained"
              color="info"
            >
              {labelListarProyecto.verMisProyectos}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ListarProyectos;
