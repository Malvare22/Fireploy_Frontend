import FormContainer from "@modules/general/components/formContainer";
import { Box, Button, Link, Typography } from "@mui/material";
import { gapi, loadAuth2 } from "gapi-script";
import { useContext, useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Logo from "@modules/general/assets/LogoFireploy.png";
import { SnackBarContext } from "@modules/general/context/snackbarContext";
import CustomInput from "@modules/general/components/customInput";
import { LabelSesion } from "@modules/general/enums/snackbar";
import { AccountContext } from "@modules/context/accountContext";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";

const Login = () => {
  const clientID =
    "638667794967-iksel85rm915d7up5e8oq4f0ahusjmoq.apps.googleusercontent.com";

  useEffect(() => {
    loadAuth2(gapi, clientID, "");
  }, []);

  const navigate = useNavigate();

  const { setMessage, setSuccess, setView } = useContext(SnackBarContext);

  const [cuenta, setCuenta] = useState({
    correo: "",
    contrasenia: "",
  });

  const context = useContext(AccountContext);

  const setLocalUser = context != undefined ? context.setLocalUser : undefined;

  const iniciarSesion = () => {
    const exist = usuariosPrueba.find(
      (usuario) =>
        usuario.correo == cuenta.correo &&
        usuario.contrasenia == cuenta.contrasenia
    );
    if (exist) {
      setMessage(LabelSesion.sesionIniciada);
      setSuccess(true);
      localStorage.setItem("TOKEN", "true");
      if (setLocalUser) {
        setLocalUser(JSON.stringify(exist));
        setView(true);
        localStorage.setItem("USER", JSON.stringify(exist));
        navigate("/");
      }
    } else {
      setMessage(LabelSesion.sesionErrada);
      setSuccess(false);
      setView(true);
    }
  };

  const handleInput = (key: keyof typeof cuenta, value: string) => {
    setCuenta({ ...cuenta, [key]: value });
  };

  return (
    <FormContainer
      sx={{
        width: "60%",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          iniciarSesion();
        }}
      >
        <Box
          sx={{
            display: { md: "flex" },
          }}
        >
          {/* form */}
          <Box
            sx={{
              width: { md: "80%" },
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h5Bold">Correo Electrónico</Typography>
            </Box>
            <Box>
              <CustomInput
                type="email"
                required
                value={cuenta["correo"]}
                onChange={(e) => handleInput("correo", e.target.value)}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">Contraseña</Typography>
            </Box>
            <Box>
              <CustomInput
                type="password"
                required
                value={cuenta["contrasenia"]}
                onChange={(e) => handleInput("contrasenia", e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: { md: "flex" },
                justifyContent: "center",
                "& div": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <Box>
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </Box>
              <Box
                sx={{
                  "& button": {
                    borderRadius: "50px !important",
                    overflow: "hidden",
                    marginLeft: { md: 3 },
                    marginTop: { xs: 3, md: 0 },
                  },
                }}
              >
                <GoogleLogin
                  clientId={clientID}
                  onSuccess={() => alert("modificante")}
                  onFailure={() => alert("D:")}
                  cookiePolicy="single_host_policy"
                ></GoogleLogin>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: { md: "flex" },
                justifyContent: "center",
                "& button": {
                  textDecoration: "none",
                  color: "black",
                },
                "& div": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <Box>
                <Link
                  component={"button"}
                  onClick={() => navigate("/register")}
                >
                  Crear una cuenta
                </Link>
              </Box>
              <Box sx={{ marginLeft: { md: 3 }, marginTop: { xs: 3, md: 0 } }}>
                <Link
                  component={"button"}
                  onClick={() => navigate("/recovery")}
                >
                  Olvidé mi contraseña
                </Link>
              </Box>
            </Box>
          </Box>
          {/* imagen */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Box
              component={"img"}
              sx={{
                maxHeight: { md: 400, xs: 200 },
              }}
              src={Logo}
            ></Box>
          </Box>
        </Box>
      </form>
    </FormContainer>
  );
};

export default Login;
