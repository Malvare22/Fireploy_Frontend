import { labelListarProyecto } from "@modules/proyectos/enum/labelListarProyectos";
import { Alert, Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";

/**
 * ListarProyectos component – A page that lists and navigates users to different sections related to projects.
 * 
 * This component provides an interface with navigation buttons to create a new project, explore existing projects,
 * or view the user's own projects. Each button is represented as a card element, with an icon and description.
 * The component also displays an informational alert at the top, guiding the user on project-related actions.
 * 
 * @component
 * 
 * @returns {JSX.Element} A navigation interface with buttons to create, explore, and view projects.
 * 
 * @example
 * ```tsx
 * <ListarProyectos />
 * ```
 */
function ListarProyectos() {
  const navigate = useNavigate();

  function CardElement(title: string, text: string, icon: ReactNode) {
    return (
      <Grid
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
        <Grid
          size={{ md: 3, xs: 12 }}
          marginBottom={{ xs: 2, md: 0 }}
          display={"flex"}
          justifyContent={"center"}
        >
          {icon}
        </Grid>
        <Grid size={{ md: 9, xs: 12 }} textAlign={{ xs: "center", md: "start" }}>
          <Stack spacing={3}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2">{text}</Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  }
  return (
    <Stack spacing={4} paddingBottom={4}>
      <Stack spacing={4} height={"100vh"}>
        <Typography variant="h3"textAlign={"center"}>
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
