import FormContainer from "@modules/general/components/formContainer";
import {
  Box,
  Button,
  Input,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { gapi, loadAuth2 } from "gapi-script";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Logo from "@modules/general/assets/LogoFireploy.png";

const Login = () => {
  const clientID =
    "638667794967-iksel85rm915d7up5e8oq4f0ahusjmoq.apps.googleusercontent.com";

  useEffect(() => {
    loadAuth2(gapi, clientID, "");
  }, []);

  const onSuccess = (response: any) => {
    console.log(response);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <FormContainer
        sx={{
          width: "60%",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          {/* form */}
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5Bold">Correo Electrónico</Typography>
            </Box>
            <Box>
              <Input />
            </Box>
            <Box>
              <Typography variant="h5Bold">Contraseña</Typography>
            </Box>
            <Box>
              <Input />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box>
                <Button variant="primary">Iniciar Sesión</Button>
              </Box>
              <Box
                sx={{
                  "& button": {
                    borderRadius: "50px !important",
                    overflow: "hidden",
                    marginLeft: 3
                  },
                }}
              >
                <GoogleLogin
                  clientId={clientID}
                  onSuccess={onSuccess}
                  onFailure={() => alert("D:")}
                  cookiePolicy="single_host_policy"
                ></GoogleLogin>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                "& button": {
                  textDecoration: "none",
                  color: "black",
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
              <Box sx={{ marginLeft: 3 }}>
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
            component={"img"}
            sx={{
              width: "30%",
            }}
            src={Logo}
          ></Box>
        </Box>
      </FormContainer>
    </Box>
  );
};

export default Login;
