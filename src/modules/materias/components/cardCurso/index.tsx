import AnimatedCard from "@modules/general/components/animatedCard";
import { Materia } from "@modules/materias/types/materia";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import StyleIcon from "@mui/icons-material/Style";
import { CursoMateria } from "@modules/materias/types/materia.curso";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import { ProjectCardAvatar } from "@modules/general/components/avatar";
import {
  adaptarUsuarioAUsuarioCardPortafolio,
} from "@modules/usuarios/utils/adaptar.usuario";
import InputIcon from '@mui/icons-material/Input';

type CardCursoProps = {
  curso: CursoMateria;
};

const CardCurso: React.FC<CardCursoProps> = ({ curso }) => {
  const theme = useTheme();

  const adaptedDocente = adaptarUsuarioAUsuarioCardPortafolio(curso.docente);

  return (
    <AnimatedCard>
      <Stack justifyContent={"space-between"} sx={{ padding: 3 }} spacing={3}>
        <Typography variant="h4" fontWeight={"500"} sx={{}}>
          {`${labelCardCurso.grupo}: ${curso.grupo}`}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography>{labelCardCurso.docente}</Typography>
          <Card
            sx={{
              paddingX: 1,
              backgroundColor: theme.palette.terciary.main,
              color: "white",
              fontWeight: 500,
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <ProjectCardAvatar
                usuario={adaptedDocente}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2">{adaptedDocente.nombres}</Typography>
            </Stack>
          </Card>
        </Stack>
        <Card sx={{ padding: 2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography>{`${labelCardCurso.secciones}: ${curso.secciones.length}`}</Typography>
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: "black", height: 40 }}
            />
            <Typography>{`${labelCardCurso.estudiantes}: ${curso.estudiantes.length}`}</Typography>
          </Stack>
        </Card>
        <Stack alignItems={"end"}>
          <Button variant="contained" endIcon={<InputIcon />}>{labelCardCurso.inscribirme}</Button>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default CardCurso;
