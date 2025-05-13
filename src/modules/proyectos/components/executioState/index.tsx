import { useAuth } from "@modules/general/context/accountContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { postDeployProject, postStartProject, postStopProject } from "@modules/proyectos/services/post.status.project";
import { EstadoEjecucionProyecto } from "@modules/proyectos/types/proyecto.tipo";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
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
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useMemo } from "react";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import SpringModal from "@modules/general/components/springModal";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";

type Props = {
  position: number | null;
  projectStatus: EstadoEjecucionProyecto;
};
export function ExecutionState({ projectStatus, position }: Props) {
  const theme = useTheme();

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  function ModalInformation() {
    return (
      <Stack>
        {projectStatus == "L" && (
          <>
            <Typography>Tu proyecto actualmente se encuentra en cola de despliegue</Typography>
            {position || position != 1 ? (
              <Typography>Posición actual: {position}</Typography>
            ) : (
              <Typography>Tu proyecto se está desplegando</Typography>
            )}
          </>
        )}
        {projectStatus == "E" && <Alert severity="error">Se ha producido un error</Alert>}
        {projectStatus == "N" && <Alert severity="success">Se ha desplegado correctamente</Alert>}
        <Button onClick={handleCloseModal}>Aceptar</Button>
      </Stack>
    );
  }

  const ShowState = useMemo(() => {
    switch (projectStatus) {
      case "E":
        return (
          <Tooltip title="Se ha presentado un error en el despliegue">
            <ErrorIcon fontSize="large" />
          </Tooltip>
        );
      case "N":
        return (
          <Tooltip title="Instancia en ejecución">
            <CheckCircleIcon fontSize="large" />
          </Tooltip>
        );
      case "F":
        return (
          <Tooltip title="Tu proyecto se encuentra offline">
            <CloudOffIcon fontSize="large" />
          </Tooltip>
        );
      case "L":
        return (
          <Box sx={{ m: 1, position: "relative" }}>
            <IconButton onClick={handleOpenModal}>
              <Tooltip title="Tu proyecto se encuentra cargando, da click para más información">
                <HourglassFullIcon fontSize="large" />
              </Tooltip>
            </IconButton>

            <CircularProgress
              size={48}
              sx={{
                color: theme.palette.primary.main,
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          </Box>
        );
    }
    return <></>;
  }, [projectStatus]);

  return (
    <>
      <SpringModal handleClose={handleCloseModal} open={openModal}>
        <ModalInformation />
      </SpringModal>
      {ShowState}
    </>
  );
}

type PropsChangeStatus = {
  position: number | null;
  projectStatus: EstadoEjecucionProyecto;
  id: number;
};
export function ChangeStatus({ projectStatus, id, position }: PropsChangeStatus) {
  const { showDialog, setIsLoading, handleClose, isLoading } = useAlertDialogContext();

  const CURRENT_STATUS = position != null ? "L" : projectStatus;

  const { setError } = useErrorReader(showDialog);

  const { token } = useAuth().accountInformation;

  const { mutate: loadProject } = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      return await postDeployProject(id, token);
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
      return await postStartProject(id, token);
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
      return await postStopProject(id, token);
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

  async function handleStatus(newStatus: EstadoEjecucionProyecto) {
    switch (newStatus) {
      case "N":
        await startProject(id);
        break;

      case "F":
        await stopProject(id);
        break;
    }
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          endIcon={<RocketLaunchIcon />}
          onClick={() => loadProject(id)}
          disabled={isLoading}
        >
          Desplegar
        </Button>
      </Box>
      <Tooltip title="Reanudar Proyecto">
        <IconButton disabled={CURRENT_STATUS == "N" || isLoading} onClick={() => handleStatus("N")}>
          <PlayCircleFilledWhiteIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Pausar Proyecto">
        <IconButton
          disabled={CURRENT_STATUS == "L" || CURRENT_STATUS == "F" || isLoading}
          onClick={() => handleStatus("F")}
        >
          <PauseCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
}
