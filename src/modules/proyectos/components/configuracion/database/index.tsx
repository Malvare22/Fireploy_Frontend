import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton from "@modules/general/components/button";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import { rutasProyectos } from "@modules/proyectos/router";
import { postCreateDatabase } from "@modules/proyectos/services/post.base.datos";
import { getDataBaseTypesArray, getDataBaseTypesMap } from "@modules/proyectos/utils/database";
import { BaseDeDatosRegisterSchema } from "@modules/proyectos/utils/forms/baseDeDatos.schema";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { Box, Button, Chip, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import StorageIcon from "@mui/icons-material/Storage";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { syncErrorProject } from "../../executionState";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
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
      postCreateDatabase(token, getValues());
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
    mutate();
  }

  function onFinish() {
    showDialog({
      title: "Conexión Base de datos",
      message:
        type == "create"
          ? "Se ha terminado de configurar el proyecto 😎"
          : "Se ha registrado la base de datos correctamente",
      type: "success",
      onAccept: () =>
        navigate(rutasProyectos.ver.replace(":id", (getValuesProject("id") ?? -1).toString())),
    });
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Base de Datos</Typography>
      <Divider />
      {type == "create" || (type == "edit" && getValuesProject("baseDeDatos")?.id == -1) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialog
            handleAccept={handleAccept}
            handleCancel={handleCancel}
            open={open}
            title={title}
            textBody={message}
            type={typeAlert}
            isLoading={isLoading}
          />
          <Stack spacing={3}>
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
                />
              )}
            />
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
                >
                  {getDataBaseTypesArray.map(([key, value]) => (
                    <MenuItem value={key} key={key}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Stack direction={"row"} spacing={3}>
              {type == "create" ? (
                <>
                  <Box>
                    <GeneralButton mode={buttonTypes.accept} type="submit" />
                  </Box>
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
                <Box>
                  <GeneralButton mode={buttonTypes.save} type="submit" />
                </Box>
              )}
            </Stack>
          </Stack>
        </form>
      ) : (
        <Stack spacing={3}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>Seleccionada: </Typography>
            <Chip color="info" label={getDataBaseTypesMap.get(getValues("tipo"))} />
          </Stack>
          <Box>
            <Button variant="contained" endIcon={<StorageIcon />}>
              Ver Base de Datos
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
