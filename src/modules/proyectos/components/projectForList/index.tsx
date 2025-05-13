import { Alert, Box, Card, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
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

/**
 * ProjectForList component – This component displays the summary information of a project in a card format for a project list.
 * It includes the project's title, status, image, associated technologies, and a button to view more details.
 * The component also visually indicates the execution state of the project using color-coded statuses and provides a warning if there are no technologies associated with the project.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Proyecto} props.proyecto - The project data to display in the list.
 *
 * @returns {JSX.Element} A card displaying a project's summary with status, image, technologies, and an action button to view more details.
 *
 * @example
 * ```tsx
 * <ProjectForList proyecto={projectData} />
 * ```
 */
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
            src={proyecto.imagen ?? ""}
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
              <Stack direction={{ sm: "row", xs: "column" }} alignItems={"center"} spacing={3}>
                {proyecto.backend?.docker?.framework && (
                  <Chip label={proyecto.backend?.docker?.framework} color="error" />
                )}
                {proyecto.frontend?.docker?.framework && (
                  <Chip label={proyecto.frontend?.docker?.framework} color="primary" />
                )}
                {proyecto.integrado?.docker?.framework && (
                  <Chip label={proyecto.integrado?.docker?.framework} color="info" />
                )}
                {!proyecto.integrado?.docker?.framework &&
                  !proyecto.frontend?.docker?.framework &&
                  !proyecto.backend?.docker?.framework && (
                    <Alert severity="warning">
                      Este proyecto actualmente no tiene tecnologías vinculadas
                    </Alert>
                  )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectForList;
