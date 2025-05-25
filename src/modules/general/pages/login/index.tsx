import {
  Avatar,
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { labelLogin } from "@modules/general/enums/labelLogin";
import { rutasGeneral } from "@modules/general/router/routes";
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
import { useForm } from "react-hook-form";
import { LoginSchema } from "@modules/general/utils/form/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Renders the copyright footer.
 * @returns {JSX.Element} The copyright text component.
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Fireploy™ "}
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

  const { handleAccept, message, open, title, showDialog, type } = useAlertDialog2();
  const { setError } = useErrorReader(showDialog);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => postSignUp(getValues("email"), getValues("password")),
    mutationKey: ["Iniciar Sesion", getValues("email"), getValues("password")],
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

  const onSubmit = () => {
    mutate();
  };

  return (
    <Card sx={{ padding: 2, maxWidth: 600, marginX: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertDialog
          handleAccept={handleAccept}
          open={open}
          title={title}
          textBody={message}
          type={type}
        />
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
          fullWidth
          id="email"
          label={labelLogin.correoElectronico}
          autoComplete="email"
          autoFocus
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextFieldPassword
          variant="outlined"
          margin="normal"
          fullWidth
          label={labelLogin.contrasenia}
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Stack spacing={2}>
          <Stack sx={{ alignItems: "center" }}>
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
            loading={isPending}
          >
            {labelLogin.ingresar}
          </Button>
          <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
            <Link href={rutasGeneral.recuperar} sx={{ color: "black" }} variant="body2">
              {labelLogin.olvide}
            </Link>
            <Link href={rutasGeneral.registrar} sx={{ color: "black" }} variant="body2">
              {labelLogin.registrarse}
            </Link>
          </Stack>
          <Copyright />
        </Stack>
      </form>
    </Card>
  );
};

export default SignIn;
