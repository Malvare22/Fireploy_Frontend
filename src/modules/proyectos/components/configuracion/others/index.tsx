import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { useMemo } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";

export enum labelDangerZone {
  btnVisibilityOff = "Ocultar Proyecto",
  btnVisibilityOn = "Mostrar Proyecto",
  dialogVisibilityText = "¿Está seguro de que desea ocultar el proyecto?",
  dialogRemoveText = "¿Está seguro de que desea eliminar el proyecto?",
}

type Props = {
  id: Proyecto["id"];
  viewStatus: "A" | "I";
};
function DangerZone({ id, viewStatus }: Props) {
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
        handleClose();
      },
      onCancel: () => {
        handleClose();
      },
      title: "Eliminar Proyecto",
      type: "warning",
    });
  }

  function handleChangeVisibility() {

    const text = viewStatus == 'A' ? 'ocultar' : 'mostrar';

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

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5">{"Otras Configuraciones"}</Typography>
          <Divider />
        </Stack>
        <Typography>
          {"Estos son los ajustes que repercuten en la integridad del proyecto y su visibilidad"}
        </Typography>
        <Typography>{"Zona de Peligro"}</Typography>
        <Grid2 container>
          <Grid2 size={4}>
            <Typography variant="h6">{"Visibilidad del Proyecto"}</Typography>
          </Grid2>
          <Grid2 size={6}>
            <Box>
              <Button onClick={handleChangeVisibility} endIcon={ButtonIcon}>{ButtonText}</Button>
            </Box>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="h6">{"Eliminar Proyecto"}</Typography>
          </Grid2>
          <Grid2 size={6}>
            <Box>
              <Button color="error" onClick={handleRemove} size="large" endIcon={<DeleteIcon />}>
                {"Eliminar Proyecto"}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
}

export default DangerZone;
