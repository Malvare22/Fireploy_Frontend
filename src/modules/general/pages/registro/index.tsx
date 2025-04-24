import { zodResolver } from "@hookform/resolvers/zod";
import { rutasGeneral } from "@modules/general/router/router";
import { getCurrentDate } from "@modules/general/utils/fechas";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { Box, Button, Card, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { Usuario, usuarioTemplate } from "@modules/usuarios/types/usuario";
import { getGender } from "@modules/usuarios/utils/usuario.map";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { useMutation } from "@tanstack/react-query";
import { postCreateUsuarioService } from "@modules/usuarios/services/post.crear.usuario";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import { labelRegisterUser } from "@modules/general/enums/labelRegisterUser";

/**
 * Registrar component renders the user registration form.
 * It handles form validation, submission, and UI feedback.
 *
 * @component
 * @returns {JSX.Element} User registration form component
 */
function Registrar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Usuario>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: usuarioTemplate,
  });

  const navigate = useNavigate();

  /**
   * Navigates to the login page after successful registration.
   */
  const successAction = () => {
    navigate(rutasGeneral.login);
  };

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  /**
   * Handles the registration mutation.
   * Displays success or error dialog based on the result.
   */
  const { mutate, isPending } = useMutation({
    mutationKey: ["registrar estudiante"],
    mutationFn: () => postCreateUsuarioService("", getValues()),
    onSuccess: () =>
      showDialog({
        message: "Usuario Creado Correctamente",
        type: "success",
        onAccept: () => successAction(),
        title: "Usuario Registrado",
      }),
    onError: (error) => setError(error),
  });

  /**
   * Submits the registration form.
   */
  const onSubmit = async () => {
    await mutate();
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 4 }}>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Stack spacing={3}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography variant="h4" textAlign={"center"}>
            {labelUsuario.registrarUsuario}
          </Typography>
          <AssignmentIndIcon fontSize="large" />
        </Stack>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          {/* Row 1: First Name and Last Name */}
          <Stack spacing={4}>
            <TextField
              label="Nombres"
              type="text"
              error={!!errors.nombres}
              helperText={errors.nombres?.message}
              {...register("nombres")}
              fullWidth
            />
            <TextField
              label="Apellidos"
              type="text"
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
              {...register("apellidos")}
              fullWidth
            />

            {/* Row 2: Email and Gender */}
            <TextField
              label="Correo"
              type="email"
              error={!!errors.correo}
              helperText={errors.correo?.message}
              {...register("correo")}
              fullWidth
            />

            <TextField
              label="Sexo"
              select
              error={!!errors.sexo}
              helperText={errors.sexo?.message}
              {...register("sexo")}
              fullWidth
            >
              {Array.from(getGender.entries()).map(([valor, texto]) => (
                <MenuItem key={valor} value={valor}>
                  {texto}
                </MenuItem>
              ))}
            </TextField>

            {/* Row 3: Start Date and Birth Date */}
            <TextField
              label="Fecha de Ingreso"
              type="date"
              error={!!errors.estFechaInicio}
              helperText={errors.estFechaInicio?.message}
              {...register("estFechaInicio")}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: getCurrentDate() }}
              fullWidth
            />
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              error={!!errors.fechaDeNacimiento}
              helperText={errors.fechaDeNacimiento?.message}
              {...register("fechaDeNacimiento")}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: getCurrentDate() }}
              fullWidth
            />

            {/* Row 4: Password and Confirm Password */}
            <TextFieldPassword
              label="Contraseña"
              type="password"
              error={!!errors.contrasenia}
              helperText={errors.contrasenia?.message}
              {...register("contrasenia")}
              fullWidth
            />
            <TextFieldPassword
              label="Confirmar Contraseña"
              type="password"
              error={!!errors.confirmarContrasenia}
              helperText={errors.confirmarContrasenia?.message}
              {...register("confirmarContrasenia")}
              fullWidth
            />

            {/* Buttons */}
            <Stack spacing={2} direction="row" justifyContent="center">
              <Box>
                <Button variant="outlined" type="submit">
                  {labelRegisterUser.register}
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => navigate(rutasGeneral.login)}
                  variant="contained"
                  loading={isPending}
                >
                  {labelRegisterUser.back}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
  return <></>;
}

export default Registrar;
