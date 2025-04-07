import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialogError from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { rutasGeneral } from "@modules/general/router/router";
import { postSendEmail } from "@modules/general/services/post.send.email";
import { CorreoSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { Button, Typography, TextField, useTheme, Stack, Card } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

type FormData = z.infer<typeof CorreoSchema>;

/**
 * Password recovery form component.
 * Allows users to request a verification code by providing a valid email.
 * Displays success and error dialogs based on the result of the request.
 *
 * @component
 */
function RecuperarContrasenia() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(CorreoSchema),
    defaultValues: { correo: "" },
  });

  const theme = useTheme();
  const navigate = useNavigate();

  // Error dialog management
  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  // Success dialog management
  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  // Mutation to send email for password recovery
  const { mutate, error, isPending } = useMutation({
    mutationFn: () => postSendEmail(getValues().correo),
    mutationKey: ["Solicitar Email"],
    onError: handleOpenError,
    onSuccess: handleOpenSuccess,
  });

  /**
   * Form submission handler.
   * Triggers email sending mutation on valid data.
   *
   * @param data - Form values containing the email.
   */
  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
    mutate();
  };

  return (
    <>
      {/* Success alert dialog */}
      <AlertDialogSuccess
        message="Se ha enviado la solicitud a tu correo"
        title="Recuperar Contraseña"
        handleClose={handleCloseSuccess}
        open={openSuccess}
      />

      {/* Error alert dialog */}
      {error && (
        <AlertDialogError
          error={error}
          title="Recuperar Contraseña"
          handleClose={handleCloseError}
          open={openError}
        />
      )}

      <Card sx={{ maxWidth: 700, display: "flex", alignItems: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} sx={{ paddingX: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              ¿Has olvidado tu contraseña?
            </Typography>

            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
              Enviaremos un código de verificación a este email si coincide con una cuenta de
              Fireploy existente.
            </Typography>

            {/* Email input field */}
            <TextField
              {...register("correo")}
              label="Email"
              error={!!errors.correo}
              helperText={errors.correo?.message}
              fullWidth
            />

            <Stack alignItems={"center"} spacing={2}>
              {/* Submit button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={isPending}
                sx={{
                  width: 200,
                }}
              >
                Siguiente
              </Button>

              {/* Back to login button */}
              <Button
                onClick={() => navigate(rutasGeneral.login)}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  width: 200,
                }}
              >
                Volver
              </Button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </>
  );
}

export default RecuperarContrasenia;
