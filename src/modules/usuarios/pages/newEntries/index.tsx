import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import Modal from "@modules/general/components/modal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { useAuth } from "@modules/general/context/accountContext";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { postChangePassword } from "@modules/general/services/post.change.password";
import { buttonTypes } from "@modules/general/types/buttons";
import { postChangeUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { RegistroGoogleSchema } from "@modules/usuarios/utils/form/register.google";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { getGenderArray } from "@modules/usuarios/utils/usuario.map";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
// import { useNavigate } from "react-router";

/**
 * NewEntriesView Component
 *
 * Allows users to complete their profile information after registering with Google.
 * It provides a form to input missing details such as the institution's start date, gender,
 * and password, with validation and submission handling.
 *
 * Features:
 * - Displays a dialog informing users of missing profile information.
 * - Provides a form to complete profile information, including start date, gender, and password.
 * - Handles password confirmation and validation.
 * - Submits the updated user information to the backend.
 *
 * @component
 */
function NewEntriesView() {
//   const navigate = useNavigate();

//   const example = { confirmarContrasenia: "", contrasenia: "", estFechaInicio: "", sexo: "M" };

  const { control, register, handleSubmit, formState } = useForm<UsuarioSchema>({
    defaultValues: {
      confirmarContrasenia: "",
      contrasenia: "",
      estFechaInicio: "",
      sexo: "M",
    },
    resolver: zodResolver(RegistroGoogleSchema),
  });

  const { token, id } = useAuth().accountInformation;

  const { handleAccept, message, open, showDialog, title, type } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const { errors } = formState;

  useEffect(() => {
    if (localStorage.getItem(VARIABLES_LOCAL_STORAGE.NEW_GOOGLE_REGISTER) == "TRUE" || true)
      showDialog({
        onAccept: () => {
          handleOpenModal();
        },
        message:
          "Se ha realizado tu registro con una cuenta de Google, requerimos que completes de tu información de perfil faltante para que todo esté correcto 😄",
        type: "success",
        reload: false,
        title: "Registro Con Google",
      });
  }, []);

  const { mutate: mutateChangeInformation } = useMutation({
    mutationFn: async (user: UsuarioSchema) => {
      await postChangeUsuarioService(id, token, user);
      await postChangePassword(
        {
          contrasenia: user.contrasenia ?? "",
          nuevaContrasenia: user.confirmarContrasenia ?? "",
          correo: user.correo,
        },
        token
      );
    },
    onError: (error) => setError(error),
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
      <Modal handleClose={handleCloseModal} open={openModal} sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Typography variant="h4" textAlign={"center"}>
              Registro de Información Restante
            </Typography>
            <TextField
              type="date"
              {...register("estFechaInicio")}
              error={!!errors.estFechaInicio}
              helperText={errors.estFechaInicio?.message}
              label="Fecha de Ingreso a la institución"
              InputLabelProps={{ shrink: true }}
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
                >
                  {getGenderArray.map(([value, key]) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextFieldPassword
              type="password"
              placeholder="Contraseña"
              error={!!errors.contrasenia}
              {...register("contrasenia")}
              helperText={errors.contrasenia?.message}
              label="Contraseña"
            />

            <TextFieldPassword
              type="password"
              {...register("confirmarContrasenia")}
              placeholder="Confirmar Contraseña"
              error={!!errors.confirmarContrasenia}
              helperText={errors.confirmarContrasenia?.message}
              label="Confirmar Contraseña"
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
