import { zodResolver } from "@hookform/resolvers/zod";
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
import { Box, Button, Chip, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import StorageIcon from "@mui/icons-material/Storage";
import { getDatabaseTypesMap } from "@modules/proyectos/utils/getDatabaseTypes";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";

type Props = {
  type: "edit" | "create";
};
export const DataBase = ({ type }: Props) => {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();

  const { showDialog, open, title, message, handleCancel, type: typeAlert, handleAccept, isLoading } = useAlertDialog();

  const {setError} = useErrorReader(showDialog);

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
  // ✅ useEffect corregido
  useEffect(() => {
    const base = getValuesProject("baseDeDatos");
    if (base) reset(base);
    setValue("proyectoId", getValuesProject("id"));
  }, [getValuesProject, reset, setValue]);

  const { mutate } = useMutation({
    mutationFn: () => postCreateDatabase(token, getValues()),
    mutationKey: ["Create Database", getValues()],
    onSuccess: () => {
      if(type == 'edit')
      showDialog({
        title: 'Conexión Base de datos',
        message: 'Se ha creado el proyecto correctamente',
        type: 'success',
        onAccept: handleFinish,
        reload: true
      })
    },
    onError: (err) => {
      setError(err);
    },
  });

  function onSubmit() {
    mutate();
  }

  function handleFinish() {
    navigate(rutasProyectos.explorar);
  }

  return (
    <>
      <Typography variant="h5">Base de Datos</Typography>
      <Divider />
      {type == "create" ? (
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
            <Stack>
              <Box>
                <GeneralButton mode={buttonTypes.accept} type="submit" />
              </Box>
            </Stack>
          </Stack>
        </form>
      ) : (
        <Stack spacing={3}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>Seleccionada: </Typography>
            <Chip color="info" label={getDatabaseTypesMap.get(getValues("tipo"))} />
          </Stack>
          <Box>
            <Button variant="contained" endIcon={<StorageIcon />}>
              Ver Base de Datos
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};
