import {
  Avatar,
  Box,
  Button,
  Card,
  CssBaseline,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { labelLogin } from "@modules/general/enums/labelLogin";
import { rutasGeneral } from "@modules/general/router/router";
import { postSignUp, SignUpResponse } from "@modules/general/services/post.signUp";
import AlertDialog from "@modules/general/components/alertDialog";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";
import { useMutation } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import TextFieldPassword from "@modules/general/components/textFieldPassword";

/**
 * Renders the copyright footer.
 * @returns {JSX.Element} The copyright text component.
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/**
 * SignIn component handles user login functionality.
 * Displays login form with email and password fields.
 * Handles authentication request and redirects on success.
 *
 * @component
 * @returns {JSX.Element} The login form component.
 */
const SignIn: React.FC = () => {
  const theme = useTheme();

  /** 
   * Represents the login credentials 
   */
  type SignUp = {
    email: string;
    password: string;
  };

  const [singUp, setSingUp] = useState<SignUp>({ email: "", password: "" });

  /**
   * Handles input change for form fields
   * @param key Field name
   * @param value Field value
   */
  const handleInput = (key: keyof SignUp, value: string) => {
    setSingUp({ ...singUp, [key]: value });
  };

  /**
   * Performs login mutation using email and password.
   * Shows error dialog if authentication fails.
   */
  const { mutate, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: () => postSignUp(singUp.email, singUp.password),
    onError: () => setOpen(true),
    mutationKey: ['iniciar sesion']
  });

  const navigate = useNavigate();
  const { open, setOpen } = useAlertDialog();

  /**
   * Handles successful login by storing token and navigating.
   * @param data SignUpResponse from backend
   */
  const onSuccess = (data: SignUpResponse) => {
    localStorage.setItem("TOKEN", data.access_token);
    localStorage.setItem("CURRENT_ID", data.id.toString());

    navigate(rutasProyectos.listar);
  };

  /**
   * Executes success handler when mutation result is available.
   */
  useEffect(() => {
    if (isSuccess && data) onSuccess(data);
  }, [isSuccess, data]);

  return (
    <Card sx={{ padding: 2, maxWidth: 600 }}>
      {isError && (
        <AlertDialog
          textBody="Combinación de Usuario y Contraseña no encontrados en el sistema"
          open={open}
          title="Iniciar Sesión"
          handleAccept={() => setOpen(false)}
        />
      )}
      <CssBaseline />
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {labelLogin.iniciarSesion}
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={labelLogin.correoElectronico}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => handleInput("email", e.target.value)}
        />
        <TextFieldPassword
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={labelLogin.contrasenia}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => handleInput("password", e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginY: 3 }}
          onClick={() => mutate()}
          loading={isPending}
        >
          {labelLogin.ingresar}
        </Button>
        <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Link href={rutasGeneral.recuperar} variant="body2">
            {labelLogin.olvide}
          </Link>
          <Link href={rutasGeneral.registrar} variant="body2">
            {labelLogin.registrarse}
          </Link>
        </Stack>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Card>
  );
};

export default SignIn;
