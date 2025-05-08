import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Grid2,
  Stack,
  IconButton,
} from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
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
import { useMutation } from "@tanstack/react-query";
import { postLoadProject } from "@modules/proyectos/services/post.load.project";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

type Props = {
  project: ProyectoSchema;
};

/**
 * ProjectSettings component – This component is responsible for displaying and managing the settings
 * of a specific project. It provides an interface for viewing and editing various project-related details,
 * such as project information, repositories, databases, and collaborators. It also includes functionality
 * for deploying the project and opening project URLs in a new tab.
 *
 * This component includes:
 * - Tabs for navigating between different sections of project settings.
 * - A button to deploy the project, and an icon to open the project URL.
 * - A form context (via `react-hook-form`) to manage form state and handle submission.
 * - Integration with the `AlertDialog` component for showing success or error messages.
 * - A mutation hook (`react-query`) for handling the deployment of the project.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {ProyectoSchema} props.project - The project data to be displayed and managed.
 *
 * @returns {JSX.Element} A form that allows users to view and edit the project settings in various tabs.
 * The component includes options to deploy the project and open its URL in a new tab.
 *
 * @example
 * ```tsx
 * <ProjectSettings project={projectData} />
 * ```
 */
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

  const { mutate: mutateProject } = useMutation({
    mutationFn: async (id: number) => {
      return await postLoadProject(id, token);
    },
    mutationKey: ["load project", getValues("id")],
    onError: (error) => setError(error),
  });

  function handleLoadProject() {
    mutateProject(getValues("id") ?? 0);
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
            <Button endIcon={<RocketLaunchIcon />} onClick={handleLoadProject}>
              Desplegar
            </Button>
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
        </Grid2>
        {/* <Grid2 size={2}>
        <Status status={"E"} />
      </Grid2> */}
      </Grid2>
    </FormProvider>
  );
}
