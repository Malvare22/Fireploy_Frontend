import { zodResolver } from "@hookform/resolvers/zod";
import { rutasGeneral } from "@modules/general/router/routes";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { useParams } from "react-router";
import { CambiarContrasenaSchema } from "@modules/usuarios/utils/form/cambiarContrasenia";
import { postChangePasswordForget } from "@modules/general/services/post.change.password";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { labelRestorePassword } from "@modules/general/enums/labelRestorePassword";

/**
 * ReestablecerContrasenia component – handles the password reset process for users
 * who have requested a password change via a token-based reset link.
 * 
 * Uses React Hook Form for form handling, Zod for validation, React Query for mutation,
 * and custom hooks for displaying alerts and handling errors.
 * 
 * Provides user feedback upon success or failure and redirects to the login screen after a successful password reset.
 * 
 * @component
 * 
 * @returns {a password reset form with validation, API submission, and UI feedback}
 * 
 * @example
 * ```tsx
 * <Route path="/auth/restore/:token" element={<ReestablecerContrasenia />} />
 * ```
 */
function ReestablecerContrasenia() {
  const { token } = useParams();

  /** 
   * Type for form values based on Zod schema.
   * @typedef {Object} FormType
   */
  type FormType = z.infer<typeof CambiarContrasenaSchema>;

  /**
   * Form configuration using React Hook Form and Zod validation schema.
   */
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

  /** React Router navigation instance */
  const navigate = useNavigate();

  /** Custom hook for managing alert dialog state and actions */
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  /** Custom hook for error handling and display */
  const { setError } = useErrorReader(showDialog);

  /**
   * Mutation for submitting password reset request.
   * Handles success and error scenarios.
   */
  const { mutate, isPending } = useMutation({
    mutationKey: ["Restore Password User", getValues("correo")],
    mutationFn: () => postChangePasswordForget(getValues(), token ?? ""),
    onSuccess: () =>
      showDialog({
        message: "Contraseña reestablecida Correctamente",
        onAccept: () => navigate(rutasGeneral.login),
        title: "Cambiar Contraseña",
        type: "success",
      }),
    onError: (error) => {
      setError(error);
    },
  });

  /**
   * Submits the password reset form.
   * @function
   */
  const onSubmit = async () => {
    await mutate();
  };

  return (
    <Card sx={{ border: '3px solid black', maxWidth: 800, padding: 3}}>
      {/* Alert dialog for confirmation or error messages */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Contraseña nueva"
              type="password"
              error={!!errors.contrasenia}
              helperText={errors.contrasenia?.message}
              {...register("contrasenia")}
              fullWidth
            />

            {/* New password input */}
            <TextFieldPassword
              label="Confirmar nueva contraseña"
              type="password"
              error={!!errors.nuevaContrasenia}
              helperText={errors.nuevaContrasenia?.message}
              {...register("nuevaContrasenia")}
              fullWidth
            />

            {/* Form actions */}
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button variant="outlined" onClick={() => navigate(rutasGeneral.login)}>
                {labelRestorePassword.back}
              </Button>
              <Button type="submit" variant="contained" disabled={isPending}>
                {labelRestorePassword.restorePassword}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

export default ReestablecerContrasenia;