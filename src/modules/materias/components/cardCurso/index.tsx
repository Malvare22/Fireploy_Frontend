import AnimatedCard from "@modules/general/components/animatedCard";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import InputIcon from "@mui/icons-material/Input";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { AccountInformation, useAuth } from "@modules/general/context/accountContext";
import { rutasUsuarios } from "@modules/usuarios/router/router";

type CardCursoProps = {
  curso: Curso;
  onClick: () => void;
  userType: AccountInformation["tipo"];
  isRegister?: boolean;
};

const CardCurso: React.FC<CardCursoProps> = ({ curso, onClick, userType, isRegister }) => {
  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  const theme = useTheme();

  const buttonText = () => {
    if (userType == "E") return isRegister ? "Acceder" : labelCardCurso.inscribirme;

    if (userType == "D" && curso.docente == null) {
      return "Solicitar Curso";
    }

    return "Acceder";
  };

  function handleButton() {
    if (isRegister || userType == "A")
      navigate(rutasMaterias.verCurso.replace(":idCurso", curso.id ?? "-1"));
    else onClick();
  }

  /**
   * Un docente no puede solicitar un curso ya ocupado por otro docente
   */
  const buttonDisable = () => {
    return userType == "D" && curso.docente != null && curso.docente.id != id;
  };

  return (
    <Card >
      <Stack spacing={2} sx={{padding: 1}}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding:1 }}>
            <Box sx={{ padding: 2 , backgroundColor: theme.palette.error.main, borderRadius: 2}}>
              <Typography variant="h4" color='white'>{curso.grupo}</Typography>
            </Box>
          </Box>
          <Divider sx={{padding: -2}}/>
        </Box>
        <FrameDocente docente={!curso.docente ? null : (curso.docente as UsuarioCurso)} />
        <Stack alignItems={"end"}>
          <Box>
            <Button disabled={buttonDisable()} variant="outlined" onClick={handleButton}>
              {buttonText()}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardCurso;

type PropsFrameDocente = {
  docente: UsuarioCurso | undefined | null;
};
function FrameDocente({ docente }: PropsFrameDocente) {
  const navigate = useNavigate();

  function onClick() {
    if (docente) navigate(rutasUsuarios.portafolio.replace(":id", docente.id.toString()));
  }

  if (!docente) {
    return <Alert severity="info"><Typography variant="caption">{"No se ha asignado un docente a este curso"}</Typography></Alert>;
  } else
    return (
      <Card>
        <Grid2 container sx={{ padding: 1 }}>
          <Grid2 size={5} sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={docente.nombre}>
              <Button onClick={onClick}>
                <Avatar src={docente.imagen} />
              </Button>
            </Tooltip>
          </Grid2>
          <Grid2 size={7}>
            <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
              {docente.nombre}
            </Typography>
          </Grid2>
        </Grid2>
      </Card>
    );
}
