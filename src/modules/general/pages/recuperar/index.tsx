import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { rutasGeneral } from "@modules/general/router/routes";
import { postSendEmail } from "@modules/general/services/post.send.email";
import { CorreoSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { Button, Typography, TextField, Stack, Card, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

/**
 * Type for form data based on the Zod schema.
 * @typedef {Object} FormData
 */
type FormData = z.infer<typeof CorreoSchema>;

/**
 * Password recovery form component.
 * Allows users to request a verification code by providing a valid email.
 * Displays success and error dialogs based on the result of the request.
 *
 * @component
 */
function RecuperarContrasenia() {
  /**
   * React Hook Form setup using Zod schema for validation.
   */
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(CorreoSchema),
    defaultValues: { correo: "" },
  });

  /** Dialog management hook for showing feedback messages */
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  /** Hook to handle and parse backend errors */
  const { setError } = useErrorReader(showDialog);

  /** Navigation instance to redirect user */
  const navigate = useNavigate();

  /**
   * Mutation to send email for password recovery.
   * Displays success or error messages accordingly.
   */
  const { mutate, isPending } = useMutation({
    mutationFn: () => postSendEmail(getValues().correo),
    mutationKey: ["Request Recovery Password to Email", getValues().correo],
    onError: (error) => setError(error),
    onSuccess: () =>
      showDialog({
        title: "Recuperar contraseña",
        message: "Se ha enviado un correo de recuperación al correo electrónico ingresado",
        onAccept: () => navigate(rutasGeneral.login),
      }),
  });

  /**
   * Form submission handler.
   * Triggers email sending mutation on valid data.
   *
   * @function
   */
  const onSubmit = () => {
    mutate();
  };

  return (
    <>
      {/* Alert dialog for success/error messages */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

      <Card sx={{ marginX: {md: 30, xs: 3}}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5} sx={{ paddingX: 4 }}>
            {/* Title */}
            <Typography variant="h5" align="center" gutterBottom>
              ¿Has olvidado tu contraseña?
            </Typography>

            {/* Instructional text */}
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

            <Stack alignItems={"center"} direction={{md:"row", xs: 'column'}} justifyContent={"center"} spacing={2}>
              {/* Submit button */}
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isPending}
                  sx={{ width: 200 }}
                >
                  Siguiente
                </Button>
              </Box>

              {/* Back to login button */}
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => navigate(rutasGeneral.login)}
                  sx={{
                    width: 200,
                  }}
                >
                  Volver
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
      </Card>
    </>
  );
}

export default RecuperarContrasenia;
