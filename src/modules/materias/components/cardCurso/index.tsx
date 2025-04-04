import AnimatedCard from "@modules/general/components/animatedCard";
import {
  Button,
  Card,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import InputIcon from '@mui/icons-material/Input';
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Curso } from "@modules/materias/types/curso";

type CardCursoProps = {
  curso: Curso;
};

const CardCurso: React.FC<CardCursoProps> = ({ curso }) => {
  const theme = useTheme();

  let docente: undefined | UsuarioPortafolioCard = undefined;

  // if(curso.docente){
  //   docente =  adaptarUsuarioAUsuarioCardPortafolio(curso.docente);
  // }

  return (
    <AnimatedCard>
      <Stack justifyContent={"space-between"} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{}}>
          {`${labelCardCurso.grupo}: ${curso.grupo}`}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography>{docente ? labelCardCurso.docente : labelCardCurso.docenteSinAsignar}</Typography>
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
          <Button variant="contained" endIcon={<InputIcon />}>{labelCardCurso.inscribirme}</Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardCurso;
