import FormContainer from "@modules/general/components/formContainer";
import { Box, Button, Link, Typography } from "@mui/material";
import { gapi, loadAuth2 } from "gapi-script";
import { useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Logo from "@modules/general/assets/LogoFireploy.png";
import { SnackBarContext } from "@modules/general/context/snackbarContext";
import CustomInput from "@modules/general/components/customInput";

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

  const { setMessage, setSuccess, setView } = useContext(SnackBarContext);

  const onSend = () => {
    setMessage("A");
    setSuccess(true);
    setView(true);
  };

  return (
    <FormContainer
      sx={{
        width: "60%",
      }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
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
              <CustomInput type="email" required />
            </Box>
            <Box>
              <Typography variant="h5Bold">Contraseña</Typography>
            </Box>
            <Box>
              <CustomInput type="password" required />
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
                  onSuccess={onSuccess}
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
