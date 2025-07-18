import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton from "@modules/general/components/button";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import { rutasProyectos } from "@modules/proyectos/router/routes";
import { postCreateDatabase } from "@modules/proyectos/services/post.base.datos";
import { getDataBaseTypesArray, getDataBaseTypesMap } from "@modules/proyectos/utils/database";
import { BaseDeDatosRegisterSchema } from "@modules/proyectos/utils/forms/baseDeDatos.schema";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import StorageIcon from "@mui/icons-material/Storage";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { syncErrorProject } from "../../executionState";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TransitionAlert from "@modules/general/components/transitionAlert";

type Props = {
  type: "edit" | "create";
};

/**
 * DataBase Component – A component to manage the creation or editing of a database for a project.
 *
 * This component allows users to either create a new database by entering details like name, password, and type,
 * or to edit an existing database associated with a project. It uses React Hook Form with validation via Zod
 * and handles submission through React Query.
 *
 * @param {Props} props - The props for the DataBase component.
 * @param {"create" | "edit"} props.type - The type of action (either creating or editing a database).
 *
 * @returns {JSX.Element} The rendered DataBase form or information for editing an existing database.
 *
 * @example
 * <DataBase type="create" />
 * <DataBase type="edit" />
 */
export const DataBase = ({ type }: Props) => {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    type: typeAlert,
    handleAccept,
    isLoading,
    handleClose,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const disabledFields = type == "edit" && useExecutionStatusContext().executionState == "N";

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<BaseDeDatosRegisterSchema>({
    defaultValues: {
      contrasenia: "",
      nombre: "",
      tipo: "S",
      proyectoId: -1,
    },
    resolver: zodResolver(BaseDeDatosRegisterSchema),
  });

  const token = useAuth().accountInformation.token;
  const navigate = useNavigate();

  const { executionState } = useExecutionStatusContext();

  useEffect(() => {
    const base = getValuesProject("baseDeDatos");
    if (base) reset(base);
    setValue("proyectoId", getValuesProject("id"));
  }, [getValuesProject("id"), reset, setValue]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const currentStatus = await getProjectById(token, getValuesProject("id") ?? -1);
      if (executionState && currentStatus.estado_ejecucion != executionState) syncErrorProject();
      await postCreateDatabase(token, getValues());
    },
    mutationKey: ["Create Database", getValues(), token],
    onSuccess: () => {
      onFinish();
    },
    onError: (err) => {
      setError(err);
    },
  });

  function onSubmit() {
    handleConfirm();
  }

  function onFinish() {
    showDialog({
      title: "Conexión Base de datos",
      message:
        type == "create"
          ? "Se ha terminado de configurar el proyecto 😎"
          : "Se ha registrado la base de datos correctamente",
      type: "success",
      onAccept: () => {
        navigate(rutasProyectos.ver.replace(":id", (getValuesProject("id") ?? -1).toString()));
        handleClose();
        navigate(0);
      },
    });
  }

  function handleConfirm() {
    showDialog({
      title: "Conexión Base de datos",
      message: "¿Está seguro de que desea crear una base de datos?",
      type: "default",
      onAccept: () => mutate(),
      onCancel: () => handleClose(),
    });
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const textToCopy = getValues("url") ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={typeAlert}
        isLoading={isLoading}
      />
      <Stack spacing={2}>
        <Stack><TransitionAlert severity="warning">
          {
            "Para que surjan efecto los cambios realizados en esta sección, se requiere volver a desplegar el aplicativo"
          }
        </TransitionAlert>
        <Typography variant="h5">{"Base de Datos"}</Typography></Stack>
        <Divider />
        {type == "create" || (type == "edit" && getValuesProject("baseDeDatos")?.id == -1) ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      {...field}
                      size="small"
                      sx={{ width: "50%" }}
                      error={!!errors.tipo}
                      helperText={errors.tipo?.message}
                      disabled={disabledFields}
                    >
                      {getDataBaseTypesArray.map(([key, value]) => (
                        <MenuItem value={key} key={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {disabledFields && (
                  <Tooltip title="No puede definirse una base de datos mientras el proyecto se encuentre en ejecución">
                    <HelpOutlineIcon />
                  </Tooltip>
                )}
              </Stack>
              {watch("tipo") != "E" && (
                <>
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Nombre"
                        {...field}
                        size="small"
                        sx={{ width: "50%" }}
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                        disabled={disabledFields}
                      />
                    )}
                  />
                  <Controller
                    name="contrasenia"
                    control={control}
                    render={({ field }) => (
                      <TextFieldPassword
                        fullWidth
                        label="Contraseña"
                        {...field}
                        size="small"
                        sx={{ width: "50%" }}
                        error={!!errors.contrasenia}
                        helperText={errors.contrasenia?.message}
                        disabled={disabledFields}
                      />
                    )}
                  />
                </>
              )}

              <Stack direction={"row"} spacing={3}>
                {type == "create" ? (
                  <>
                    {watch("tipo") != "E" && (
                      <Box>
                        <GeneralButton
                          mode={buttonTypes.accept}
                          type="submit"
                          disabled={disabledFields}
                        />
                      </Box>
                    )}
                    <Box>
                      <Button
                        onClick={onFinish}
                        color="warning"
                        variant="contained"
                        endIcon={<NavigateNextIcon />}
                      >
                        Omitir
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    {watch("tipo") != "E" && (
                      <Box>
                        <GeneralButton mode={buttonTypes.save} type="submit" />
                      </Box>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
          </form>
        ) : (
          <Stack spacing={3}>
            <TransitionAlert severity="info">
              {
                "Recuerda: tus credenciales de base de datos son privadas, jamás las compartas con otros usuarios"
              }
            </TransitionAlert>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Typography>Seleccionada: </Typography>
              <Chip color="info" label={getDataBaseTypesMap.get(getValues("tipo"))} />
            </Stack>
            <ShowCredentials password={getValues("contrasenia")} user={getValues("nombre")} />
            <Box>
              <Button variant="contained" endIcon={<StorageIcon />} onClick={handleCopy}>
                {"Obtener URI Base de Datos"}
              </Button>
            </Box>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                variant="filled"
                sx={{ width: "100%" }}
                severity="info"
              >
                {"Texto copiado al portapapeles"}
              </Alert>
            </Snackbar>
          </Stack>
        )}
      </Stack>
    </>
  );
};

type ShowCredentialsProps = {
  user: string;
  password: string;
};
function ShowCredentials({ password, user }: ShowCredentialsProps) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <Grid
        container
        rowSpacing={2}
        spacing={3}
        sx={{ display: "flex", padding: 1, alignItems: "center" }}
      >
        <Grid size={3}>
          <Typography sx={{ fontWeight: 500 }}>{"Usuario:"}</Typography>
        </Grid>
        <Grid size={9}>
          <TextField fullWidth size="small" disabled value={user} />
        </Grid>
        <Grid size={3}>
          <Typography sx={{ fontWeight: 500 }}>{"Contraseña:"}</Typography>
        </Grid>
        <Grid size={9}>
          <TextFieldPassword fullWidth size="small" disabled value={password} />
        </Grid>
      </Grid>
    </Card>
  );
}
