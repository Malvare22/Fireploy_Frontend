import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import CardTecnologia from "../cardTecnologia";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import {
  getColorExecutionState,
  getExecutionState,
} from "@modules/proyectos/utils/getExecutionState";

interface Props {
  proyecto: Proyecto;
}

const ProjectForList: React.FC<Props> = ({ proyecto }: Props) => {
  const colorState = getColorExecutionState(
    proyecto.estadoDeEjecucion
  ) as string;

  return (
    <Card sx={{ padding: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5" color="info">
          {proyecto.titulo}
        </Typography>
        <Stack direction={"row"} spacing={3}>
          <Box
            component={"img"}
            src={proyecto.imagen}
            sx={{
              width: 256,
              height: 164,
            }}
          ></Box>
          <Box>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1">
                  {labelProjectForList.estado}
                </Typography>
                <Tooltip
                  title={getExecutionState[proyecto.estadoDeEjecucion]}
                  placement="top"
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: colorState,
                      borderRadius: 1,
                    }}
                  />
                </Tooltip>
              </Box>

              {/* Ultima Modificación */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box>
                  <Typography variant="body1">
                    {labelProjectForList.ultimaModificacion}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {proyecto.fechaUltimaModificacion}
                  </Typography>
                </Box>
              </Box>
              <Stack direction={"row"} spacing={3}>
                <CardTecnologia tecnologia="angular" />
                <CardTecnologia tecnologia="springboot" />
                <CardTecnologia tecnologia="mongodb" />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectForList;
