import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialogError from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import GeneralButton from "@modules/general/components/button";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import { rutasProyectos } from "@modules/proyectos/router";
import { postCreateDatabase } from "@modules/proyectos/services/post.base.datos";
import { getDataBaseTypesArray } from "@modules/proyectos/utils/database";
import { BaseDeDatosRegisterSchema } from "@modules/proyectos/utils/forms/baseDeDatos.schema";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { Box, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const DataBase = () => {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }, // ✅ EXTRAER errors
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
  const { handleOpen, open } = useAlertDialog();
  // ✅ useEffect corregido
  useEffect(() => {
    const base = getValuesProject("baseDeDatos");
    if (base) reset(base);
    setValue("proyectoId", getValuesProject("id"));
  }, [getValuesProject, reset, setValue]);

  const {
    handleClose: handleCloseCreateDBError,
    handleOpen: handleOpenCreateDBError,
    open: openCreateDBError,
  } = useAlertDialog();

  const { mutate, error } = useMutation({
    mutationFn: () => postCreateDatabase(token, getValues()),
    mutationKey: ["Create Database"],
    onSuccess: handleOpen,
    onError: handleOpenCreateDBError,
  });

  function onSubmit() {
    mutate();
  }

  function handleFinish() {
    navigate(rutasProyectos.explorar);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AlertDialogSuccess
        handleClose={handleFinish}
        message="Proyecto creado de manera correcta"
        open={open}
        title="Creación Proyecto"
        reload={false}
      />
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseCreateDBError}
          open={openCreateDBError}
          title="Creación Base de Datos"
        />
      )}
      <Stack spacing={3}>
        <Typography variant="h5">Base de Datos</Typography>
        <Divider />
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
        <Stack>
          <Box>
            <GeneralButton mode={buttonTypes.accept} type="submit" />
          </Box>
        </Stack>
      </Stack>
    </form>
  );
};
