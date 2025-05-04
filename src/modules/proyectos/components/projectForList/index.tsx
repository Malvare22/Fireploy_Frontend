import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import CardTecnologia from "../cardTecnologia";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import {
  getColorExecutionState,
  getExecutionState,
} from "@modules/proyectos/utils/getExecutionState";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

interface Props {
  proyecto: Proyecto;
}

const ProjectForList: React.FC<Props> = ({ proyecto }: Props) => {
  const colorState = getColorExecutionState(proyecto.estadoDeEjecucion ?? "E") as string;

  const navigate = useNavigate();

  function onClick(id: number) {
    navigate(rutasProyectos.ver.replace(":id", id.toString()));
  }

  return (
    <Card sx={{ padding: 4, position: "relative" }}>
      <ActionButton
        sx={{ position: "absolute", right: 4, top: 4, fontSize: 32 }}
        mode={actionButtonTypes.editar}
        onClick={() => onClick(proyecto.id || -1)}
      />
      <Stack spacing={2}>
        <Typography variant="h4" textAlign={{ xs: "center", sm: "start" }} color="info">
          {proyecto.titulo}
        </Typography>
        <Stack direction={{ lg: "row", xs: "column" }} alignItems={"center"} spacing={3}>
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
                <Typography variant="body1">{labelProjectForList.estado}</Typography>
                <Tooltip
                  title={getExecutionState[proyecto.estadoDeEjecucion ?? "E"]}
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
                  <Typography variant="body1">{labelProjectForList.ultimaModificacion}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">{proyecto.fechaUltimaModificacion}</Typography>
                </Box>
              </Box>
              <Stack
                direction={{ sm: "row", xs: "column" }}
                sx={{
                  "> div": {
                    width: { xs: "70%" },
                  },
                }}
                alignItems={"center"}
                spacing={3}
              >
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
