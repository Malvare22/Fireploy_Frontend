import {
  DataBase,
  EnviromentVariables,
  Information,
  Repositories,
} from "@modules/proyectos/components/configuracion";
import { labelCrear } from "@modules/proyectos/enum/labelCrear";
import { Paper, Stack, Typography } from "@mui/material";
import PolylineIcon from "@mui/icons-material/Polyline";
import AccordionUsage from "@modules/general/components/accordionUsage";

function CrearProyecto() {

  

  return (
    <Stack spacing={3} component={Paper} padding={3}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Typography variant="h4" sx={{ fontWeight: "500" }}>
          {labelCrear.crearProyecto}
        </Typography>
        <PolylineIcon sx={{ fontSize: 32 }} />
      </Stack>
      <Information />
      <Repositories />
      <DataBase />
    </Stack>
  );
}

export default CrearProyecto;
