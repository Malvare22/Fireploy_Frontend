import { Box, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import { useMemo } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import AlertDialogCustom from "@modules/general/components/customAlertDialog";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { deleteProject } from "@modules/proyectos/services/delete.project";
import WarningIcon from "@mui/icons-material/Warning";
import { patchEditProject } from "@modules/proyectos/services/patch.edit.project";
import useErrorReader from "@modules/general/hooks/useErrorReader";

export enum labelDangerZone {
  btnVisibilityOff = "Ocultar Proyecto",
  btnVisibilityOn = "Mostrar Proyecto",
  dialogVisibilityText = "¿Está seguro de que desea ocultar el proyecto?",
  dialogRemoveText = "¿Está seguro de que desea eliminar el proyecto?",
}

type Props = {
  id: number;
  viewStatus: "A" | "I";
  projectTitle: string;
};
function DangerZone({ id, viewStatus, projectTitle }: Props) {
  const navigate = useNavigate();

  const { showDialog, handleClose, setIsLoading } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  function handleReturnToList() {
    navigate(rutasProyectos.misProyectos);
  }

  const { token } = useAuth().accountInformation;

  const { mutate: mutateDeleteProject, isPending: isPendingDelete } = useMutation({
    mutationFn: async () => {
      await deleteProject(token, id);
    },
    onSuccess: () => {
      handleCloseModal();
      showDialog({
        message: "Proyecto eliminado correctamente",
        onAccept: () => {
          handleReturnToList();
        },
        title: "Eliminar Proyecto",
        type: "success",
      });
    },
    onError: (err) => {
      setError(err);
    },
  });

  const { mutate: mutateVisibilityProject } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      await patchEditProject(token, id, {
        estado_proyecto: viewStatus == "A" ? "I" : "A",
      });
    },
    onSuccess: () => {
      handleCloseModal();
      showDialog({
        message: "Visibilidad del proyecto modificada",
        onAccept: () => {
          handleClose();
        },
        reload: true,

        title: "Visibilidad del Proyecto",
        type: "success",
      });
    },
    onError: (err) => {
      setError(err);
      setIsLoading(false);
    },
  });

  const ButtonIcon = useMemo(() => {
    return viewStatus == "A" ? <DisabledVisibleIcon /> : <VisibilityIcon />;
  }, []);

  const ButtonText = useMemo(() => {
    return viewStatus == "A" ? "Ocultar Proyecto" : "Volver Proyecto Visible";
  }, []);

  function handleConfirmation() {
    showDialog({
      message: `¿Está seguro de que desea eliminar este proyecto?`,
      onAccept: () => {
        handleOpenModal();
        handleClose();
      },
      onCancel: () => {
        handleClose();
      },
      title: "Eliminar Proyecto",
      type: "warning",
    });
  }

  const formSchema = z.object({
    title: z.string().refine((x) => x === projectTitle, {
      message: "El título no coincide. Por favor, ingrese el título exacto del proyecto.",
    }),
  });

  function handleChangeVisibility() {
    const text = viewStatus == "A" ? "ocultar" : "mostrar";

    showDialog({
      message: `¿Está seguro de que desea ${text} este proyecto a los demás usuarios?`,
      onAccept: () => {
        handleClose();
        mutateVisibilityProject();
      },
      onCancel: () => {
        handleClose();
      },
      title: "Visibilidad de Proyecto",
      type: "warning",
    });
  }

  type FormType = {
    title: string;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    defaultValues: { title: "" },
    resolver: zodResolver(formSchema),
  });

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  function handleDeleteProjectQuery() {
    mutateDeleteProject();
  }

  return (
    <>
      <AlertDialogCustom
        title="Eliminar Proyecto"
        open={openModal}
        content={
          <form onSubmit={handleSubmit(handleDeleteProjectQuery)}>
            <Stack spacing={1}>
              <Typography>
                {
                  "Por favor ingrese el titulo de su proyecto en el siguiente campo como confirmación:"
                }
              </Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography>{`Titulo actual:`}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{`"${projectTitle}"`}</Typography>
              </Stack>
              <TextField
                size="small"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            </Stack>
          </form>
        }
        actions={
          <Stack direction="row" spacing={2}>
            <Box>
              <Button
                color="error"
                onClick={handleSubmit(handleDeleteProjectQuery)}
                variant="contained"
                type="submit"
                loading={isPendingDelete}
              >
                {"Eliminar Proyecto"}
              </Button>
            </Box>
            <Box>
              <Button
                color="inherit"
                variant="contained"
                onClick={handleCloseModal}
                disabled={isPendingDelete}
              >
                {"Cancelar"}
              </Button>
            </Box>
          </Stack>
        }
      />
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">{"Otras Configuraciones"}</Typography>
          <Divider />
        </Stack>
        <Typography>
          {"Estos son los ajustes que repercuten en la integridad del proyecto y su visibilidad"}
        </Typography>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h5">{"Zona de Peligro"}</Typography>
          <WarningIcon sx={{fontSize: 32}}/>
        </Stack>
        <Divider />
        <Grid container spacing={2}>
          <Grid size={{lg: 3, xs: 12}}>
            <Typography variant="h6">{"Visibilidad del Proyecto"}</Typography>
          </Grid>
          <Grid size={{xs: 12, lg: 9}}>
            <Box>
              <Button
                onClick={handleChangeVisibility}
                size={"large"}
                variant="contained"
                color={viewStatus == "A" ? "secondary" : "inherit"}
                endIcon={ButtonIcon}
              >
                {ButtonText}
              </Button>
            </Box>
          </Grid>
          <Grid size={{lg: 3, xs: 12}}>
            <Typography variant="h6">{"Eliminar Proyecto"}</Typography>
          </Grid>
          <Grid size={{lg: 9, xs: 12}}>
            <Box>
              <Button
                color="error"
                onClick={handleConfirmation}
                size="large"
                endIcon={<DeleteIcon />}
                variant="contained"
              >
                {"Eliminar Proyecto"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default DangerZone;
