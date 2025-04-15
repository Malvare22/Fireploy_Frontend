import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Button,
  Grid2,
  Stack,
  useTheme,
  IconButton,
} from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import LogsFiles from "../logsFiles";
import { EstadoEjecucionProyecto } from "@modules/proyectos/types/proyecto.tipo";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  getColorExecutionState,
  getExecutionState,
} from "@modules/proyectos/utils/getExecutionState";
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
import ArticleIcon from "@mui/icons-material/Article";
import { useMutation } from "@tanstack/react-query";
import { postLoadProject } from "@modules/proyectos/services/post.load.project";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog2";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

type Props = {
  project: ProyectoSchema;
};
export default function ProjectSettings({ project }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const methods = useForm<ProyectoSchema>({
    defaultValues: project,
  });

  const { getValues } = methods;

  const url = getValues("url");

  function handleUrl(url: string) {
    if (url) openInNewTab(url);
  }

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const { token } = useAuth().accountInformation;

  const {mutate: mutateProject} = useMutation({
    mutationFn: async (id: number) => {
      return await postLoadProject(id, token);
    },
    mutationKey: ["load project", getValues("id")],
    onError: (error) => setError(error)
  });

  function handleLoadProject(){
    mutateProject(getValues('id') ?? 0);
  }

  return (
    <FormProvider {...methods}>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Grid2 container>
        <Grid2 size={12} marginBottom={2}>
          <Stack direction={"row"} spacing={1}>
            <Typography variant="h4">{project.titulo}</Typography>
            <Button endIcon={<RocketLaunchIcon />} onClick={handleLoadProject}>Desplegar</Button>
            {url != "" && (
              <IconButton onClick={() => handleUrl(url)}>
                <OpenInNewIcon />
              </IconButton>
            )}
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Container component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {labelConfiguracion.configuracion}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              {labelConfiguracion.configuracionParrafo}
            </Typography>

            <Tabs
              value={tabIndex}
              onChange={(_e, newIndex) => setTabIndex(newIndex)}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Repositorios" icon={<GitHubIcon />} iconPosition="start" />
              <Tab label="Bases de Datos" icon={<StorageIcon />} iconPosition="start" />
              <Tab label="Colaboradores" icon={<PeopleAltIcon />} iconPosition="start" />
              <Tab label="Archivos Logs" icon={<ArticleIcon />} iconPosition="start" />
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
              {tabIndex == 4 && (
                <>
                  <LogsFiles />
                </>
              )}
            </Stack>
          </Container>
        </Grid2>
        {/* <Grid2 size={2}>
        <Status status={"E"} />
      </Grid2> */}
      </Grid2>
    </FormProvider>
  );
}

type StatusProps = {
  status: EstadoEjecucionProyecto;
};

const Status: React.FC<StatusProps> = ({ status }) => {
  const colorState = getColorExecutionState(status) as string;

  const label = getExecutionState[status] as string;

  const theme = useTheme();

  return (
    <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
      <Typography variant="h6" textAlign={"center"}>
        {labelConfiguracion.estadoActual}
      </Typography>
      <Box display={"inline-flex"} justifyContent={"center"}>
        <Stack
          sx={{
            backgroundColor: theme.palette.terciary.main,
            borderRadius: 1,
            color: "white",
          }}
          direction={"row"}
          spacing={1}
          padding={1}
        >
          <Stack direction={"row"} spacing={1} justifyContent={"center"}>
            <Typography variant="body1">{label}</Typography>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: colorState,
                borderRadius: "100%",
              }}
            ></Box>
          </Stack>
        </Stack>
      </Box>
      <Grid2 container rowSpacing={1}>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" variant="contained" endIcon={<StopIcon sx={{ fontSize: 32 }} />}>
            {labelConfiguracion.detener}
          </Button>
        </Grid2>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<PlayCircleIcon sx={{ fontSize: 32 }} />}
          >
            {labelConfiguracion.reanudar}
          </Button>
        </Grid2>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<RocketLaunchIcon sx={{ fontSize: 32 }} />}
          >
            {labelConfiguracion.desplegar}
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  );
};
