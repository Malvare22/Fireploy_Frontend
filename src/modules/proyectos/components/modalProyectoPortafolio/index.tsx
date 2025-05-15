import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import {
  Box,
  Button,
  Card,
  Chip,
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
import { getImage } from "@modules/general/utils/getImage";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = "Calificar",
}

type Props = {
  proyecto: ProyectoCard;
};

/**
 * ModalProyectoPortafolio component – This component displays detailed information about a project in a modal format. 
 * It includes the project's title, technologies, description, team members, and the project's current status. 
 * Additionally, users can favorite or unfavorite the project and view the project's image.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {ProyectoCard} props.proyecto - The project data to display in the modal.
 * 
 * @returns {JSX.Element} The modal displaying project details with a favorite button and status indicator.
 * 
 * @example
 * ```tsx
 * <ModalProyectoPortafolio proyecto={projectData} />
 * ```
 */
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
          <StarButton isLoading={isPending} mutate={mutate} value={localValue} modal={true}/>
        </Stack>
        <Stack direction={{ xl: "row" }} spacing={6}>
          <Box
            component={"img"}
            sx={{ width: { md: 650, xs: "100%", border: "1px solid black" } }}
            src={proyecto.imagen ?? getImage['not_found'].ruta}
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
          {/* <Grid2 container spacing={2} paddingY={2}>
            {proyecto.integrantes.map((integrante) => (
              <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
                <PortafolioCard usuario={integrante} key={integrante.id} />
              </Grid2>
            ))}
          </Grid2> */}
        </Stack>
      </Stack>
    </>
  );
};

type CardEstadoProps = {
  estado: ProyectoCard["estado"];
};

/**
 * CardEstado component – This component displays the project's current status in a card, indicating whether the 
 * project is online or offline. It also provides a button to visit the project if it's online.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {string} props.estado - The current status of the project (online or offline).
 * 
 * @returns {JSX.Element} The card displaying the project's status and a button to visit the project if it's online.
 */
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
