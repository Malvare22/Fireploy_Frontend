// import { ProjectCardAvatar } from "@modules/general/components/projectCardAvatar";
import PortafolioCard from "@modules/general/components/portafolioCard";
// import Score from "@modules/general/components/score";
import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudOffIcon from "@mui/icons-material/CloudOff";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = 'Calificar'
}

type Props = {
  proyecto: ProyectoCard;
  qualifier?: boolean;
};

// function FormQualifier(){

//   return <></>
// }

const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        overflowY: "scroll",
        width: { md: "80vw", xs: "70vw" },
        maxHeight: "85vh",
        backgroundColor: "none",
      }}
      spacing={3}
    >
      <Box>
        <CardEstado estado={proyecto.estado} />
      </Box>
      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          {proyecto.titulo}
        </Typography>
      </Box>
      <Stack direction={{ xl: "row" }} spacing={6}>
        <Box
          component={"img"}
          sx={{ width: { md: 550, xs: "100%" } }}
          src={proyecto.imagen}
        />
        <Stack
          spacing={4}
          width={"100%"}
          height={"100%"}
          border={"1px solid black"}
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={"bold"}>
              {labelModalProyectoPortafolio.calificador}
            </Typography>
            {/* <CardCalificador
            calificador={proyecto.calificador}
            grupo={proyecto.grupo}
            materia={proyecto.materia}
            puntuacion={proyecto.puntuacion}
            seccion={proyecto.seccion}
            semestre={proyecto.semestre}
          /> */}
            {proyecto.puntuacion == null && (
              <Alert severity="warning">
                <Stack direction={'row'}><Typography variant="subtitle1">
                  {labelModalProject.noQualify}
                </Typography></Stack>
              </Alert>
            )}
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={"bold"}>
              {labelModalProyectoPortafolio.tecnologias}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Chip color="error" label={proyecto.backend} />
              <Chip
                sx={{ backgroundColor: theme.palette.terciary.main }}
                label={proyecto.dataBase}
              />
              <Chip color="primary" label={proyecto.frontend} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={"bold"}>
          {labelModalProyectoPortafolio.descripcion}
        </Typography>
        <Typography>{proyecto.descripcion}</Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={"bold"}>
          {labelModalProyectoPortafolio.integrantes}
        </Typography>
        <Grid2 container spacing={2} paddingY={2}>
          {proyecto.integrantes.map((integrante) => (
            <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
              <PortafolioCard usuario={integrante} key={integrante.id} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
};

// type CardCalificadorProps = {
//   calificador: UsuarioPortafolioCard;
//   puntuacion: ProyectoCard["puntuacion"];
//   materia: ProyectoCard["materia"];
//   grupo: ProyectoCard["grupo"];
//   seccion: ProyectoCard["seccion"];
//   semestre: ProyectoCard["semestre"];
// };

// const CardCalificador: React.FC<CardCalificadorProps> = ({
//   calificador,
//   grupo,
//   materia,
//   puntuacion,
//   seccion,
// }) => {
//   return (
//     <Card sx={{ padding: 2 }}>
//       <Stack direction={"row"} alignItems={"center"} spacing={2}>
//         <ProjectCardAvatar
//           usuario={calificador}
//           sx={{ width: 48, height: 48 }}
//         />
//         <Stack>
//           <Stack direction={{ md: "row" }} spacing={2}>
//             <Typography variant="h6">{calificador.nombres}</Typography>
//             <Score value={puntuacion} />
//           </Stack>
//           <Box>
//             <Typography>{`${materia} / ${grupo} / ${seccion}`}</Typography>
//           </Box>
//         </Stack>
//       </Stack>
//     </Card>
//   );
// };

type CardEstadoProps = {
  estado: ProyectoCard["estado"];
};
const CardEstado: React.FC<CardEstadoProps> = ({ estado }) => {
  const theme = useTheme();

  function getColor() {
    return estado == "E"
      ? theme.palette.success.light
      : theme.palette.warning.light;
  }

  function getLabel() {
    return (
      <Stack
        direction={{ md: "row", xs: "column" }}
        alignItems={"center"}
        spacing={1}
      >
        {estado == "E" ? (
          <>
            <Typography fontWeight="bold" textAlign={"center"}>
              {labelModalProyectoPortafolio.online}
            </Typography>
            <CheckCircleOutlineIcon />
          </>
        ) : (
          <>
            <Typography fontWeight="bold" textAlign={"center"}>
              {labelModalProyectoPortafolio.offline}
            </Typography>
            <CloudOffIcon />
          </>
        )}
      </Stack>
    );
  }

  return (
    <Card sx={{ backgroundColor: getColor(), color: "white", paddingY: 1 }}>
      <Stack
        direction={{ md: "row", sm: "column" }}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        {getLabel()}
        {estado == "E" && (
          <Box sx={{ marginY: { xs: 1, md: 0 } }}>
            <Button variant="outlined" color="inherit">
              {labelModalProyectoPortafolio.visitar}
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default ModalProyectoPortafolio;
