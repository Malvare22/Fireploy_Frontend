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
import { rutasGeneral } from "@modules/general/router/router";
import {
  AccountContext,
  AccountInformation,
} from "@modules/general/context/accountContext";
import { queryIniciarSesion } from "@modules/general/services/iniciarSesion";
import { obtenerLetraTiposUsuario } from "@modules/usuarios/utils/usuario.map";
import { TiposUsuario } from "@modules/usuarios/types/usuario.tipos";

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

  const iniciarSesion = async () => {
    const exist = await queryIniciarSesion(cuenta.correo, cuenta.contrasenia);
    if (exist.error == undefined && exist.data) {
      setMessage(LabelSesion.sesionIniciada);
      setSuccess(true);
      const {
        nombre: _nombre,
        access_token: _access_token,
        tipo: _tipo,
        foto: _foto,
        id: _id,
      } = exist.data;
      const accountInformation: AccountInformation = {
        nombre: _nombre,
        token: _access_token,
        tipo: obtenerLetraTiposUsuario.get(_tipo) as TiposUsuario,
        foto: _foto,
        id: _id
      };
      if (setLocalUser) {
        setLocalUser(accountInformation);
        setView(true);
        localStorage.setItem("ACCOUNT", JSON.stringify(accountInformation));
        navigate(rutasGeneral.home);
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
                  onClick={() => navigate(rutasGeneral.registrar)}
                >
                  Crear una cuenta
                </Link>
              </Box>
              <Box sx={{ marginLeft: { md: 3 }, marginTop: { xs: 3, md: 0 } }}>
                <Link
                  component={"button"}
                  onClick={() => navigate(rutasGeneral.recuperar)}
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
