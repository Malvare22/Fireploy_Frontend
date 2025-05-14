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
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useMemo } from "react";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { getProjectById } from "@modules/proyectos/services/get.project";

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

  return <Box sx={{ marginLeft: 1, display: "flex", alignItems: "center" }}>{ShowState}</Box>;
}

type ShowDeployLoadProps = {
  queuePosition: number | null;
  projectStatus: EstadoEjecucionProyecto;
};
export function ShowDeployLoad({ queuePosition, projectStatus }: ShowDeployLoadProps) {
  const theme = useTheme();
  console.log(projectStatus, queuePosition)
  return (
    <>
      {projectStatus == "L" && (
        <Alert severity="info" sx={{ width: "100%" }}>
          {queuePosition ? (
            <>
              <Typography>Tu proyecto actualmente se encuentra en cola de despliegue</Typography>

              <Typography sx={{ fontWeight: 500 }}>Posición actual: {queuePosition}</Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">Tu proyecto se está desplegando</Typography>
              <CircularProgress
                size={64}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </>
          )}
        </Alert>
      )}
      {projectStatus == "E" && <Alert severity="error">Se ha producido un error</Alert>}
      {projectStatus == "N" && <Alert severity="success">Se ha desplegado correctamente</Alert>}
      {projectStatus == "L" && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}

type PropsChangeStatus = {
  position: number | null;
  projectStatus: EstadoEjecucionProyecto;
  id: number;
  hasUrl: boolean;
};
export function ChangeStatus({ projectStatus, id, position, hasUrl }: PropsChangeStatus) {
  const { showDialog, setIsLoading, handleClose, isLoading } = useAlertDialogContext();

  const CURRENT_STATUS = position != null ? "L" : projectStatus;

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
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == projectStatus) return await postDeployProject(id, token);

      throw new Error("El proyecto se encuentra desincronizado, por favor actualiza la vista");
    },
    mutationKey: ["Load Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha desplegado el proyecto correctamente",
        onAccept: () => handleClose(),
        reload: true,
        title: "Modificación de estado Proyecto",
        type: "success",
      });
    },
  });

  const { mutate: startProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const getCurrent = await getProjectById(token, id);
      if (getCurrent.estado_ejecucion == projectStatus) return await postStartProject(id, token);
      throw new Error("El proyecto se encuentra desincronizado, por favor actualiza la vista");
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
      if (getCurrent.estado_ejecucion == projectStatus) return await postStopProject(id, token);
      throw new Error("El proyecto se encuentra desincronizado, por favor actualiza la vista");
    },
    mutationKey: ["Stop Project", id, token],
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        message: "Se ha pausado el proyecto correctamente",
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
          disabled={isLoading}
        >
          Desplegar
        </Button>
      </Box>
      <Tooltip title="Reanudar Proyecto">
        <IconButton
          disabled={CURRENT_STATUS == "N" || !hasUrl || isLoading}
          onClick={() => handleAction("N")}
        >
          <PlayCircleFilledWhiteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Pausar Proyecto">
        <IconButton
          disabled={CURRENT_STATUS == "L" || CURRENT_STATUS == "F" || isLoading}
          onClick={() => handleAction("F")}
        >
          <PauseCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
}
