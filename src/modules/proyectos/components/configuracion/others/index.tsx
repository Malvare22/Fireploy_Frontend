import { Box, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { useMemo, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import AlertDialog from "@modules/general/components/alertDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import AlertDialogCustom from "@modules/general/components/customAlertDialog";

export enum labelDangerZone {
  btnVisibilityOff = "Ocultar Proyecto",
  btnVisibilityOn = "Mostrar Proyecto",
  dialogVisibilityText = "¿Está seguro de que desea ocultar el proyecto?",
  dialogRemoveText = "¿Está seguro de que desea eliminar el proyecto?",
}

type Props = {
  id: Proyecto["id"];
  viewStatus: "A" | "I";
  projectTitle: string;
};
function DangerZone({ id, viewStatus, projectTitle }: Props) {
  const navigate = useNavigate();

  function handleReturnToList() {
    navigate(rutasProyectos.misProyectos);
  }

  const ButtonIcon = useMemo(() => {
    return viewStatus == "A" ? <DisabledVisibleIcon /> : <VisibilityIcon />;
  }, []);

  const ButtonText = useMemo(() => {
    return viewStatus == "A" ? "Ocultar Proyecto" : "Volver Proyecto Visible";
  }, []);

  const { showDialog, handleClose } = useAlertDialogContext();

  function handleRemove() {
    showDialog({
      message: `¿Está seguro de que desea eliminar este proyecto`,
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
    watch,
  } = useForm<FormType>({
    defaultValues: { title: "" },
    resolver: zodResolver(formSchema),
  });

  console.log(watch("title"), errors);

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  function deleteProject() {
    handleCloseModal();
  }

  return (
    <>
      <AlertDialogCustom
        title="Eliminar Proyecto"
        open={openModal}
        content={
          <form onSubmit={handleSubmit(deleteProject)}>
            <Stack spacing={2}>
                <Typography>
              {"Por favor ingrese el titulo de su proyecto en el siguiente campo como confirmación"}
            </Typography>
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
                onClick={handleSubmit(deleteProject)}
                variant="contained"
                type="submit"
              >
                {"Eliminar Proyecto"}
              </Button>
            </Box>
            <Box>
              <Button color="inherit" variant="contained" onClick={handleCloseModal}>
                {"Cancelar"}
              </Button>
            </Box>
          </Stack>
        }
      />
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5">{"Otras Configuraciones"}</Typography>
          <Divider />
        </Stack>
        <Typography>
          {"Estos son los ajustes que repercuten en la integridad del proyecto y su visibilidad"}
        </Typography>
        <Typography>{"Zona de Peligro"}</Typography>
        <Grid container>
          <Grid size={4}>
            <Typography variant="h6">{"Visibilidad del Proyecto"}</Typography>
          </Grid>
          <Grid size={6}>
            <Box>
              <Button onClick={handleChangeVisibility} endIcon={ButtonIcon}>
                {ButtonText}
              </Button>
            </Box>
          </Grid>
          <Grid size={4}>
            <Typography variant="h6">{"Eliminar Proyecto"}</Typography>
          </Grid>
          <Grid size={6}>
            <Box>
              <Button color="error" onClick={handleRemove} size="large" endIcon={<DeleteIcon />}>
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
