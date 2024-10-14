import { Box, Button, Input, Typography } from "@mui/material";
import { LoginLabel } from "../../enums";
import { styles } from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoFireploy from "../../assets/LogoFireploy.png";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usersData } from "../../../users/utils/dataDummy/usersDataDummy";
import { useContext } from "react";
import { SnackBarContext } from "../../context/snackbarContext";
import { z } from "zod";

const zLogin = z.object({
  email: z.string(),
  password: z.string()
});

export default function Index() {
  const {
    register,
    handleSubmit,
  } = useForm<z.infer<typeof zLogin>>({
    resolver: zodResolver(zLogin),
  });

  const router = useNavigate();

  const { setMessage, setSuccess, setView } = useContext(SnackBarContext);

  const sendQuery: SubmitHandler<z.infer<typeof zLogin>>  = (d) => {
    const user = usersData.find((u) => u.email === d.email);

    if (user) {
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("email", user.email);
      localStorage.setItem("code", user.code.toString());
      localStorage.setItem("userName", user.name + ' ' + user.lastName);
      setSuccess(true);
      setMessage("Bien :D");
      setView(true);
      router('/myProjects');
    } else {
      setSuccess(false);
      setMessage(LoginLabel.failNotification);
      setView(true);
    }
  };

  return (
    <form onSubmit={handleSubmit((d) => sendQuery(d))}>
      <Box sx={styles.container}>
        <Box sx={styles.imgContainer}>
          <Box sx={styles.polygon}></Box>
          <Box sx={styles.img}>
            <img
              style={{
                width: "400px",
              }}
              src={LogoFireploy}
            ></img>
          </Box>
        </Box>
        <Box sx={styles.formContainer}>
          <Typography variant="h1" color="white" sx={styles.title}>
            {LoginLabel.title}
          </Typography>

          <Box sx={styles.form}>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {LoginLabel.email}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              <Input sx={styles.input} {...register("email")}></Input>
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {LoginLabel.password}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              <Input sx={styles.input} {...register("password")}></Input>
            </Typography>
            <Box sx={styles.buttonsContainer}>
              <Button
                startIcon={<GoogleIcon />}
                sx={styles.googleButton}
                variant="contained"
              >
                {LoginLabel.googleText}
              </Button>
              <Button
                sx={styles.button}
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                color="error"
                type="submit"
              >
                {LoginLabel.startSession}
              </Button>
            </Box>
          </Box>

          <Box sx={styles.footer}>
            <Typography
              variant="h6"
              component={Link}
              to={"/forgetPassword"}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {LoginLabel.forgetPassword}
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to={"/register"}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {LoginLabel.createUser}
            </Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
