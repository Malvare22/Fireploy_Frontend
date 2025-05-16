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
import React, { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { labelLogin } from "@modules/general/enums/labelLogin";
import { rutasGeneral } from "@modules/general/router/router";
import {
  postSignUp,
  postSignUpWithGoogle,
  SignUpResponse,
} from "@modules/general/services/post.signUp";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";
import { useMutation } from "@tanstack/react-query";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { GoogleLogin } from "@react-oauth/google";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { loginUser } from "@modules/general/utils/account";

/**
 * Renders the copyright footer.
 * @returns {JSX.Element} The copyright text component.
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Fireploy
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

  const { handleAccept, message, open, title, showDialog, type } = useAlertDialog2();
  const { setError } = useErrorReader(showDialog);

  const [singUp, setSingUp] = useState<SignUp>({ email: "", password: "" });

  const handleInput = (key: keyof SignUp, value: string) => {
    setSingUp({ ...singUp, [key]: value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => postSignUp(singUp.email, singUp.password),
    mutationKey: ["Iniciar Sesion", singUp.email, singUp.password],
    onSuccess: (data) => onSuccess(data),
    onError: (error) => setError(error),
  });

  const { mutate: mutateGoogle } = useMutation({
    mutationFn: (googleToken: string) => postSignUpWithGoogle(googleToken),
    mutationKey: ["Login with Google"],
    onSuccess: (data) => onSuccess(data),
    onError: (error) => setError(error),
  });

  const navigate = useNavigate();

  /**
   * Handles successful login by storing token and navigating.
   * @param data SignUpResponse from backend
   */
  const onSuccess = (data: SignUpResponse) => {
    loginUser(data);
    navigate(rutasProyectos.menu);
  };

  return (
    <Card sx={{ padding: 2, maxWidth: 600, marginX: 3 }}>
      <CssBaseline />
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
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
            <LockOpenIcon sx={{ fill: "white" }} />
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
        <Stack sx={{ alignItems: "center", marginY: 1 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) mutateGoogle(credentialResponse.credential);
            }}
          />
        </Stack>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginY: 2 }}
          onClick={() => mutate()}
          loading={isPending}
        >
          {labelLogin.ingresar}
        </Button>
        <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Link href={rutasGeneral.recuperar} sx={{color: 'black'}} variant="body2">
            {labelLogin.olvide}
          </Link>
          <Link href={rutasGeneral.registrar} sx={{color: 'black'}} variant="body2">
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
