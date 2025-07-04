import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
  Alert,
  Link,
  Tooltip,
} from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Information } from "./information";
import { Repositories } from "./repositories";
import { DataBase } from "./database";
import { Members } from "./members";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { FormProvider, useForm } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ChangeStatus, ExecutionState, ShowDeployLoad } from "../executionState";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import { Skeleton } from "@mui/material";
import LogsFiles from "./logSection";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DangerZone from "./others";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "@modules/general/context/accountContext";

type Props = {
  project: ProyectoSchema;
};

/**
 * ProjectSettings component – provides a complete interface to view and manage
 * all configurations related to a specific project.
 *
 * This component includes several tabbed sections to handle information such as:
 * project details, connected repositories, databases, collaborators, logs, and other settings.
 * It also reflects the current deployment status and project visibility, and handles
 * interactive actions like status change and deployment tracking.
 *
 * @component
 *
 * @param {object} project - The project object containing all configuration data.
 * @param {string} project.titulo - The title or name of the project.
 * @param {string} project.estadoDeProyecto - The current visibility state of the project.
 * @param {number} project.id - The unique identifier of the project.
 * @param {object} project.backend - Backend deployment details (may include an ID).
 * @param {object} project.frontend - Frontend deployment details (may include an ID).
 * @param {object} project.integrado - Integrated service deployment details (may include an ID).
 * @param {string} project.url - The base URL of the deployed project.
 *
 * @returns {JSX.Element} A settings dashboard with editable project configuration sections and execution feedback.
 *
 * @example
 * ```tsx
 * <ProjectSettings project={myProjectData} />
 * ```
 */
export default function ProjectSettings({ project }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const methods = useForm<ProyectoSchema>({
    defaultValues: project,
  });

  const { id } = useAuth().accountInformation;

  // function handleUrl(url: string) {
  //   if (url) openInNewTab(url);
  // }

  const currentIcon =
    project.estadoDeProyecto && project.estadoDeProyecto == "I" ? (
      <Tooltip title="Proyecto no visible">
        <DisabledVisibleIcon sx={{ fontSize: 32 }} />
      </Tooltip>
    ) : (
      <Tooltip title="Proyecto visible">
        <VisibilityIcon sx={{ fontSize: 32 }} />
      </Tooltip>
    );

  const theme = useTheme();

  const matchesMedia = useMediaQuery(theme.breakpoints.down("sm"));

  const { executionState, currentPosition, currentUrl } = useExecutionStatusContext();

  return (
    <Stack spacing={3}>
      <FormProvider {...methods}>
        <Stack spacing={1}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography variant="h4">{project.titulo}</Typography>
            {executionState && <ExecutionState projectStatus={executionState} />}
            {currentIcon}
          </Stack>
          {currentUrl.trim() != "" && executionState == "N" && (
            <Alert
              severity={executionState != "N" ? "info" : "success"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Stack direction={{ md: "row", xs: "column" }} spacing={1} alignItems={"center"}>
                <Typography>
                  {executionState == "N"
                    ? "Tu proyecto se encuentra disponible en la siguiente URL:"
                    : "Tu proyecto se va a encontrar disponible en la siguiente URL:"}
                </Typography>
                {executionState == "N" ? (
                  <Link
                    href={`https://app${project.id}.proyectos.fireploy.online/`}
                    target="_blank"
                  >{`https://app${project.id}.proyectos.fireploy.online/`}</Link>
                ) : (
                  <Typography>{`https://app${project.id}.proyectos.fireploy.online/`}</Typography>
                )}
              </Stack>
            </Alert>
          )}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <ChangeStatus id={project.id ?? 0} hasUrl={(project.url.trim() ?? "") != ""} />
          </Stack>
        </Stack>
        {executionState == "L" && <ShowDeployLoad queuePosition={currentPosition} />}
        {executionState != "L" ? (
          <Container component={Paper} sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {labelConfiguracion.configuracion}
            </Typography>
            <Typography variant="subtitle1">{labelConfiguracion.configuracionParrafo}</Typography>

            <Tabs
              value={tabIndex}
              onChange={(_e, newIndex) => setTabIndex(newIndex)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiButtonBase-root": {
                  paddingY: 0,
                },
              }}
              variant="scrollable"
              scrollButtons={matchesMedia}
              allowScrollButtonsMobile
            >
              <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Repositorios" icon={<GitHubIcon />} iconPosition="start" />
              <Tab label="Bases de Datos" icon={<StorageIcon />} iconPosition="start" />
              <Tab label="Colaboradores" icon={<PeopleAltIcon />} iconPosition="start" />
              <Tab label="Logs" icon={<ArticleIcon />} iconPosition="start" />
              {project.propietario?.id === id && (
                <Tab label="Otros aspectos" icon={<SettingsSuggestIcon />} iconPosition="start" />
              )}
            </Tabs>

            <Stack spacing={3} padding={1} paddingTop={2}>
              {tabIndex == 0 && <Information type="edit" />}
              {tabIndex == 1 && <Repositories type="edit" />}
              {tabIndex == 2 && <DataBase type="edit" />}
              {tabIndex == 3 && <Members />}
              {tabIndex == 4 && (
                <LogsFiles
                  projectId={project.id ?? -1}
                  backend={project.backend?.id}
                  frontend={project.frontend?.id}
                  integrado={project.integrado?.id}
                />
              )}
              {tabIndex == 5 && (
                <DangerZone
                  projectTitle={project.titulo}
                  id={project.id ?? -1}
                  viewStatus={project.estadoDeProyecto ?? "I"}
                />
              )}
            </Stack>
          </Container>
        ) : (
          <ConfiguracionSkeleton />
        )}
      </FormProvider>
    </Stack>
  );
}

/**
 * ConfiguracionSkeleton component – shows a loading placeholder while the project configuration is loading.
 *
 * This component displays skeleton elements that mimic the final UI structure,
 * including headings, tabs, and content areas, to improve perceived performance and avoid layout shifts.
 *
 * @component
 *
 * @returns {JSX.Element} A skeleton-styled placeholder for the project settings interface.
 *
 * @example
 * ```tsx
 * {isLoading && <ConfiguracionSkeleton />}
 * ```
 */
function ConfiguracionSkeleton() {
  return (
    <Container component={Paper} sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        <Skeleton width="40%" />
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        <Skeleton width="60%" />
      </Typography>

      <Tabs
        value={false}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiButtonBase-root": {
            paddingY: 0,
          },
        }}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label={<Skeleton width={80} />} icon={<InfoIcon />} iconPosition="start" disabled />
        <Tab label={<Skeleton width={100} />} icon={<GitHubIcon />} iconPosition="start" disabled />
        <Tab
          label={<Skeleton width={120} />}
          icon={<StorageIcon />}
          iconPosition="start"
          disabled
        />
        <Tab
          label={<Skeleton width={140} />}
          icon={<PeopleAltIcon />}
          iconPosition="start"
          disabled
        />
      </Tabs>

      <Stack spacing={2} padding={1} paddingTop={2}>
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
      </Stack>
    </Container>
  );
}
