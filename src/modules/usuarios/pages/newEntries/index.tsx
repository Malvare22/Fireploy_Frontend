import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import Modal from "@modules/general/components/modal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { buttonTypes } from "@modules/general/types/buttons";
import { rutasProyectos } from "@modules/proyectos/router";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { postChangeUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import { RegistroGoogleSchema } from "@modules/usuarios/utils/form/register.google";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { getGenderArray } from "@modules/usuarios/utils/usuario.map";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

/**
 * NewEntriesView Component
 *
 * Allows users to complete their profile information after registering with Google.
 * It provides a form to input missing details such as the institution's start date, gender,
 * with validation and submission handling.
 *
 * Features:
 * - Displays a dialog informing users of missing profile information.
 * - Provides a form to complete profile information, including start date and gender.
 * - Handles password confirmation and validation.
 * - Submits the updated user information to the backend.
 *
 * @component
 */
function NewEntriesView() {
  //   const navigate = useNavigate();

  //   const example = { confirmarContrasenia: "", contrasenia: "", estFechaInicio: "", sexo: "M" };

  const { control, register, handleSubmit, formState, reset } = useForm<UsuarioSchema>({
    defaultValues: {
      estFechaInicio: "",
      sexo: "M",
    },
    resolver: zodResolver(RegistroGoogleSchema),
  });

  const { token, id } = useAuth().accountInformation;

  const { handleAccept, message, open, showDialog, title, type, handleClose } = useAlertDialog();

  const navigate = useNavigate();

  const { setError } = useErrorReader(showDialog);

  const { errors } = formState;

  const { error: errorQuery, data: userData } = useQuery({
    queryFn: () => getUsuarioService(id, token),
    queryKey: ["Profile", id, token],
  });

  useEffect(() => {
    if (userData) {
      reset(adaptUser(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (errorQuery) {
      setError(errorQuery);
    }
  }, [errorQuery]);

  useEffect(() => {
    showDialog({
      onAccept: () => {
        handleOpenModal();
        handleClose();
      },
      message:
        "Se ha realizado tu registro con una cuenta de Google, requerimos que completes de tu información de perfil faltante para que todo esté correcto 😄",
      type: "success",
      title: "Registro Con Google",
    });
  }, []);

  const { mutate: mutateChangeInformation } = useMutation({
    mutationFn: async (user: UsuarioSchema) => {
      await postChangeUsuarioService(id, token, user);
    },
    onError: (error) => {
      setError(error);
    },
    onSuccess: () => {
      showDialog({
        message: "¡Se ha agregado la información correctamente!",
        type: "success",
        title: "Actualización Información",
        onAccept: () => {
          handleClose();
          navigate(rutasProyectos.menu);
        },
      });
    },
  });

  function onSubmit(user: UsuarioSchema) {
    mutateChangeInformation(user);
  }

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Modal handleClose={handleCloseModal} open={openModal} sx={{ padding: 2, width: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Typography variant="h6" textAlign={"center"}>
              Registro de Información Restante
            </Typography>
            <TextField
              type="date"
              {...register("estFechaInicio")}
              error={!!errors.estFechaInicio}
              helperText={errors.estFechaInicio?.message}
              label="Fecha de Ingreso a la institución"
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <Controller
              name="sexo"
              control={control}
              defaultValue="M"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  error={!!errors.sexo}
                  helperText={errors.sexo?.message}
                  label="Género"
                  size="small"
                >
                  {getGenderArray.map(([value, key]) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Stack direction={"row"} justifyContent={"center"}>
              <Box>
                <GeneralButton mode={buttonTypes.save} type="submit" />
              </Box>
            </Stack>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default NewEntriesView;
