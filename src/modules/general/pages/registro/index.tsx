import { zodResolver } from "@hookform/resolvers/zod";
import { rutasGeneral } from "@modules/general/router/routes";
import { getCurrentDate } from "@modules/general/utils/fechas";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Grid2,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
import { postSignUpWithGoogle, SignUpResponse } from "@modules/general/services/post.signUp";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser } from "@modules/general/utils/account";
import { rutasProyectos } from "@modules/proyectos/router";
import { useState } from "react";

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
  } = useForm<UsuarioSchema>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: usuarioTemplate,
  });

  const navigate = useNavigate();

  function onSuccess(data: SignUpResponse) {
    loginUser(data);
    navigate(rutasProyectos.menu);
  }

  const { mutate: mutateGoogle } = useMutation({
    mutationFn: (googleToken: string) => postSignUpWithGoogle(googleToken),
    onSuccess: (data) => onSuccess(data),
    onError: (error) => setError(error),
  });

  /**
   * Navigates to the login page after successful registration.
   */
  const successAction = () => {
    navigate(rutasGeneral.login);
  };

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const [checked, setChecked] = useState<boolean>(false);

  /**
   * Handles the registration mutation.
   * Displays success or error dialog based on the result.
   */
  const { mutate, isPending } = useMutation({
    mutationKey: ["Register Student"],
    mutationFn: () => postCreateUsuarioService("", getValues() as Usuario),
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
    <Stack alignItems={"center"} justifyContent={"center"}>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Card sx={{ maxWidth: 800, padding: 4 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          {/* Row 1: First Name and Last Name */}
          <Grid2 container spacing={4}>
            <Grid2
              size={12}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Typography variant="h4" textAlign={"center"}>
                {labelUsuario.registrarUsuario}
              </Typography>
              <AssignmentIndIcon fontSize="large" />
            </Grid2>
            <Grid2 size={12}>
              <Alert sx={{ display: "flex", alignItems: "center", gap: 3 }} severity="info">
                <Stack
                  direction={{ md: "row", xs: "column" }}
                  spacing={2}
                  alignItems={{ md: "center" }}
                  sx={{ overflow: "hidden" }}
                >
                  <Typography>¿Deseas crear tu cuenta con Google?</Typography>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential)
                        mutateGoogle(credentialResponse.credential);
                    }}
                  />
                </Stack>
              </Alert>
            </Grid2>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextField
                label="Nombres"
                type="text"
                error={!!errors.nombres}
                helperText={errors.nombres?.message}
                {...register("nombres")}
                fullWidth
              />
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextField
                label="Apellidos"
                type="text"
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
                {...register("apellidos")}
                fullWidth
              />
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextField
                label="Correo"
                type="email"
                error={!!errors.correo}
                helperText={errors.correo?.message}
                {...register("correo")}
                fullWidth
              />
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
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
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
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
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
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
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextFieldPassword
                label="Contraseña"
                type="password"
                error={!!errors.contrasenia}
                helperText={errors.contrasenia?.message}
                {...register("contrasenia")}
                fullWidth
              />
            </Grid2>

            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextFieldPassword
                label="Confirmar Contraseña"
                type="password"
                error={!!errors.confirmarContrasenia}
                helperText={errors.confirmarContrasenia?.message}
                {...register("confirmarContrasenia")}
                fullWidth
              />
            </Grid2>
            <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
              <Typography variant="body2">{"He leído y acepto las "}</Typography>
              <Link sx={{ marginLeft: 0.5 }} target='_blank' href="http://fireploy.online:3001/docs/politicas-de-servicio" color="inherit">
                <Typography variant="body2">{"políticas de uso y privacidad"}</Typography>
              </Link>
              <Typography variant="body2" sx={{ marginLeft: 0.5 }}>{"del servicio de Fireploy"}</Typography>
            </Box>
            {/* Buttons */}
            <Grid2 size={12} sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Box>
                <Button variant="outlined" onClick={() => navigate(rutasGeneral.login)}>
                  {labelRegisterUser.back}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" loading={isPending} disabled={!checked} type="submit">
                  {labelRegisterUser.register}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </Stack>
  );
  return <></>;
}

export default Registrar;
