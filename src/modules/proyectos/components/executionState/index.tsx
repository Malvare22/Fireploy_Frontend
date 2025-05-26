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
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
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

type Props = {
  projectStatus: EstadoEjecucionProyecto;
};
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

type ShowDeployLoadProps = {
  queuePosition: number | null;
};
export function ShowDeployLoad({ queuePosition }: ShowDeployLoadProps) {
  const theme = useTheme();
  return (
    <>
      <Alert
        severity="info"
        sx={{display: "flex", alignItems: "center"}}
      >
        {queuePosition ? (
          <>
            <Typography>Tu proyecto actualmente se encuentra en cola de despliegue</Typography>

            <Typography sx={{ fontWeight: 600 }}>Posición actual: {queuePosition}</Typography>
          </>
        ) : (
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1, width: '100%', overflow: 'hidden'}}
          >
            <Typography variant="h6">Tu proyecto se está desplegando</Typography>
            <Box><CircularProgress
              size={32}
              sx={{
                color: theme.palette.primary.main,
              }}
            /></Box>
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
          message: "¿Está seguro de que desea desplegar este proyecto?",
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
          endIcon={<RocketLaunchIcon />}
          onClick={() => handleAction("D")}
          loading={isLoading || projectStatus == "L"}
        >
          {"Desplegar"}
        </Button>
      </Box>
      <Tooltip title="Reanudar Proyecto">
        <IconButton
          disabled={projectStatus == "N" || !hasUrl || isLoading}
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
