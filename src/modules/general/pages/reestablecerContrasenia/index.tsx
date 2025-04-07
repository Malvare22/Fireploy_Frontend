import { zodResolver } from "@hookform/resolvers/zod";
import { rutasGeneral } from "@modules/general/router/router";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useMutation } from "@tanstack/react-query";
import AlertDialogError from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import { z } from "zod";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { labelGeneral } from "@modules/general/enums/labelGeneral";
import { useParams } from "react-router";
import { CambiarContrasenaSchema } from "@modules/usuarios/utils/form/cambiarContrasenia";
import { postChangePasswordForget } from "@modules/general/services/post.change.password";

/**
 * Password reset component used for users who forgot their current password.
 * It allows users to provide their email, current password, and a new password.
 * Handles validation, feedback dialogs, and server interaction.
 *
 * @component
 */
function ReestablecerContrasenia() {
  const { token } = useParams();

  type FormType = z.infer<typeof CambiarContrasenaSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormType>({
    resolver: zodResolver(CambiarContrasenaSchema),
    defaultValues: {
      correo: "",
      contrasenia: "",
      nuevaContrasenia: "",
    },
  });

  const navigate = useNavigate();

  // Error dialog control
  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  // Success dialog control
  const { handleOpen: handleOpenSuccess, open: openSuccess } = useAlertDialog();

  // Mutation to send password change request
  const { error, mutate, isPending } = useMutation({
    mutationKey: ["ReestablecerContrasenia usuario"],
    mutationFn: () => postChangePasswordForget(getValues(), token ?? ""),
    onSuccess: handleOpenSuccess,
    onError: handleOpenError,
  });

  /**
   * Submits the password reset form.
   */
  const onSubmit = async () => {
    await mutate();
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 4 }}>
      {/* Error alert dialog */}
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseError}
          open={openError}
          title="Cambio de Contraseña"
        />
      )}

      {/* Success alert dialog */}
      <AlertDialogSuccess
        message="Contraseña actualizada correctamente"
        handleClose={() => navigate(rutasGeneral.login)}
        open={openSuccess}
        title="Cambio de Contraseña"
        reload={false}
      />

      <Stack spacing={3}>
        {/* Header with icon */}
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography variant="h4" textAlign={"center"}>
            {labelUsuario.cambiarContrasenia}
          </Typography>
          <AssignmentIndIcon fontSize="large" />
        </Stack>

        {/* Password reset form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack spacing={4}>
            {/* Email input */}
            <TextField
              label="Correo"
              type="email"
              error={!!errors.correo}
              helperText={errors.correo?.message}
              {...register("correo")}
              fullWidth
            />

            {/* Current password input */}
            <TextFieldPassword
              label="Contraseña actual"
              type="password"
              error={!!errors.contrasenia}
              helperText={errors.contrasenia?.message}
              {...register("contrasenia")}
              fullWidth
            />

            {/* New password input */}
            <TextFieldPassword
              label="Nueva contraseña"
              type="password"
              error={!!errors.nuevaContrasenia}
              helperText={errors.nuevaContrasenia?.message}
              {...register("nuevaContrasenia")}
              fullWidth
            />

            {/* Form actions */}
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="outlined" onClick={() => navigate(rutasGeneral.login)}>
                {labelGeneral.volver}
              </Button>
              <Button type="submit" variant="contained" disabled={isPending}>
                {labelUsuario.cambiarContrasenia}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

export default ReestablecerContrasenia;
