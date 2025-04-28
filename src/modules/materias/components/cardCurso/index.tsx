import AnimatedCard from "@modules/general/components/animatedCard";
import { Button, Card, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import InputIcon from "@mui/icons-material/Input";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Curso } from "@modules/materias/types/curso";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { useAuth } from "@modules/general/context/accountContext";

type CardCursoProps = {
  curso: Curso;
  onClick: () => void;
  isRegister: boolean;
  type: "student" | "teacher";
};

const CardCurso: React.FC<CardCursoProps> = ({ curso, onClick, isRegister, type }) => {
  const theme = useTheme();

  // let docente: undefined | UsuarioPortafolioCard = undefined;

  const navigate = useNavigate();

  const {id} = useAuth().accountInformation;

  // if(curso.docente){
  //   docente =  adaptarUsuarioAUsuarioCardPortafolio(curso.docente);
  // }

  const label = () => {
    if (type == "teacher") {
      if (curso.docente == null) {
        return "Solicitar Curso";
      }
      else return 'Acceder'
    }
    return isRegister ? labelCardCurso.inscrito : labelCardCurso.inscribirme;
  };

  console.log(curso)

  return (
    <AnimatedCard>
      <Stack justifyContent={"space-between"} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{}}>
          {`${labelCardCurso.grupo}: ${curso.grupo}`}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography>
            {curso.docente != null ? curso.docente.nombre : labelCardCurso.docenteSinAsignar}
          </Typography>
          <Card
            sx={{
              paddingX: 1,
              backgroundColor: theme.palette.terciary.main,
              color: "white",
              fontWeight: 500,
            }}
          >
            {/* {docente && <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <ProjectCardAvatar
                usuario={docente}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2">{docente.nombres}</Typography>
            </Stack>} */}
          </Card>
        </Stack>
        {/* <Card sx={{ padding: 2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>{`${labelCardCurso.secciones}: ${curso.secciones.length}`}</Typography>
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "black", height: 40 }}
            />
            <Typography>{`${labelCardCurso.estudiantes}: ${curso.estudiantes.length}`}</Typography>
          </Stack>
        </Card> */}
        <Stack alignItems={"end"}>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: isRegister
                ? theme.palette.terciary.main
                : theme.palette.primary.main,
            }}
            disabled={type == "teacher" && curso.docente != null && curso.docente.id != id}
            endIcon={isRegister ? <LoginIcon /> : <InputIcon />}
            onClick={
              isRegister
                ? () => navigate(rutasMaterias.verCurso.replace(":idCurso", curso.id ?? "-1"))
                : onClick
            }
          >
            {label()}
          </Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardCurso;
