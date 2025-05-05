// import { ProjectCardAvatar } from "@modules/general/components/projectCardAvatar";
import PortafolioCard from "@modules/general/components/portafolioCard";
// import Score from "@modules/general/components/score";
import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
// import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { postStarProject, postUnStarProject } from "@modules/proyectos/services/post.calificar";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import StarButton from "../starButton";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = "Calificar",
}

type Props = {
  proyecto: ProyectoCard;
};

const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto }) => {
  const theme = useTheme();

  const { id, token } = useAuth().accountInformation;

  const [localValue, setLocalValue] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES))
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify([]));
    else {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      setLocalValue(LIKES.includes(proyecto.id) || proyecto.fav_usuarios.includes(id));
    }
  }, []);

  const { handleAccept, showDialog, open, title, type, message } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (localValue) {
        return await postUnStarProject(proyecto.id, token);
      } else {
        return await postStarProject(proyecto.id, token);
      }
    },
    onSuccess: () => {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      const nValue = localValue
        ? LIKES.filter((_proyectoId) => _proyectoId != proyecto.id)
        : [...LIKES, proyecto.id];
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify(nValue));
      setLocalValue(!localValue);
    },
    onError: (err) => setError(err),
  });

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
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
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h4" fontWeight={"bold"}>
            {proyecto.titulo}
          </Typography>
          <StarButton isLoading={isPending} mutate={mutate} value={localValue ? 1 : 0} modal={true}/>
        </Stack>
        <Stack direction={{ xl: "row" }} spacing={6}>
          <Box
            component={"img"}
            sx={{ width: { md: 650, xs: "100%", border: "1px solid black" } }}
            src={proyecto.imagen}
          />
          <Stack spacing={4} width={"100%"} height={"100%"} border={"1px solid black"}>
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

        {proyecto.descripcion.trim() && (
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight={"bold"}>
              {labelModalProyectoPortafolio.descripcion}
            </Typography>
            {<Typography>{proyecto.descripcion}</Typography>}
          </Stack>
        )}
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
    </>
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
    return estado == "E" ? theme.palette.success.light : theme.palette.warning.light;
  }

  function getLabel() {
    return (
      <Stack direction={{ md: "row", xs: "column" }} alignItems={"center"} spacing={1}>
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
