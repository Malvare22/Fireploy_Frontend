import { useEffect, useState } from "react";
import { Container, Tabs, Tab, Typography, Paper, Stack, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Information } from "./information";
import { Repositories } from "./repositories";
import { DataBase } from "./database";
import { Members } from "./members";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { FormProvider, useForm } from "react-hook-form";
import { openInNewTab } from "@modules/general/utils/openTab";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ChangeStatus, ExecutionState, ShowDeployLoad } from "../executionState";
import { QueueEntry } from "@modules/proyectos/types/queueEntry";
import { useSocketContext } from "@modules/general/context/socketContext";

type Props = {
  project: ProyectoSchema;
};

export default function ProjectSettings({ project }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const methods = useForm<ProyectoSchema>({
    defaultValues: project,
  });

  const { getValues } = methods;

  const [currentPosition, setCurrentPosition] = useState<null | number>(null);

  function handleUrl(url: string) {
    if (url) openInNewTab(url);
  }

  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    const f = (msg: QueueEntry) => {
      if (msg.projectId == getValues("id") && msg.position) {
        setCurrentPosition(msg.position);
      }
    };
    socket.on("deploy_position", f);

    return () => {
      socket.off("deploy_position", f);
    };
  }, [socket]);

  console.log(project, currentPosition);

  const definedStatus = currentPosition ? "L" : (project.estadoDeEjecucion ?? "E");

  const theme = useTheme();

  const matchesMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack spacing={3}>
      <FormProvider {...methods}>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h4">{project.titulo}</Typography>
            <ExecutionState projectStatus={definedStatus} />
            <Tooltip title="Abrir URL">
              <IconButton
                disabled={project.url.trim() === ""}
                onClick={() => handleUrl(project.url)}
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ChangeStatus
              id={project.id ?? 0}
              projectStatus={definedStatus}
              position={currentPosition}
              hasUrl={(project.url.trim() ?? "") != ""}
            />
          </Stack>
        </Stack>
        {definedStatus == "L" && (
          <ShowDeployLoad projectStatus={definedStatus} queuePosition={currentPosition} />
        )}
        <Container component={Paper} sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {labelConfiguracion.configuracion}
          </Typography>
          <Typography variant="subtitle1">{labelConfiguracion.configuracionParrafo}</Typography>

          <Tabs
            value={tabIndex}
            onChange={(_e, newIndex) => setTabIndex(newIndex)}
            sx={{ borderBottom: 1, borderColor: "divider", '& .MuiButtonBase-root': {
              paddingY: 0
            } }}
            variant="scrollable"
            scrollButtons={matchesMedia}
            allowScrollButtonsMobile
          >
            <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
            <Tab label="Repositorios" icon={<GitHubIcon />} iconPosition="start" />
            <Tab label="Bases de Datos" icon={<StorageIcon />} iconPosition="start" />
            <Tab label="Colaboradores" icon={<PeopleAltIcon />} iconPosition="start" />
          </Tabs>

          <Stack spacing={3} padding={1} paddingTop={2}>
            {tabIndex == 0 && <Information type="edit" />}
            {tabIndex == 1 && <Repositories type="edit" />}
            {tabIndex == 2 && <DataBase type="edit" />}
            {tabIndex == 3 && <Members />}
          </Stack>
        </Container>
      </FormProvider>
    </Stack>
  );
}
