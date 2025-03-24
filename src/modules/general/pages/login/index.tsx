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
import React, { useContext, useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { labelLogin } from "@modules/general/enums/labelLogin";
import { rutasGeneral } from "@modules/general/router/router";
import useQuery from "@modules/general/hooks/useQuery";
import { postSignUp, SignUpResponse } from "@modules/general/services/signUp";
import AlertDialog from "@modules/general/components/alertDialog";
import { useNavigate } from "react-router-dom";
import {
  AccountContext,
  AccountInformation,
} from "@modules/general/context/accountContext";
import { getUserLetterTypes } from "@modules/usuarios/utils/usuario.map";
import { TiposUsuario } from "@modules/usuarios/types/usuario";

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

const SignIn: React.FC = () => {
  const theme = useTheme();

  type SignUp = {
    email: string;
    password: string;
  };

  const [singUp, setSingUp] = useState<SignUp>({ email: "", password: "" });

  const handleInput = (key: keyof SignUp, value: string) => {
    setSingUp({ ...singUp, [key]: value });
  };

  const { setOpen, initQuery, open, responseData } =
    useQuery<SignUpResponse>(
      () => postSignUp(singUp.email, singUp.password),
      false
    );

  const handleQuery = async () => {
    await initQuery();
  };

  const navigate = useNavigate();

  const setLocalUser = useContext(AccountContext)?.setLocalUser;

  useEffect(() => {
    if (responseData) {
      const _localUser: AccountInformation = {
        foto: responseData.foto,
        id: responseData.id,
        nombre: responseData.nombre,
        tipo: getUserLetterTypes.get(responseData.tipo) as TiposUsuario,
        token: responseData.access_token,
      };
      localStorage.setItem("ACCOUNT", JSON.stringify(_localUser));
      if (setLocalUser) setLocalUser(_localUser);
      navigate("/app/dashboard");
    }
  }, [responseData]);

  return (
    <Card sx={{ padding: 2, maxWidth: 600 }}>
      <AlertDialog
        setOpen={setOpen}
        textBody="Combinación de Usuario y Contraseña no encontrados en el sistema"
        open={open && !responseData}
        title="Iniciar Sesión"
      />
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
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
          onClick={handleQuery}
        >
          {labelLogin.ingresar}
        </Button>
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Link href="#" variant="body2">
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
