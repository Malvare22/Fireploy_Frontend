import { useEffect, useState } from "react";
import { Container, Tabs, Tab, Typography, Paper, Stack, IconButton, Tooltip } from "@mui/material";
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
import { ChangeStatus, ExecutionState } from "../executioState";
import { QueueEntry } from "@modules/proyectos/types/queueEntry";
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
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

  const url = getValues("url");

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
    socket.onAny((x) => console.log(x));

    return () => {
      socket.off("deploy_position", f);
    };
  }, [socket]);

  return (
    <Stack spacing={3}>
      <FormProvider {...methods}>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h4">{project.titulo}</Typography>
            <ExecutionState
              position={currentPosition}
              projectStatus={getValues("estadoDeEjecucion") ?? "E"}
            />
            <Tooltip title="Abrir URL">
              <IconButton disabled={url.trim() === ""} onClick={() => handleUrl(url)}>
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <AlertDialogProvider>
              <ChangeStatus
                id={getValues("id") ?? 0}
                projectStatus={getValues("estadoDeEjecucion") ?? "E"}
                position={currentPosition}
              />
            </AlertDialogProvider>
          </Stack>
        </Stack>
        <Container component={Paper} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {labelConfiguracion.configuracion}
          </Typography>
          <Typography variant="subtitle1">{labelConfiguracion.configuracionParrafo}</Typography>

          <Tabs
            value={tabIndex}
            onChange={(_e, newIndex) => setTabIndex(newIndex)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
            <Tab label="Repositorios" icon={<GitHubIcon />} iconPosition="start" />
            <Tab label="Bases de Datos" icon={<StorageIcon />} iconPosition="start" />
            <Tab label="Colaboradores" icon={<PeopleAltIcon />} iconPosition="start" />
          </Tabs>

          <Stack spacing={3} padding={2}>
            {tabIndex == 0 && <Information type="edit" />}
            {tabIndex == 1 && <Repositories type="edit" />}
            {tabIndex == 2 && <DataBase type="edit" />}
            {tabIndex == 3 && (
              <>
                <Members />
              </>
            )}
          </Stack>
        </Container>
      </FormProvider>
    </Stack>
  );
}
