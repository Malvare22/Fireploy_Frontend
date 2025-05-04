import AnimatedCard from "@modules/general/components/animatedCard";
import { Alert, Button, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import InputIcon from "@mui/icons-material/Input";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Curso } from "@modules/materias/types/curso";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { AccountInformation, useAuth } from "@modules/general/context/accountContext";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

type CardCursoProps = {
  curso: Curso;
  onClick: () => void;
  userType: AccountInformation["tipo"];
  isRegister?: boolean;
};

const CardCurso: React.FC<CardCursoProps> = ({ curso, onClick, userType, isRegister }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  const labelText = () => {
    if (userType == "E") isRegister ? labelCardCurso.inscrito : labelCardCurso.inscribirme;

    if (userType == "D" && curso.docente == null) {
      return "Solicitar Curso";
    }

    return "Acceder";
  };

  /**
   * Un docente no puede solicitar un curso ya ocupado por otro docente
   */
  const buttonDisable = () => {
    return userType == "D" && curso.docente != null && curso.docente.id != id;
  };

  return (
    <AnimatedCard sx={{height: '100%'}}>
      <Stack justifyContent={"space-between"} sx={{ padding: 3, height: '100%' }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{}}>
          {`${labelCardCurso.grupo}: ${curso.grupo}`}
        </Typography>
        <Alert
          iconMapping={{
            info: <Tooltip title='Docente del grupo'><CastForEducationIcon fontSize="medium" /></Tooltip>,
          }}
          severity="info"
        >
          <Typography>
            {curso.docente != null ? curso.docente.nombre : labelCardCurso.docenteSinAsignar}
          </Typography>
        </Alert>
        <Stack alignItems={"end"}>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: isRegister
                ? theme.palette.terciary.main
                : theme.palette.primary.main,
            }}
            disabled={buttonDisable()}
            endIcon={isRegister ? <LoginIcon /> : <InputIcon />}
            onClick={
              isRegister || userType == "A"
                ? () => navigate(rutasMaterias.verCurso.replace(":idCurso", curso.id ?? "-1"))
                : onClick
            }
          >
            {labelText()}
          </Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardCurso;
