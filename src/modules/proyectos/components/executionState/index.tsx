import { useAuth } from "@modules/general/context/accountContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import {
  postDeployProject,
  postStartProject,
  postStopProject,
} from "@modules/proyectos/services/post.status.project";
import { EstadoEjecucionProyecto } from "@modules/proyectos/types/proyecto.tipo";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useMemo } from "react";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { openInNewTab } from "@modules/general/utils/openTab";
import CloudSyncIcon from "@mui/icons-material/CloudSync";

type Props = {
  projectStatus: EstadoEjecucionProyecto;
};

/**
 * ExecutionState component – displays an icon representation of the current execution status of the project.
 *
 * This component renders an icon with a tooltip based on the provided status code.
 * Useful for giving users a quick visual indication of deployment or runtime state.
 *
 * @component
 *
 * @param {string} projectStatus - A status code representing the current execution state ("E", "N", "F", or "L").
 *
 * @returns {JSX.Element} A status icon with a tooltip.
 */
export function ExecutionState({ projectStatus }: Props) {
  const ShowState = useMemo(() => {
    switch (projectStatus) {
      case "E":
        return (
          <Tooltip title="Se ha presentado un error en el despliegue">
            <ErrorIcon color="error" fontSize="large" />
          </Tooltip>
        );
      case "N":
        return (
          <Tooltip title="Instancia en ejecución">
            <CheckCircleIcon color="success" fontSize="large" />
          </Tooltip>
        );
      case "F":
        return (
          <Tooltip title="Tu proyecto se encuentra offline">
            <CloudOffIcon color="primary" fontSize="large" />
          </Tooltip>
        );
      case "L":
        return (
          <Tooltip title="Tu proyecto se encuentra cargando">
            <AccessTimeFilledIcon color="info" fontSize="large" />
          </Tooltip>
        );
    }
    return <></>;
  }, [projectStatus]);

  return <Box sx={{ display: "flex", alignItems: "center" }}>{ShowState}</Box>;
}

/**
 * ExecutionStateWithoutStyles component – a simpler version of `ExecutionState` without color styling.
 *
 * This component shows status icons with tooltips, useful for embedding inside styled elements.
 *
 * @component
 *
 * @param {string} projectStatus - A status code representing the current execution state ("E", "N", "F", or "L").
 *
 * @returns {JSX.Element} A minimal status icon with tooltip.
 */
export function ExecutionStateWithoutStyles({ projectStatus }: Props) {
  const ShowState = useMemo(() => {
    switch (projectStatus) {
      case "E":
        return (
          <Tooltip title="Se ha presentado un error en el despliegue">
            <ErrorIcon fontSize="medium" />
          </Tooltip>
        );
      case "N":
        return (
          <Tooltip title="Instancia en ejecución">
            <CheckCircleIcon fontSize="medium" />
          </Tooltip>
        );
      case "F":
        return (
          <Tooltip title="Tu proyecto se encuentra offline">
            <CloudOffIcon fontSize="medium" />
          </Tooltip>
        );
      case "L":
        return (
          <Tooltip title="Tu proyecto se encuentra cargando">
            <AccessTimeFilledIcon fontSize="medium" />
          </Tooltip>
        );
    }
    return <></>;
  }, [projectStatus]);

  return <Box sx={{ display: "flex", alignItems: "center" }}>{ShowState}</Box>;
}

type ChipExecutionStateProps = {
  projectStatus: EstadoEjecucionProyecto;
};

/**
 * ChipExecutionState component – a labeled and styled visual chip indicating the current execution status.
 *
 * Combines a colored box with a label and an icon that reflects the state of the project execution.
 *
 * @component
 *
 * @param {string} projectStatus - A status code indicating current execution state ("E", "N", "F", or "L").
 *
 * @returns {JSX.Element} A chip-style label with icon showing project status.
 */
export function ChipExecutionState({ projectStatus }: ChipExecutionStateProps) {
  const theme = useTheme();

  const label = useMemo((): { color: string; text: string } => {
    switch (projectStatus) {
      case "E":
        return { color: theme.palette.error.main, text: "Error" };
      case "N":
        return { color: theme.palette.success.light, text: "Online" };
      case "F":
        return { color: theme.palette.info.main, text: "Offline" };
      case "L":
        return { color: theme.palette.warning.main, text: "Cargando" };
    }
    return { color: theme.palette.error.main, text: "Error" };
  }, [projectStatus]);

  return (
    <Box sx={{ display: "inline-block" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          borderRadius: 1,
          alignItems: "center",
          backgroundColor: label.color,
          color: "white",
          maxWidth: "fit-content",
          paddingX: 2,
          paddingY: 0.5,
        }}
      >
        <Typography>{label.text}</Typography>
        <ExecutionStateWithoutStyles projectStatus={projectStatus} />
      </Box>
    </Box>
  );
}

type ShowDeployLoadProps = {
  queuePosition: number | null;
};

/**
 * ShowDeployLoad component – displays a UI component indicating project deployment is in progress or in queue.
 *
 * If `queuePosition` is defined, the user is informed of their current position in the deployment queue.
 * Otherwise, it shows a circular progress loader with an ongoing deployment message.
 *
 * @component
 *
 * @param {number|null} queuePosition - The current position in the deployment queue, or null if unknown.
 *
 * @returns {JSX.Element} An alert component with either queue information or loading indicator.
 */
export function ShowDeployLoad({ queuePosition }: ShowDeployLoadProps) {
  const theme = useTheme();
  return (
    <>
      <Alert severity="info" sx={{ display: "flex", alignItems: "center" }}>
        {queuePosition ? (
          <>
            <Typography>Tu proyecto actualmente se encuentra en cola de despliegue</Typography>

            <Typography sx={{ fontWeight: 600 }}>Posición actual: {queuePosition}</Typography>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6">Tu proyecto se está desplegando</Typography>
            <Box>
              <CircularProgress
                size={32}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
          </Box>
        )}
      </Alert>

      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </>
  );
}

type PropsChangeStatus = {
  id: number;
  hasUrl: boolean;
};

/**
 * ChangeStatus component – provides controls to change the runtime status of a project.
 *
 * Offers buttons to deploy, start, or stop the project. Handles user confirmation and triggers
 * corresponding API mutations through react-query.
 *
 * @component
 *
 * @param {number} id - The unique identifier of the project.
 * @param {boolean} hasUrl - Indicates whether the project has a configured URL.
 *
 * @returns {JSX.Element} UI buttons and icons to trigger project state changes.
 */
export function ChangeStatus({ id, hasUrl }: PropsChangeStatus) {
  const { showDialog, setIsLoading, handleClose, isLoading } = useAlertDialogContext();
  const { executionState: projectStatus, refetchExecutionState } = useExecutionStatusContext();

  async function handleAction(newStatus: EstadoEjecucionProyecto | "D") {
    switch (newStatus) {
      case "F":
        showDialog({
          message: "¿Está seguro de que desea detener la ejecución de este proyecto?",
          onAccept: () => {
            stopProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });
        break;

      case "D":
        showDialog({
          message: "¿Está seguro de que desea sincronizar este proyecto?",
          onAccept: () => {
            loadProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });

        break;

      case "N":
        showDialog({
          message: "¿Está seguro de que desea reanudar la ejecución de este proyecto?",
          onAccept: () => {
            startProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });

        break;
    }
  }

  const { setError } = useErrorReader(showDialog);

  const { token } = useAuth().accountInformation;

  const { mutate: loadProject } = useMutation({
    mutationFn: async (id: number) => {
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == projectStatus) {
        postDeployProject(id, token);
        await setTimeout(async () => {
          await refetchExecutionState();
        }, 1500);
        return;
      }

      syncErrorProject();
    },
    mutationKey: ["Load Project", id, token],
    onError: (error) => setError(error),
  });

  const { mutate: startProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == projectStatus) {
        await postStartProject(id, token);
        await refetchExecutionState();
        return;
      }
      syncErrorProject();
    },
    mutationKey: ["Start Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha reanudado el proyecto correctamente",
        onAccept: () => handleClose(),
        reload: true,
        title: "Despliegue Proyecto",
        type: "success",
      });
    },
  });

  const { mutate: stopProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == projectStatus) {
        await postStopProject(id, token);
        await refetchExecutionState();
        return;
      }
      syncErrorProject();
    },
    mutationKey: ["Stop Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha detenido el proyecto correctamente",
        onAccept: () => handleClose(),
        reload: true,
        title: "Modificación de estado Proyecto",
        type: "success",
      });
    },
  });

  return (
    <>
      <Box>
        <Button
          variant="contained"
          endIcon={<CloudSyncIcon />}
          onClick={() => handleAction("D")}
          loading={isLoading || projectStatus == "L"}
        >
          {"Sincronizar"}
        </Button>
      </Box>
      <Tooltip title="Reanudar Proyecto">
        <IconButton
          disabled={projectStatus != "F" || !hasUrl || isLoading}
          onClick={() => handleAction("N")}
        >
          <PlayCircleFilledWhiteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Detener Proyecto">
        <IconButton disabled={projectStatus != "N" || isLoading} onClick={() => handleAction("F")}>
          <StopCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
}

export function syncErrorProject() {
  throw new Error("El proyecto se encuentra desincronizado, por favor actualiza la vista");
}

type PropsChangeStatusTable = {
  id: number;
  hasUrl: boolean;
  currentStatus: EstadoEjecucionProyecto;
  refetch: Function;
  urlOfSite?: string;
};

export function ChangeStatusForTable({
  id,
  hasUrl,
  currentStatus,
  refetch,
  urlOfSite,
}: PropsChangeStatusTable) {
  const { showDialog, setIsLoading, handleClose, isLoading } = useAlertDialogContext();

  async function handleAction(newStatus: EstadoEjecucionProyecto | "D") {
    switch (newStatus) {
      case "F":
        showDialog({
          message: "¿Está seguro de que desea detener la ejecución de este proyecto?",
          onAccept: () => {
            stopProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });
        break;

      case "D":
        showDialog({
          message: "¿Está seguro de que desea sincronizar este proyecto?",
          onAccept: () => {
            loadProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });

        break;

      case "N":
        showDialog({
          message: "¿Está seguro de que desea reanudar la ejecución de este proyecto?",
          onAccept: () => {
            startProject(id);
            handleClose();
          },
          onCancel: () => {
            handleClose();
          },
          title: "Estado de Proyecto",
          type: "default",
        });

        break;
    }
  }

  const { setError } = useErrorReader(showDialog);

  const { token } = useAuth().accountInformation;

  const { mutate: loadProject } = useMutation({
    mutationFn: async (id: number) => {
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == currentStatus) {
        postDeployProject(id, token);
        await setTimeout(async () => {
          await refetch();
        }, 1500);
        return;
      }

      syncErrorProject();
    },
    mutationKey: ["Load Project", id, token],
    onError: (error) => setError(error),
  });

  const { mutate: startProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == currentStatus) {
        await postStartProject(id, token);
        await setTimeout(async () => {
          await refetch();
        }, 1500);
        return;
      }
      syncErrorProject();
    },
    mutationKey: ["Start Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha reanudado el proyecto correctamente",
        onAccept: () => handleClose(),
        title: "Despliegue Proyecto",
        type: "success",
      });
    },
  });

  const { mutate: stopProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == currentStatus) {
        await postStopProject(id, token);
        await setTimeout(async () => {
          await refetch();
        }, 1500);
        return;
      }
      syncErrorProject();
    },
    mutationKey: ["Stop Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha detenido el proyecto correctamente",
        onAccept: () => handleClose(),
        title: "Modificación de estado Proyecto",
        type: "success",
      });
    },
  });

  return (
    <>
      <Tooltip title="Sincronizar Proyecto">
        <IconButton onClick={() => handleAction("D")} loading={isLoading || currentStatus == "L"}>
          <CloudSyncIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reanudar Proyecto">
        <IconButton
          disabled={currentStatus != "F" || !hasUrl || isLoading}
          onClick={() => handleAction("N")}
        >
          <PlayCircleFilledWhiteIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Detener Proyecto">
        <IconButton disabled={currentStatus != "N" || isLoading} onClick={() => handleAction("F")}>
          <StopCircleIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ver Sitio">
        <IconButton
          disabled={currentStatus != "N"}
          onClick={() => {
            if (urlOfSite) openInNewTab(urlOfSite);
          }}
        >
          <OpenInNewIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </>
  );
}
